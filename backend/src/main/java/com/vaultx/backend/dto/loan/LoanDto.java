package com.vaultx.backend.dto.loan;

import com.vaultx.backend.entity.Loan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoanDto {
    private Long id;
    private String userName;
    private String type;
    private BigDecimal amount;
    private Integer tenure;
    private String status;
    private LocalDate appliedDate;

    public static LoanDto fromEntity(Loan loan) {
        return LoanDto.builder()
                .id(loan.getId())
                .userName(loan.getUser().getName())
                .type(loan.getType())
                .amount(loan.getAmount())
                .tenure(loan.getTenure())
                .status(loan.getStatus().name().toLowerCase())
                .appliedDate(loan.getAppliedDate())
                .build();
    }
}
