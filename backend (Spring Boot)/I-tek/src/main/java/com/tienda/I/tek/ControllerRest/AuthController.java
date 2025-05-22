package com.tienda.I.tek.ControllerRest;

import java.time.LocalDateTime;
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

import java.time.OffsetDateTime;

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
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail().trim(), request.getPassword())
        );
    
        User user = userRepo.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
    
        String token = jwtTokenProvider.generateToken(user);
        Map<String, Object> response = new HashMap<>();
        response.put("nombre", user.getNombre());  
        response.put("email", user.getEmail());   
        response.put("telefono", user.getTelefono()); 
        response.put("id", user.getId());   
        response.put("direccion", user.getDireccion()); 
        response.put("role", user.getRol().name()); 
        response.put("token", token);  
        return ResponseEntity.ok(response);
    }



   

@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
    System.out.println("Datos recibidos: ");
    System.out.println("Email: " + registerRequest.getEmail());
    System.out.println("Nombre: " + registerRequest.getNombre());
    System.out.println("Telefono: " + registerRequest.getTelefono());
    System.out.println("FechaRegistro: " + registerRequest.getFechaRegistro());

    if (userRepo.existsByEmail(registerRequest.getEmail())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo ya registrado");
    }

    User newUser = new User();
    newUser.setEmail(registerRequest.getEmail());
    newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    newUser.setNombre(registerRequest.getNombre());
    newUser.setTelefono(registerRequest.getTelefono());
    newUser.setRol(Rol.USER);

    if (registerRequest.getFechaRegistro() != null && !registerRequest.getFechaRegistro().isEmpty()) {
        OffsetDateTime odt = OffsetDateTime.parse(registerRequest.getFechaRegistro());
        LocalDateTime ldt = odt.toLocalDateTime();
        newUser.setFechaRegistro(ldt);
    } else {
        newUser.setFechaRegistro(LocalDateTime.now());
    }

    User savedUser = userRepo.save(newUser);

    Cart newCart = new Cart();
    newCart.setUsuario(savedUser);
    cartRepository.save(newCart);

    String token = jwtTokenProvider.generateToken(savedUser);

    Map<String, String> response = new HashMap<>();
    response.put("token", token);
    response.put("email", savedUser.getEmail());
    response.put("nombre", savedUser.getNombre());

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
}

}
