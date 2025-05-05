package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MapDTO {
    private double lat, lng;
    private int level, code;
    private String keyword;
}
