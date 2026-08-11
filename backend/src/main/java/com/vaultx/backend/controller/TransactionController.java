package com.vaultx.backend.controller;

import com.vaultx.backend.dto.transaction.TransactionDto;
import com.vaultx.backend.dto.transaction.TransferRequest;
import com.vaultx.backend.security.CustomUserDetails;
import com.vaultx.backend.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/my")
    public ResponseEntity<List<TransactionDto>> getMyTransactions(@AuthenticationPrincipal CustomUserDetails principal) {
        return ResponseEntity.ok(transactionService.getMyTransactions(principal.getId()));
    }

    @PostMapping("/transfer")
    public ResponseEntity<TransactionDto> transfer(@AuthenticationPrincipal CustomUserDetails principal,
                                                     @Valid @RequestBody TransferRequest request) {
        return ResponseEntity.ok(transactionService.transfer(principal.getId(), request));
    }
}
