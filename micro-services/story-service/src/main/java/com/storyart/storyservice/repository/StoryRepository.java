package com.storyart.storyservice.repository;

import com.storyart.storyservice.common.MyQueries;
import com.storyart.storyservice.dto.GetStoryDto;
import com.storyart.storyservice.model.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface StoryRepository extends JpaRepository<Story, Integer> {
    @Query(value = "select * from story s WHERE (s.title like %?1% or s.intro like %?1%) " +
            "and s.active = ?3 and s.published = ?4 and s.id in " +
            "(select distinct story_id from story_tag st where st.tag_id in ?2)",

            countQuery = "select count(*) from story s WHERE (s.title like %?1% or s.intro like %?1%) " +
                    "and s.active = ?3 and s.published = ?4 and s.id in " +
                    "(select distinct story_id from story_tag st where st.tag_id in ?2)",

            nativeQuery = true)
    Page<Story> findAllBySearchCondition(String title, Set<Integer> tagIds,
                                boolean active, boolean published, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfComment + " ASC",
            countQuery = MyQueries.countStoriesByKeyword,
            nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfCommentASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfComment + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfCommentDESC(String keyword, Pageable pageable);


    @Query(value = MyQueries.getStoriesOrderByNumOfRating + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfRatingDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfRating + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfRatingASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfScreen + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfScreenDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfScreen + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfScreenASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfAvgRate + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByAvgRateDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfAvgRate + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByAvgRateASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfRead + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfReadASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesOrderByNumOfRead + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfReadDESC(String keyword, Pageable pageable);

    @Query(value = "SELECT * FROM storyart_db.story", nativeQuery = true)
    List<Integer> findAllStory ();

    @Query(value = "SELECT * FROM story where id = :storyid", nativeQuery = true)
    Story findStoryById (@Param("storyid") Integer storyid);

    @Query(value = "select id from storyart_db.story  where YEARWEEK(story.created_at) = YEARWEEK(NOW())", nativeQuery = true)
    List<Integer> findStoryThisWeek();

    @Query(value = "select id from storyart_db.story  where not YEARWEEK(story.created_at) = YEARWEEK(NOW())", nativeQuery = true)
    List<Integer> findStoryExceptThisWeek();

    @Query(value = "SELECT * FROM storyart_db.story order by  story.created_at DESC", nativeQuery = true)
    Page<Story> findStoryOrderByCreateAt(Pageable page);
    @Query("select s from Story s where s.id in (:storyIds)")
    Page<Story> findAllByStoryIds(@Param("storyIds") List<Integer> storyIds, Pageable pageable); //mo dum cai file luc nay
    @Query(value = "SELECT * FROM story s where s.user_id = ?1 order by s.created_at desc", nativeQuery = true)
    List<Story> findAllByUserId(int userId);
}
