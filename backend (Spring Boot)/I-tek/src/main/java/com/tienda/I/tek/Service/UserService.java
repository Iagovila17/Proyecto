package com.tienda.I.tek.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.DTO.UserDto;
import com.tienda.I.tek.Entities.Cart;
import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.CartRepository;
import com.tienda.I.tek.Repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService implements IUserService{

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


    @Transactional
    public void deleteUser(Long id) {
        UserRepo.deleteById(id);
    }


    @Override
    public List<UserDto> listUserDto() {
         List<User> users = UserRepo.findAll();
        // Transformamos cada usuario en un UserDTO
        return users.stream()
                    .map(user -> new UserDto())
                    .collect(Collectors.toList());
    }

}
