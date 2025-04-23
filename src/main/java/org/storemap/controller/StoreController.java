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
import org.storemap.domain.StoreVO;
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
	
	// 점포 등록
	@PostMapping("/storeRegister")
	public String storeRgister1(StoreVO vo) {
		log.info("storeRegister1..."+vo);
		storeService.register(vo);
		return "redirect:/store/menu?store_idx="+vo.getStore_idx();
	}
	@GetMapping("/storeRegister")
	public String storeRegister2() {
		log.info("storeRegister2...");
		return "index";
	}
	
	// 점포 관리
	@PostMapping("/storeModify")
	public String storeModify1(StoreVO vo) {
		log.info("storeModify1..."+vo);
		storeService.modify(vo);
		return "redirect:/modal/storeView?store_idx="+vo.getStore_idx();
	}
	@GetMapping("/storeModify")
	public String storeModify2(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("storeModify2..."+store_idx);
		model.addAttribute("vo", storeService.get(store_idx));
		storeService.get(store_idx);
		return "index";
	}
	
	// 점포 삭제
	@GetMapping("/storeRemove")
	public String storeRemove() {
		log.info("storeRemove...");
		return "index";
	}
	
	// 메뉴 추가
	@PostMapping("/menu")
	public String menu1(MenuVO vo) {
		log.info("menu1...");
		menuService.register(vo);
		return "redirect:/store/menu?store_idx="+vo.getStore_idx();
	}
	@GetMapping("/menu")
	public String menu2(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("menu2..."+store_idx);
		model.addAttribute("list",menuService.getList(store_idx));
		return "index";
	}
	
	// 메뉴 리스트 조회
	@GetMapping(value = "/list/{store_idx}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
	public ResponseEntity<List<MenuVO>> getList(@PathVariable("store_idx") int store_idx){
		log.info("getList..."+store_idx);
		return new ResponseEntity<List<MenuVO>>(menuService.getList(store_idx), HttpStatus.OK);
	}
	
	// 메뉴 상세 조회
	@GetMapping(value = "/{menu_idx}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
			})
	public ResponseEntity<MenuVO> get(@PathVariable("menu_idx") int menu_idx){
		log.info("get..."+menu_idx);
		return new ResponseEntity<MenuVO>(menuService.get(menu_idx), HttpStatus.OK);
	}
	
	// 메뉴 수정
	@RequestMapping(method = {RequestMethod.PUT, RequestMethod.PATCH},
			value = "/{menu_idx}",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE
			)
	public ResponseEntity<String> modify(@PathVariable("menu_idx") int menu_idx, @RequestBody MenuVO vo){
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
	public ResponseEntity<String> remove(@PathVariable("menu_idx") int menu_idx){
		log.info("remove..."+menu_idx);
		return menuService.remove(menu_idx)==1? new ResponseEntity<String>("success", HttpStatus.OK) :
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
		
	// 리뷰 등록
	@GetMapping("/reviewRegister")
	public String reviewRegister() {
		log.info("reviewRegister...");
		//storeService.getList();
		return "index";
	}
	
	// map 이동
	@GetMapping("/map")
	public String storeMap() {
		log.info("mapGet...");
		return "index";
	}
	
}
