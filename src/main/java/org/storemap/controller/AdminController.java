package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.storemap.service.CommentDeclarationServiceImple;
import org.storemap.service.EnterRequestServiceImple;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventDeclarationServiceImple;
import org.storemap.service.EventLikeServiceImple;
import org.storemap.service.EventRequestServiceImple;
import org.storemap.service.EventServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.ReviewDeclarationServiceImple;
import org.storemap.service.StoreDeclarationServiceImple;
import org.storemap.service.StoreLikeServiceImple;
import org.storemap.service.StoreRequestServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/admin")
@Controller
public class AdminController {
	@Autowired
	private MemberServiceImple memberService;
	@Autowired
	private EnterServiceImple enterService;
	@Autowired
	private StoreServiceImple storeService;
	@Autowired
	private EventServiceImple eventService;
	@Autowired
	private StoreRequestServiceImple storeReqService;
	@Autowired
	private EnterRequestServiceImple enterReqService;
	@Autowired
	private EventRequestServiceImple eventReqService;
	@Autowired
	private StoreDeclarationServiceImple storeDeclService;
	@Autowired
	private EventDeclarationServiceImple eventDeclService;
	@Autowired
	private ReviewDeclarationServiceImple reviewDeclService;
	@Autowired
	private CommentDeclarationServiceImple commentDeclService;
	
	@GetMapping("/adminMain")
	public String adminMain(Model model) {
		log.info("adminMainGet...");
		return "index";
	}
	@GetMapping("/adminEnterView")
	public String adminEnterView() {
		log.info("adminEnterViewGet...");
		return "index";
	}
	@GetMapping("/adminEventView")
	public String adminEventView() {
		log.info("adminEventViewGet...");
		return "index";
	}
	@GetMapping("/adminStoreView")
	public String adminStoreView(Model model) {
		log.info("adminStoreViewGet...");
		model.addAttribute("reqList", storeReqService.getDisReqList());
		// model.addAttribute("memberList", 1);
		return "index";
	}
	@GetMapping("/adminMemberView")
	public String adminMemberView() {
		log.info("adminMemberViewGet...");
		return "index";
	}

	
}
