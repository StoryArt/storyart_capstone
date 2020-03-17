package com.storyart.apigateway.repository;

import com.storyart.apigateway.common.constants.RoleName;
import com.storyart.apigateway.model.Role;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    Optional<Role> findRoleByName(RoleName name);

    Optional<Role> findRoleById(Integer id);



}
