package com.storyart.storyservice.repository;

import com.storyart.storyservice.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TagRepository  extends JpaRepository<Tag, Integer> {

   // @Query(value = "select * from tag where tag.Title = :title", nativeQuery = true)
   // Tag findByTitle(@Param("title") String title);

   // @Query(value = "select * from tag where tag.isActive = :isActive", nativeQuery = true)
  //  List<Tag> findTagsByActive(@Param("isActive")boolean isActive);

    Tag findByTitle(String title);

  //  List<Tag> findTagsByis_Active(boolean isActive);
}
