package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EnterRequestVO {
	private int enter_idx, pon;
	private Date regdate;
	
	private EnterVO enter; // 조인 대상 필드
	
}
