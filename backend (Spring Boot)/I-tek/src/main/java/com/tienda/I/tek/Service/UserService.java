package com.tienda.I.tek.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.UserRepository;

@Service
public class UserService  implements IUserService{

    @Autowired
    private UserRepository UserRepo; 

    @Autowired
    private CartRepository cartRepo;


	@Override
	public List<User> listUser() {
        return UserRepo.findAll();
        
	}


	@Override
    public User idUser(Long id) {
    return UserRepo.findById(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado con el ID: " + id));
}



	@Override
	public void saveUser(User user) {
	    UserRepo.save(user);

        Cart cart = new Cart();
        cart.setUsuario(user);  

        cartRepo.save(cart);
    }


	@Override
	public void updateUser(User user) {
        User existingUser = UserRepo.findById(user.getId()).orElse(null);
        if (existingUser != null) {
            existingUser.setNombre(user.getNombre());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            existingUser.setDireccion(user.getDireccion());
            existingUser.setTelefono(user.getTelefono());
            existingUser.setRol(user.getRol());
            existingUser.setFechaRegistro(user.getFechaRegistro());
            UserRepo.save(existingUser);
        }
    }


	@Override
	public void deleteUser(Long id) {
       UserRepo.deleteById(id);
    }

}
