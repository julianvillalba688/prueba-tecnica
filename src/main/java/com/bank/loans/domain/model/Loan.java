package com.bank.loans.domain.model;

import java.math.BigDecimal;

public class Loan {
    private String id;
    private String userEmail;
    private BigDecimal amount;
    private int termMonths;
    private LoanStatus status;

    public Loan(String id, String userEmail, BigDecimal amount, int termMonths) {
        this.id = id;
        this.userEmail = userEmail;
        this.amount = amount;
        this.termMonths = termMonths;
        this.status = LoanStatus.PENDIENTE;
    }

    public Loan(String id, String userEmail, BigDecimal amount, int termMonths, LoanStatus status) {
        this.id = id;
        this.userEmail = userEmail;
        this.amount = amount;
        this.termMonths = termMonths;
        this.status = status;
    }

    public void approve() {
        if (this.status != LoanStatus.PENDIENTE) {
            throw new IllegalStateException("Solo los préstamos pendientes pueden ser aprobados.");
        }
        this.status = LoanStatus.APROBADO;
    }

    public void reject() {
        if (this.status != LoanStatus.PENDIENTE) {
            throw new IllegalStateException("Solo los préstamos pendientes pueden ser rechazados.");
        }
        this.status = LoanStatus.RECHAZADO;
    }

    public String getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public int getTermMonths() {
        return termMonths;
    }

    public LoanStatus getStatus() {
        return status;
    }
}
