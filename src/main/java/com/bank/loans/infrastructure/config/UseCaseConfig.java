package com.bank.loans.infrastructure.config;

import com.bank.loans.application.usecase.ManageLoanUseCase;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UseCaseConfig {

    @Bean
    public ManageLoanUseCase manageLoanUseCase(LoanRepositoryPort loanRepositoryPort) {
        return new ManageLoanUseCase(loanRepositoryPort);
    }
}
