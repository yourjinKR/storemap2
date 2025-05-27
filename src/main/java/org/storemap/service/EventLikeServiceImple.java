package org.storemap.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.EventVO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.mapper.EventLikeMapper;
import org.storemap.mapper.EventMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventLikeServiceImple implements EventLikeService{
	
	@Autowired
	private EventLikeMapper mapper;
	@Autowired
	private AttachFileMapper attachMapper;
	@Autowired
	private EventMapper eventMapper;
	
	@Override
	public List<EventVO> getLikeList(int member_idx) {
		List<EventVO> list = mapper.getLikeList(member_idx);
//		for (EventVO vo : list) {
//			if(vo.getEvent_file() != null) {
//				String[] arr = vo.getEvent_file().split(",");
//				List<AttachFileVO> fileList = new ArrayList<AttachFileVO>();
//				for (String uuid : arr) {
//					fileList.add(attachMapper.getAttach(uuid));
//				}
//				vo.setAttachFile(fileList);
//			}
//		}
		return mapper.getLikeList(member_idx);
	}
	
	@Override
	public void addLike(int eventIdx, int memberIdx) {
	    if (!mapper.existsLike(eventIdx, memberIdx)) {  // 존재하지 않으면
	        mapper.insertLike(eventIdx, memberIdx);
	        eventMapper.incrementLike(eventIdx);
	    }
	}

	@Override
	public void removeLike(int eventIdx, int memberIdx) {
	    if (mapper.existsLike(eventIdx, memberIdx)) {  // 존재하면
	        mapper.deleteLike(eventIdx, memberIdx);
	        eventMapper.decrementLike(eventIdx);
	    }
	}

    @Override
    public boolean hasLiked(int eventIdx, int memberIdx) {
    	return mapper.existsLike(eventIdx, memberIdx);
    }
}
