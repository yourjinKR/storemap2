package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StoreRequestVO {
	private int member_idx, pon;
}
