package com.tienda.I.tek.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;


import com.tienda.I.tek.Repository.UserRepository;

import org.springframework.ui.Model;


@Controller
@RequestMapping("/admin")
public class AdminController {

 @Autowired
    private UserRepository UserRepository;

    @GetMapping("/dashboard") // inicio de administrador
    public String dashboard(Model model) {
        return "dashboard"; 
    }

    
}