package com.storyart.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private String username;
    private String password;
    private String role;
    private String introContent;
    private String gender;
    private boolean isActive;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
