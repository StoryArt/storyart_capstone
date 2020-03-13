package com.storyart.storyservice.utils;

import java.util.UUID;

public class UUIDUtils {
    public static String generateUniqueId(){
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
