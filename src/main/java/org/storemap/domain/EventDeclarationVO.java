package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDeclarationVO {
	private int event_idx, member_idx;
	private String declaration_category, declaration_content;
	private Date regdate;
	
	private AttachFileVO attach; // 조인 대상 필드
}
