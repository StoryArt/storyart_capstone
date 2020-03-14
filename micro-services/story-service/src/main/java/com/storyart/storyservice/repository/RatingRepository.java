package com.storyart.storyservice.repository;


import com.storyart.storyservice.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {

    @Query(value = "SELECT * FROM rating where rating.story_id = :storyid and not user_id = :userid", nativeQuery = true)
    List<Rating> findRatingByStoryIdEXceptId(@Param("storyid") Integer storyid, @Param("userid") Integer userid);

    @Query(value = "select story_id from rating where user_id = :userid ", nativeQuery = true)
    List<Integer> findStoryRatingById(@Param("userid") Integer userid);

    @Query(value = "SELECT * FROM rating where user_id = :userid", nativeQuery = true)
    List<Rating> findRatingByUserId(@Param("userid") Integer userid);

}
