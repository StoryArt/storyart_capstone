package com.storyart.storyservice.repository;


import com.storyart.storyservice.dto.statistic.IRatingClassify;
import com.storyart.storyservice.model.Rating;
import com.storyart.storyservice.model.ids.RatingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, RatingId> {

        @Query(value = "SELECT * FROM rating where rating.story_id in(:storyid) and not user_id = :userid order by rating.user_id", nativeQuery = true)
    List<Rating> findRatingByStoryIdEXceptId(@Param("storyid") List<Integer> storyid, @Param("userid") Integer userid);

    @Query(value = "select story_id from rating where user_id = :userid ", nativeQuery = true)
    List<Integer> findStoryRatingByUserId(@Param("userid") Integer userid);

    @Query(value = "SELECT * FROM rating where user_id = :userid and rating.story_id in (:storyid)", nativeQuery = true)
    List<Rating> findRatingByUserId(@Param("userid") Integer userid, @Param("storyid") List<Integer> storyid);

    @Query(value = "SELECT ROUND(AVG(stars), 1) FROM rating where story_id = ?1", nativeQuery = true)
    double findAvgStarsByStoryId(int storyId);

    @Query(value = "SELECT * FROM rating where story_id = ?1 and user_id = ?2", nativeQuery = true)
    Rating findById(int storyId, int userId);

//    @Query(value = "SELECT count(*) FROM rating r where r.story_id = ?1", nativeQuery = true)
//    int countRateByStoryId (int storyId);

    int countRatingByStoryId(int storyId);
    @Query(value = "SELECT stars+1 as 'star', count(*) as 'count'\n" +
            " FROM storyart_db.rating where story_id=:sid group by stars order by stars" , nativeQuery = true)
    List<IRatingClassify> countStarByStoryId(@Param("sid") Integer sid);

}
