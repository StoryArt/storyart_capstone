package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
