package com.storyart.userservice.service;

import com.storyart.userservice.model.User;
import com.storyart.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<User> findAll() {

        List<User> userList = userRepository.findAll();
        return userList;
    }

    @Override
    public User findById(Integer id) {

        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

    @Override
    public User findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user;

    }

    @Override
    public void update(User us) {
        User save = userRepository.save(us);
    }
}
