package org.storemap.controller;

import java.io.File;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.CommentEventVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventDayVO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventResponseDTO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MapDTO;
import org.storemap.domain.PageDTO;
import org.storemap.service.CommentEventServiceImple;
import org.storemap.service.EventDayService;
import org.storemap.service.EventDayServiceImple;
import org.storemap.service.EventRequestService;
import org.storemap.service.EventServiceImple;

import com.sun.jdi.request.EventRequest;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/event")
@Controller
public class EventController {
	@Autowired
	private EventServiceImple eventService;
	@Autowired
	private EventDayServiceImple eventDayService;
	@Autowired
	private CommentEventServiceImple commentEventService;
	@Autowired
	private EventRequestService eventRequestService;
	
	@GetMapping("/eventList")
	public String eventList() {	
		return "index";
	}
	
	@PostMapping(value = "/eventFilter",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
			},
			consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<EventResponseDTO> eventFilter(@RequestBody EventFilterVO filter, Criteria cri, Model model) {
		cri.setPageNum(filter.getPage_num());
		cri.setAmount(filter.getAmount_num());
		
		int total = eventService.getListCount(filter);
		PageDTO pdto = new PageDTO(cri, total);
		EventDTO edto = new EventDTO(filter, cri);
		EventResponseDTO resdto = new EventResponseDTO(pdto, eventService.getFilterList(edto));
		
		return new ResponseEntity<EventResponseDTO>(resdto,HttpStatus.OK);
	}

	@PostMapping(value = "/eventFilter/keyword",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
			},
			consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<EventVO>> eventFilterKeyword(@RequestBody MapDTO map, Model model) {
		log.info("eventFilterKeyword..."+ map);
		return new ResponseEntity<List<EventVO>>(eventService.getEventListByKeyword(map), HttpStatus.OK);
	}
	
	@ResponseBody
	@GetMapping("/favorite/{event_idx}") 
	public int updateFavorite(@PathVariable("event_idx") int event_idx) {
		eventService.updateFavorite(event_idx);
		return 1; 
	}
	
	@PostMapping("/eventRegister")
	public String eventRegister(EventVO eventVO, 
	                            @RequestParam("eventImage") MultipartFile[] files,
	                            HttpSession session) {
	    log.info("eventRegister....." + eventVO);

	    try {
	        eventService.registerEventWithDays(eventVO, files);
	    } catch (RuntimeException e) {
	        log.error("에러 발생: " + e);
	        return "errorPage";
	    }

	    return "redirect:/event/eventRegister"; // 성공 시 등록 페이지로 리다이렉트
	}
	
	//이벤트 등록 화면 보여주는 컨트롤러
	@GetMapping("/eventRegister")
	public String showEventRegister() {
		return "index";
	}
	//이벤트 상세보기 화면으로 이동	
	@GetMapping("/eventView")
	public String eventView(Model model, @RequestParam("event_idx") int event_idx) {
	    EventVO vo = eventService.getEventOneView(event_idx);
	    AttachFileVO avo = new AttachFileVO();
	    List<EventDayVO> eday = eventDayService.getEventDaysByEventId(event_idx);

	    model.addAttribute("evo", vo);
	    model.addAttribute("avo", avo);
	    model.addAttribute("eventDayList", eday);
	    log.info("eventVO..." + vo);
	    
	    return "index";
	}
	// 이벤트 입점신청 요청
	@PostMapping("/eventView")
	public String eventRequest(@RequestParam int eday_idx, @RequestParam int store_idx) {
		eventRequestService.eventRequest(eday_idx, store_idx);
		int event_idx = eventRequestService.getEventIdxByEdayIdx(eday_idx);
		return "redirect:/event/eventView?event_idx=" + event_idx;
	}
	


	

}
