package org.storemap.controller;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.storemap.domain.CommentEventVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventDayVO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MemberVO;
import org.storemap.domain.PageDTO;
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
	public String eventList(Model model, Criteria cri) {	
		List<EventVO> list = null;
		int parsePageNum = cri.getPageNum();
		int parseAmount = cri.getAmount();
		
		if(parsePageNum == 0) {
			cri.setPageNum(1);
		}
		if(parseAmount == 0) {
			cri.setAmount(15);
		}
		
		int total = eventService.getListCount();
		PageDTO pdto = new PageDTO(cri, total);
		list = eventService.getList(cri);
		
		model.addAttribute("list", list);
		model.addAttribute("pageMaker",pdto);
		
		return "index";
	}
	
	@ResponseBody
	@GetMapping("/favorite/{event_idx}") 
	public int updateFavorite(@PathVariable("event_idx") int event_idx) {
		eventService.updateFavorite(event_idx);
		return 1; 
	}
	 
	// 게시글 등록 컨트롤러
	@GetMapping("/eventRegister")
	public String eventRegister() {
		
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
