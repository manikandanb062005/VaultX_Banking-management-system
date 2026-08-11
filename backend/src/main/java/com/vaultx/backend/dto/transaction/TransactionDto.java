package com.vaultx.backend.dto.transaction;

import com.vaultx.backend.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionDto {
    private Long id;
    private String description;
    private String type;
    private BigDecimal amount;
    private LocalDateTime date;
    private String status;
    private String referenceId;
    private String accountNumber;

    public static TransactionDto fromEntity(Transaction tx) {
        String acctNum = tx.getAccount().getAccountNumber();
        String last4 = acctNum.length() > 4 ? acctNum.substring(acctNum.length() - 4) : acctNum;
        return TransactionDto.builder()
                .id(tx.getId())
                .description(tx.getDescription())
                .type(tx.getType().name().toLowerCase())
                .amount(tx.getAmount())
                .date(tx.getDate())
                .status(tx.getStatus().name().toLowerCase())
                .referenceId(tx.getReferenceId())
                .accountNumber(last4)
                .build();
    }
}
