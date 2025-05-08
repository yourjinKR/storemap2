package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapDTO {
    private double lat, lng, kilometer; // 경도, 위도
    private int level, code, amount; // 확대 수준, 행정구역코드, 검색량
    private String keyword; // 검색 키워드
}
