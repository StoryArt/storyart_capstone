package com.storyart.commentservice.repository;

import com.storyart.commentservice.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findRoleById(Integer id);
}
