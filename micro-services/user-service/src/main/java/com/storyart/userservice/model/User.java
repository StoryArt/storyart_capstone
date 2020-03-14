package com.storyart.userservice.model;

import com.storyart.userservice.common.DateAudit;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "user",
        uniqueConstraints = {@UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email") })
public class User extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Tên đăng nhập không được trống")
    @Size(min=3,max = 15, message = "Tên đăng nhập phải có từ 3 đến 15 ký tự")
    @Column(unique = true)
    private String username;

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 40, min = 4, message = "Tên phải có từ 3 đến 40 ký tự")
    @Column(length = 40)
    private String name;


    @NotBlank(message = "Mật khẩu không được để trống")
    //size 100 is encoded password,, signup request has passord <=15
    @Size(max = 100, min = 8, message = "Mật khẩu phải có từ 8 đến 100 ký tự")
    private String password;

    @Size(max = 1000, message = "̣")
    private String avatar;

    @ManyToOne
    @JoinColumn(name = "role_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Role role;

    @Size(max = 300, message = "Thông tin giới thiệu có độ dài tối đa là 300 ký tự")
    @Column(length = 300)
    private String introContent;
    private boolean isActive;

    @Email
    @NotBlank(message = "Email không được để trống")
    private String email;

//    @CreationTimestamp
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date createdAt;
//
//    @UpdateTimestamp
//    @Temporal(TemporalType.TIMESTAMP)
//    private Date updatedAt;

    //todo add  @blank and @size for another class

}
