package com.storyart.storyservice.common;

public class MyQueries {
    public static final String countStoriesByKeyword = "select count(s.id) from story s WHERE (s.title like %?1% or s.intro like %?1%)";
    public static final String getStoriesByKeyword = "select * from story s WHERE (s.title like %?1% or s.intro like %?1%)";
    public static final String getStoriesOrderByNumOfComment = getStoriesByKeyword + " " + "order by (select count(c.id) from comment c where c.story_id = s.id)";
    public static final String getStoriesOrderByNumOfRating = getStoriesByKeyword + " " + "order by (select count(*) from rating r where r.story_id = s.id)";
    public static final String getStoriesOrderByNumOfRead = getStoriesByKeyword + " " + "order by s.num_of_read";
    public static final String getStoriesOrderByNumOfAvgRate = getStoriesByKeyword + " " + "order by s.avg_rate";
    public static final String getStoriesOrderByNumOfScreen = getStoriesByKeyword + " " + "order by (select count(sc.id) from screen sc where sc.story_id = s.id)";
}
