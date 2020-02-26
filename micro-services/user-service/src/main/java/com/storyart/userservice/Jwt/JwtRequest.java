package com.storyart.userservice.Jwt;


import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


public class JwtRequest implements Serializable {
    String username;

    String password;

    private static final long serialVersionUID = 5926468583005150707L;

    public JwtRequest() {
    }

    public JwtRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
