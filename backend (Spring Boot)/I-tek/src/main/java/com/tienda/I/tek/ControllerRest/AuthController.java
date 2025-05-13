package com.tienda.I.tek.ControllerRest;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
import com.tienda.I.tek.Repository.PasswordResetRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Secutiry.CustomUserDetailsService;
import com.tienda.I.tek.Secutiry.JwtTokenProvider;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://192.168.68.100:5174") // Permite peticiones desde React
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetRepository passwordResetRepository;

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final CartRepository cartRepository;
    private final CustomUserDetailsService userDetailsService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          CustomUserDetailsService userDetailsService,
                          UserRepository userRepo,
                          PasswordEncoder passwordEncoder,
                          CartRepository cartRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userDetailsService = userDetailsService;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.cartRepository = cartRepository;
    }

    // Endpoint para login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Autenticación del usuario
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail().trim(), request.getPassword())
        );
    
        // Buscar al usuario en la base de datos
        User user = userRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    
        // Generar el token JWT
        String token = jwtTokenProvider.generateToken(user);
    
        // Crear la respuesta con los datos del usuario y el token
        Map<String, Object> response = new HashMap<>();
        response.put("nombre", user.getNombre());  // Nombre del usuario
        response.put("email", user.getEmail());    // Email del usuario
        response.put("telefono", user.getTelefono()); // Teléfono del usuario
        response.put("id", user.getId());          // ID del usuario
        response.put("direccion", user.getDireccion()); // ID del carrito del usuario
        response.put("role", user.getRol().name());  // Rol del usuario
        response.put("token", token);  // El token JWT generado
    
        // Devolver la respuesta con los datos
        return ResponseEntity.ok(response);
    }



    // Endpoint de registro de usuarios
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("Datos recibidos: ");
        System.out.println("Email: " + registerRequest.getEmail());
        System.out.println("Nombre: " + registerRequest.getNombre());
        System.out.println("Telefono: " + registerRequest.getTelefono());
    
        // Comprobar si ya existe un usuario con ese correo
        if (userRepo.existsByEmail(registerRequest.getEmail())) {
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
        userRepo.save(newUser);

        // Crear un carrito para el nuevo usuario
        Cart newCart = new Cart();
        newCart.setUsuario(newUser);  // Asocia el carrito al usuario

        cartRepository.save(newCart); // GUARDAR EL CARRITO EN LA BASE DE DATOS

    
        return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado con éxito");
    }




}
