package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Action;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ActionRepository extends JpaRepository<Action, String> {

    @Query(value = "select * from action a where a.screen_id = ?1 " +
            "order by a.my_index ASC",
            nativeQuery = true)
    List<Action> findAllByScreenId(String screenId);

    @Query(value = "select id from action a where a.screen_id = ?1",
            nativeQuery = true)
    List<String> findActionIdsScreen(String screenId);

    void deleteAllByScreenId(String screenId);

    @Modifying
    @Transactional
    @Query(value = "delete from action a where a.id in ?1", nativeQuery = true)
    void deleteAllByIds(List<String> ids);

    @Modifying
    @Transactional
    @Query(value = "insert into action (id, content, next_screen_id, screen_id, `type`, `value`, created_at, my_index) " +
            "values(:#{#action.id}, :#{#action.content}, :#{#action.nextScreenId}, " +
            ":#{#action.screenId}, :#{#action.type.toString()}, :#{#action.value}, :#{#action.createdAt}, :#{#action.myIndex})", nativeQuery = true)
    void insertAction(@Param("action") Action action);
}
