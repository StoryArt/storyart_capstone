package com.storyart.userservice.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.storyart.userservice.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserPrincipal implements UserDetails {

    private Integer id;

    private String username;

    @JsonIgnore
    private String password;


    private String name;


    public static UserPrincipal create(com.storyart.userservice.model.User user) {


        /*từ việc chuyển qua 1 user 1 role, 1 role nhiều user, thì để dễ hoạt động, theo code thì user có 1 list role
         nhưng lít role đó thực tế theo business thì chỉ có 1 role */
        Set<Role> roles= new HashSet<>();
        roles.add(user.getRole());

        List<GrantedAuthority> grantedAuthorityList = roles.stream().map(role ->
                new SimpleGrantedAuthority(role.getName().name()))
                    .collect(Collectors.toList());
        return new UserPrincipal(user.getId(), user.getUsername(), user.getPassword(),user.getName(),  grantedAuthorityList);
    }

    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }


    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
