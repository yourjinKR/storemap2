package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttachFileVO {
	private int attach_idx, event_idx, store_idx, enter_idx;
	private String filename;
}
