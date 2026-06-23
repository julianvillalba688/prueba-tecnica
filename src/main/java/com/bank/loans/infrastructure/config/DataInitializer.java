package com.bank.loans.infrastructure.config;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.domain.model.LoanStatus;
import com.bank.loans.infrastructure.persistence.JpaLoanRepository;
import com.bank.loans.infrastructure.persistence.LoanEntity;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.UUID;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(JpaLoanRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(new LoanEntity(
                        UUID.randomUUID().toString(),
                        "usuario@test.com",
                        BigDecimal.valueOf(5000),
                        12,
                        LoanStatus.PENDIENTE
                ));
                repository.save(new LoanEntity(
                        UUID.randomUUID().toString(),
                        "usuario@test.com",
                        BigDecimal.valueOf(12500),
                        24,
                        LoanStatus.APROBADO
                ));
                repository.save(new LoanEntity(
                        UUID.randomUUID().toString(),
                        "usuario@test.com",
                        BigDecimal.valueOf(300),
                        6,
                        LoanStatus.RECHAZADO
                ));
                repository.save(new LoanEntity(
                        UUID.randomUUID().toString(),
                        "otro@cliente.com",
                        BigDecimal.valueOf(8000),
                        12,
                        LoanStatus.PENDIENTE
                ));
                System.out.println("====== DATOS DE PRUEBA INYECTADOS EN POSTGRESQL ======");
            }
        };
    }
}
