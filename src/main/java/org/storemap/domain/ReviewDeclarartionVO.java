package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewDeclarartionVO {
	private int review_idx, member_idx;
	private String declaration_category, declaration_content;
}
