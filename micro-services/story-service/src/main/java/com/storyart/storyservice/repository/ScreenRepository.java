package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Screen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ScreenRepository extends JpaRepository<Screen, String> {
    @Query(value = "select * from screen sc where sc.story_id = ?1 " +
            "order by sc.my_index ASC",
            nativeQuery = true)
    List<Screen> findByStoryId(int storyId);

    @Query(value = "select id from screen sc where sc.story_id = ?1 " +
            "order by sc.my_index ASC",
            nativeQuery = true)
    List<String> findScreenIdsByStory(int storyId);

    void deleteAllByStoryId(int storyId);

    @Modifying
    @Transactional
    @Query(value = "delete from screen sc where sc.id in ?1", nativeQuery = true)
    void deleteAllByIds(List<String> screenIds);

    @Modifying
    @Transactional
    @Query(value = "update screen sc set " +
            "sc.content = :#{#scr.content}, sc.title = :#{#scr.title}, sc.my_index = :#{#scr.myIndex} " +
            "where sc.id = :#{#scr.id}", nativeQuery = true)
    void updateScreenById(@Param("scr") Screen scr);

    @Modifying
    @Transactional
    @Query(value = "insert into screen(id, title, content, story_id, created_at, updated_at, my_index) " +
            "values(:#{#scr.id}, :#{#scr.title}, :#{#scr.content}, :#{#scr.storyId}, " +
            ":#{#scr.createdAt}, :#{#scr.updatedAt}, :#{#scr.myIndex})", nativeQuery = true)
    void insertScreen(@Param("scr") Screen scr);


    int countAllByStoryId(int storyId);
}
