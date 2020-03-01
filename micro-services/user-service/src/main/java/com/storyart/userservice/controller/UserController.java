package com.storyart.userservice.controller;

import com.storyart.userservice.exception.ResourceNotFoundException;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.ApiResponse;
import com.storyart.userservice.payload.UserProfile;
import com.storyart.userservice.payload.UserSummary;
import com.storyart.userservice.security.CurrentUser;
import com.storyart.userservice.security.UserPrincipal;
import com.storyart.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * ref from usercontroller
 */


@RestController
@RequestMapping("/api/v1/user")
public class UserController {


    @Autowired
    UserService userService;


    @GetMapping("/{uid}")
    public UserProfile get(@PathVariable("uid") Integer uid) {
        User user = userService.findById(uid);
        UserProfile userProfile = new UserProfile();

        if (user == null) {
            throw new ResourceNotFoundException("User", "id", uid);
        } else {
            userProfile.setName(user.getName());
            userProfile.setUsername(user.getUsername());
            userProfile.setEmail(user.getEmail());
            userProfile.setJoinAt(user.getCreatedAt());
        }
        return userProfile;

    }


    //todo return profile of user, not all data
    @GetMapping(value = "/username/{username}")
    public UserProfile findByUsername(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        UserProfile userProfile = new UserProfile();

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", username);
        } else {
            userProfile.setName(user.getName());
            userProfile.setUsername(user.getUsername());
            userProfile.setEmail(user.getEmail());
            userProfile.setJoinAt(user.getCreatedAt());
        }
        return userProfile;
    }

    @GetMapping(value = "/me")
    public UserSummary currentUser(@CurrentUser UserPrincipal userPrincipal) {
        return new UserSummary(userPrincipal.getId(), userPrincipal.getUsername(), userPrincipal.getName());
    }


    /**
     * No need jsonobject cause of restcontroller, just return pojo object
     */


    //todo : what is @Valid
    @PutMapping(value = "/{uid}")
    public User update(@PathVariable("uid") Integer uid, @RequestBody @Valid User user, @CurrentUser UserPrincipal userPrincipal) {
        User userById = userService.findById(uid);
        if (userById == null) {
            throw new ResourceNotFoundException("User", "id", uid);
        }
        if (userPrincipal.getUsername().equals(userById.getUsername())) {
            userService.update(user);
        }
        return userService.findById(uid);
    }

//    //todo what is responseEntity
//    //response status of user deleted,
//    @DeleteMapping(value = "/{uid}")
//    public ResponseEntity<Boolean> delete(@PathVariable("uid") Integer uid) {
//        userService.delete(uid);
//        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
//    }


    //Response posted user
    @PostMapping
    public User register(@RequestBody @Valid User user) {
        userService.create(user);
        return user;
    }

    // todo missing check available user (is active or not api)
    /* Deactivating a user without checking it deactived or not */
    @DeleteMapping(value = "/{uid}")
    public ResponseEntity<?> activate(@PathVariable Integer uid, @Param(value = "setActive") boolean setActive) {
        //this user must being active and param: setActive=false
        if (!setActive) {
            userService.deActive(uid);
            return new ResponseEntity<>(new ApiResponse(true, " Account deactivated successfully!"), HttpStatus.OK);

        } else {
            userService.active(uid);
            return new ResponseEntity<>(new ApiResponse(true, "Account activated successfully!"), HttpStatus.OK);

        }

    }


}
