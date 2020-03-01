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

    @Query("SELECT u.username FROM com.storyart.userservice.model.User u WHERE u.username LIKE CONCAT('%',:search,'%')")
    Page<User> findByUsernameLike( Pageable pageable, String search);
}
