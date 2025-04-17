package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.storemap.service.MenuServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/store")
@Controller
public class StoreController {
	@Autowired
	private StoreServiceImple storeService;
	@Autowired
	private MenuServiceImple menuService;
	@Autowired
	private ReviewServiceImple reviewService; 
}
