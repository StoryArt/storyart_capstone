package com.storyart.userservice.repository;

import com.storyart.userservice.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM storyart_db.user u WHERE u.email=?1", nativeQuery = true)
    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM storyart_db.user u WHERE u.username LIKE '%?1%'", nativeQuery = true)
    Page<User> findByUsernameLike( String search,Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM storyart_db.user u  WHERE u.role_id=2 and (u.username LIKE %?1% or u.email like %?1%)"
            , countQuery = "SELECT count(*) FROM storyart_db.user u  WHERE u.role_id=2 and (u.username LIKE %?1% or u.email like %?1%)")
    Page<User> findAdminByUsernameOrEmail( String search,Pageable pageable);

    // tim nhung user co role trong bang user_role la 1
    @Query(value = "SELECT * FROM storyart_db.user u  WHERE u.role_id=3 and (u.username LIKE %?1% or u.email like %?1%)"
     , countQuery = "SELECT count(*) FROM storyart_db.user u  WHERE u.role_id= 3 and (u.username LIKE %?1% or u.email like %?1%)"
            , nativeQuery = true)
    Page<User> findOnlyUserByUsernameOrEmail( String search,Pageable pageable);
}
