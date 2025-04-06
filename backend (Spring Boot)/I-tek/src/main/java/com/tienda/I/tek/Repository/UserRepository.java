package com.tienda.I.tek.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tienda.I.tek.Entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
