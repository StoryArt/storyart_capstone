package com.storyart.userservice.model;

import com.storyart.userservice.model.audit.DateAudit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "user", uniqueConstraints = {@UniqueConstraint(columnNames = "username")})
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;


    @NotBlank(message = "Username must be filled")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Password must be filled")
    private String password;

/*fetch = FetchType.LAZY tức là khi bạn find, select đối
 tượng User từ database thì nó sẽ không lấy các đối tượng Role liên quan*/
    @ManyToMany(fetch = FetchType.LAZY)
    /*joinColumns=id of user table , inversejoin=id of role*/
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    private String introContent;
    private String gender;
    private boolean isActive;


    //todo add  @blank and @size for another class

}
