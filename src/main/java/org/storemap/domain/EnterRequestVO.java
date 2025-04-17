package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EnterRequestVO {
	private int member_idx, pon;
}
