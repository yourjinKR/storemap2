package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnounceVO {
	private int announce_idx, member_idx, fixed;
	private String announce_title, announce_content, announce_imgae;
	private Date announce_regdate;

}
