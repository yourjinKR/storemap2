package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.storemap.service.TestService;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class TestController {

	@Autowired
	private TestService service;

	@GetMapping("/test")
	public void test() {
		int result = service.test();
		
		log.info("controller page : " + result);
	}

	@GetMapping("/content/event/eventList")
	public String eventList() {
		return "/index";
	}
}
