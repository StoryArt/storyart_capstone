package com.storyart.storyservice.service;

import com.storyart.storyservice.model.ScreenReadingTime;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface ScreenReadingTimeService {

   void updatetime(Integer rhId, List<ScreenReadingTime> readingTimeList);

}


class ScreenReadingTimeImpl implements  ScreenReadingTimeService{


    @Override
    public void updatetime(Integer rhId, List<ScreenReadingTime> readingTimeList) {

        //voi history id







    }
}
