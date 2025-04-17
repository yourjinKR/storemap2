package org.storemap.domain;

import lombok.Data;

@Data
public class StoreDeclarationVO {
	private int store_idx, member_idx;
	private String declaration_category, declaration_content;
}
