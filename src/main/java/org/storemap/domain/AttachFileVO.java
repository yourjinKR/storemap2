package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttachFileVO {
	private int attach_idx;
	private String filename, uuid;
	
    public String getUrl() {
        return "https://res.cloudinary.com/dbdkdnohv/image/upload/v1747269979/" + uuid + "_" + filename;
    }
}