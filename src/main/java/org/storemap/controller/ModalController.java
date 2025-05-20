package org.storemap.controller;

import java.util.Arrays;
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
import org.storemap.domain.EventVO;
import org.storemap.domain.LetterVO;
import org.storemap.domain.MapDTO;
import org.storemap.domain.MemberVO;
import org.storemap.domain.MenuVO;
import org.storemap.domain.ReviewDeclarationVO;
import org.storemap.domain.ReviewLikeVO;
import org.storemap.domain.ReviewVO;
import org.storemap.domain.StoreDeclarationVO;
import org.storemap.domain.StoreLikeVO;
import org.storemap.domain.StoreVO;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventDayServiceImple;
import org.storemap.service.EventService;
import org.storemap.service.EventServiceImple;
import org.storemap.service.LetterServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.MenuServiceImple;
import org.storemap.service.ReviewDeclarationServiceImple;
import org.storemap.service.ReviewLikeServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreDeclarationServiceImple;
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
	private StoreLikeServiceImple storeLikeService;
	@Autowired
	private StoreDeclarationServiceImple storeDeclarationService;
	@Autowired
	private MenuServiceImple menuService;
	@Autowired
	private ReviewServiceImple reviewService;
	@Autowired
	private ReviewLikeServiceImple reviewLikeService;
	@Autowired
	private ReviewDeclarationServiceImple reviewDeclarationService;
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
		model.addAttribute("list",storeService.getMap());
		return "index";
	}
	
	//점포 정보 팝업
	@GetMapping("/storeView")
	public String storeView(@RequestParam("store_idx") int store_idx, Model model, HttpSession session) {
		log.info("storeView..."+store_idx);
		
		StoreVO storeVO = storeService.map(store_idx);
        List<MenuVO> menuList = menuService.getMap(store_idx);
        List<ReviewVO> reviewList = reviewService.getMap(store_idx);
		
		model.addAttribute("svo",storeVO);
		model.addAttribute("mlist",menuList);
		model.addAttribute("rlist",reviewList);
		
		// 사용자가 로그인되어 있다면 좋아요 상태 확인
		if(session.getAttribute("loginUserIdx") != null) {
			
			int member_idx = (int) session.getAttribute("loginUserIdx");
			
			StoreLikeVO likeVO = storeLikeService.getIdx(store_idx, member_idx);
			model.addAttribute("storeLiked", likeVO != null);
			
			Map<Integer, Boolean> reviewLikedMap = new HashMap<>();
			if(reviewList != null && !reviewList.isEmpty()) {
                for(ReviewVO rvo : reviewList) {
                    ReviewLikeVO reviewLikeVO = reviewLikeService.getIdx(rvo.getReview_idx(), member_idx);
                    reviewLikedMap.put(rvo.getReview_idx(), reviewLikeVO != null);
                }
            }
			model.addAttribute("reviewLikedMap", reviewLikedMap);
			
		} else {
			model.addAttribute("storeLiked", false);
			model.addAttribute("reviewLikedMap", new HashMap<>());
		}
		
		return "index";
	}
	
	// 점포 정보 하나 가져오기
	@PostMapping(value = "/store/getByIdx",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
		public ResponseEntity<StoreVO> getByIdx(@RequestBody int store_idx){
			log.info("getByIdx..." + store_idx);
			return new ResponseEntity<StoreVO>(storeService.get(store_idx), HttpStatus.OK);
	}	
	
	//점포좋아요 (토글)
	@ResponseBody
	@GetMapping("/storeLike/toggle")
	public ResponseEntity<Map<String, Object>> toggleFavorite(@RequestParam("store_idx") int store_idx, @RequestParam("member_idx") int member_idx) {
		log.info("toggleFavorite..."+store_idx+", "+member_idx);
		
		Map<String, Object> result = new HashMap<>();
		StoreLikeVO likeVO = storeLikeService.getIdx(store_idx, member_idx);
		
		if(likeVO == null) {
			// 좋아요 추가
			storeLikeService.register(store_idx, member_idx);
			storeService.favorite(store_idx); // 좋아요 카운트 증가
			result.put("storeLiked", true);
		} else {
			// 좋아요 제거
			storeLikeService.remove(store_idx, member_idx);
			storeService.unfavorite(store_idx); // 좋아요 카운트 감소
			result.put("storeLiked", false);
		}
		
		// 업데이트된 점포 좋아요 카운트 불러오기
		StoreVO storeVO = storeService.get(store_idx);
		result.put("storeLikeCount", storeVO.getStore_like_cnt());
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	//점포좋아요 상태 확인
	@ResponseBody
	@GetMapping("/storeLike/check")
	public ResponseEntity<Map<String, Object>> checkFavorite(@RequestParam("store_idx") int store_idx, @RequestParam("member_idx") int member_idx) {
		log.info("checkFavorite..."+store_idx+", "+member_idx);
		
		Map<String, Object> result = new HashMap<>();
		StoreLikeVO likeVO = storeLikeService.getIdx(store_idx, member_idx);
		result.put("storeLiked", likeVO != null);
		
		StoreVO storeVO = storeService.get(store_idx);
		result.put("storeLikeCount", storeVO.getStore_like_cnt());
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	//점포신고요청
	@PostMapping(value = "/storeDeclaration",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> storeDeclaration(@RequestBody StoreDeclarationVO vo){
		log.info("storeDeclaration..."+vo);
		return storeDeclarationService.register(vo)==1? new ResponseEntity<String>("success", HttpStatus.OK) :
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	//리뷰좋아요 (토글)
	@ResponseBody
    @GetMapping("/reviewLike/toggle")
    public ResponseEntity<Map<String, Object>> toggleReviewFavorite(@RequestParam("review_idx") int review_idx, @RequestParam("member_idx") int member_idx) {
        log.info("toggleReviewFavorite..."+review_idx+", "+member_idx);
        
        Map<String, Object> result = new HashMap<>();
        ReviewLikeVO likeVO = reviewLikeService.getIdx(review_idx, member_idx);
        
        if(likeVO == null) {
            // 좋아요 추가
            reviewLikeService.register(review_idx, member_idx);
            reviewService.favorite(review_idx); // 좋아요 카운트 증가
            result.put("reviewLikedMap", true);
        } else {
            // 좋아요 제거
            reviewLikeService.remove(review_idx, member_idx);
            reviewService.unfavorite(review_idx); // 좋아요 카운트 감소
            result.put("reviewLikedMap", false);
        }
        
        // 업데이트된 리뷰 좋아요 카운트 불러오기
        ReviewVO reviewVO = reviewService.get(review_idx);
        result.put("reviewLikeCount", reviewVO.getReview_like_cnt());
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    //리뷰좋아요 상태 확인
	@ResponseBody
    @GetMapping("/reviewLike/check")
    public ResponseEntity<Map<String, Object>> checkReviewFavorite(@RequestParam("review_idx") int review_idx, @RequestParam("member_idx") int member_idx) {
        log.info("checkReviewFavorite..."+review_idx+", "+member_idx);
        
        Map<String, Object> result = new HashMap<>();
        ReviewLikeVO likeVO = reviewLikeService.getIdx(review_idx, member_idx);
        result.put("reviewLikedMap", likeVO != null);
        
        ReviewVO reviewVO = reviewService.get(review_idx);
        result.put("reviewLikeCount", reviewVO.getReview_like_cnt());
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    //리뷰신고요청
	@PostMapping(value = "/reviewDeclaration",
			consumes = "application/json",
			produces = MediaType.TEXT_PLAIN_VALUE)
	public ResponseEntity<String> reviewDeclaration(@RequestBody ReviewDeclarationVO vo){
		log.info("reviewDeclaration..."+vo);
		return reviewDeclarationService.register(vo)==1? new ResponseEntity<String>("success", HttpStatus.OK) :
			new ResponseEntity<String>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	/*--------------------------------------------------------------------------*/
	
	// 이벤트 리스트 모달
	@GetMapping("/eventListModal")
	public String eventListModal(Model model) {
		log.info("eventListModal...");
		model.addAttribute("list",storeService.getList());
		return "index";
	}
	
	// 이벤트 상세보기
	@GetMapping("/eventView")
	public String eventView(@RequestParam("event_idx") int event_idx, Model model) {
		log.info("eventView..." + event_idx);
		EventVO evo = eventService.getEventOneView(event_idx);
		model.addAttribute("evo", evo);
		log.info("evo..." + evo);
		return "index";
	}
	
	
	
	/*--------------------------------------------------------------------------*/
	
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
	
	//점포 지역별 리스트 비동기 조회
	@GetMapping(value = "/list/store_area/{store_area}",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
	public ResponseEntity<List<StoreVO>> getListByArea(@PathVariable("store_area") String store_area){
		log.info("getListByArea..."+store_area);
		return new ResponseEntity<List<StoreVO>>(storeService.getAreaList(store_area), HttpStatus.OK);
	}

	// 점포 주소별 리스트 비동기 조회 (서비스 수정 필요)
	@GetMapping(value = "/list/store_address/{store_address}",
		produces = {
				MediaType.APPLICATION_XML_VALUE,
				MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<StoreVO>> getListByadress(@PathVariable("store_adress") String store_address){
		log.info("getListByadress..."+store_address);
		return new ResponseEntity<List<StoreVO>>(storeService.getAreaList(store_address), HttpStatus.OK);
	}
	
	// 메뉴 검색 리스트 비동기 조회 (서비스 수정 필요)
	@GetMapping(value = "/list/store_menu/{store_menu}",
		produces = {
				MediaType.APPLICATION_XML_VALUE,
				MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<StoreVO>> getListByMenu(@PathVariable("store_menu") String store_menu){
		log.info("getListByMenu..."+store_menu);
		return new ResponseEntity<List<StoreVO>>(storeService.getAreaList(store_menu), HttpStatus.OK);
	}
	
	// 위치 검색 리스트 비동기 조회
	@PostMapping(value = "/list/loc",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
		})
		public ResponseEntity<List<StoreVO>> getListByLoc(@RequestBody MapDTO map){
			log.info("getListByLoc..." + map);
			return new ResponseEntity<List<StoreVO>>(storeService.getLocList(map), HttpStatus.OK);
	}
	
	// 최근방 점포 리스트 비동기 조회
	@PostMapping(value = "/list/nearest",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<StoreVO>> getNearestStores(@RequestBody MapDTO map){
		log.info("getNearestStores..." + map);
		return new ResponseEntity<List<StoreVO>>(storeService.getNearestStores(map), HttpStatus.OK);
	}
	
	// 반경 거리 내 점포 리스트 비동기 조회
	@PostMapping(value = "/list/within",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<StoreVO>> getStoresWithinDistance(@RequestBody MapDTO map){
		log.info("getStoresWithinDistance..." + map);
		return new ResponseEntity<List<StoreVO>>(storeService.getStoresWithinDistance(map), HttpStatus.OK);
	}	
	
	// 키워드 검색 점포 리스트 비동기 조회
	@PostMapping(value = "/list/keyword",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<StoreVO>> getListByKeyword(@RequestBody MapDTO map){
		log.info("getListByKeyword..." + map);
		return new ResponseEntity<List<StoreVO>>(storeService.getStoreKeywordList(map), HttpStatus.OK);
	}
	
	// 키워드와 지역명이 일치하는 점포 리스트 비동기 조회
	@PostMapping(value = "/list/addrKeyword",
			produces = {
					MediaType.APPLICATION_XML_VALUE,
					MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<StoreVO>> getListByAddrKeyword(@RequestBody MapDTO map){
		log.info("getListByAddrKeyword..." + map);
		log.info(storeService.getStoreAddrKeywordList(map));
		return new ResponseEntity<List<StoreVO>>(storeService.getStoreAddrKeywordList(map), HttpStatus.OK);
	}
	
	/*--------------------------------------------------------------------------*/
	
	// 송수신 메시지 리스트
	@GetMapping(value = "/getLetterList/{type}",
			produces = {
				MediaType.APPLICATION_JSON_VALUE,
				MediaType.APPLICATION_XML_VALUE
			})
	public ResponseEntity<List<LetterVO>> getLetterList(@PathVariable("type") String type, HttpSession session){
		ResponseEntity<List<LetterVO>> result = null;
		if(session.getAttribute("loginUser") != null){
			Map<String, String> map = new HashMap<String, String>();
			map.put("letterType", type);
			map.put("loginUser", (String) session.getAttribute("loginUser"));
			if(letterService.getLetterList(map) != null) {
				result = new ResponseEntity<List<LetterVO>>(letterService.getLetterList(map), HttpStatus.OK);
			}else{
				result = new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
		}
		return result;
	}
	
	// 쪽지 View
	@GetMapping(value = "/getLetterView/{letter_idx}",
			produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<LetterVO> getLetterView(@PathVariable("letter_idx") int letter_idx, HttpSession session){
		ResponseEntity<LetterVO> result = null;
		
		if(session.getAttribute("loginUser") != null){
			
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
	
	@GetMapping(value = "/getLetterCnt", produces = "application/json")
	@ResponseBody
	public int getLetterCnt(HttpSession session){
		if(session.getAttribute("loginUser") != null){
			return letterService.getLetterCnt((String) session.getAttribute("loginUser"));
		}else {
			return 0;
		}
	}
	
	// 쪽지 작성
	@PostMapping(value="/insertLetter",
			consumes = {MediaType.APPLICATION_JSON_VALUE}
	)
	public ResponseEntity<String> insertLetter(@RequestBody LetterVO vo,HttpSession session) {
		vo.setAuth((String) session.getAttribute("userType"));
		vo.setLetter_writer((String) session.getAttribute("loginUser"));
		int result = letterService.insertLetter(vo);
		log.info("result : " + result);
//		if(result == -1) {
//			return new ResponseEntity<String>("undefind",HttpStatus.NOT_FOUND);
//		}else if(result == 0) {
//			return new ResponseEntity<String>("fail",HttpStatus.BAD_REQUEST);
//		}else {
//			return new ResponseEntity<String>("success",HttpStatus.OK);
//		}
		return null;
	}
	
	// 이벤트 신청 목록
	@ResponseBody
	@GetMapping(value="/getAttendList/{eday}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<MemberVO>> getAttendList(@PathVariable("eday") int eday,  HttpSession session) {
		log.info(eday);
		List<MemberVO> result = letterService.getAttendList(eday);
		return new ResponseEntity<List<MemberVO>>(result,HttpStatus.OK);
	}
	
	@ResponseBody
	@GetMapping(value="/getEdayList",
	produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<EventVO> getEdayList(HttpSession session) {
		//List<EventVO> e_idx = eventService.getIdx((int) session.getAttribute("loginUserIdx"));
		//log.info(e_idx);
		return null;
		//List<EventVO> result = letterService.getEdayList(e_idx);
//		
//		
//		return new ResponseEntity<EventVO>(result,HttpStatus.OK);
	}
	
	// 우편번호 입력 form
	@GetMapping("/postcodeForm")
	public String postcodeForm(Model model) {
		log.info("postcodeForm...");
		model.addAttribute("type", "full");
		return "index";
	}
}
