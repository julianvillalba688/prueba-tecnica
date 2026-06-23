package com.bank.loans.ports.output;

import com.bank.loans.domain.model.Loan;

import java.util.List;
import java.util.Optional;

public interface LoanRepositoryPort {
    Loan save(Loan loan);
    Optional<Loan> findById(String id);
    List<Loan> findByUserEmail(String email);
    List<Loan> findAll();
}
