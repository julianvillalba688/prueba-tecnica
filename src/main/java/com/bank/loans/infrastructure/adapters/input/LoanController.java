package com.bank.loans.infrastructure.adapters.input;

import com.bank.loans.application.usecase.ManageLoanUseCase;
import com.bank.loans.domain.model.Loan;
import com.bank.loans.infrastructure.adapters.input.dto.LoanRequestDto;
import com.bank.loans.infrastructure.adapters.input.dto.StatusUpdateRequestDto;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final ManageLoanUseCase manageLoanUseCase;
    private final LoanRepositoryPort loanRepositoryPort;

    public LoanController(ManageLoanUseCase manageLoanUseCase, LoanRepositoryPort loanRepositoryPort) {
        this.manageLoanUseCase = manageLoanUseCase;
        this.loanRepositoryPort = loanRepositoryPort;
    }

    @PostMapping("/request")
    public Mono<ResponseEntity<Loan>> requestLoan(@jakarta.validation.Valid @RequestBody LoanRequestDto request,
                                                  @AuthenticationPrincipal UserDetails userDetails) {
        return manageLoanUseCase.requestLoan(userDetails.getUsername(), request.getAmount(), request.getTermMonths())
                .map(ResponseEntity::ok);
    }

    @GetMapping("/my-loans")
    public Flux<Loan> getMyLoans(@AuthenticationPrincipal UserDetails userDetails) {
        return loanRepositoryPort.findByUserEmail(userDetails.getUsername());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public Flux<Loan> getAllLoans() {
        return loanRepositoryPort.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/status")
    public Mono<ResponseEntity<Loan>> updateStatus(@PathVariable String id,
                                                   @jakarta.validation.Valid @RequestBody StatusUpdateRequestDto request) {
        return manageLoanUseCase.updateLoanStatus(id, request.getAction())
                .map(ResponseEntity::ok);
    }
}
