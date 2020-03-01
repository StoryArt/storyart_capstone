package com.storyart.userservice.service;

import com.storyart.userservice.exception.ResourceNotFoundException;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.PagedResponse;
import com.storyart.userservice.payload.UserProfile;
import com.storyart.userservice.payload.UserSummary;
import com.storyart.userservice.security.UserPrincipal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface UserService {


    void create(User us);

    void update(User us);

    void delete(Integer id);

    void deActive(Integer id);


    List<User> findAll();

    User findById(Integer id);

    User findByUsername(String username) ;

    void active(Integer uid);



    PagedResponse<User> getAllUser(UserPrincipal userPrincipal, int page, int size);

    PagedResponse<User> findByUsernameLike( int page, int size ,String search);
}
