package com.vaultx.backend.service;

import com.vaultx.backend.dto.user.UserDto;
import com.vaultx.backend.entity.User;
import com.vaultx.backend.exception.ResourceNotFoundException;
import com.vaultx.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .toList();
    }

    @Transactional
    public UserDto toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setStatus(user.getStatus() == User.UserStatus.ACTIVE
                ? User.UserStatus.INACTIVE
                : User.UserStatus.ACTIVE);
        return UserDto.fromEntity(userRepository.save(user));
    }
}
