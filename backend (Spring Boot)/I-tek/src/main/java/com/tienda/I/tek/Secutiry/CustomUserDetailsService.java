package com.tienda.I.tek.Secutiry;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

<<<<<<< HEAD
import com.tienda.I.tek.Entities.CustomUserDetails;
=======
import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

<<<<<<< HEAD
        return new CustomUserDetails(user.getEmail(), user.getPassword(), user.getRol());
=======
                return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    List.of(new SimpleGrantedAuthority("ROLE_" + user.getRol()))
                );
>>>>>>> 517c7891977640a156f433b32dc57a6127fc3ef3
    }
}