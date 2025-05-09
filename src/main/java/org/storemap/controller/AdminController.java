package org.storemap.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.storemap.domain.AnnounceDTO;
import org.storemap.domain.AnnounceResponseDTO;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventResponseDTO;
import org.storemap.domain.FilterVO;
import org.storemap.domain.PageDTO;
import org.storemap.domain.StoreRequestVO;
import org.storemap.service.AnnounceServiceImple;
import org.storemap.service.CommentDeclarationServiceImple;
import org.storemap.service.EnterRequestServiceImple;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventDeclarationServiceImple;
import org.storemap.service.EventLikeServiceImple;
import org.storemap.service.EventRequestServiceImple;
import org.storemap.service.EventServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.ReviewDeclarationServiceImple;
import org.storemap.service.ReviewServiceImple;
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
	private ReviewServiceImple reviewService;
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
	@Autowired
	private AnnounceServiceImple announceService;
	
	
	@GetMapping("/adminMain")
	public String adminMain(Model model) {
		log.info("adminMainGet...");
		model.addAttribute("storeReportList",storeDeclService.getDeclarationMap());
		model.addAttribute("reviewReportList",reviewDeclService.getDeclarationMap());
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
	@PostMapping("/adminStoreView")
	public String storeApproval(int member_idx) {
		log.info("storeApproval..."+member_idx);
		storeReqService.modify(member_idx);
		return "redirect:/admin/adminStoreView";
	}
	@GetMapping("/adminStoreView")
	public String adminStoreView(Model model) {
		log.info("adminStoreViewGet...");
		model.addAttribute("reqList", storeReqService.getDisReqList());
		return "index";
	}
	@GetMapping("/adminMemberView")
	public String adminMemberView() {
		log.info("adminMemberViewGet...");
		return "index";
	}
	
	// 점포 숨기기
	@PostMapping("/storeReportHide")
	public String storeReportHide(int store_idx, int member_idx) {
		log.info("storeReportHide..."+store_idx);
		storeService.hide(store_idx);
		storeDeclService.remove(store_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	// 점포 숨기기 해제
	@PostMapping("/storeReportunHide")
	public String storeReportunHide(int store_idx) {
		log.info("storeReportunHide..."+store_idx);
		storeService.unhide(store_idx);
		return "redirect:/admin/adminMain";
	}
	
	// 리뷰 숨기기
	@PostMapping("/reviewReportHide")
	public String reviewReportHide(int review_idx, int member_idx) {
		log.info("reviewReportHide..."+review_idx);
		reviewService.hide(review_idx);
		reviewDeclService.remove(review_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	// 리뷰 숨기기 해제
	@PostMapping("/reviewReportunHide")
	public String reviewReportunHide(int review_idx) {
		log.info("reviedwReportunHide..."+review_idx);
		reviewService.unhide(review_idx);
		return "redirect:/admin/adminMain";
	}
	
	// 점포 승인 취소
	@PostMapping("/adminStoreRemove")
	public String adminStoreRemove(int member_idx) {
		log.info("adminStoreRemove..."+member_idx);
		storeReqService.remove(member_idx);
		return "redirect:/admin/adminStoreView";
	}
	// 점포 신고 취소
	@PostMapping("/storeReportRemove")
	public String storeReportRemove(int store_idx, int member_idx) {
		log.info("storeReportRemove..."+store_idx+", "+member_idx);
		storeDeclService.remove(store_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	// 리뷰 신고 취소
	@PostMapping("/reviewReportRemove")
	public String reviewReportRemove(int review_idx, int member_idx) {
		log.info("reviewReportRemove..."+review_idx+", "+member_idx);
		reviewDeclService.remove(review_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	
	@GetMapping("/notice")
	public String adminNotice() {
		return "index";
	}
	
	@GetMapping(value = "/getNotice",
			produces = {
					MediaType.APPLICATION_JSON_VALUE
			})
	public ResponseEntity<AnnounceResponseDTO> getNotice(
				Criteria cri, 
				String search) {
		
		FilterVO filter = new FilterVO();
		filter.setCri(cri);
		filter.setBoard_search(search);
		
		int total = announceService.getListCount(filter);
		PageDTO pdto = new PageDTO(cri, total);
		AnnounceResponseDTO resDto = new AnnounceResponseDTO(pdto, announceService.getNotice(filter));
		return new ResponseEntity<AnnounceResponseDTO>(resDto, HttpStatus.OK);
	}
	
}
