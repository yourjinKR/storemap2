package org.storemap.domain;

import lombok.Data;

@Data
public class EventDeclarationVO {
	private int event_idx, member_idx;
	private String declaration_category, declaration_content;
}
