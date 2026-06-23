package com.bank.loans.application.usecase;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.domain.model.LoanStatus;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class ManageLoanUseCaseTest {

    @Test
    public void requestLoan_setsStatusToPending() {
        LoanRepositoryPort port = Mockito.mock(LoanRepositoryPort.class);
        ManageLoanUseCase useCase = new ManageLoanUseCase(port);

        when(port.save(any(Loan.class))).thenAnswer(i -> i.getArguments()[0]);

        Loan loan = useCase.requestLoan("test@bank.com", BigDecimal.valueOf(5000), 24);
        
        assertNotNull(loan.getId());
        assertEquals(LoanStatus.PENDIENTE, loan.getStatus());
        assertEquals("test@bank.com", loan.getUserEmail());
    }

    @Test
    public void updateLoanStatus_approvesLoan() {
        LoanRepositoryPort port = Mockito.mock(LoanRepositoryPort.class);
        ManageLoanUseCase useCase = new ManageLoanUseCase(port);
        
        Loan pendingLoan = new Loan("1", "test@bank.com", BigDecimal.valueOf(5000), 24, LoanStatus.PENDIENTE);
        
        when(port.findById("1")).thenReturn(java.util.Optional.of(pendingLoan));
        when(port.save(any(Loan.class))).thenAnswer(i -> i.getArguments()[0]);

        Loan approvedLoan = useCase.updateLoanStatus("1", "APROBAR");
        
        assertEquals(LoanStatus.APROBADO, approvedLoan.getStatus());
    }
}
