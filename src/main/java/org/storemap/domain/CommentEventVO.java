package org.storemap.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class CommentEventVO {
	private int comment_idx, member_idx, event_idx, comment_like_cnt, comment_hidden;
	private String comment_content;
	private Date comment_regdate;
}
