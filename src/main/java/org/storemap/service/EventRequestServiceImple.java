package org.storemap.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EventRequestVO;
import org.storemap.domain.StoreVO;
import org.storemap.mapper.EventDayMapper;
import org.storemap.mapper.EventRequestMapper;
import org.storemap.mapper.MenuMapper;
import org.storemap.mapper.StoreDeclarationMapper;
import org.storemap.mapper.StoreMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventRequestServiceImple implements EventRequestService{
    @Autowired
    private EventRequestMapper mapper;
    @Autowired
    private EventDayMapper eventDayMapper;
    @Autowired
    private StoreMapper storeMapper;
    @Autowired
    private StoreDeclarationMapper sdMapper;
    @Autowired
    private MenuMapper menuMapper;
	
	@Override
		public int eventRequest(int eday_idx, int store_idx) {
			return mapper.eventRequest(eday_idx, store_idx);
		}
	
    @Override
    public int cancelEntry(int edayIdx, int storeIdx) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("edayIdx", edayIdx);
        paramMap.put("storeIdx", storeIdx);
        return mapper.cancelEntry(paramMap);
    }
	
	@Override
	public int getEventIdxByEdayIdx(int eday_idx) {
		return eventDayMapper.getEventIdxByEdayIdx(eday_idx);
	}
	
	@Override
	public List<Integer> getAppliedEdayIdxList(int storeIdx) {
		return mapper.selectAppliedEdayIdxList(storeIdx);
	}
	
	// 입점 신청 리스트
	@Override
	public List<EventRequestVO> getEdayRequest(int eday_idx){
		List<EventRequestVO> list = mapper.getEdayRequest(eday_idx);
		for (EventRequestVO vo : list) {
			StoreVO svo = storeMapper.read(vo.getStore_idx());
			svo.setReport_cnt(sdMapper.getCount(vo.getStore_idx()));
			svo.setJoin_menu(menuMapper.getMenuList(svo.getStore_idx()));
			vo.setJoin_store(svo);
		}
		return list;
	}
	// 입점 승인
	@Override
	public int updateRequest(int eday_idx, int store_idx) {
		mapper.updateRequest(eday_idx, store_idx);
		return 0;
	}
	// 입점 거절
	@Override
	public int deleteRequest(int eday_idx, int store_idx) {
		mapper.deleteRequest(eday_idx, store_idx);
		return 0;
	}
}
