package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/User")
public class UserControllerRest {

    @Autowired
    private UserService userServi; 

    @GetMapping("/list")
    public List<User> listUser() {
    return userServi.listUser();
    }

    @GetMapping("/{id}")
    public User idUser(@PathVariable("id")Long id) {
        return userServi.idUser(id);
    }
    
    @GetMapping("/save")
    public void saveUser(User user) {
        userServi.saveUser(user);
    }

    @GetMapping("/update")
    public void updateUser(User user) {
        userServi.updateUser(user);
    }

    @GetMapping("/delete/{id}")
    public void deleteUser(@PathVariable("id")Long id) {
        userServi.deleteUser(id);
    }
    
}

