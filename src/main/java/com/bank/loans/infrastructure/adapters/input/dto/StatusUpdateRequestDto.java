package com.bank.loans.infrastructure.adapters.input.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class StatusUpdateRequestDto {
    
    @NotBlank(message = "La acción no puede estar vacía")
    @Pattern(regexp = "^(APROBAR|RECHAZAR)$", message = "La acción debe ser APROBAR o RECHAZAR")
    private String action;

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
}
