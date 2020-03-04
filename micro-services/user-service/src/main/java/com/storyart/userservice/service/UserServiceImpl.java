package com.storyart.userservice.service;

import com.storyart.userservice.exception.BadRequestException;
import com.storyart.userservice.exception.ResourceNotFoundException;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.PagedResponse;
import com.storyart.userservice.payload.UserProfile;
import com.storyart.userservice.payload.UserSummary;
import com.storyart.userservice.repository.UserRepository;
import com.storyart.userservice.security.UserPrincipal;
import com.storyart.userservice.util.AppContants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * 26/2 ref from pro userController
 */
@Service
public class UserServiceImpl implements UserService {


    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public void create(User us) {

        us.setPassword(passwordEncoder.encode(us.getPassword()));

        userRepository.save(us);

    }

    @Override
    public void delete(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public void deActive(Integer id) {
        Optional<User> byId = userRepository.findById(id);

        if (byId.isPresent()) {
            User user = byId.get();
            user.setActive(false);
            userRepository.save(user);
        }
    }

    @Override
    public void active(Integer uid) {
        Optional<User> byId = userRepository.findById(uid);

        if (byId.isPresent()) {
            User user = byId.get();
            user.setActive(true);
            userRepository.save(user);
        }
    }


    //this used for search user of admin and sysadmin.
    // data responsed depend on T of PageResponse
    @Override
    public PagedResponse<User> getAllUser(UserPrincipal userPrincipal, int page, int size) {
        validatePageNumberAndSize(page, size);


        //
        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        //dưa paging vào repo để láy dữ liệu
        Page<User> users = userRepository.findAll(pageable);

        if (users.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), users.getNumber(),
                    users.getSize(), users.getTotalElements(),
                    users.getTotalPages(), users.isLast());


        } else {
            List<User> userList = new ArrayList<>();
            for (User us : users) {
                userList.add(us);
            }
            return new PagedResponse<>(userList, users.getNumber(),
                    users.getSize(), users.getTotalElements(),
                    users.getTotalPages(), users.isLast());

        }


    }

    @Override
    public PagedResponse<User> findByUsernameLike(int page, int size, String search) {
        validatePageNumberAndSize(page, size);


        Pageable pageable = PageRequest.of(page, size, Sort.Direction.ASC, "username");

        Page<User> userPage = userRepository.findByUsernameLike(pageable, search);

        List<User> users = userPage.toList();

        return new PagedResponse<>(users, userPage.getNumber(), userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages(), userPage.isLast());

    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Page number cannot be zero");
        }

        if (size > AppContants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size cannot be greater than " + AppContants.MAX_PAGE_SIZE);

        }


    }

    @Override
    public void update(User us) {
        userRepository.save(us);
    }

    //todo mark role_ to above method


    @Override
    public List<User> findAll() {

        return userRepository.findAll();
    }

    //    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @Override
    public User findById(Integer id) {

        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    //    @Secured({"ROLE_USER", "ROLE_ADMIN"})
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
