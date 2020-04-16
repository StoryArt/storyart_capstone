package com.storyart.storyservice.utils;

import org.springframework.util.StringUtils;

import java.util.Random;
import java.util.UUID;

public class MyStringUtils {
    public static String generateUniqueId(){
        UUID uuid = UUID.randomUUID();
        System.out.println("uuid: " + uuid.toString());
        return uuid.toString();
    }

    public static String removeHtmlTags(String html){
        if(StringUtils.isEmpty(html)) return "";
        return html.replaceAll("\\<[^>]*>","").trim();
    }
}
