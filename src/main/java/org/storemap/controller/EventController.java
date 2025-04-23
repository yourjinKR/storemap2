package org.storemap.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.storemap.domain.CommentEventVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventVO;
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
	
	//이벤트 등록 화면으로 이동
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
	 
	
	@GetMapping("/eventRegister")
	public String eventRegister() {
		return "index";
	}
	
	//이벤트 상세보기 화면으로 이동	
	@GetMapping("/eventView")
	public String eventView(Model model, @RequestParam("event_idx") int event_idx) {
		model.addAttribute("vo", eventService.getEventOneView(event_idx));
		
		log.info("eventVO..." + event_idx);
		
		return "index";
	}
	
	//이벤트 수정 화면으로 이동
	@GetMapping("/eventModify")
	public String eventModify() {
		return "index";
	}
	
	//댓글 리스트 불러오는 비동기 메소드
	 @GetMapping("/replyList")
	 @ResponseBody
	 public List<CommentEventVO> replyList(@RequestParam("comment_idx") int comment_idx){
		 log.info("replyList..." + comment_idx);
		 return commentEventService.replyList(comment_idx);
	 }
	
}
