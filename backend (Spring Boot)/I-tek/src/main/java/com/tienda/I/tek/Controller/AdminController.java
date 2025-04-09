package com.tienda.I.tek.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;


import org.springframework.ui.Model;


@Controller
@RequestMapping("/admin")
public class AdminController {

    

    @GetMapping("/dashboard") // inicio de administrador
    public String dashboard(Model model) {
        return "dashboard"; 
    }

    
}