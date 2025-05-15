package org.storemap.domain;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnounceVO {
	private int announce_idx, member_idx, fixed;
	private String announce_title, announce_content, announce_image;
	private Date announce_regdate;

	private List<AttachFileVO> attach_list;
}
