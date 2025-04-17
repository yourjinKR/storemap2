package org.storemap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.storemap.service.CommentDeclarationServiceImple;
import org.storemap.service.EnterRequestServiceImple;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventDeclarationServiceImple;
import org.storemap.service.EventLikeServiceImple;
import org.storemap.service.EventRequestServiceImple;
import org.storemap.service.EventServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.ReviewDeclarartionServiceImple;
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
	private ReviewDeclarartionServiceImple reviewDeclService;
	@Autowired
	private CommentDeclarationServiceImple commentDeclService; 
}
