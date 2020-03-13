package com.storyart.userservice.service;

import com.storyart.userservice.exception.BadRequestException;
import com.storyart.userservice.model.Story;
import com.storyart.userservice.model.User;
import com.storyart.userservice.payload.PagedResponse;
import com.storyart.userservice.payload.UserInManagementResponse;
import com.storyart.userservice.payload.UserProfileUpdateRequest;
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

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
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

    /**
     * Tim kiem admin theo
     *
     * @param search ky tu can tim
     * @param page   so thu tu page tu list pages- phan ra bang size tu list nhung user tim duoc
     * @param size   so luong ket qua hien thi trong 1 page
     * @return PageResponse  1 chuoi json chua cac thong tin 1 page ( ben trong co list user tuong
     * ung voi page)@see PageResponse
     * @sort createdAt sort theo thoi gian
     */
    @Override
    public PagedResponse<UserInManagementResponse> findByUsernameOrEmail(int page, int size, String search) {
        validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findByUsernameLike(pageable, search);
        List<User> usersList = userPage.toList();

        List<UserInManagementResponse> users= convertUserlist(usersList);




        return new PagedResponse<UserInManagementResponse>(users, userPage.getNumber(), userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages(), userPage.isLast());
    }

    @Override
    public PagedResponse<Story> findStoriesByUserId(Integer id) {
        return null;
//todo: get Stories by id feign client

//todo hoi ve chuyen trang va validation


        //sua thong tin admin, them quyen cho system ad, figma, toa truyen doc truyen,
    }

    /**
     * Tim kiem admin theo
     *
     * @param search ky tu can tim
     * @param page   so thu tu page tu list pages- phan ra bang size tu list nhung admin tim duoc
     * @param size   so luong ket qua hien thi trong 1 page
     * @return PageResponse  1 chuoi json chua cac thong tin 1 page ( ben trong co list user tuong
     * ung voi page)@see PageResponse
     * @sort createdAt sort theo thoi gian
     */
    @Autowired
    EntityManager entityManager;



    @Override
    public PagedResponse<UserInManagementResponse> findAdminbyUsernameOrEmail(int page, int size, String search) {

        validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size);



        Page<User> userPage = userRepository.findAdminByUsernameOrEmail(pageable, search);
        List<User> usersList = userPage.toList();

       List<UserInManagementResponse> users= convertUserlist(usersList);


        return new PagedResponse<UserInManagementResponse>(users, userPage.getNumber(), userPage.getSize(),
                userPage.getTotalElements(),
                userPage.getTotalPages(), userPage.isLast());
    }


   public List<UserInManagementResponse> convertUserlist(List<User> users){
       List<UserInManagementResponse> convertUserlist = new ArrayList<>();
       for(User u: users){
            convertUserlist.add(new UserInManagementResponse(u));
        }
       return convertUserlist;
    }

    @Override
    public PagedResponse<UserInManagementResponse> findOnlyUserByUsernameOrEmail(int page, int size, String searchtxt) {

        validatePageNumberAndSize(page, size);
        Pageable pageable = PageRequest.of(page, size);


//        TypedQuery<User> querry=entityManager.createQuery("")


        Page<User> userPage = userRepository.findOnlyUserByUsernameOrEmail(pageable, searchtxt);
        List<User> usersList = userPage.toList();

        List<UserInManagementResponse> users= convertUserlist(usersList);


        return new PagedResponse<UserInManagementResponse>(users, userPage.getNumber(), userPage.getSize(),
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
    public void update(Integer uid, UserProfileUpdateRequest us) {


        User byId = findById(uid);
//5
        byId.setName(us.getName());
        byId.setEmail(us.getEmail());
        byId.setGender(us.getGender());
        byId.setDob(us.getDob());
        byId.setIntroContent(us.getIntro_content());

        userRepository.save(byId);
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
