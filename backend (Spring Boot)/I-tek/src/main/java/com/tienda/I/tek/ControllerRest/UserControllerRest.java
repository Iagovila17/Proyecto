package com.tienda.I.tek.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Service.UserService;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/User")
public class UserControllerRest {

    @Autowired
    private UserService userServi; 

    @GetMapping("/list")
    public List<User> listUser() {
    return userServi.listUser();
    }
    
}
