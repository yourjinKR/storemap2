package org.storemap.controller;

import java.util.List;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.storemap.domain.MenuVO;
import org.storemap.domain.ReviewVO;
import org.storemap.domain.StoreVO;
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
	private StoreRequestServiceImple storeRequestService;
	
	// 점포 추가
	@PostMapping("/storeRegister")
	public String storeRgister(StoreVO vo) {
		log.info("storeRegister..."+vo);
		storeService.register(vo);
		int idx = vo.getStore_idx();
		storeRequestService.register(idx);
		return "redirect:/store/menu?store_idx="+vo.getStore_idx();
	}
	// 점포 등록 페이지 이동
	@GetMapping("/storeRegister")
	public String storeRegisterPage() {
		log.info("storeRegisterPage...");
		return "index";
	}
	
	// 점포 수정
	@PostMapping("/storeModify")
	public String storeModify(StoreVO vo) {
		log.info("storeModify..."+vo);
		storeService.modify(vo);
		return "redirect:/modal/storeView?store_idx="+vo.getStore_idx();
	}
	// 점포 관리 페이지 이동
	@GetMapping("/storeModify")
	public String storeModifyPage(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("storeModifyPage..."+store_idx);
		model.addAttribute("vo", storeService.get(store_idx));
		//storeService.get(store_idx);
		return "index";
	}
	
	// 점포 삭제
	@PostMapping("/storeRemove")
	public String storeRemove(int store_idx) {
		log.info("storeRemove..."+store_idx);
		storeService.remove(store_idx);
		return "redirect:/modal/storeListModal";
	}
	
	/*--------------------------------------------------------------------------*/
	
	// 메뉴 페이지 이동
	@GetMapping("/menu")
	public String menuPage(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("menuPage..."+store_idx);
		model.addAttribute("list",menuService.getList(store_idx));
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
		return new ResponseEntity<List<MenuVO>>(menuService.getList(store_idx), HttpStatus.OK);
	}
	
	// 메뉴 상세 조회
	@GetMapping(value = "/{menu_idx}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
			})
	public ResponseEntity<MenuVO> menuInfo(@PathVariable("menu_idx") int menu_idx){
		log.info("get..."+menu_idx);
		return new ResponseEntity<MenuVO>(menuService.get(menu_idx), HttpStatus.OK);
	}
	
	// 메뉴 추가
	@PostMapping(value = "/new",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> menuRegister(@RequestBody MenuVO vo){
		log.info("add..."+vo);
		return menuService.register(vo)==1? new ResponseEntity<String>("success", HttpStatus.OK) :
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// 메뉴 수정
	@RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH},
			value = "/{menu_idx}",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE
			)
	public ResponseEntity<String> menuModify(@PathVariable("menu_idx") int menu_idx, @RequestBody MenuVO vo){
		log.info("menu_idx: "+menu_idx);
		log.info("modify: "+vo);
		vo.setMenu_idx(menu_idx);
		
		int modifyCount = menuService.modify(vo);
		
		return modifyCount==1 ?
		new ResponseEntity<String>("success", HttpStatus.OK) :
		new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// 메뉴 삭제
	@DeleteMapping(value = "/{menu_idx}", produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> menuRemove(@PathVariable("menu_idx") int menu_idx){
		log.info("remove..."+menu_idx);
		return menuService.remove(menu_idx)==1? new ResponseEntity<String>("success", HttpStatus.OK) :
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	/*--------------------------------------------------------------------------*/
		
	// 리뷰 추가
	@PostMapping("/review")
	public String review(ReviewVO vo) {
		log.info("review..."+vo);
		reviewService.register(vo);
		return "redirect:/modal/storeView?store_idx="+vo.getStore_idx();
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
	public String storeMap() {
		log.info("mapGet...");
		return "index";
	}
	
}
