package com.bank.loans.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaLoanRepository extends JpaRepository<LoanEntity, String> {
    List<LoanEntity> findByUserEmail(String userEmail);
}
