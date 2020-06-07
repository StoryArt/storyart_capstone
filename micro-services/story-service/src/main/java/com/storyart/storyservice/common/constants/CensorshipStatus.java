package com.storyart.storyservice.common.constants;

public class CensorshipStatus {
    public static String APPROVED = "APPROVED";
    public static String PENDING = "PENDING";
    public static String REJECTED = "REJECTED";

    public static String CensorshipStatusRegex = APPROVED + "|" + PENDING + "|" + REJECTED;
}
