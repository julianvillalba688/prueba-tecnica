package com.bank.loans.ports.output;

import com.bank.loans.domain.model.Loan;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface LoanRepositoryPort {
    Mono<Loan> save(Loan loan);
    Mono<Loan> findById(String id);
    Flux<Loan> findByUserEmail(String email);
    Flux<Loan> findAll();
}
