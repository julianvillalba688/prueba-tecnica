package com.bank.loans.application.usecase;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.ports.output.LoanRepositoryPort;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.UUID;

public class ManageLoanUseCase {

    private final LoanRepositoryPort loanRepositoryPort;

    public ManageLoanUseCase(LoanRepositoryPort loanRepositoryPort) {
        this.loanRepositoryPort = loanRepositoryPort;
    }

    public Mono<Loan> requestLoan(String userEmail, BigDecimal amount, int termMonths) {
        Loan newLoan = new Loan(UUID.randomUUID().toString(), userEmail, amount, termMonths);
        return loanRepositoryPort.save(newLoan);
    }

    public Mono<Loan> updateLoanStatus(String loanId, String action) {
        return loanRepositoryPort.findById(loanId)
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Préstamo no encontrado con el id: " + loanId)))
                .flatMap(loan -> {
                    if ("APROBAR".equalsIgnoreCase(action)) {
                        loan.approve();
                    } else if ("RECHAZAR".equalsIgnoreCase(action)) {
                        loan.reject();
                    } else {
                        return Mono.error(new IllegalArgumentException("Acción inválida. Debe ser APROBAR o RECHAZAR."));
                    }
                    return loanRepositoryPort.save(loan);
                });
    }
}
