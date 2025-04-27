package com.tienda.I.tek.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5174")  // Permite solicitudes desde React
public class AdminController {

    @GetMapping("/dashboard")
    public ResponseEntity<?> adminDashboard() {
        // Devuelve información sobre el dashboard del admin
        return ResponseEntity.ok("Dashboard Admin");
    }

    
}