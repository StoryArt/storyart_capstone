package com.storyart.userservice.controller;

import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.ApiResponse;
import com.storyart.userservice.repository.UserRepository;
import com.storyart.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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


    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping("/{uid}")
    public User get(@PathVariable("uid") Integer uid) {
        return userService.findById(uid);
    }


    @Secured({"ROLE_ADMIN", "ROLE_USER"})
    @GetMapping(value = "/username/{username}")
    public User findByUsername(@PathVariable("username") String username) {
        return userService.findByUsername(username);
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
    // todo missing check avaiable user (is active or not api)
    /* Deactivating a user without checking it deactived or not */
    @PostMapping(value = "/{uid}")
    public ResponseEntity<?> activate(@PathVariable Integer uid, @Param(value = "setActive") boolean setActive) {
        //this user must being active and param: setActive=false
        if (!setActive) {
            userService.deActive(uid);
            return new ResponseEntity(new ApiResponse(true, " Account deactivated successfully!"), HttpStatus.OK);

        } else {
            userService.active(uid);
            return new ResponseEntity(new ApiResponse(true, "Account activated successfully!"), HttpStatus.OK);

        }

    }


}
