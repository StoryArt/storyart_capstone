package com.storyart.userservice.controller;

import com.storyart.userservice.exception.AppException;
import com.storyart.userservice.model.Role;
import com.storyart.userservice.model.RoleName;
import com.storyart.userservice.repository.RoleRepository;
import com.storyart.userservice.security.JwtTokenProvider;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.ApiResponse;
import com.storyart.userservice.payload.JwtAuthenticationResponse;
import com.storyart.userservice.payload.LoginRequest;
import com.storyart.userservice.payload.SignUpRequest;
import com.storyart.userservice.repository.UserRepository;
import com.storyart.userservice.security.JwtUserDetailsService;
import com.storyart.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class JwtAuthenticationController {


    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    RoleRepository roleRepository;


    /**
     * above is demo
     * 10:57 PM 27/2/2020 add sign in an sign up api
     */


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUserName(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }


    @Autowired
    UserService userService;
    @Autowired
    JwtUserDetailsService jwtUserDetailsService;


    @Autowired
    PasswordEncoder passwordEncoder;


    @Autowired
    UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userService.findByUsername(signUpRequest.getUsername()) != null) {
            return new ResponseEntity<>(new ApiResponse(false,
                    "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User();
        user.setGender(signUpRequest.getGender());
        user.setActive(true);
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));


//        Role userRole
        //todo : missing role of a user
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));


        /**
         *  Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
         *                 .orElseThrow(() -> new AppException("User Role not set."));
         *
         *         user.setRoles(Collections.singleton(userRole));*/


        User savedUser = userRepository.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/v1/user/username")
                .buildAndExpand(savedUser.getUsername()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));

    }


}
