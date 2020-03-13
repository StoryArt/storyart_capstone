package com.storyart.userservice.repository;

import com.storyart.userservice.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM com.storyart.userservice.model.User u WHERE u.username LIKE CONCAT('%',:search,'%')")
    Page<User> findByUsernameLike( Pageable pageable, String search);

    @Query(countQuery = "SELECT count(u)  FROM  com.storyart.userservice.model.User u  JOIN u.role role WHERE  role.id=2 and (u.username LIKE CONCAT('%',:search,'%') or u.email LIKE CONCAT('%',:search,'%'))",
            value = "SELECT distinct u  FROM  com.storyart.userservice.model.User u  JOIN u.role role WHERE  role.id=2 and (u.username LIKE CONCAT('%',:search,'%') or u.email LIKE CONCAT('%',:search,'%'))")
    Page<User> findAdminByUsernameOrEmail (Pageable pageable, String search);

// tim nhung user co role trong bang user_role la 1
    @Query(value = "SELECT distinct u  FROM  com.storyart.userservice.model.User u JOIN u.role role WHERE  role.id=3 and  (u.username LIKE CONCAT('%',:search,'%') or u.email LIKE CONCAT('%',:search,'%'))",
            countQuery = "SELECT count(u)  FROM  com.storyart.userservice.model.User u  JOIN u.role role WHERE  role.id =3 and  (u.username LIKE CONCAT('%',:search,'%') or u.email LIKE CONCAT('%',:search,'%'))"
            )
    Page<User> findOnlyUserByUsernameOrEmail(Pageable pageable, String search);






}
