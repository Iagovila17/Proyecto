package com.tienda.I.tek.Model;

public class LoginResponse {
    private String token;
    private String role;

    // Constructor con parámetros
    public LoginResponse(String token, String role) {
        this.token = token;
        this.role = role;
    }

    // Getters y setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}