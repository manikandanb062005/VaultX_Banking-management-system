package com.vaultx.backend.service;

import com.vaultx.backend.dto.account.AccountDto;
import com.vaultx.backend.entity.Account;
import com.vaultx.backend.entity.Transaction;
import com.vaultx.backend.exception.BadRequestException;
import com.vaultx.backend.exception.ResourceNotFoundException;
import com.vaultx.backend.repository.AccountRepository;
import com.vaultx.backend.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.security.SecureRandom;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    private static final SecureRandom RANDOM = new SecureRandom();

    public List<AccountDto> getMyAccounts(Long userId) {
        return accountRepository.findByUserId(userId).stream()
                .map(a -> AccountDto.fromEntity(a, false))
                .toList();
    }

    public List<AccountDto> getAllAccounts() {
        return accountRepository.findAll().stream()
                .map(a -> AccountDto.fromEntity(a, true))
                .toList();
    }

    @Transactional
    public AccountDto deposit(Long userId, Long accountId, BigDecimal amount) {
        Account account = getOwnedAccount(userId, accountId);
        account.setBalance(account.getBalance().add(amount));
        accountRepository.save(account);

        recordTransaction(account, Transaction.TransactionType.CREDIT, amount, "Deposit", null);
        return AccountDto.fromEntity(account, false);
    }

    @Transactional
    public AccountDto withdraw(Long userId, Long accountId, BigDecimal amount) {
        Account account = getOwnedAccount(userId, accountId);
        if (account.getBalance().compareTo(amount) < 0) {
            throw new BadRequestException("Insufficient balance");
        }
        if (account.getStatus() != Account.AccountStatus.ACTIVE) {
            throw new BadRequestException("Account is not active");
        }
        account.setBalance(account.getBalance().subtract(amount));
        accountRepository.save(account);

        recordTransaction(account, Transaction.TransactionType.DEBIT, amount, "Withdrawal", null);
        return AccountDto.fromEntity(account, false);
    }

    private Account getOwnedAccount(Long userId, Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found"));
        if (!account.getUser().getId().equals(userId)) {
            throw new BadRequestException("You do not have access to this account");
        }
        return account;
    }

    private void recordTransaction(Account account, Transaction.TransactionType type, BigDecimal amount,
                                    String description, String counterparty) {
        Transaction tx = Transaction.builder()
                .referenceId(generateReferenceId())
                .description(description)
                .type(type)
                .amount(amount)
                .status(Transaction.TransactionStatus.SUCCESS)
                .account(account)
                .counterpartyAccountNumber(counterparty)
                .build();
        transactionRepository.save(tx);
    }

    private String generateReferenceId() {
        return "TXN" + System.currentTimeMillis() + RANDOM.nextInt(1000);
    }
}
