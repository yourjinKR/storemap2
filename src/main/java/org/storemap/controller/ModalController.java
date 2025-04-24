package org.storemap.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MenuVO;
import org.storemap.domain.StoreVO;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventDayServiceImple;
import org.storemap.service.EventService;
import org.storemap.service.EventServiceImple;
import org.storemap.service.LetterServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.MenuServiceImple;
import org.storemap.service.StoreLikeServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/modal")
@Controller
public class ModalController {
	@Autowired
	private StoreServiceImple storeService;
	@Autowired
	private MenuServiceImple menuService;
	@Autowired
	private EventServiceImple eventService;
	@Autowired
	private EventDayServiceImple eventDayService;	
	@Autowired
	private LetterServiceImple letterService;
	@Autowired
	private MemberServiceImple memberService;
	@Autowired
	private EnterServiceImple enterService;
	
	//점포 리스트 모달
	@GetMapping("/storeListModal")
	public String storeListModal(Model model) {
		log.info("storeListModal...");
		model.addAttribute("list",storeService.getList());
		return "index";
	}
	
	//점포 정보 팝업
	@GetMapping("/storeView")
	public String storeView(@RequestParam("store_idx") int store_idx, Model model) {
		log.info("storeView..."+store_idx);
		model.addAttribute("svo",storeService.get(store_idx));
		model.addAttribute("list",menuService.getList(store_idx));
		storeService.get(store_idx);
		return "index";
	}
	
	// 메뉴 정보 팝업 (비동기)
	@GetMapping(value = "/menuList/{store_idx}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
	public ResponseEntity<List<MenuVO>> menuList(@PathVariable("store_idx") int store_idx) {
		log.info("MenuListAsync..." + store_idx);
		return new ResponseEntity<List<MenuVO>>(menuService.getList(store_idx), HttpStatus.OK);
	}
	
	// 점포조회
	@GetMapping(value = "/{store_idx}",
				produces = {
						MediaType.APPLICATION_XML_VALUE,
						MediaType.APPLICATION_JSON_VALUE
			})
	public ResponseEntity<StoreVO> get(@PathVariable("store_idx") int store_idx){
		log.info("get..."+store_idx);
		return new ResponseEntity<StoreVO>(storeService.get(store_idx), HttpStatus.OK);
	}
	
	//점포 지역별 리스트 비동기 조회
	@GetMapping(value = "/list/{store_area}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
	public ResponseEntity<List<StoreVO>> getList(@PathVariable("store_area") String store_area){
		log.info("getList..."+store_area);
		return new ResponseEntity<List<StoreVO>>(storeService.getAreaList(store_area), HttpStatus.OK);
	}
	
	// 송수신 메시지 리스트
	@GetMapping(value = "/getLetterList/{type}",
			produces = {
				MediaType.APPLICATION_JSON_VALUE
			})
	public ResponseEntity<List<LetterVO>> getLetterList(@PathVariable("type") String type, HttpSession session){
		ResponseEntity<List<LetterVO>> result = null;
		if(session.getAttribute("loginUser") != null && (session.getAttribute("userType").equals("enter") || session.getAttribute("userType").equals("admin"))){
			Map<String, String> map = new HashMap<String, String>();
			map.put("letterType", type);
			map.put("loginUser", (String) session.getAttribute("loginUser"));
			
			result = new ResponseEntity<List<LetterVO>>(letterService.getLetterList(map), HttpStatus.OK);
		}
		return result;
	}
	
	// 쪽지 View
	@GetMapping(value = "/getLetterView/{letter_idx}",
			produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<LetterVO> getLetterView(@PathVariable("letter_idx") int letter_idx, HttpSession session){
		ResponseEntity<LetterVO> result = null;
		
		if(session.getAttribute("loginUser") != null && (session.getAttribute("userType").equals("enter") || session.getAttribute("userType").equals("admin"))){
			
			Map<String, String> map = new HashMap<String, String>();
			map.put("letter_idx", Integer.toString(letter_idx));
			map.put("loginUser", (String) session.getAttribute("loginUser"));
			LetterVO vo = letterService.getLetterView(map);
			
			if(vo != null) {
				result = new ResponseEntity<LetterVO>(vo, HttpStatus.OK);
			}else {
				result = new ResponseEntity<LetterVO>(HttpStatus.BAD_REQUEST);
			}
		}
		return result;
	}
	
	@PostMapping(value="/insertLetter",
			consumes = {MediaType.APPLICATION_JSON_VALUE}
	)
	public ResponseEntity<String> insertLetter(@RequestBody LetterVO vo,HttpSession session) {
		vo.setAuth((String) session.getAttribute("userType"));
		int result = letterService.insertLetter(vo);
		if(result == -1) {
			return new ResponseEntity<String>("undefind",HttpStatus.NOT_FOUND);
		}else if(result == 0) {
			return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<String>("success",HttpStatus.OK);
		}
	}
}
