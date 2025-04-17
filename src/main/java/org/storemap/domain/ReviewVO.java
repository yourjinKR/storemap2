package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewVO {
	private int review_idx, store_idx, member_idx, review_star, review_like_cnt, review_hidden;
	private String review_title, review_content, review_image;
	private Date review_regdate;
}
