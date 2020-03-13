package com.storyart.userservice.controller;

import com.storyart.userservice.exception.ResourceNotFoundException;
import com.storyart.userservice.exception.UnauthorizedException;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.*;
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
@CrossOrigin
public class UserController {


    @Autowired
    UserService userService;


    @GetMapping("/{uid}")
    public UserProfileResponse get(@PathVariable("uid") Integer uid) {
        User user = userService.findById(uid);
        UserProfileResponse userProfileResponse = new UserProfileResponse();

        if (user == null) {
            throw new ResourceNotFoundException("User", "id", uid);
        } else {
            userProfileResponse.setName(user.getName());
            userProfileResponse.setUsername(user.getUsername());
            userProfileResponse.setEmail(user.getEmail());
            userProfileResponse.setJointAt(user.getCreatedAt());
        }
        return userProfileResponse;

    }



//    @GetMapping("/user/mystories")
//    public UserStoriesProfile getMyUserProfileAndStory(@CurrentUser UserPrincipal userPrincipal) {
//
//        User user = userService.findById(        userPrincipal.getId());
//        UserStoriesProfile userStoriesProfile = new UserStoriesProfile();
//
//        if (user == null) {
//            throw new ResourceNotFoundException("User", "id", userPrincipal.getId());
//        } else {
//            userStoriesProfile.setIntroContent(user.getIntroContent());
//            userStoriesProfile.setModifiedAt(user.getUpdatedAt());
//            PagedResponse<Story> userStories= userService.findStoriesByUserId( userPrincipal.getId());
//            userStoriesProfile.setStoryList(userStories. );
//
//            userStoriesProfile.setName(user.getName());
//            userStoriesProfile.setEmail(user.getEmail());
//            userStoriesProfile.setJoinAt(user.getCreatedAt());
//        }
//        return userStoriesProfile;
//
//    }


    //todo return profile of user, not all data
    @GetMapping(value = "/username/{username}")
    public UserProfileResponse findByUsername(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        UserProfileResponse userProfileResponse = new UserProfileResponse();

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", username);
        } else {
           userProfileResponse = new UserProfileResponse(user);
        }
        return userProfileResponse;
    }

    @GetMapping(value = "/me")
    public UserProfileResponse currentUser(@CurrentUser UserPrincipal userPrincipal) {
        User user = userService.findByUsername(userPrincipal.getUsername());
        UserProfileResponse userProfileResponse = new UserProfileResponse();

        if (user == null) {
            throw new ResourceNotFoundException("User", "username", userPrincipal.getUsername());
        } else {
            userProfileResponse = new UserProfileResponse(user);
        }
        return userProfileResponse;

    }

    /**
     * No need jsonobject cause of restcontroller, just return pojo object
     */

    //todo : what is @Valid

    // todo danh luong xu ly cho ham nay
    @PutMapping(value = "/{uid}")
    public UserProfileResponse update(@PathVariable("uid") Integer uid,
                       @RequestBody @Valid UserProfileUpdateRequest user, @CurrentUser UserPrincipal userPrincipal) {

        if(userPrincipal.getId()!= uid){
            throw new UnauthorizedException("Not authorized for change this user profile");
        }


        User userById = userService.findById(uid);
        if (userById == null) {
            throw new ResourceNotFoundException("User", "id", uid);
        }
        if (userPrincipal.getUsername().equals(userById.getUsername())) {
            userService.update(uid,user);
        }


        UserProfileResponse us= new UserProfileResponse(userService.findById(uid));
        return us ;
    }

//    //todo what is responseEntity
//    //response status of user deleted,
//    @DeleteMapping(value = "/{uid}")
//    public ResponseEntity<Boolean> delete(@PathVariable("uid") Integer uid) {
//        userService.delete(uid);
//        return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
//    }



    // todo missing check available user (is active or not api)
    /* Deactivating a user without checking it deactived or not */
    @DeleteMapping(value = "/{uid}")
    public ResponseEntity<?> activate(@PathVariable Integer uid,
                                      @Param(value = "setActive") boolean setActive) {
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
