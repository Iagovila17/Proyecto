package edu.project.iago.Proyecto.ControllerRest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.project.iago.Proyecto.Service.UserService;
import edu.project.iago.Proyecto.entities.User;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/user")
public class UserControllerRest {

    @Autowired
    private UserService userService;


    // implementacion del CRUD


    // R
    @GetMapping("/all")
    public List<User> getUsers() {
        return userService.listausuarios();
    }  

    // R
    @GetMapping("/{id}")   
    public User Userid(@PathVariable("id") Long usuarioid) {
        return userService.Userid(usuarioid);  
    }

    // C
    @PostMapping("/create")
    public User CreateUser(@RequestBody User createusuario) {
        return userService.CreateUser(createusuario);
    }

    // U
    @PutMapping("/update/{id}")
    public User UpdateUser(@PathVariable Long id,@RequestBody User usuario) {
        return userService.UpdateUser(id, usuario);
    }
    
    //D 
    @DeleteMapping("/delete/{id}")
    public String Deleteid(@PathVariable("id") Long deleteusuario){
        userService.Deleteid(deleteusuario);
        return null;
    }
        
    
}
