package com.tienda.I.tek.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.Authentication;

@Controller
public class RedirectController {

    @GetMapping("/redirect")
    public String redirectAfterLogin(Authentication auth) {
        if (auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            return "redirect:/admin/dashboard";
        } else if (auth.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("USER"))) {
            return "redirect:/user/dashboard";
        } else {
            return "redirect:/login?error";
        }
    }
}