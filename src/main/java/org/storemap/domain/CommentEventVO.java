package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentEventVO {
	private int comment_idx, member_idx, event_idx, comment_like_cnt, comment_hidden;
	private String comment_content, comment_writer;
	private Date comment_regdate;
}
