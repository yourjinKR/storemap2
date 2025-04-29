package org.storemap.controller;

import java.io.File;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
import org.storemap.domain.PageDTO;
import org.storemap.service.AttachFileService;
import org.storemap.service.AttachFileServiceImple;
import org.storemap.service.CommentEventServiceImple;
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
	private AttachFileServiceImple attachFileService;
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
	public ResponseEntity<EventResponseDTO> eventFilter(@RequestBody EventFilterVO filter, Criteria cri, Model model, String pageNum, String amount) {
		List<EventVO> list = null;

		cri.setPageNum(filter.getPage_num());
		cri.setAmount(filter.getAmount_num());
		
		int total = eventService.getListCount();
		PageDTO pdto = new PageDTO(cri, total);
		EventDTO edto = new EventDTO(filter, cri);
		EventResponseDTO resdto = new EventResponseDTO(pdto, eventService.getFilterList(edto));
		
		
		return new ResponseEntity<EventResponseDTO>(resdto,HttpStatus.OK);
	}
	
	
	@ResponseBody
	@GetMapping("/favorite/{event_idx}") 
	public int updateFavorite(@PathVariable("event_idx") int event_idx) {
		eventService.updateFavorite(event_idx);
		return 1; 
	}
	
	// 게시글 등록
	@PostMapping("/eventRegister")
	public String createEvent(EventVO eventVO,
	                          @RequestParam("eventDays") List<EventDayVO> eventDays,
	                          @RequestParam("eventImage") MultipartFile eventImage,
	                          HttpServletRequest request,
	                          Model model) {
	    try {
	        int result = eventService.insertEvent(eventVO);

	        if (result == 1) {
	            // 파일 저장
	            if (!eventImage.isEmpty()) {
	                // 실제 물리적 경로 얻기
	                String uploadFolder = "resources/img/";
	                String realPath = request.getServletContext().getRealPath("/") + uploadFolder;

	                // 디렉토리가 존재하지 않으면 생성
	                File dir = new File(realPath);
	                if (!dir.exists()) {
	                    dir.mkdirs();
	                }

	                String filename = eventImage.getOriginalFilename();
	                File saveFile = new File(realPath, filename);
	                eventImage.transferTo(saveFile);

	                // DB에 저장할 파일 정보
	                AttachFileVO attachVO = new AttachFileVO();
	                attachVO.setEvent_idx(eventVO.getEvent_idx());
	                attachVO.setEnter_idx(eventVO.getEnter_idx());
	                attachVO.setFilename(filename); // 저장된 파일명만 DB에 저장

	                attachFileService.insertAttachfile(attachVO);
	            }

	            // 날짜별 예약 저장
	            for (EventDayVO day : eventDays) {
	                day.setEvent_idx(eventVO.getEvent_idx());
	                eventDayService.insertEventDay(day);
	            }

	            return "redirect:/event/eventList";

	        } else {
	            model.addAttribute("errorMessage", "이벤트 저장에 실패했습니다.");
	            return "errorPage";
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        model.addAttribute("errorMessage", "이벤트 등록 중 오류가 발생했습니다.");
	        return "errorPage";
	    }
	}
	
	//이벤트 등록 화면 보여주는 컨트롤러
	@GetMapping("/eventRegister")
	public String showEventRegister() {
		log.info("eventRegister...");
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
