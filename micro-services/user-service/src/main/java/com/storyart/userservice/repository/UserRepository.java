package com.storyart.userservice.repository;

import com.storyart.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

   User findByUsername(String username);
}
