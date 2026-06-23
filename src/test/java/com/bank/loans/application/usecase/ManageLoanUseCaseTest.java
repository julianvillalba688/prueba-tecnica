package com.bank.loans.application.usecase;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ManageLoanUseCaseTest {

    private final LoanRepositoryPort repositoryPort = mock(LoanRepositoryPort.class);
    private final ManageLoanUseCase useCase = new ManageLoanUseCase(repositoryPort);

    @Test
    void shouldSetPendingStatusOnRequest() {
        Loan inputLoan = new Loan(null, "test@test.com", new BigDecimal("5000"), 12);
        when(repositoryPort.save(any(Loan.class))).thenAnswer(i -> Mono.just(i.getArgument(0)));

        Mono<Loan> resultMono = useCase.requestLoan("test@test.com", new BigDecimal("5000"), 12);

        StepVerifier.create(resultMono)
                .assertNext(result -> {
                    assertEquals("PENDIENTE", result.getStatus().name());
                    assertEquals("test@test.com", result.getUserEmail());
                })
                .verifyComplete();

        verify(repositoryPort, times(1)).save(any(Loan.class));
    }
}
