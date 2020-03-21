package com.storyart.userservice.controller;

import com.storyart.userservice.common.constants.RoleName;
import com.storyart.userservice.exception.BadRequestException;
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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.Collection;

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
    public UserProfileResponse
    get(@PathVariable("uid") Integer uid) {
        User user = userService.findById(uid);
        UserProfileResponse userProfileResponse = new UserProfileResponse();

        if (user == null) {
            throw new ResourceNotFoundException("User", "id", uid);
        } else {
            userProfileResponse.setName(user.getName());
            userProfileResponse.setUsername(user.getUsername());
            userProfileResponse.setEmail(user.getEmail());
            userProfileResponse.setActive(user.isActive());
            userProfileResponse.setJointAt(user.getCreatedAt());
            userProfileResponse.setAvatar(user.getAvatar());
        }
        return userProfileResponse;

    }


    //todo return profile of user, not all data
    @GetMapping(value = "/username/{username}")
    public UserProfileResponse
    findByUsername(@PathVariable("username") String username) {
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
    public UserProfileResponse
    currentUser(@CurrentUser UserPrincipal userPrincipal) {
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
    @PutMapping(value = "/{uid}", consumes = {"multipart/form-data"})
    public UserProfileResponse
    update(@PathVariable("uid") Integer uid,
           @RequestBody UserProfileUpdateRequest user, @CurrentUser UserPrincipal userPrincipal) {

        if (userPrincipal.getId() != uid) {
            throw new UnauthorizedException("Bạn không thể chỉnh sửa nội dung này!");
        }
        //nếu tìm được user khác user hiện tại, có email trùng thì báo lõi trùng email
        User user1 = userService.findByEmail(user.getEmail());
        if (user1 != null) {

            if (user1.getId() != userPrincipal.getId()) {
                throw new BadRequestException("Email đã được đăng ký bởi ai đó!");
            }
        }

        User userById = userService.findById(uid);
        if (userById == null) {
            throw new ResourceNotFoundException("User", "id", uid);
        }
        if (userPrincipal.getUsername().equals(userById.getUsername())) {
            userService.update(uid, user);
        }


        UserProfileResponse us = new UserProfileResponse(userService.findById(uid));
        return us;
    }


    // todo missing check available user (is active or not api)
    /* Deactivating a user without checking it deactived or not */
    @DeleteMapping(value = "/{uid}")
    public ResponseEntity<?>
    setStatusYourAccount(@PathVariable Integer uid, @CurrentUser UserPrincipal currentUser,
                         @Param(value = "setActive") boolean setActive) {
        //this user must being active and param: setActive=false
        if (currentUser.getId() != uid) {
            throw new UnauthorizedException("Bạn không thể chỉnh sửa nội dung này!");
        }
        // trong th tu khoa tai khoan khi tai khoan đa khoa boi admin!
        if (userService.findById(currentUser.getId()).isDeactiveByAdmin()) {
            return new ResponseEntity<>(new ApiResponse(false, "Tài khoản đã khóa bởi quản trị viên!"), HttpStatus.FORBIDDEN);
        }

        if (!setActive) {
            userService.deActive(uid, false);
            return new ResponseEntity<>(new ApiResponse(true, "Đã khóa tài khoản!"), HttpStatus.OK);
        } else {
            //user khong the tu mo tai khoan bi khoa boi admin
            if (userService.findById(currentUser.getId()).isDeactiveByAdmin()) {
                return new ResponseEntity<>(new ApiResponse(false, "Không thể mở tài khoản! Vui lòng liên lạc với quản trị viên!"), HttpStatus.FORBIDDEN);
            } else {
                userService.active(uid);
                return new ResponseEntity<>(new ApiResponse(true, "Mở khóa tài khoản thành công!"), HttpStatus.OK);
            }
        }

    }


    @PostMapping(value = "/{uid}/avatar/save")
    public ResponseEntity<?> saveAvatarLink(@PathVariable("uid") Integer uid, @CurrentUser UserPrincipal userPrincipal, @RequestBody AvatarUpdateRequest avatarUpdateRequest) {
        if (userPrincipal.getId() != uid) {
            throw new UnauthorizedException("Bạn không thể chỉnh sửa nội dung này!");


        }

        userService.updateAvatar(uid, avatarUpdateRequest.getLink());
        return new ResponseEntity<>(new ApiResponse(true, "Lưu thành công!"), HttpStatus.OK);
    }


}
