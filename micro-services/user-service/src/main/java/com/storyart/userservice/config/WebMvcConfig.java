package com.storyart.userservice.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;




/**This config  allow cross origin requests from the react client */
public class WebMvcConfig implements WebMvcConfigurer {
    ///27/2/2020 add
    private final long MAX_AGE_SECS = 3600;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("HEAD",
                        "OPTIONS",
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE")
                .maxAge(MAX_AGE_SECS);
    }




}
