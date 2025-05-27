package org.storemap.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.EventDeclarationVO;
import org.storemap.domain.EventVO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.mapper.EventDeclarationMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EventDeclarationServiceImple implements EventDeclarationService{
	@Autowired
	private EventDeclarationMapper mapper;
	@Autowired
	private AttachFileMapper attachMapper;
	
	@Override
	public int submitReport(EventDeclarationVO reportVO) {
			return mapper.insertReport(reportVO);
			
	}
	
	@Override
	public int remove(int event_idx, int member_idx) {
		log.info("remove..."+event_idx+", "+member_idx);
		int result = mapper.delete(event_idx, member_idx);
		return result;
	}
	
	@Override
	public int removeAll(int event_idx) {
		log.info("removeAll...");
		int result = mapper.deleteAll(event_idx);
		return result;
	}
	
	@Override
	public List<EventDeclarationVO> getDeclarationMap() {
		log.info("getDeclarationMap...");
		List<EventDeclarationVO> list = mapper.getEventDeclarationMap();
		for(EventDeclarationVO vo : list) {
			EventVO evo = vo.getEvent();
			if(evo.getEvent_file() != null) {
				String[] file = evo.getEvent_file().split(",");
				List<AttachFileVO> attachList = new ArrayList<AttachFileVO>();
				
				AttachFileVO attach = new AttachFileVO();
                int idxof = file[0].indexOf("https://kfescdn.visitkorea.or.kr/kfes/upload/contents/db/");
                if(idxof == -1) {
                    attach = attachMapper.getAttach(file[0]);
                }else {
                    attach.setFilename(file[0]);
                }
                
				if(attach != null) {
					attachList.add(attach);
				}
				evo.setAttachFile(attachList);
			}
		}
		return list;
	}
	
	@Override
	public List<EventDeclarationVO> getDeclarationDetailMap() {
		log.info("getDeclarationDetailMap...");
		return mapper.getEventDeclarationDetailMap();
	}
	
	public boolean hasAlreadyDeclared(int memberIdx, int eventIdx) {
	    int count = mapper.countByMemberAndEvent(memberIdx, eventIdx);
	    System.out.println("[Mapper 반환값] 중복 신고 건수 count = " + count);
	    return count > 0;
	}
	
}
