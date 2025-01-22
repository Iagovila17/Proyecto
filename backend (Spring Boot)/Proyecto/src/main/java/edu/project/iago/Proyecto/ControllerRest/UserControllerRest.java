package edu.project.iago.Proyecto.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.project.iago.Proyecto.Service.UserService;
import edu.project.iago.Proyecto.entities.User;

@RestController
@RequestMapping("user")
public class UserControllerRest {

    @Autowired
    private UserService userService;

    // @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}
