package com.vaultx.backend.dto.account;

import com.vaultx.backend.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {
    private Long id;
    private String type;
    private BigDecimal balance;
    private String accountNumber;
    private String bank;
    private String status;
    private String extra;
    private String owner;

    public static AccountDto fromEntity(Account account) {
        return fromEntity(account, false);
    }

    public static AccountDto fromEntity(Account account, boolean includeOwner) {
        String extra = null;
        if (account.getType() == Account.AccountType.FD && account.getMaturityDate() != null) {
            extra = "Matures: " + account.getMaturityDate();
        }
        return AccountDto.builder()
                .id(account.getId())
                .type(account.getType().name().toLowerCase())
                .balance(account.getBalance())
                .accountNumber(account.getAccountNumber())
                .bank(account.getBank())
                .status(capitalize(account.getStatus().name()))
                .extra(extra)
                .owner(includeOwner && account.getUser() != null ? account.getUser().getName() : null)
                .build();
    }

    private static String capitalize(String s) {
        return s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase();
    }
}
