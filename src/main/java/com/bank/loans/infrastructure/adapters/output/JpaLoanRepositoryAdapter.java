package com.bank.loans.infrastructure.adapters.output;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.infrastructure.persistence.JpaLoanRepository;
import com.bank.loans.infrastructure.persistence.LoanEntity;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.stream.Collectors;

@Component
public class JpaLoanRepositoryAdapter implements LoanRepositoryPort {

    private final JpaLoanRepository repository;

    public JpaLoanRepositoryAdapter(JpaLoanRepository repository) {
        this.repository = repository;
    }

    @Override
    @CacheEvict(value = {"loansByUser", "allLoans"}, allEntries = true)
    public Mono<Loan> save(Loan loan) {
        return Mono.fromCallable(() -> {
            LoanEntity entity = new LoanEntity(
                    loan.getId(),
                    loan.getUserEmail(),
                    loan.getAmount(),
                    loan.getTermMonths(),
                    loan.getStatus()
            );
            return toDomain(repository.save(entity));
        }).subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Loan> findById(String id) {
        return Mono.fromCallable(() -> repository.findById(id).map(this::toDomain).orElse(null))
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    @Cacheable(value = "loansByUser", key = "#email")
    public Flux<Loan> findByUserEmail(String email) {
        return Mono.fromCallable(() -> repository.findByUserEmail(email).stream()
                .map(this::toDomain)
                .collect(Collectors.toList()))
                .subscribeOn(Schedulers.boundedElastic())
                .flatMapMany(Flux::fromIterable);
    }

    @Override
    @Cacheable(value = "allLoans")
    public Flux<Loan> findAll() {
        return Mono.fromCallable(() -> repository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList()))
                .subscribeOn(Schedulers.boundedElastic())
                .flatMapMany(Flux::fromIterable);
    }

    private Loan toDomain(LoanEntity entity) {
        return new Loan(
                entity.getId(),
                entity.getUserEmail(),
                entity.getAmount(),
                entity.getTermMonths(),
                entity.getStatus()
        );
    }
}
