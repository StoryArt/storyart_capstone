package com.storyart.storyservice.repository;

import com.storyart.storyservice.dto.statistic.IScreenValueResponse;
import com.storyart.storyservice.dto.statistic.ScreenValueResponse;
import com.storyart.storyservice.model.ScreenReadingTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ScreenReadingTimeRepository extends JpaRepository<ScreenReadingTime, Integer> {
    @Query(value = "select q.id , q.title ,q.sumtime, q.viewcount1 as viewcount ,q.sumtime/q.viewcount1 as timeperview" +
            " from (select screen_id as id ,sc.title, sum(duration) as sumtime  , count(*) as viewcount1" +
            " from storyart_db.screen_reading_time as srt, screen as sc " +
            " where  srt.screen_id = sc.id and (srt.created_at between :start and :end) and screen_id in :listScreenId" +
            " group by screen_id" +
            " ) AS q"
            , countQuery = "select count(*)" +
            " from (select screen_id as id ,sc.title, sum(duration) as sumtime  , count(*) as viewcount1" +
            "  from storyart_db.screen_reading_time as srt, screen as sc " +
            "  where  srt.screen_id = sc.id and (srt.created_at between :start and :end) and screen_id in :listScreenId" +
            "  group by screen_id" +
            "  ) AS q"
            , nativeQuery = true)
    Page<IScreenValueResponse> findScreensAndCalTimeViewAndTimePerView(
            @Param("listScreenId") List<String> listScreenId,
            @Param("start") String start, @Param("end") String end, Pageable pageable);

}
