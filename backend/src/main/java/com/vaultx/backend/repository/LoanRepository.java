package com.vaultx.backend.repository;

import com.vaultx.backend.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserIdOrderByAppliedDateDesc(Long userId);
    List<Loan> findAllByOrderByAppliedDateDesc();
}
