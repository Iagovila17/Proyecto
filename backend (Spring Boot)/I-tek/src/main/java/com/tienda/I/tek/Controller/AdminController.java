package com.tienda.I.tek.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class AdminController {

    @GetMapping("/login")
    public String login() {
        return "login";  // Se asume que tienes un archivo 'login.html' en 'src/main/resources/templates'
    }

    @GetMapping("/home")
    public String home() {
        return "home";  // Se asume que tienes un archivo 'home.html' en 'src/main/resources/templates'
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "dashboard";  // Se asume que tienes 'admin/dashboard.html' en templates
    }

    @GetMapping("/user/home")
    public String userProfile() {
        return "home";  // Se asume que tienes 'user/profile.html' en templates
    }
}