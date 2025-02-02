package edu.project.iago.Proyecto.Service;

import java.util.List;

import edu.project.iago.Proyecto.entities.User;

public interface IUser {

    public List<User> listausuarios(); // lista de usuarios
    public User Userid(Long id); // buscar por id 
    public User CreateUser(User createusuario); // crear usuario
    public User UpdateUser(Long id, User usuario); // actualizar usuario
    public void Deleteid(Long deleteusuario); // eliminar usuario por id
}
