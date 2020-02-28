package com.storyart.userservice.service;

import com.storyart.userservice.model.User;
import com.storyart.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * 26/2 ref from pro userController
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;


    @Override
    public void create(User us) {
        userRepository.save(us);

    }

    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public void deActive(Integer id) {
        Optional<User> byId = userRepository.findById(id);

        if(byId.isPresent()){
            User user = byId.get();user.setActive(false);
            userRepository.save(user);
        }
    }

    @Override
    public void active(Integer uid) {
        Optional<User> byId = userRepository.findById(uid);

        if(byId.isPresent()){
            User user = byId.get();user.setActive(true);
            userRepository.save(user);
        }
    }

    @Override
    public void update(User us) {
        User save = userRepository.save(us);
    }

    //todo mark role_ to above method


    @Secured("ROLE_ADMIN")
    @Override
    public List<User> findAll() {

        List<User> userList = userRepository.findAll();
        return userList;
    }

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @Override
    public User findById(Integer id) {

        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }
    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @Override
    public User findByUsername(String username) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
/*
    public T orElse(T var1) {
        return this.value != null ? this.value : var1;
    }*/
        return optionalUser.orElse(null);

    }
//todo add admin user method



}
