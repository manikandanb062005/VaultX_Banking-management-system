package com.vaultx.backend.config;

import com.vaultx.backend.entity.*;
import com.vaultx.backend.repository.AccountRepository;
import com.vaultx.backend.repository.LoanRepository;
import com.vaultx.backend.repository.TransactionRepository;
import com.vaultx.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Seeds the database with demo data on first run so the app works out of the box,
 * mirroring the mock data that used to live in the frontend services.
 * Safe to remove once you have real users.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final LoanRepository loanRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // already seeded
        }

        User admin = userRepository.save(User.builder()
                .name("Admin User")
                .email("admin@vaultx.com")
                .phone("9000000000")
                .password(passwordEncoder.encode("admin123"))
                .role(User.Role.ADMIN)
                .status(User.UserStatus.ACTIVE)
                .build());

        User mani = userRepository.save(User.builder()
                .name("Manikandan K")
                .email("mani@vaultx.com")
                .phone("9876543210")
                .password(passwordEncoder.encode("user123"))
                .role(User.Role.USER)
                .status(User.UserStatus.ACTIVE)
                .joinDate(LocalDate.of(2025, 11, 1))
                .build());

        User ravi = userRepository.save(User.builder()
                .name("Ravi Kumar")
                .email("ravi@example.com")
                .phone("9123456780")
                .password(passwordEncoder.encode("user123"))
                .role(User.Role.USER)
                .status(User.UserStatus.ACTIVE)
                .joinDate(LocalDate.of(2025, 12, 15))
                .build());

        User sneha = userRepository.save(User.builder()
                .name("Sneha Mani")
                .email("sneha@example.com")
                .phone("9988776655")
                .password(passwordEncoder.encode("user123"))
                .role(User.Role.USER)
                .status(User.UserStatus.INACTIVE)
                .joinDate(LocalDate.of(2026, 1, 10))
                .build());

        User arjun = userRepository.save(User.builder()
                .name("Arjun Jain")
                .email("arjun@example.com")
                .phone("9011223344")
                .password(passwordEncoder.encode("user123"))
                .role(User.Role.USER)
                .status(User.UserStatus.ACTIVE)
                .joinDate(LocalDate.of(2026, 2, 5))
                .build());

        Account maniSavings = accountRepository.save(Account.builder()
                .accountNumber("1234567893914")
                .type(Account.AccountType.SAVINGS)
                .balance(new BigDecimal("284560"))
                .bank("SBI")
                .status(Account.AccountStatus.ACTIVE)
                .user(mani)
                .build());

        accountRepository.save(Account.builder()
                .accountNumber("9876543210001")
                .type(Account.AccountType.FD)
                .balance(new BigDecimal("100000"))
                .bank("SBI")
                .status(Account.AccountStatus.LOCKED)
                .maturityDate(LocalDate.of(2026, 12, 1))
                .user(mani)
                .build());

        accountRepository.save(Account.builder()
                .accountNumber("1111222230041")
                .type(Account.AccountType.CURRENT)
                .balance(new BigDecimal("52000"))
                .bank("HDFC")
                .status(Account.AccountStatus.ACTIVE)
                .user(mani)
                .build());

        accountRepository.save(Account.builder()
                .accountNumber("1111222234567")
                .type(Account.AccountType.SAVINGS)
                .balance(new BigDecimal("68000"))
                .bank("HDFC")
                .status(Account.AccountStatus.ACTIVE)
                .user(ravi)
                .build());

        accountRepository.save(Account.builder()
                .accountNumber("3333444456789")
                .type(Account.AccountType.CURRENT)
                .balance(new BigDecimal("215000"))
                .bank("ICICI")
                .status(Account.AccountStatus.ACTIVE)
                .user(arjun)
                .build());

        accountRepository.save(Account.builder()
                .accountNumber("5555666678901")
                .type(Account.AccountType.SAVINGS)
                .balance(new BigDecimal("32400"))
                .bank("Axis")
                .status(Account.AccountStatus.LOCKED)
                .user(sneha)
                .build());

        // Sample transactions for Mani's savings account
        String[][] txData = {
                {"Salary Credit", "CREDIT", "45000", "TXN001"},
                {"Amazon Shopping", "DEBIT", "2349", "TXN002"},
                {"Electricity Bill", "DEBIT", "1200", "TXN003"},
                {"UPI Transfer - Ravi", "TRANSFER", "500", "TXN004"},
                {"Freelance Payment", "CREDIT", "8000", "TXN005"},
                {"Netflix Subscription", "DEBIT", "649", "TXN006"},
                {"ATM Withdrawal", "DEBIT", "5000", "TXN007"},
                {"Interest Credit", "CREDIT", "312", "TXN008"},
        };
        for (String[] row : txData) {
            transactionRepository.save(Transaction.builder()
                    .referenceId(row[3])
                    .description(row[0])
                    .type(Transaction.TransactionType.valueOf(row[1]))
                    .amount(new BigDecimal(row[2]))
                    .status(Transaction.TransactionStatus.SUCCESS)
                    .account(maniSavings)
                    .build());
        }

        // Sample loan applications
        loanRepository.save(Loan.builder()
                .user(ravi)
                .type("Home Loan")
                .amount(new BigDecimal("2000000"))
                .tenure(240)
                .status(Loan.LoanStatus.PENDING)
                .appliedDate(LocalDate.of(2026, 4, 1))
                .build());

        loanRepository.save(Loan.builder()
                .user(sneha)
                .type("Personal Loan")
                .amount(new BigDecimal("150000"))
                .tenure(24)
                .status(Loan.LoanStatus.PENDING)
                .appliedDate(LocalDate.of(2026, 4, 3))
                .build());

        loanRepository.save(Loan.builder()
                .user(arjun)
                .type("Car Loan")
                .amount(new BigDecimal("600000"))
                .tenure(60)
                .status(Loan.LoanStatus.APPROVED)
                .appliedDate(LocalDate.of(2026, 3, 20))
                .build());

        System.out.println("VaultX demo data seeded. Login with admin@vaultx.com/admin123 or mani@vaultx.com/user123");
    }
}
