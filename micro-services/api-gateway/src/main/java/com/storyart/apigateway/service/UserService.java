package com.storyart.apigateway.service;

import com.storyart.apigateway.model.User;

public interface UserService {


    User findById(Integer id);

    User findByUsername(String username);


    User findByEmail(String email);


}