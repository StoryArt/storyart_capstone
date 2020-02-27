package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Tag;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TagRepository  extends JpaRepository<Tag, Integer> {
    //Tag findTagsByTitle(String title);

 //   @Query("select u from tag u where u.is_active = ?1")
 //  List<Tag> findAllByIs_activeIsTrue(boolean isactive);
    @Query(value= "SELECT * FROM storyart_db.tag u where u.is_active=1", nativeQuery = true)
    List<Tag> findTagByIs_active();

    @Query(value= "SELECT * FROM storyart_db.tag u where u.is_active=0", nativeQuery = true)
    List<Tag> findTagByIs_activeFalse();


    @Query(value= "SELECT * FROM storyart_db.tag u where u.title LIKE :title%", nativeQuery = true)
    List<Tag> findTagLikeTitle(@Param("title") String title);

    @Modifying
    @Query(value= "update  storyart_db.tag u set u .is_active = 1 where u.id = ?1 ", nativeQuery = true)
    void activeTagById( int id);
//@Param("tagid")
    @Modifying
    @Query(value= "update storyart_db.tag u set u.is_active = 0 where u.id = :tagid", nativeQuery = true)
    void disableTagById(@Param("tagid") int id);

}
