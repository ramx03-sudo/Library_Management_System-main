package com.lms.LibraryManagementSystem.Repositories;

import com.lms.LibraryManagementSystem.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository <Users, Integer>{
    public Users findByEmail(String email);
    public Users findByName(String name);
}
