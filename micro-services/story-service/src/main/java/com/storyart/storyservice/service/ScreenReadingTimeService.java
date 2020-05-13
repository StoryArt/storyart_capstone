package com.storyart.storyservice.service;

import com.storyart.storyservice.dto.statistic.IScreenValueResponse;
import com.storyart.storyservice.dto.statistic.PagedResponse;
import com.storyart.storyservice.dto.statistic.ScreenTimeResponse;
import com.storyart.storyservice.exception.BadRequestException;
import com.storyart.storyservice.model.Screen;
import com.storyart.storyservice.repository.ScreenReadingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

public interface ScreenReadingTimeService {

//
//    Integer countDurationInTimeRange(Integer screenId, String start, String end);

    List<ScreenTimeResponse> getListDurationOfEachSreenInTimeRangeByStoryId(Integer storyId, String start, String end);

    PagedResponse<IScreenValueResponse>
    getSrTimeViewAndAvg(int page, int size, String timeViewOrPer,
                        boolean asc, Integer sid, String startDate, String endDate);

}

@Service
class ScreenReadingTimeImpl implements ScreenReadingTimeService {


    @Autowired
    ScreenReadingTimeRepository readingTimeRepository;
    @Autowired
    EntityManager entityManager;
    @Autowired
    ScreenService screenService;

    @Override
    public List<ScreenTimeResponse> getListDurationOfEachSreenInTimeRangeByStoryId(Integer sid, String startDate, String endDate) {
        List<Screen> screensByStoryId = screenService.getScreensByStoryId(sid);

        List<ScreenTimeResponse> list = new ArrayList<>();
        Query query = entityManager.createNativeQuery("select sum(duration) from storyart_db.screen_reading_time where screen_id= :screenId and (created_at between :startDate and :endDate)");
        for (Screen screen : screensByStoryId) {
            String screenId = screen.getId();
            query.setParameter("screenId", screenId);
            query.setParameter("startDate", startDate);
            query.setParameter("endDate", endDate);
// ben t cung mat r , de tim lai troing history
            Object singleResult = query.getSingleResult();
            long sumtime = 0;
            if (singleResult != null) {
                sumtime = ((Number) singleResult).longValue();
            }
//            Integer sumtime = countDurationInTimeRange(screenId, startDate, endDate);
            ScreenTimeResponse screenTimeResponse = new ScreenTimeResponse();
            screenTimeResponse.setId(screenId);
            screenTimeResponse.setContent(screen.getContent());
            screenTimeResponse.setTitle(screen.getTitle());
            screenTimeResponse.setStoryId(sid);
            screenTimeResponse.setSumtime(sumtime);
            //add
            list.add(screenTimeResponse);
        }
        Collections.sort(list, Collections.reverseOrder());
        return list;
    }


    boolean checkOrderBy(String timeViewOrPer) {
        if (timeViewOrPer.equals("sumtime")) {
            return true;
        } else if (timeViewOrPer.equals("viewcount")) {
            return true;
        } else if (timeViewOrPer.equals("timeperview")) {
            return true;
        }
        return false;
    }

    @Override
    public PagedResponse<IScreenValueResponse>
    getSrTimeViewAndAvg(int page, int size, String timeViewOrPer,
                        boolean asc, Integer sid, String startDate, String endDate) {
        validatePageNumberAndSize(page, size);
        Pageable pageable = null;
        if (!checkOrderBy(timeViewOrPer)) {
            throw new BadRequestException("Không tìm thấy dữ liệu!");
        }
        if (!asc) {
            pageable = PageRequest.of(page-1, size, Sort.by(timeViewOrPer).descending());
        } else {
            pageable = PageRequest.of(page-1, size, Sort.by(timeViewOrPer).ascending());
        }
        List<Screen> screensByStoryId = screenService.getScreensByStoryId(sid);
        List<String> screenIds = new ArrayList<>();
        Iterator<Screen> iterator = screensByStoryId.iterator();
        while (iterator.hasNext()) {
            screenIds.add(iterator.next().getId());
        }
        Page<IScreenValueResponse> viewResponsePage = readingTimeRepository.findScreensAndCalTimeViewAndTimePerView(screenIds,
                startDate, endDate, pageable);
        List<IScreenValueResponse> viewResponses = viewResponsePage.toList();
        return new PagedResponse<IScreenValueResponse>(viewResponses,
                viewResponsePage.getNumber(), viewResponsePage.getSize(),
                viewResponsePage.getTotalElements(),
                viewResponsePage.getTotalPages(), viewResponsePage.isLast());
    }

    private void validatePageNumberAndSize(int page, int size) {
        if (page < 0) {
            throw new BadRequestException("Trang không dưới 0");
        }
    }


}
