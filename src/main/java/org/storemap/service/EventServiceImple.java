package org.storemap.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.ApprovedStoreViewDTO;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventDayVO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MapDTO;
import org.storemap.domain.StoreVO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.mapper.EventDayMapper;
import org.storemap.mapper.EventMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
@ControllerAdvice
public class EventServiceImple implements EventService{
	
	@Autowired
	private EventMapper mapper;
	@Autowired
	private EventDayMapper  eventDayMapper;
	@Autowired
	private EventDayService eventDayService;
	@Autowired
	private CloudinaryService cloudService;
	@Autowired
	private AttachFileMapper attachMapper;
	
	
	// 메인 페이지 진행중인 이벤트
	@Override
	public List<EventVO> getLiveEvent() {
		List<EventVO> list = mapper.getLiveEvent();
		for (EventVO vo : list) {
			if(vo.getEvent_file() != null) {
				String[] file = vo.getEvent_file().split(",");
				List<AttachFileVO> attachList = new ArrayList<AttachFileVO>();
				AttachFileVO attach = attachMapper.getAttach(file[0]);
				if(attach != null) {
					attachList.add(attach);
				}
				vo.setAttachFile(attachList);
			}
		}
		return list;
	}
	// 메인 페이지 진행예정 이벤트
	@Override
	public List<EventVO> getSoonEvent() {
		List<EventVO> list = mapper.getSoonEvent();
		for (EventVO vo : list) {
			if(vo.getEvent_file() != null) {
				String[] file = vo.getEvent_file().split(",");
				List<AttachFileVO> attachList = new ArrayList<AttachFileVO>();
				AttachFileVO attach = attachMapper.getAttach(file[0]);
				if(attach != null) {
					attachList.add(attach);
				}
				vo.setAttachFile(attachList);
			}
		}
		return list;
	}
	
	// 메인페이지 선택 날짜 이벤트
	@Override
	public List<EventVO> getListEndDate(String searchDate) {
		return mapper.getListEndDate(searchDate);
	}
	
	// 이벤트 상세보기 페이지
	@Override
	public EventVO getEventOneView(int eventIdx) {
	    log.info("getEventOneView: " + eventIdx);
	    
	    // 기본 이벤트 정보 조회
	    EventVO event = mapper.getEventOneView(eventIdx);
	    if (event == null) {
	        log.warn("이벤트 정보를 찾을 수 없습니다. eventIdx=" + eventIdx);
	        return null;
	    }

	    String eventFile = event.getEvent_file();
	    List<String> cloudinaryUuids = new ArrayList<>();
	    List<String> externalUrls = new ArrayList<>();

	    // event_file에서 Cloudinary UUID와 외부 URL 분리
	    if (eventFile != null && !eventFile.isEmpty()) {
	        String[] fileParts = eventFile.split(",");
	        for (String part : fileParts) {
	            part = part.trim();
	            if (part.startsWith("http")) {
	                externalUrls.add(part);  // 외부 URL
	            } else {
	                cloudinaryUuids.add(part);  // Cloudinary UUID
	            }
	        }
	    }

	    // Cloudinary UUID를 AttachFileVO 객체로 변환
	    List<AttachFileVO> cloudinaryFiles = new ArrayList<>();
	    if (!cloudinaryUuids.isEmpty()) {
	        cloudinaryFiles = cloudService.getFilesByUuidList(cloudinaryUuids);
	    }

	    // 임시 필드로 데이터 저장 (DB에는 저장되지 않음)
	    event.setCloudinaryFiles(cloudinaryFiles);
	    event.setExternalUrls(externalUrls);

	    return event;
	}
	
	// 이벤트 리스트 갯수
	@Override
	public int getListCount(EventFilterVO filter) {
		return mapper.getListCount(filter);
	}
	
	// 이벤트 리스트
	@Transactional
	@Override
	public List<EventVO> getFilterList(EventDTO edto){
		List<EventVO> list = null;
		list = mapper.getFilterList(edto);
		return list;
	}
	
	// 이벤트 리스트 (검색어만)
	@Override
	public List<EventVO> getEventListByKeyword(MapDTO map) {
		return mapper.getEventListByKeyword(map);
	}

	// 이벤트 좋아요
	@Override
	public int updateFavorite(int event_idx) {
		return mapper.updateFavorite(event_idx);
	}
	
	// 이벤트 IDX
	@Override
	public List<EventVO> getIdx(int enter_idx) {
		return mapper.getIdx(enter_idx);
	}
	
	@Override
	public List<EventVO> getAttendEvent(int store_idx) {
		return mapper.getAttendEvent(store_idx);
	}
	
	// 이벤트 등록
	@Override
	public int insertEvent(EventVO eventVO) {
		return mapper.insertEvent(eventVO);
	}
	
	@Transactional
	@Override
	public void registerEventWithDays(EventVO eventVO, MultipartFile[] files) {
	    try {
	        String uuidData = "";
	        for (int i = 0; i < files.length; i++) {
	            uuidData += cloudService.uploadFile(files[i]);
	            if (i < files.length - 1) {
	                uuidData += ",";
	            }
	        }
	        eventVO.setEvent_file(uuidData); 

	        mapper.insertEvent(eventVO);

	        if (eventVO.getEventDay() != null) {
	            for (EventDayVO day : eventVO.getEventDay()) {
	                day.setEvent_idx(eventVO.getEvent_idx());
	                int result = eventDayMapper.insertEventday(day);

	                if (result == 0) {
	                    log.error("eventDay 삽입 실패  event_idx, eventDay: " + day.getEvent_idx() + ", " + day);
	                    throw new RuntimeException("트랜잭션 동작");
	                } else {
	                    log.info("eventDay 삽입 성공  event_idx, eventDay: " + day.getEvent_idx() + ", " + day);
	                }
	            }
	        }

	    } catch (RuntimeException e) {
	        System.out.println("예외 발생!");
	        e.printStackTrace();
	        throw e;
	    }
	}
	
    @Override
    public void incrementLike(int eventIdx) {
        mapper.incrementLike(eventIdx);
    }
    
    @Override
    public void decrementLike(int eventIdx) {
        mapper.decrementLike(eventIdx);
    }

    @Override
    public int getLikeCount(int eventIdx) {
        return mapper.getLikeCount(eventIdx);
    }
    
//    @Override
//    public List<ApprovedStoreViewDTO> getApprovedStoresGroupedByDay(int eventIdx) {
//        List<EventDayVO> eventDays = eventDayService.getEventDaysByEventId(eventIdx);
//        List<ApprovedStoreViewDTO> result = new ArrayList<>();
//
//        for (EventDayVO day : eventDays) {
//            List<StoreVO> approvedStores = mapper.getApprovedStoresByEdayIdx(day.getEday_idx());
//
//            ApprovedStoreViewDTO dto = new ApprovedStoreViewDTO();
//            dto.setEventDay(day);
//            dto.setStores(approvedStores);
//
//            result.add(dto);
//        }
//
//        return result;
//    }
    

}
