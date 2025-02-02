package edu.project.iago.Proyecto.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import edu.project.iago.Proyecto.Enumerated.Rol;
import edu.project.iago.Proyecto.Service.UserService;
import edu.project.iago.Proyecto.entities.User;


@Controller
@RequestMapping("/usuarios")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping // Ruta del puerto http://localhost:8080/usuarios/lista
    public String mostrarUser() {
        return "User"; // nombre de la pagina html en este caso User.html
    }

    @GetMapping("/lista") // Ruta del puerto http://localhost:8080/usuarios 
    public String listarUsuarios(Model model) {
        List<User> users = userService.listausuarios(); 
        model.addAttribute("users", users);
        return "User";
    }
    



    @GetMapping("/editar/{id}")  // Ruta para editar un usuario por su ID
    public String formularioUpdate(@PathVariable("id") Long id, Model model) {
        User user = userService.Userid(id); // Obtener usuario por ID
        model.addAttribute("user", user);
        model.addAttribute("roles", Rol.values()); // Obtener todos los valores del enum Rol
        return "EditarUser"; // Vista para editar el usuario
    }

     // Ruta para guardar los cambios del usuario
    @PostMapping("/editar/{id}")
    public String editarUsuario(@PathVariable("id") Long id, @RequestParam("nombre") String nombre, @RequestParam("email") String email, @RequestParam("telefono") int tlf, @RequestParam("direccion") String direccion, @RequestParam("rol") Rol rol) {
    User user = userService.Userid(id); // Busca el usuario por ID
    if (user != null) {
        // Actualizar user. Se setea cada propiedad del usuario
        user.setUsername(nombre);
        user.setEmail(email);
        user.setTelefono(tlf);
        user.setDireccion(direccion);
        user.setRol(rol);
        userService.CreateUser(user);
    }
    return "redirect:/usuarios/lista"; // Redirige a la lista de usuarios  http://localhost:8080/usuarios/lista
}



    //CREATE USER
    @GetMapping("/create")
    public String formularioCreate(Model model) {
        model.addAttribute("roles", Rol.values()); // Pasar los roles posibles al formulario
        model.addAttribute("user", new User()); // Crear un nuevo objeto User para el formulario
        return "createUser"; // Retorna el nombre del archivo HTML
    }

    // Método para crear un usuario
    @PostMapping("/create")
    public String createUsuario(@ModelAttribute User user, BindingResult result, Model model) {   
        userService.crearUsuario(user); // save new user 

        return "redirect:/usuarios/lista"; // Redirigir a la lista de usuarios
    }
    
}
