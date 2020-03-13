package com.storyart.storyservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.storyart.storyservice.model.ReadingHistory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<ReadingHistory, Integer> {

    @Query(value = "select * FROM storyart_db.reading_history where reading_history.user_id = :userid", nativeQuery = true)
    List<ReadingHistory>  findHistoryById(@Param("userid") Integer userid);

    @Query(value = "select distinct user_id from reading_history where Not reading_history.user_id = :userid order by reading_history.user_id", nativeQuery = true)
    List<Integer>  findUserIdHistoryExceptId(@Param("userid") Integer userid);

    @Query(value = "select story_id from reading_history where user_id = :param", nativeQuery = true)
    List<Integer>  findListHistory(@Param("param") Integer userid);



}
