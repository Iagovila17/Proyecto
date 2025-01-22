package edu.project.iago.Proyecto.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.project.iago.Proyecto.Repository.UserRepository;
import edu.project.iago.Proyecto.entities.User;

@Service
public class UserService implements IUser{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAllUsers() {
        throw new UnsupportedOperationException("Unimplemented method 'getAllUsers'");
    }

    
}