package org.storemap.domain;

import lombok.Data;

@Data
public class ReviewDeclrartionVO {
	private int review_idx, member_idx;
	private String declaration_category, declaration_content;
}
