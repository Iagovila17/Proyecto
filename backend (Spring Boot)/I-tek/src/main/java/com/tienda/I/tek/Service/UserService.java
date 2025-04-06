package com.tienda.I.tek.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.I.tek.Entities.User;
import com.tienda.I.tek.Repository.UserRepository;

@Service
public class UserService  implements IUserService{

    @Autowired
    private UserRepository UserRepo; 


	@Override
	public List<User> listUser() {
        return UserRepo.findAll();
        
	}

}
