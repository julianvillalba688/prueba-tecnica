package com.bank.loans.application.usecase;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

public class ManageLoanUseCase {

    private final LoanRepositoryPort loanRepositoryPort;

    public ManageLoanUseCase(LoanRepositoryPort loanRepositoryPort) {
        this.loanRepositoryPort = loanRepositoryPort;
    }

    @Transactional
    public Loan requestLoan(String userEmail, BigDecimal amount, int termMonths) {
        Loan newLoan = new Loan(UUID.randomUUID().toString(), userEmail, amount, termMonths);
        return loanRepositoryPort.save(newLoan);
    }

    @Transactional
    public Loan updateLoanStatus(String loanId, String action) {
        Loan loan = loanRepositoryPort.findById(loanId)
                .orElseThrow(() -> new IllegalArgumentException("Préstamo no encontrado con el id: " + loanId));

        if ("APROBAR".equalsIgnoreCase(action)) {
            loan.approve();
        } else if ("RECHAZAR".equalsIgnoreCase(action)) {
            loan.reject();
        } else {
            throw new IllegalArgumentException("Acción inválida. Debe ser APROBAR o RECHAZAR.");
        }

        return loanRepositoryPort.save(loan);
    }
}
