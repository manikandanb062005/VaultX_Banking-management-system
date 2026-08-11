package com.vaultx.backend.controller;

import com.vaultx.backend.dto.account.AccountDto;
import com.vaultx.backend.dto.account.AmountRequest;
import com.vaultx.backend.security.CustomUserDetails;
import com.vaultx.backend.service.AccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    @GetMapping("/my")
    public ResponseEntity<List<AccountDto>> getMyAccounts(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(accountService.getMyAccounts(principal.getId()));
    }

    @PostMapping("/{id}/deposit")
    public ResponseEntity<AccountDto> deposit(@AuthenticationPrincipal CustomUserDetails principal,
                                               @PathVariable Long id,
                                               @Valid @RequestBody AmountRequest request) {
        return ResponseEntity.ok(accountService.deposit(principal.getId(), id, request.getAmount()));
    }

    @PostMapping("/{id}/withdraw")
    public ResponseEntity<AccountDto> withdraw(@AuthenticationPrincipal CustomUserDetails principal,
                                                @PathVariable Long id,
                                                @Valid @RequestBody AmountRequest request) {
        return ResponseEntity.ok(accountService.withdraw(principal.getId(), id, request.getAmount()));
    }
}
