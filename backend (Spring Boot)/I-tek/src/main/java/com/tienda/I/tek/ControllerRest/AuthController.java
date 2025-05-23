package com.tienda.I.tek.ControllerRest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tienda.I.tek.Entities.Cart;

import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Entities.ValidationToken;
import com.tienda.I.tek.Enumerated.Rol;
import com.tienda.I.tek.Model.LoginRequest;
import com.tienda.I.tek.Model.RegisterRequest;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.PasswordResetRepository;
import com.tienda.I.tek.Repository.UserRepository;
import com.tienda.I.tek.Repository.VerificationTokenRepository;
import com.tienda.I.tek.Secutiry.CustomUserDetailsService;
import com.tienda.I.tek.Secutiry.JwtTokenProvider;
import com.tienda.I.tek.Service.EmailService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.OffsetDateTime;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://192.168.68.100:5174") // Permite peticiones desde React
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @Autowired
    private VerificationTokenRepository validationTokenRepo;

    @Autowired
    private EmailService emailSenderService;


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
    User user = userRepo.findByEmail(request.getEmail())
        .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

    if (!user.isEnabled()) {
        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body("Cuenta no confirmada. Por favor, revisa tu correo para confirmar el registro.");
    }

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(request.getEmail().trim(), request.getPassword())
    );

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
public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest, HttpServletRequest request) {
    if (userRepo.existsByEmail(registerRequest.getEmail())) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Correo ya registrado");
    }

    User newUser = new User();
    newUser.setEmail(registerRequest.getEmail());
    newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    newUser.setNombre(registerRequest.getNombre());
    newUser.setTelefono(registerRequest.getTelefono());
    newUser.setRol(Rol.USER);
    newUser.setEnabled(false); // importante: deshabilitado hasta confirmar email

    if (registerRequest.getFechaRegistro() != null && !registerRequest.getFechaRegistro().isEmpty()) {
        OffsetDateTime odt = OffsetDateTime.parse(registerRequest.getFechaRegistro());
        LocalDateTime ldt = odt.toLocalDateTime();
        newUser.setFechaRegistro(ldt);
    } else {
        newUser.setFechaRegistro(LocalDateTime.now());
    }

    User savedUser = userRepo.save(newUser);

    // Crear carrito para el nuevo usuario
    Cart newCart = new Cart();
    newCart.setUsuario(savedUser);
    cartRepository.save(newCart);

    // Generar token de confirmación
    String token = UUID.randomUUID().toString();
    ValidationToken validationToken = new ValidationToken(token, savedUser);
    validationTokenRepo.save(validationToken);

    // Construir enlace al frontend
    String confirmationUrl = buildFrontendUrl(request) + "/confirmar-cuenta?token=" + token;


    // Enviar email con enlace de confirmación
    String message = "Hola " + savedUser.getNombre() + ",\n\n"
            + "Por favor confirma tu registro haciendo clic en el siguiente enlace:\n"
            + confirmationUrl + "\n\nGracias.";
    emailSenderService.sendEmail(savedUser.getEmail(), "Confirmación de Registro", message);

    return ResponseEntity.status(HttpStatus.CREATED).body("Usuario registrado. Por favor revisa tu email para confirmar la cuenta.");
}


@GetMapping("/confirm")
public void confirmUser(@RequestParam("token") String token, HttpServletRequest request, HttpServletResponse response) throws IOException {
    ValidationToken validationToken = validationTokenRepo.findByToken(token);
    if (validationToken == null || validationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
        String redirectUrl = buildFrontendUrl(request) + "/error-confirm";
        response.sendRedirect(redirectUrl);
        return;
    }

    User user = validationToken.getUser();
    user.setEnabled(true);
    userRepo.save(user);
    validationTokenRepo.delete(validationToken);

    String jwt = jwtTokenProvider.generateToken(user);

    String redirectUrl = buildFrontendUrl(request) + "/inicio?token=" + jwt;
    response.sendRedirect(redirectUrl);
}

private String buildFrontendUrl(HttpServletRequest request) {
    String serverName = request.getServerName();
    if ("localhost".equals(serverName)) {
        return "http://localhost:5173";
    } else if ("192.168.68.100".equals(serverName)) {
        return "http://192.168.68.100:5174";
    } else {
        return "http://" + serverName + ":5173";
    }
}



}
