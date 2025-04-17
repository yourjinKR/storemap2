package org.storemap.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttachFileVO {
	private int attach_idx, event_idx, store_idx, enter_idx;
	private String filename;
}
