package com.tienda.I.tek.ControllerRest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.security.crypto.password.PasswordEncoder;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Enumerated.Rol;
import com.tienda.I.tek.Model.LoginRequest;
import com.tienda.I.tek.Model.RegisterRequest;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Secutiry.JwtTokenProvider;

import org.springframework.security.authentication.BadCredentialsException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5174") // Permite peticiones desde React
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository UserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;  // Inyectamos JwtTokenProvider

    @Autowired
    private CartRepository cartRepository; // Inyectamos el repositorio de Carrito

    // Endpoint para login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );
    
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
    
            // Obtener el objeto UserDetails
                 org.springframework.security.core.userdetails.User user = 
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
    
            // Buscar el usuario en la base de datos usando el email (o algún otro identificador único)
            User userFromDb = UserRepo.findByEmail(user.getUsername()).orElseThrow(() -> 
                new RuntimeException("Usuario no encontrado"));
    
            // Recuperamos el nombre del usuario y el rol
            String nombre = userFromDb.getNombre();  // Usamos el nombre desde la entidad 'User'
            String role = user.getAuthorities().stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse("USER");
    
            // Generar el token JWT
            String token = jwtTokenProvider.generateToken(UserRepo.findByEmail(user.getUsername()).orElseThrow(() -> 
            new RuntimeException("Usuario no encontrado")));
        
        // Mapear la respuesta
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login exitoso");
        response.put("role", role);
        response.put("nombre", nombre);  // Aquí estás enviando el nombre
        response.put("token", token);    // Y aquí el token
        
        return ResponseEntity.ok(response);
    
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        } catch (Exception e) {
            e.printStackTrace();  // Imprimir el error completo
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error en el servidor: " + e.getMessage());
        }
    }





    // Endpoint de registro de usuarios
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Datos recibidos: ");
        System.out.println("Email: " + registerRequest.getEmail());
        System.out.println("Nombre: " + registerRequest.getNombre());
        System.out.println("Telefono: " + registerRequest.getTelefono());
    
        // Comprobar si ya existe un usuario con ese correo
        if (UserRepo.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo ya registrado");
        }
    
        // Crear un nuevo usuario
        User newUser = new User();
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Encriptar la contraseña
        newUser.setNombre(registerRequest.getNombre());
        newUser.setTelefono(registerRequest.getTelefono());
        newUser.setRol(Rol.USER); // Asignar un rol por defecto (usuario registrado)
    
        // Guardar el usuario en la base de datos
        UserRepo.save(newUser);

        // Crear un carrito para el nuevo usuario
        Cart newCart = new Cart();
        newCart.setUsuario(newUser);  // Asocia el carrito al usuario

        cartRepository.save(newCart); // GUARDAR EL CARRITO EN LA BASE DE DATOS

    
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado con éxito");
    }
}
