package com.storyart.storyservice.repository;

import com.storyart.storyservice.common.MyQueries;
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

    @Query(value = MyQueries.getStoriesForAdminOrderByComment + " ASC",
            countQuery = MyQueries.countStoriesByKeyword,
            nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfCommentASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByComment + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfCommentDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByRating + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfRatingDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByRating + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfRatingASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByScreen + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfScreenDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByScreen + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfScreenASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByAvgRate + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByAvgRateDESC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByAvgRate + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByAvgRateASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByRead + " ASC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfReadASC(String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForAdminOrderByRead + " DESC",
            countQuery = MyQueries.countStoriesByKeyword, nativeQuery = true)
    Page<Story> findForAdminOrderByNumOfReadDESC(String keyword, Pageable pageable);

    //for users
    @Query(value = MyQueries.getStoriesForUserOrderByComment + " ASC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfCommentASC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByComment + " DESC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfCommentDESC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByRating + " DESC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfRatingDESC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByRating + " ASC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfRatingASC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByScreen + " DESC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfScreenDESC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByScreen + " ASC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfScreenASC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByAvgRate + " DESC", nativeQuery = true)
    Page<Story> findForUserOrderByAvgRateDESC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByAvgRate + " ASC", nativeQuery = true)
    Page<Story> findForUserOrderByAvgRateASC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByRead + " ASC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfReadASC(int userId, String keyword, Pageable pageable);

    @Query(value = MyQueries.getStoriesForUserOrderByRead + " DESC", nativeQuery = true)
    Page<Story> findForUserOrderByNumOfReadDESC(int userId, String keyword, Pageable pageable);
    //end for user

    @Query(value = "SELECT * FROM storyart_db.story", nativeQuery = true)
    List<Integer> findAllStory ();

    @Query(value = "SELECT * FROM story where id = :storyid", nativeQuery = true)
    Story findStoryById (@Param("storyid") Integer storyid);

    @Query(value = "SELECT * FROM story s where s.user_id = ?1 order by s.created_at desc", nativeQuery = true)
    List<Story> findAllByUserId(int userId);
}
