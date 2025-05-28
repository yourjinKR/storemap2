package org.storemap.controller;

import java.util.List;

import javax.servlet.ServletContext;
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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.MenuVO;
import org.storemap.domain.ReviewVO;
import org.storemap.domain.StoreVO;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.MenuServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreRequestServiceImple;
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
	@Autowired
	private MemberServiceImple memberService;
	@Autowired
	private StoreRequestServiceImple storeRequestService;
	
	// 점포 추가
	@ResponseBody
	@PostMapping("/storeRegister")
	public ResponseEntity<String> storeRegister(@RequestParam("member_idx") int member_idx, StoreVO vo, MultipartFile file) {
		log.info("storeRegister..."+vo);
		log.info("Files received: " + (file != null ? file.getOriginalFilename() : "none"));
		try {
			if(storeService.getMember(member_idx) != null) {
				//이미 점포 신청중일시
				return new ResponseEntity<String>("이미 점주 신청중 입니다.!!", HttpStatus.INTERNAL_SERVER_ERROR);
			}else {
				//점포생성 + 이미지 업로드
				int result = storeService.register(file, vo);			
				if(result > 0) {
					//점주요청
					storeRequestService.register(member_idx);
				}
				return new ResponseEntity<String>("succeed", HttpStatus.OK);
			}
		} catch (Exception e) {
			log.error("Error during store registration", e);
			return new ResponseEntity<String>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// 점포 등록 페이지 이동
	@GetMapping("/storeRegister")
	public String storeRegisterPage() {
		log.info("storeRegisterPage...");
		return "index";
	}
	
	// 점포 시작!
	@ResponseBody
	@PostMapping("/storeStart")
	public ResponseEntity<String> storeStart(StoreVO vo, MultipartFile file) {
		log.info("storeStart...");
		log.info("Files received: " + (file != null ? file.getOriginalFilename() : "none"));
		//점포수정 + 이미지 재업로드
		try {
			storeService.modify(file, vo);
			storeService.start(vo.getStore_idx());
			return new ResponseEntity<String>("succeed", HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error during store modify", e);
			return new ResponseEntity<String>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// 점포 철수!
	@PostMapping("/storeStop")
	public String storeStop(StoreVO vo) {
		log.info("storeStart...");
		storeService.stop(vo.getStore_idx());
		return "redirect:/store/storeModify?store_idx="+vo.getStore_idx();
	}
	
	// 점포 수정
	@ResponseBody
	@PostMapping("/storeModify")
	public ResponseEntity<String> storeModify(StoreVO vo, MultipartFile file) {
		log.info("storeModify..."+vo);
		log.info("Files received: " + (file != null ? file.getOriginalFilename() : "none"));
		//점포수정 + 이미지 재업로드
		try {
			storeService.modify(file, vo);			
			return new ResponseEntity<String>("succeed", HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error during store modify", e);
			return new ResponseEntity<String>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// 점포 관리 페이지 이동
	@GetMapping("/storeModify")
	public String storeModifyPage(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("storeModifyPage..."+store_idx);
		model.addAttribute("vo", storeService.get(store_idx));
		return "index";
	}
	
	// 점포 삭제
	@PostMapping("/storeRemove")
	public String storeRemove(int store_idx, HttpSession session) {
		log.info("storeRemove..."+store_idx);
		StoreVO vo = storeService.get(store_idx);
		// 점포삭제 전에 외래키 엮인거 전부 삭제하기
		storeService.remove(store_idx);
		memberService.cancelOwner(vo.getMember_idx());
		session.setAttribute("userType", "owner");
		return "redirect:/modal/storeListModal";
	}
	
	/*--------------------------------------------------------------------------*/
	
	// 메뉴 페이지 이동
	@GetMapping("/menu")
	public String menuPage(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("menuPage..."+store_idx);
		model.addAttribute("vo",storeService.get(store_idx));
		model.addAttribute("list",menuService.getMap(store_idx));
		return "index";
	}
	
	// 메뉴 리스트 조회
	@GetMapping(value = "/list/{store_idx}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
	public ResponseEntity<List<MenuVO>> menuList(@PathVariable("store_idx") int store_idx){
		log.info("menuList..."+store_idx);
		return new ResponseEntity<List<MenuVO>>(menuService.getMap(store_idx), HttpStatus.OK);
	}
	
	// 메뉴 상세 조회
	@GetMapping(value = "/{menu_idx}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
			})
	public ResponseEntity<MenuVO> menuInfo(@PathVariable("menu_idx") int menu_idx){
		log.info("get..."+menu_idx);
		return new ResponseEntity<MenuVO>(menuService.map(menu_idx), HttpStatus.OK);
	}
	
	// 메뉴 추가
	@PostMapping("/new")
	public ResponseEntity<String> menuRegister(MenuVO vo, MultipartFile file){
		log.info("add..."+vo);
		log.info("Files received: " + (file != null ? file.getOriginalFilename() : "none"));
		// 메뉴추가 + 파일 업로드
		try {
			menuService.register(file, vo);
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error during menu add", e);
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// 메뉴 수정
	@RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH},
			value = "/{menu_idx}")
	public ResponseEntity<String> menuModify(@PathVariable("menu_idx") int menu_idx, MenuVO vo, MultipartFile file){
		log.info("menu_idx: "+menu_idx);
		log.info("modify: "+vo);
		log.info("Files received: " + (file != null ? file.getOriginalFilename() : "none"));
		vo.setMenu_idx(menu_idx);
		// 메뉴수정 + 파일 업로드
		try {
			menuService.modify(file, vo);
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error during menu modify", e);
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// 메뉴 삭제
	@DeleteMapping("/{menu_idx}")
	public ResponseEntity<String> menuRemove(@PathVariable("menu_idx") int menu_idx){
		log.info("remove..."+menu_idx);
		// 메뉴삭제 + 파일 삭제
		try {
			menuService.remove(menu_idx);
			return new ResponseEntity<String>("success", HttpStatus.OK);
		} catch (Exception e) {
			log.error("Error during menu remove", e);
			return new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/*--------------------------------------------------------------------------*/
		
	// 리뷰 추가
	@PostMapping("/review")
	public ResponseEntity<String> review(ReviewVO vo, MultipartFile file) {
		log.info("review..."+vo);
		log.info("Files received: " + (file != null ? file.getOriginalFilename() : "none"));
		// 리뷰추가 + 파일 업로드
		try {
			if(reviewService.getSame(vo.getStore_idx(), vo.getMember_idx()) != null) {
				//이미 리뷰가 존재할시
				return new ResponseEntity<String>("이미 리뷰가 존재합니다.!!", HttpStatus.INTERNAL_SERVER_ERROR);
			}else {
				//점포생성 + 이미지 업로드
				reviewService.register(file, vo);
				return new ResponseEntity<String>("succeed", HttpStatus.OK);
			}
		} catch (Exception e) {
			log.error("Error during review registration", e);
			return new ResponseEntity<String>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	// 리뷰 등록 페이지 이동
	@GetMapping("/review")
	public String reviewPage(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("reviewPage..."+store_idx);
		model.addAttribute("vo",storeService.get(store_idx));
		return "index";
	}
	
	// 리뷰 삭제
	@PostMapping("/reviewRemove")
	public String reviewRemove(int review_idx) {
		log.info("reviewRemove..."+review_idx);
		reviewService.remove(review_idx);
		return "index";
	}
	
	/*--------------------------------------------------------------------------*/
	
	// map 이동
	@GetMapping("/map")
	public String storeMap(Model model) {
		log.info("mapGet...");
		model.addAttribute("type", "full");
		return "index";
	}
	
}
