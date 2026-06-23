package com.bank.loans.infrastructure.persistence;

import com.bank.loans.domain.model.LoanStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "loans")
public class LoanEntity {

    @Id
    private String id;
    private String userEmail;
    private BigDecimal amount;
    private int termMonths;
    
    @Enumerated(EnumType.STRING)
    private LoanStatus status;

    public LoanEntity() {}

    public LoanEntity(String id, String userEmail, BigDecimal amount, int termMonths, LoanStatus status) {
        this.id = id;
        this.userEmail = userEmail;
        this.amount = amount;
        this.termMonths = termMonths;
        this.status = status;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public int getTermMonths() { return termMonths; }
    public void setTermMonths(int termMonths) { this.termMonths = termMonths; }
    public LoanStatus getStatus() { return status; }
    public void setStatus(LoanStatus status) { this.status = status; }
}
