package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.storemap.service.AnnounceServiceImple;
import org.storemap.service.EventServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/main")
@Controller
public class MainController {
	@Autowired
	private AnnounceServiceImple announceService;
	@Autowired
	private EventServiceImple eventService;
	@Autowired
	private StoreServiceImple storeService;
}
