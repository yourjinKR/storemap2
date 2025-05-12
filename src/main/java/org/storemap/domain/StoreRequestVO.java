package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StoreRequestVO {
	private int member_idx, pon;
	
	private StoreVO store;   // 조인 대상 필드
	private MemberVO member; // 조인 대상 필드
}