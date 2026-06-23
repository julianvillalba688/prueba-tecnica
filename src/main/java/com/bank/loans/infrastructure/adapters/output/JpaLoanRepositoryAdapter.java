package com.bank.loans.infrastructure.adapters.output;

import com.bank.loans.domain.model.Loan;
import com.bank.loans.infrastructure.persistence.JpaLoanRepository;
import com.bank.loans.infrastructure.persistence.LoanEntity;
import com.bank.loans.ports.output.LoanRepositoryPort;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JpaLoanRepositoryAdapter implements LoanRepositoryPort {

    private final JpaLoanRepository repository;

    public JpaLoanRepositoryAdapter(JpaLoanRepository repository) {
        this.repository = repository;
    }

    @Override
    @CacheEvict(value = {"loansByUser", "allLoans"}, allEntries = true)
    public Loan save(Loan loan) {
        LoanEntity entity = new LoanEntity(
                loan.getId(),
                loan.getUserEmail(),
                loan.getAmount(),
                loan.getTermMonths(),
                loan.getStatus()
        );
        LoanEntity saved = repository.save(entity);
        return toDomain(saved);
    }

    @Override
    public Optional<Loan> findById(String id) {
        return repository.findById(id).map(this::toDomain);
    }

    @Override
    @Cacheable(value = "loansByUser", key = "#email")
    public List<Loan> findByUserEmail(String email) {
        return repository.findByUserEmail(email).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    @Cacheable(value = "allLoans")
    public List<Loan> findAll() {
        return repository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
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
