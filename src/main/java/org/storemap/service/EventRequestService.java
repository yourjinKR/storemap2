package org.storemap.service;

public interface EventRequestService {
	public int eventRequest(int eday_idx, int store_idx);
	
	public int getEventIdxByEdayIdx(int eday_idx);
}
