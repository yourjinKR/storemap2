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
import org.storemap.service.EventServiceImple;

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
	                             @RequestParam("eventImage") MultipartFile eventImage) {
	    log.info("eventRegister....." + eventVO);

	    // 파일이 업로드된 경우 처리
	    if (!eventImage.isEmpty()) {
	        try {
	            // 업로드된 파일의 이름을 가져옴
	            String fileName = eventImage.getOriginalFilename(); // 파일명만 추출
	            eventVO.setEvent_file(fileName);  // event_file 필드에 파일명 저장

	        } catch (Exception e) {
	            log.error("파일 처리 중 오류 발생: " + e.getMessage());
	            return "errorPage";  // 오류 페이지로 이동 (파일 업로드 실패 시)
	        }
	    }

	    try {
	        // 파일명만 포함된 EventVO 객체를 서비스에 전달하여 DB에 저장
	    	eventService.registerEventWithDays(eventVO);  // 서비스 호출
	    } catch (RuntimeException e) {
	        log.error("에러 발생: " + e);
	    }

	    return "redirect:/event/eventRegister";  // 등록 완료 후 이벤트 목록 페이지로 리다이렉트
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
	    model.addAttribute("vo", vo);

	    log.info("eventVO..." + vo);

	    int totalMax = 0;
	    String startDate = "";
	    String endDate = "";

//	    if (vo != null) {
//	        try {
//	            if (vo.getEvent_list_max() != null && !vo.getEvent_list_max().isEmpty()) {
//	                totalMax = Integer.parseInt(vo.getEvent_list_max());
//	            }
//	            if (vo.getEvent_bstartdate() != null) {
//	                startDate = vo.getEvent_bstartdate().toLocalDate().toString();
//	            }
//	            if (vo.getEvent_bstopdate() != null) {
//	                endDate = vo.getEvent_bstopdate().toLocalDate().toString();
//	            }
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	        }
//	        
//	    }

	    // 3. 필요한 데이터 추가로 전달
	    model.addAttribute("totalMax", totalMax);
	    model.addAttribute("startDate", startDate);
	    model.addAttribute("endDate", endDate);
	    
	    if (!startDate.isEmpty() && !endDate.isEmpty() && totalMax > 0) {
	        LocalDate start = LocalDate.parse(startDate);
	        LocalDate end = LocalDate.parse(endDate);
	        long days = ChronoUnit.DAYS.between(start, end) + 1;

	        int maxPerDay = (int) Math.floor((double) totalMax / days);
	        model.addAttribute("maxPerDay", maxPerDay); //  JSP에서 사용할 수 있도록 전달
	    } else {
	        model.addAttribute("maxPerDay", 0); // 예외 처리
	    }
	    
	    // 댓글 목록도 같이 담기
	    List<CommentEventVO> commentList = commentEventService.replyList(event_idx);
	    model.addAttribute("commentList", commentList);
	    
	    return "index"; // 또는 "eventView"
	}



	

}
