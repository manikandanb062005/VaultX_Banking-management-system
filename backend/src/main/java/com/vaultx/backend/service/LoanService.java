package com.vaultx.backend.service;

import com.vaultx.backend.dto.loan.LoanDto;
import com.vaultx.backend.entity.Loan;
import com.vaultx.backend.exception.ResourceNotFoundException;
import com.vaultx.backend.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;

    public List<LoanDto> getAllLoans() {
        return loanRepository.findAllByOrderByAppliedDateDesc().stream()
                .map(LoanDto::fromEntity)
                .toList();
    }

    public List<LoanDto> getMyLoans(Long userId) {
        return loanRepository.findByUserIdOrderByAppliedDateDesc(userId).stream()
                .map(LoanDto::fromEntity)
                .toList();
    }

    @Transactional
    public LoanDto approveLoan(Long loanId) {
        Loan loan = getLoan(loanId);
        loan.setStatus(Loan.LoanStatus.APPROVED);
        return LoanDto.fromEntity(loanRepository.save(loan));
    }

    @Transactional
    public LoanDto rejectLoan(Long loanId) {
        Loan loan = getLoan(loanId);
        loan.setStatus(Loan.LoanStatus.REJECTED);
        return LoanDto.fromEntity(loanRepository.save(loan));
    }

    private Loan getLoan(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
    }
}
