package com.storyart.userservice.controller;


import com.storyart.userservice.exception.AppException;
import com.storyart.userservice.exception.BadRequestException;
import com.storyart.userservice.model.Role;
import com.storyart.userservice.model.RoleName;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.ApiResponse;
import com.storyart.userservice.payload.PagedResponse;
import com.storyart.userservice.payload.SignUpRequest;
import com.storyart.userservice.payload.UserInManagementResponse;
import com.storyart.userservice.repository.RoleRepository;
import com.storyart.userservice.repository.UserRepository;
import com.storyart.userservice.security.CurrentUser;
import com.storyart.userservice.security.JwtAuthenticationFilter;
import com.storyart.userservice.security.JwtTokenProvider;
import com.storyart.userservice.security.UserPrincipal;
import com.storyart.userservice.service.UserService;
import com.storyart.userservice.util.AppContants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin("*")
@Secured({"ROLE_ADMIN"})
public class AdminController {


    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;


    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    RoleRepository roleRepository;

    // todo missing check available user (is active or not api)
    /* Deactivating a user without checking it deactived or not */
    @DeleteMapping(value = "/{uid}")
    public ResponseEntity<?>
    setStatus(@PathVariable Integer uid,
              @RequestParam(value = "setActive") boolean setActive) {

        boolean afterSetStatus = false;
        if (!setActive) {
            userService.deActive(uid);

        } else {
            userService.active(uid);
        }
        afterSetStatus = userService.findById(uid).isActive();


        //todo thieu set deactive by admin account record
        if (afterSetStatus) {
            return new ResponseEntity<>(new ApiResponse(true, "Account activated successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(true, "Account deactivated successfully"), HttpStatus.OK);
        }

    }
//    @Autowired
//    PasswordEncoder passwordEncoder;

//    @PostMapping
//    public ResponseEntity<?> createUserAccount(@RequestBody @Valid SignUpRequest signUpRequest) {
//
//        if (userService.findByUsername(signUpRequest.getUsername()) != null) {
//            return new ResponseEntity<>(new ApiResponse(false,
//                    "Username is already taken!"),
//                    HttpStatus.BAD_REQUEST);
//        }
//
//        User user = new User();
//        user.setGender(signUpR    equest.getGender());
//        user.setActive(true);
//        user.setUsername(signUpRequest.getUsername());
//        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
//        user.setName(signUpRequest.getName());
//        user.setEmail(signUpRequest.getEmail());
//
////        Role userRole
//        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
//                .orElseThrow(() -> new AppException("User Role not set."));
//
//        user.setRoles(Collections.singleton(userRole));
//        User savedUser = userRepository.save(user);
//        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/v1/user/username")
//                .buildAndExpand(savedUser.getUsername()).toUri();
//        return ResponseEntity.created(location).body(new ApiResponse(true, "Administrator created successfully"));
//
//    }


    // search user by username contains %username%
    @GetMapping("/all")
    public PagedResponse<UserInManagementResponse> findAll(@RequestParam(value = "page",
            defaultValue = AppContants.DEFAULT_PAGE_NUMBER) int page,
                                                           @RequestParam(value = "size",

                                                                   defaultValue = AppContants.DEFAULT_PAGE_SIZE) int size,
                                                           @RequestParam(value = "s") String searchtxt) {

        return userService.findByUsernameOrEmail(page, size, searchtxt);
    }

    @GetMapping("/userOnly")
    public PagedResponse<UserInManagementResponse> findOnlyUserByUsernameLike(@RequestParam(value = "page",
            defaultValue = AppContants.DEFAULT_PAGE_NUMBER) int page,
          @RequestParam(value = "size",

                  defaultValue = AppContants.DEFAULT_PAGE_SIZE) int size,
          @RequestParam(value = "s") String searchtxt) {

        return userService.findOnlyUserByUsernameOrEmail(page, size, searchtxt);
    }

    //todo: cannot able to active account -that deactived by sys/admin- 2 functions




    @Autowired
    PasswordEncoder passwordEncoder;
    @PostMapping("/users/add")
    public ResponseEntity<?> creatUser(@RequestBody
                                           @Valid SignUpRequest signUpRequest) {
        if (userService.findByUsername(signUpRequest.getUsername()) != null) {
            throw new BadRequestException("Username is already taken");
        }

        User user = new User();
        user.setGender(signUpRequest.getGender());
        user.setActive(true);
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());

//        Role userRole
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRole(userRole);


        /**
         *  Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
         *                 .orElseThrow(() -> new AppException("User Role not set."));
         *
         *         user.setRoles(Collections.singleton(userRole));*/


        User savedUser = userRepository.save(user);

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("api/v1/user/username")
                .buildAndExpand(savedUser.getUsername()).toUri();
        return ResponseEntity.created(location).body(new ApiResponse(true, "User created successfully"));

    }
}
