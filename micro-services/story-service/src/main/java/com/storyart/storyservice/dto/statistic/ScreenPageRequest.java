package com.storyart.storyservice.dto.statistic;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScreenPageRequest {
    int page;
    int size;
    String orderBy;
    boolean asc;
    String start;
    String end;
}
