package edu.project.iago.Proyecto.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.project.iago.Proyecto.Repository.UserRepository;
import edu.project.iago.Proyecto.entities.User;

@Service
public class UserService implements IUser{

    @Autowired
    private UserRepository userRepo;

    @Override // lista Usuarios
    public List<User> listausuarios() {
        return userRepo.findAll();
    }

	@Override  // buscar usuario por id 
    public User Userid(Long id) {
    return userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

	@Override // crear Usuario
	public User CreateUser(User createusuario) {
		return userRepo.save(createusuario);
	}

    @Override // actualizar User
    public User UpdateUser(Long id, User usuario) {
    return userRepo.findById(id)
            .map(existingUser -> {
                // Actualizar los campos con los valores
                existingUser.setUsername(usuario.getUsername());
                existingUser.setEmail(usuario.getEmail());
                existingUser.setTelefono(usuario.getTelefono());
                existingUser.setDireccion(usuario.getDireccion());
                existingUser.setRol(usuario.getRol());

                return userRepo.save(existingUser);
            })
            .orElseThrow();
}

    @Override // Delete User
    public void Deleteid(Long deleteusuario) {
         userRepo.deleteById((long) deleteusuario);
         System.out.println("Usuario ha sido eliminado");
    }   




    // METODOS DE CONTROLLER USER MVC 


    //UPDATE USER
    public void editarUsuario(Long id, User user) {
        User usuarioExistente = userRepo.findById(id).orElseThrow(RuntimeException::new);

        
        //set all properties
        usuarioExistente.setUsername(user.getUsername());
        usuarioExistente.setEmail(user.getEmail());
        usuarioExistente.setTelefono(user.getTelefono());
        usuarioExistente.setDireccion(user.getDireccion());
        usuarioExistente.setRol(user.getRol()); // update rol
        
        userRepo.save(usuarioExistente); // save changes
    }


    //CREATE USER
    public void crearUsuario(User user){
        userRepo.save(user);  // guardar el usuario 
    }
}