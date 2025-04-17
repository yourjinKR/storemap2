package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
