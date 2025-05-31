package com.tienda.I.tek.Service;

import java.util.List;

import com.tienda.I.tek.DTO.UserDto;
import com.tienda.I.tek.Entities.User;

public interface IUserService {

    // REST
    public List<User> listUser();
    public User idUser(Long id);
    public void saveUser(User user);
    public void updateUser(User user);
    public void deleteUser(Long id);
    
    //DTO
    public List<UserDto> listUserDto();
    

}
