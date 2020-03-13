package com.storyart.userservice.model;

import com.storyart.userservice.model.audit.DateAudit;
import lombok.*;

import javax.persistence.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "user", uniqueConstraints =
        {@UniqueConstraint(columnNames = "username"), @UniqueConstraint(columnNames = "email") })
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @NotBlank(message = "Username must be filled")
    @Size(max = 15)
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Name must be filled")
    @Size(max = 40, min = 4)
    @Column(length = 40)
    private String name;


    @NotBlank(message = "Password must be filled")
    //size 100 is encoded password,, signup request has passord <=15
    @Size(max = 100, min = 5)
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Role role;

    @Size(max = 300)
    @Column(length = 300)
    private String introContent;
    private String gender;
    private String dob;
    private boolean isActive;

    @Email
    @NotBlank
    private String email;


    //todo add  @blank and @size for another class

}
