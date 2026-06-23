package com.bank.loans.infrastructure.adapters.input.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class LoanRequestDto {
    
    @NotNull(message = "El monto es obligatorio")
    @Min(value = 100, message = "El monto mínimo es 100")
    private BigDecimal amount;
    
    @NotNull(message = "El plazo es obligatorio")
    @Min(value = 1, message = "El plazo mínimo es 1 mes")
    private Integer termMonths;

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public Integer getTermMonths() { return termMonths; }
    public void setTermMonths(Integer termMonths) { this.termMonths = termMonths; }
}
