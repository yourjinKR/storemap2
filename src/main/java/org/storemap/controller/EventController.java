package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.storemap.domain.EventVO;
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
	public String eventList() {
		return "index";
	}
	
	@GetMapping("/eventRegister")
	public String eventRegister() {

		return "index";
	}
	
	//이벤트 상세보기 화면으로 이동	
	@GetMapping("/eventView")
	public String eventView() {
		
		return "index";
	}
	
	//이벤트 수정 화면으로 이동
	@GetMapping("/eventModify")
	public String eventModify() {
		return "index";
	}
}
