package org.storemap.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApprovedStoreViewDTO {
	
	private EventDayVO eventDay;   
	private List<StoreVO> stores; 
	
}
