package com.storyart.userservice.controller;

import com.storyart.userservice.model.User;
import com.storyart.userservice.repository.UserRepository;
import com.storyart.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * ref from usercontroller
 */


@RestController
@RequestMapping("/api/v1/user")
public class UserController {


    @Autowired
    UserService userService;

    @GetMapping("/{uid}")
    public User get(@PathVariable("uid") Integer uid) {
        return userService.findById(uid);
    }

    /**
     * No need jsonobject cause of restcontroller, just return pojo object
     */
    @GetMapping
    public List<User> list() {
        List<User> userList = userService.findAll();
        return userList;
    }

    //todo : what is @Valid
    @PutMapping(value = "/{uid}")
    public User update(@PathVariable("uid") Integer uid, @RequestBody @Valid User user) {

        userService.update(user);
        return userService.findById(uid);
    }

    //todo what is responseEntity
    //response status of user deleted,
    @DeleteMapping(value = "/{uid}")
    public ResponseEntity<Boolean> delete(@PathVariable("uid") Integer uid) {
        userService.delete(uid);
        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
    }


    //Response posted user
    @PostMapping
    public User create(@RequestBody @Valid User user) {
        userService.create(user);
        return user;
    }


}
