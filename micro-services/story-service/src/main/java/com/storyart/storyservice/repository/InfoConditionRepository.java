package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.InfoCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InfoConditionRepository extends JpaRepository<InfoCondition, Integer> {
    @Query(value = "select * from info_condition ic where ic.information_id = ?1 order by ic.my_index ASC", nativeQuery = true)
    List<InfoCondition> findAllByInformationId(String id);
}
