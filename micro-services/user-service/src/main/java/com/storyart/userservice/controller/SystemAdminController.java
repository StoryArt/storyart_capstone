package com.storyart.userservice.controller;


import com.storyart.userservice.exception.AppException;
import com.storyart.userservice.model.Role;
import com.storyart.userservice.model.RoleName;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.ApiResponse;
import com.storyart.userservice.payload.SignUpRequest;
import com.storyart.userservice.repository.RoleRepository;
import com.storyart.userservice.repository.UserRepository;
import com.storyart.userservice.security.CurrentUser;
import com.storyart.userservice.security.UserPrincipal;
import com.storyart.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.HashSet;

@RestController
@RequestMapping("/api/v1/systemad")
@Secured({"ROLE_SYSTEM_ADMIN"})
public class SystemAdminController {


    @Autowired
    UserRepository userRepository;


    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @PostMapping
    public ResponseEntity<?> createAdminAccount(@RequestBody @Valid SignUpRequest signUpRequest) {


        if (userService.findByUsername(signUpRequest.getUsername()) != null) {
            return new ResponseEntity<>(new ApiResponse(false,
                    "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setGender(signUpRequest.getGender());
        user.setActive(true);
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());

//        Role userRole
        //todo : missing role of a user
        Role userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new AppException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));
        User savedUser = userRepository.save(user);
        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/v1/user/username")
                .buildAndExpand(savedUser.getUsername()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "Administrator created successfully"));

    }
    //todo change role of user
// todo; not allow admin to set active of sysadmin
    //todo: update data and login with email
//todo: check lai n-n user vs role?!
}
