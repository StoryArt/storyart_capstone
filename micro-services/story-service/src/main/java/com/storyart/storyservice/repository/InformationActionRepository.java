package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.InformationAction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface InformationActionRepository extends JpaRepository<InformationAction, Integer> {
    List<InformationAction> findAllByInformationIdIn(List<String> informationIds);
    void deleteAllByInformationIdIn(List<String> informationId);

    @Modifying
    @Transactional
    @Query(value = "insert into information_action (action_id, information_id, operation, `value`) " +
            "values(:#{#ia.actionId}, :#{#ia.informationId}, :#{#ia.operation}, :#{#ia.value})", nativeQuery = true)
    void insertInfoAction(@Param("ia") InformationAction ia);
}
