package com.storyart.userservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "role")
public class  Role {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;


    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private RoleName   name;


}
