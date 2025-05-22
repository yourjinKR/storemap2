package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDeclarationVO {
	private int review_idx, member_idx;
	private String declaration_category, declaration_content;
	private Date regdate;
	
	private ReviewVO review;   // 조인 대상 필드
	private MemberVO member; // 조인 대상 필드
	private AttachFileVO attach; // 조인 대상 필드
}
