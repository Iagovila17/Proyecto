package com.tienda.I.tek.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {

    @GetMapping("/login")
    public String login() {
        return "login"; // Asegúrate de que 'login.html' esté en 'src/main/resources/templates'
    }
    }