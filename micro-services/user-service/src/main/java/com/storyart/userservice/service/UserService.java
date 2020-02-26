package com.storyart.userservice.service;

import com.storyart.userservice.model.User;

import java.util.List;

public interface UserService {
    void create(User us);

    void update(User us);

    void delete(Integer id);

    List<User> findAll();

    User findById(Integer id);


    User findByUsername(String username);
}
