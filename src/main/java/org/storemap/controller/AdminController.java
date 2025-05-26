package org.storemap.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.AnnounceResponseDTO;
import org.storemap.domain.AnnounceVO;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.FilterVO;
import org.storemap.domain.PageDTO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.service.AnnounceServiceImple;
import org.storemap.service.CloudinaryService;
import org.storemap.service.CommentDeclarationServiceImple;
import org.storemap.service.EnterRequestServiceImple;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventDeclarationServiceImple;
import org.storemap.service.EventRequestServiceImple;
import org.storemap.service.EventServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.ReviewDeclarationServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreDeclarationServiceImple;
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
	
	// 관리자 신고 페이지
	@GetMapping("/adminMain")
	public String adminMain(Model model) {
		log.info("adminMainGet...");
		// 유저리뷰
		model.addAttribute("reviewHiddenList", reviewService.getHiddenList());
		model.addAttribute("reviewReportList", reviewDeclService.getDeclarationMap());
		model.addAttribute("reviewReportDetailList", reviewDeclService.getDeclarationDetailMap());
		// 점포
		model.addAttribute("storeHiddenList", storeService.getHiddenList());
		model.addAttribute("storeRequestList", storeReqService.getDisReqListMap());
		model.addAttribute("storeReportList", storeDeclService.getDeclarationMap());
		model.addAttribute("storeReportDetailList", storeDeclService.getDeclarationDetailMap());
		// 기업
		model.addAttribute("enterRequestList", enterReqService.getDisReqListMap());
		// 이벤트
		model.addAttribute("eventHiddenList", eventService.getHiddenList());
		model.addAttribute("eventReportList", eventDeclService.getDeclarationMap());
		model.addAttribute("eventReportDetailList", eventDeclService.getDeclarationDetailMap());
		return "index";
	}
	
	// 리뷰 숨기기
	@PostMapping("/reviewReportHide")
	public String reviewReportHide(int review_idx) {
		log.info("reviewReportHide..."+review_idx);
		reviewService.hide(review_idx);
		reviewDeclService.removeAll(review_idx);
		return "redirect:/admin/adminMain";
	}
	// 리뷰 숨기기 해제
	@PostMapping("/reviewReportunHide")
	public String reviewReportunHide(int review_idx) {
		log.info("reviedwReportunHide..."+review_idx);
		reviewService.unhide(review_idx);
		return "redirect:/admin/adminMain";
	}
	// 리뷰 신고 취소
	@PostMapping("/reviewReportRemove")
	public String reviewReportRemove(int review_idx, int member_idx) {
		log.info("reviewReportRemove..."+review_idx+", "+member_idx);
		reviewDeclService.remove(review_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	// 리뷰 신고 전체 취소
	@PostMapping("/reviewReportRemoveAll")
	public String reviewReportRemoveAll(int review_idx) {
		log.info("storeReportRemoveAll..."+review_idx);
		reviewDeclService.removeAll(review_idx);
		return "redirect:/admin/adminMain";
	}
	
	// 점주 승인
	@PostMapping("/storeApproval")
	public String storeApproval(int member_idx) {
		log.info("storeApproval..."+member_idx);
		storeReqService.modify(member_idx);
		memberService.approvalOwner(member_idx);
		return "redirect:/admin/adminMain";
	}
	// 점주 승인 취소
	@PostMapping("/storeDisallow")
	public String storeDisallow(int member_idx) {
		log.info("storeDisallow..."+member_idx);
		storeService.removeStore(member_idx);
		storeReqService.remove(member_idx);
		return "redirect:/admin/adminMain";
	}
	// 점포 숨기기
	@PostMapping("/storeReportHide")
	public String storeReportHide(int store_idx) {
		log.info("storeReportHide..."+store_idx);
		storeService.hide(store_idx);
		storeDeclService.removeAll(store_idx);
		return "redirect:/admin/adminMain";
	}
	// 점포 숨기기 해제
	@PostMapping("/storeReportunHide")
	public String storeReportunHide(int store_idx) {
		log.info("storeReportunHide..."+store_idx);
		storeService.unhide(store_idx);
		return "redirect:/admin/adminMain";
	}
	// 점포 신고 취소
	@PostMapping("/storeReportRemove")
	public String storeReportRemove(int store_idx, int member_idx) {
		log.info("storeReportRemove..."+store_idx+", "+member_idx);
		storeDeclService.remove(store_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	// 점포 신고 전체 취소
	@PostMapping("/storeReportRemoveAll")
	public String storeReportRemoveAll(int store_idx) {
		log.info("storeReportRemoveAll..."+store_idx);
		storeDeclService.removeAll(store_idx);
		return "redirect:/admin/adminMain";
	}
	
	// 기업 승인
	@PostMapping("/enterApproval")
	public String enterApproval(int enter_idx) {
		log.info("enterApproval..."+enter_idx);
		enterReqService.modify(enter_idx);
		enterService.acceptPermission(enter_idx);
		return "redirect:/admin/adminMain";
	}
	// 기업 승인 취소
	@PostMapping("/enterDisallow")
	public String enterDisallow(int enter_idx) {
		log.info("enterDisallow..."+enter_idx);
		enterService.remove(enter_idx);
		enterReqService.remove(enter_idx);
		return "redirect:/admin/adminMain";
	}
	
	// 이벤트 숨기기
	@PostMapping("/eventReportHide")
	public String eventReportHide(int event_idx) {
		log.info("eventReportHide..."+event_idx);
		eventService.hide(event_idx);
		eventDeclService.removeAll(event_idx);
		return "redirect:/admin/adminMain";
	}
	// 이벤트 숨기기 해제
	@PostMapping("/eventReportunHide")
	public String eventReportunHide(int event_idx) {
		log.info("eventReportunHide..."+event_idx);
		eventService.unhide(event_idx);
		return "redirect:/admin/adminMain";
	}
	// 이벤트 신고 취소
	@PostMapping("/eventReportRemove")
	public String eventReportRemove(int event_idx, int member_idx) {
		log.info("eventReportRemove..."+event_idx+", "+member_idx);
		eventDeclService.remove(event_idx, member_idx);
		return "redirect:/admin/adminMain";
	}
	// 이벤트 신고 전체 취소
	@PostMapping("/eventReportRemoveAll")
	public String eventReportRemoveAll(int event_idx) {
		log.info("eventReportRemoveAll..."+event_idx);
		eventDeclService.removeAll(event_idx);
		return "redirect:/admin/adminMain";
	}
	
	/*--------------------------------------------------------------------------*/
	
	// 공지사항 이동
	@GetMapping("/notice")
	public String adminNotice() {
		return "index";
	}
	// 공지 수정페이지
	@GetMapping("/noticeModify")
	public String noticeModify() {
		return "index";
	}

	// 공지사항 쓰기 페이지
	@GetMapping("/noticeWrite")
	public String noticeWrite() {
		return "index";
	}
	
	// 공지사항 View
	@GetMapping("/noticeView")
	public String noticeView() {
		return "index";
	}
	
	// 공지사항 리스트
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
	
	// 고정 게시물 수정
	@PostMapping(value = "/updateFixed")
	public void updateFixed(@RequestBody int[] data) {
		int result = announceService.updateFixed(data);
	}
	
	// 공지 등록 액션
	@PostMapping("/noticeWrite")
	public ResponseEntity<String> insertNotice(MultipartFile[] files, AnnounceVO vo, HttpSession session) {
		vo.setMember_idx((int) session.getAttribute("loginUserIdx"));

		// 공지사항 데이터 처리
		int result = announceService.insertNotice(files, vo);
		
		return result > 0 ? 
			new ResponseEntity<String>("succeed", HttpStatus.OK) : 
			new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
	}
	
	// 공지 등록 액션
	@PostMapping("/noticeUpdate")
	public ResponseEntity<String> updateNotice(MultipartFile[] files, AnnounceVO vo, HttpSession session) {
		vo.setMember_idx((int) session.getAttribute("loginUserIdx"));
		// 공지사항 데이터 처리
		int result = announceService.updateNotice(files, vo);
		
		return result > 0 ? 
			new ResponseEntity<String>("succeed", HttpStatus.OK) : 
			new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
	}

	// 공지사항 View
	@GetMapping(value = "/getNotice/{announce_idx}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AnnounceVO> getImgData(@PathVariable("announce_idx") int announce_idx) {
		AnnounceVO vo = announceService.getNoticeView(announce_idx);
		return new ResponseEntity<AnnounceVO>(vo, HttpStatus.OK);
	}
	
	// 공지사항 삭제
	@DeleteMapping(value="/noticeDelete/{announce_idx}",
		produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> noticeDelete(@PathVariable int announce_idx) {
		int result = announceService.noticeDelete(announce_idx);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
}