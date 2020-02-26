package com.storyart.userservice.service;

import com.storyart.userservice.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {


    @Autowired
    UserService userService;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User byUsername = userService.findByUsername(username);
        if(byUsername!= null){
            String encodedPassword= passwordEncoder.encode(byUsername.getPassword());
            return new org.springframework.security.core.userdetails.User(byUsername.getUsername(), encodedPassword, new ArrayList<>());
        }else{
            throw new UsernameNotFoundException("Username not found");
        }
    }
}
