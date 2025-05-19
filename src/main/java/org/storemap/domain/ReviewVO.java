package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewVO {
	private int review_idx, store_idx, review_like_cnt, review_hidden;
	private String review_writer, review_title, review_content, review_image, writer_image, review_star;
	private Date review_regdate;
	
	private String review_filename;
	private String writer_filename;
	private AttachFileVO attach;   // 조인 대상 필드
}
