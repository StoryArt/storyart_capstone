package com.storyart.storyservice.utils;

import org.springframework.util.StringUtils;

import java.util.Random;
import java.util.UUID;

public class MyStringUtils {
    public static String generateUniqueId(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public static String removeHtmlTags(String html){
        if(StringUtils.isEmpty(html)) return "";
        return html.replaceAll("\\<[^>]*>","").trim();
    }

    public static boolean isValidUrl(String url){
        //if(StringUtils.isEmpty(url)) return false;
        //String regex = "^(http:\\/\\/|https:\\/\\/)?(www.)?([a-zA-Z0-9]+).[a-zA-Z0-9]*.[a-z]{3}.?([a-z]+)?$";
        //return url.matches(regex);
        return true;
    }
}
