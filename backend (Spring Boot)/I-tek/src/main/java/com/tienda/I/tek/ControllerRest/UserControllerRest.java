package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.Rol;
import com.tienda.I.tek.Service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/User")
public class UserControllerRest {

    @Autowired
    private UserService userServi; 

    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> listUser() {
        return userServi.listUser();  
    }
    
    @GetMapping("/{id}")
    public User idUser(@PathVariable("id")Long id) {
        return userServi.idUser(id);
    }
    
    @PostMapping("/save")
    public void saveUser(User user) {
        userServi.saveUser(user);
    }

    @PutMapping("/updateRole/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Long id, @RequestBody Rol nuevoRol) {
        boolean actualizado = userServi.updateUserRole(id, nuevoRol);
        if (actualizado) {
            return ResponseEntity.ok("Rol actualizado correctamente");
        } else {
            return ResponseEntity.badRequest().body("Usuario no encontrado");
        }
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable("id")Long id) {
        userServi.deleteUser(id);
    }

}

