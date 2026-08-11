package com.vaultx.backend.repository;

import com.vaultx.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountIdOrderByDateDesc(Long accountId);
    List<Transaction> findByAccountUserIdOrderByDateDesc(Long userId);
    List<Transaction> findAllByOrderByDateDesc();
}
