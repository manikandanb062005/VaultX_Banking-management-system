package com.vaultx.backend.service;

import com.vaultx.backend.dto.transaction.TransactionDto;
import com.vaultx.backend.dto.transaction.TransferRequest;
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
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    private static final SecureRandom RANDOM = new SecureRandom();

    public List<TransactionDto> getMyTransactions(Long userId) {
        return transactionRepository.findByAccountUserIdOrderByDateDesc(userId).stream()
                .map(TransactionDto::fromEntity)
                .toList();
    }

    public List<TransactionDto> getAllTransactions() {
        return transactionRepository.findAllByOrderByDateDesc().stream()
                .map(TransactionDto::fromEntity)
                .toList();
    }

    @Transactional
    public TransactionDto transfer(Long userId, TransferRequest request) {
        if (request.getFromAccount().equals(request.getToAccount())) {
            throw new BadRequestException("Cannot transfer to the same account");
        }

        Account from = accountRepository.findByAccountNumber(request.getFromAccount())
                .orElseThrow(() -> new ResourceNotFoundException("Source account not found"));
        Account to = accountRepository.findByAccountNumber(request.getToAccount())
                .orElseThrow(() -> new ResourceNotFoundException("Destination account not found"));

        if (!from.getUser().getId().equals(userId)) {
            throw new BadRequestException("You do not have access to the source account");
        }
        if (from.getStatus() != Account.AccountStatus.ACTIVE) {
            throw new BadRequestException("Source account is not active");
        }
        BigDecimal amount = request.getAmount();
        if (from.getBalance().compareTo(amount) < 0) {
            throw new BadRequestException("Insufficient balance");
        }

        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));
        accountRepository.save(from);
        accountRepository.save(to);

        String refId = generateReferenceId();
        String remarks = (request.getRemarks() == null || request.getRemarks().isBlank())
                ? "Transfer" : request.getRemarks();

        Transaction debitTx = Transaction.builder()
                .referenceId(refId)
                .description("Transfer to " + maskAccount(to.getAccountNumber()))
                .type(Transaction.TransactionType.TRANSFER)
                .amount(amount)
                .status(Transaction.TransactionStatus.SUCCESS)
                .account(from)
                .counterpartyAccountNumber(to.getAccountNumber())
                .remarks(remarks)
                .build();
        transactionRepository.save(debitTx);

        Transaction creditTx = Transaction.builder()
                .referenceId(refId + "R")
                .description("Transfer from " + maskAccount(from.getAccountNumber()))
                .type(Transaction.TransactionType.CREDIT)
                .amount(amount)
                .status(Transaction.TransactionStatus.SUCCESS)
                .account(to)
                .counterpartyAccountNumber(from.getAccountNumber())
                .remarks(remarks)
                .build();
        transactionRepository.save(creditTx);

        return TransactionDto.fromEntity(debitTx);
    }

    private String maskAccount(String accountNumber) {
        return accountNumber.length() > 4 ? "****" + accountNumber.substring(accountNumber.length() - 4) : accountNumber;
    }

    private String generateReferenceId() {
        return "TXN" + System.currentTimeMillis() + RANDOM.nextInt(1000);
    }
}
