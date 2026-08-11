package com.vaultx.backend.service;

import com.vaultx.backend.dto.auth.AuthResponse;
import com.vaultx.backend.dto.auth.LoginRequest;
import com.vaultx.backend.dto.auth.RegisterRequest;
import com.vaultx.backend.dto.user.UserDto;
import com.vaultx.backend.entity.Account;
import com.vaultx.backend.entity.User;
import com.vaultx.backend.exception.BadRequestException;
import com.vaultx.backend.repository.AccountRepository;
import com.vaultx.backend.repository.UserRepository;
import com.vaultx.backend.security.CustomUserDetails;
import com.vaultx.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    private static final SecureRandom RANDOM = new SecureRandom();
    @Transactional
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String token = jwtUtil.generateToken(userDetails, user.getId(), user.getRole().name());

        return AuthResponse.builder()
                .token(token)
                .user(UserDto.fromEntity(user))
                .build();
    }

    @Transactional
    public UserDto register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("An account with this email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(User.Role.USER)
                .status(User.UserStatus.ACTIVE)
                .build();
        user = userRepository.save(user);

        Account.AccountType type = parseAccountType(request.getAccountType());
        Account account = Account.builder()
                .accountNumber(generateAccountNumber())
                .type(type)
                .balance(java.math.BigDecimal.ZERO)
                .bank("VaultX")
                .status(Account.AccountStatus.ACTIVE)
                .user(user)
                .build();
        accountRepository.save(account);

        return UserDto.fromEntity(user);
    }

    private Account.AccountType parseAccountType(String raw) {
        if (raw == null || raw.isBlank()) return Account.AccountType.SAVINGS;
        try {
            return Account.AccountType.valueOf(raw.trim().toUpperCase());
        } catch (IllegalArgumentException ex) {
            return Account.AccountType.SAVINGS;
        }
    }

    private String generateAccountNumber() {
        String candidate;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 13; i++) sb.append(RANDOM.nextInt(10));
            candidate = sb.toString();
        } while (accountRepository.existsByAccountNumber(candidate));
        return candidate;
    }
}
