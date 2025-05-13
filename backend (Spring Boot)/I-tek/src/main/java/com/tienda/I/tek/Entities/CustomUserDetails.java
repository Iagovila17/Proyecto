package com.tienda.I.tek.Entities;

import org.springframework.security.core.userdetails.UserDetails;

import com.tienda.I.tek.Enumerated.Rol;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private String email;
    private String password;
    private Rol rol;

   
    public CustomUserDetails(String email, String password, Rol rol) {
        this.email = email;
        this.password = password;
        this.rol = rol;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + rol));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}