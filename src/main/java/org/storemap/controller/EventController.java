package org.storemap.controller;

import java.io.File;
import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.storemap.domain.ApprovedStoreViewDTO;
import org.storemap.domain.AnnounceResponseDTO;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.CommentEventVO;
import org.storemap.domain.Criteria;
import org.storemap.domain.EventDTO;
import org.storemap.domain.EventDayVO;
import org.storemap.domain.EventDeclarationVO;
import org.storemap.domain.EventFilterVO;
import org.storemap.domain.EventRequestVO;
import org.storemap.domain.EventResponseDTO;
import org.storemap.domain.EventVO;
import org.storemap.domain.FilterVO;
import org.storemap.domain.MapDTO;
import org.storemap.domain.MemberVO;
import org.storemap.domain.PageDTO;
import org.storemap.service.CloudinaryService;
import org.storemap.service.CommentEventServiceImple;
import org.storemap.service.EventDayService;
import org.storemap.service.EventDayServiceImple;
import org.storemap.service.EventDeclarationService;
import org.storemap.service.EventLikeService;
import org.storemap.service.EventRequestService;
import org.storemap.service.EventServiceImple;

import com.sun.jdi.request.EventRequest;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/event")
@Controller
public class EventController {
	@Autowired
	private EventServiceImple eventService;
	@Autowired
	private EventDayServiceImple eventDayService;
	@Autowired
	private EventRequestService eventRequestService;
	@Autowired
	private CloudinaryService cloudinaryService;
	@Autowired
	private EventDeclarationService eventDeclarationService;
	@Autowired
	private EventLikeService eventLikeService;
	
	@GetMapping("/eventList")
	public String eventList() {	
		return "index";
	}
	
	@PostMapping(value = "/eventFilter",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
			},
			consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<EventResponseDTO> eventFilter(@RequestBody EventFilterVO filter, Criteria cri, Model model) {
		cri.setPageNum(filter.getPage_num());
		cri.setAmount(filter.getAmount_num());
		
		int total = eventService.getListCount(filter);
		PageDTO pdto = new PageDTO(cri, total);
		EventDTO edto = new EventDTO(filter, cri);
		EventResponseDTO resdto = new EventResponseDTO(pdto, eventService.getFilterList(edto));
		
		return new ResponseEntity<EventResponseDTO>(resdto,HttpStatus.OK);
	}

	@PostMapping(value = "/eventFilter/keyword",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
			},
			consumes = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<EventVO>> eventFilterKeyword(@RequestBody MapDTO map, Model model) {
		log.info("eventFilterKeyword..."+ map);
		return new ResponseEntity<List<EventVO>>(eventService.getEventListByKeyword(map), HttpStatus.OK);
	}
	
	@ResponseBody
	@GetMapping("/favorite/{event_idx}") 
	public int updateFavorite(@PathVariable("event_idx") int event_idx) {
		eventService.updateFavorite(event_idx);
		return 1; 
	}
	
	@PostMapping("/eventRegister")
	public String eventRegister(EventVO eventVO, 
	                            @RequestParam("eventImage") MultipartFile[] files,
	                            HttpSession session) {
	    log.info("eventRegister....." + eventVO);

	    try {
	        eventService.registerEventWithDays(eventVO, files);
	    } catch (RuntimeException e) {
	        log.error("에러 발생: " + e);
	        return "errorPage";
	    }

	    return "redirect:/event/eventView?event_idx=" + eventVO.getEvent_idx();
	}
	
	//이벤트 등록 화면 보여주는 컨트롤러
	@GetMapping("/eventRegister")
	public String showEventRegiste(HttpSession session, Model model) {
		String userType = (String) session.getAttribute("userType");
	    if (!"enter".equals(userType)) {
	        model.addAttribute("msg", "기업 회원만 접근할 수 있습니다.");
	        model.addAttribute("redirectUrl", "/member/login");
	        return "content/modal/alertRedirect";
	    }
		return "index";
	}
	
	// 이벤트 상세보기
	@GetMapping("/eventView")
	public String eventView(Model model,
	                        @RequestParam("event_idx") int event_idx,
	                        HttpSession session) {

	    // 이벤트 정보 조회
	    EventVO vo = eventService.getEventOneView(event_idx);
	    	    
	    // event_file 컬럼에서 Cloudinary UUID와 외부 URL을 분리
	    String eventFile = vo.getEvent_file();
	    List<String> cloudinaryUuids = new ArrayList<>();
	    List<String> externalUrls = new ArrayList<>();
	    
	    if (eventFile != null && !eventFile.isEmpty()) {
	        String[] fileParts = eventFile.split(",");
	        for (String part : fileParts) {
	            part = part.trim();
	            if (part.startsWith("http")) {
	                externalUrls.add(part);  // 외부 URL
	            } else {
	                cloudinaryUuids.add(part);  // Cloudinary UUID
	            }
	        }
	    }

	    // Cloudinary UUID로 파일 정보 가져오기 (비어 있을 경우에도 안전)
	    List<AttachFileVO> cloudinaryFiles = new ArrayList<>();
	    if (!cloudinaryUuids.isEmpty()) {
	        cloudinaryFiles = cloudinaryService.getFilesByUuidList(cloudinaryUuids);
	    }
	    
	    LocalDate now = LocalDate.now();

        Date sqlDate = vo.getEvent_bstartdate();
        LocalDate eventDate = sqlDate.toLocalDate(); // LocalDate로 변환

        // 날짜 차이 계산
        long dDay = ChronoUnit.DAYS.between(now, eventDate);

        // 출력
        if (dDay > 0) {
            model.addAttribute("dday", ("D-" + dDay));
        }
        if(vo.getEvent_content() != null) {
        	vo.setEvent_content(formatToHtml(vo.getEvent_content()));
        }
	    model.addAttribute("evo", vo);
	    model.addAttribute("fileList", cloudinaryFiles);    
	    model.addAttribute("externalUrls", externalUrls);// 외부 URL 이미지 리스트
	    
	    // 세션 설정
	    session.setAttribute("event_idx", event_idx);

	    Integer loginUserIdx = (Integer) session.getAttribute("loginUserIdx");
	    if (loginUserIdx != null) {
	        session.setAttribute("member_idx", loginUserIdx);
	    } else {
	        session.setAttribute("alertMsg", "로그인을 해야 신고 기능을 이용할 수 있습니다.");
	    }
	    
	    boolean eventLiked = false;
	    if (loginUserIdx != null) {
	        eventLiked = eventLikeService.hasLiked(event_idx, loginUserIdx);
	        model.addAttribute("eventLiked", eventLiked);
	    }
	    
	    Integer storeIdx = (Integer) session.getAttribute("storeIdx");
	    if (storeIdx != null) {
	        List<Integer> appliedEdayIdxList = eventRequestService.getAppliedEdayIdxList(storeIdx);
	        Map<Integer, String> entryStatusMap = new HashMap<>();
	        for (Integer edayIdx : appliedEdayIdxList) {
	            entryStatusMap.put(edayIdx, "신청 승인중");
	        }
	        model.addAttribute("entryStatusMap", entryStatusMap);
	    }

	    return "index";
	}
	// 이벤트 입점신청 요청
	@PostMapping("/eventView")
	public String eventRequest(@RequestParam int eday_idx, @RequestParam int store_idx) {
		eventRequestService.eventRequest(eday_idx, store_idx);
		int event_idx = eventRequestService.getEventIdxByEdayIdx(eday_idx);
		return "redirect:/event/eventView?event_idx=" + event_idx;
	}
	
	//이벤트 입점 신청 철회
	@PostMapping(value = "/cancelEntry", produces = "application/json")
	@ResponseBody
	public Map<String, Object> cancelEntry(
	    @RequestParam("eday_idx") int edayIdx,
	    @RequestParam("store_idx") int storeIdx) {

	    Map<String, Object> response = new HashMap<>();
	    try {
	        int eventIdx = eventRequestService.getEventIdxByEdayIdx(edayIdx);
	        eventRequestService.cancelEntry(edayIdx, storeIdx);

	        response.put("success", true);
	        response.put("eventIdx", eventIdx);
	    } catch (Exception e) {
	    	e.printStackTrace();
	    	response.put("success", false);
	        response.put("message", "철회 처리에 실패했습니다.");
	    }
	    return response;
	}
	
	// 이벤트 신고 기능
	@PostMapping("/report/submit")
	public String submitReport(@RequestParam("declaration_category") String declarationCategory,
	                           @RequestParam("declaration_content") String declarationContent,
	                           @RequestParam("event_idx") Integer eventIdx,
	                           @RequestParam("member_idx") Integer memberIdx,
	                           RedirectAttributes redirectAttributes) {

	    System.out.println("[신고 제출 요청] eventIdx=" + eventIdx + ", memberIdx=" + memberIdx);

	    // 중복 신고 여부 확인
	    boolean alreadyDeclared = eventDeclarationService.hasAlreadyDeclared(memberIdx, eventIdx);
	    System.out.println("[중복 신고 여부] alreadyDeclared=" + alreadyDeclared);

	    if (alreadyDeclared) {
	        // 여기서 successMessage는 아예 안 보냄
	        redirectAttributes.addFlashAttribute("alreadyDeclared", true);
	    } else {
	        EventDeclarationVO reportVO = new EventDeclarationVO();
	        reportVO.setEvent_idx(eventIdx);
	        reportVO.setMember_idx(memberIdx);
	        reportVO.setDeclaration_category(declarationCategory);
	        reportVO.setDeclaration_content(declarationContent);

	        System.out.println("[신고 저장 시작] " + reportVO.toString());
	        eventDeclarationService.submitReport(reportVO);
	        System.out.println("[신고 저장 완료]");

	        redirectAttributes.addFlashAttribute("successMessage", "신고가 정상적으로 접수되었습니다.");
	    }

	    return "redirect:/event/eventView?event_idx=" + eventIdx;
	}
	
	@GetMapping("/myevent")
	public String myevent() {
		return "index";
	}
	// 이벤트 좋아요 기능
	@PostMapping(value = "/like", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Map<String, Object>> likeEvent(@RequestBody Map<String, Object> payload, HttpSession session) {
	    Integer loginUserIdx = (Integer) session.getAttribute("member_idx");
	    if (loginUserIdx == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("message", "로그인이 필요합니다."));
	    }

	    Object rawIdx = payload.get("event_idx");
	    Integer eventIdx = null;
	    try {
	        if (rawIdx instanceof Number) {
	            eventIdx = ((Number) rawIdx).intValue();
	        } else if (rawIdx instanceof String) {
	            eventIdx = Integer.parseInt((String) rawIdx);
	        }
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body(Map.of("message", "이벤트 ID 파싱 오류"));
	    }

	    if (eventIdx == null) {
	        return ResponseEntity.badRequest().body(Map.of("message", "이벤트 ID가 유효하지 않습니다."));
	    }

	    String action = String.valueOf(payload.get("action"));

	    try {
	        if ("like".equals(action)) {
	            eventLikeService.addLike(eventIdx, loginUserIdx);     
	        } else {
	            eventLikeService.removeLike(eventIdx, loginUserIdx);    
	        }
	    } catch (Exception e) {
	        e.printStackTrace(); 
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("message", "서버 오류: 좋아요 처리 실패", "error", e.getMessage()));
	    }

	    try {
	        int likeCount = eventService.getLikeCount(eventIdx); // 기존 방식 유지
	        return ResponseEntity.ok(Map.of("likeCount", likeCount));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("message", "서버 오류: 좋아요 수 조회 실패"));
	    }
	}
	
	@GetMapping(value = "/like/check", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseEntity<Map<String, Object>> checkLike(@RequestParam("event_idx") int eventIdx, HttpSession session) {
	    Integer loginUserIdx = (Integer) session.getAttribute("member_idx");
	    if (loginUserIdx == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                .body(Map.of("message", "로그인이 필요합니다."));
	    }

	    try {
	        boolean liked = eventLikeService.hasLiked(eventIdx, loginUserIdx);
	        return ResponseEntity.ok(Map.of("liked", liked));
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(Map.of("message", "서버 오류: 좋아요 여부 확인 실패"));
	    }
	}

	// 이벤트 승인요청 리스트
	@GetMapping(value = "/getEventRequest",
		produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<EventVO>> getEventRequest(HttpSession session) {
		List<EventVO> list = eventService.getEventList((int) session.getAttribute("loginUserIdx"));
		return new ResponseEntity<List<EventVO>>(list, HttpStatus.OK);
	}
	
	// 일차별 승인 요청 점포
	@GetMapping(value = "/getEdayRequest/{eday_idx}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<EventRequestVO>> getEdayRequest(@PathVariable("eday_idx") int eday_idx) {
		List<EventRequestVO> list = eventRequestService.getEdayRequest(eday_idx);
		return new ResponseEntity<List<EventRequestVO>>(list, HttpStatus.OK);
	}
	
	// 이벤트 관리 점포 승인
	@PostMapping(value = "/updateRequest/{eday_idx}/{store_idx}")
	public ResponseEntity<String> updateRequest(
			@PathVariable("eday_idx") int eday_idx,
			@PathVariable("store_idx") int store_idx,
			HttpSession session) {
			String enter_id = (String) session.getAttribute("loginUser");
			int result = eventRequestService.updateRequest(enter_id, eday_idx, store_idx);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	// 이벤트 관리 점포 반려
	@DeleteMapping(value = "/deleteRequest/{eday_idx}/{store_idx}")
	public ResponseEntity<String> deleteRequest(
			@PathVariable("eday_idx") int eday_idx,
			@PathVariable("store_idx") int store_idx,
			HttpSession session) {
		String enter_id = (String) session.getAttribute("loginUser");
		int result = eventRequestService.deleteRequest(enter_id, eday_idx, store_idx);
		return new ResponseEntity<String>("success", HttpStatus.OK);
	}
	
	@GetMapping(value = "/getMyEvent",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<EventVO>> getMyEvent(HttpSession session){
		List<EventVO> list = eventService.getMyEvent((int) session.getAttribute("loginUserIdx"));
		return new ResponseEntity<List<EventVO>>(list, HttpStatus.OK);
	} 
	@GetMapping(value = "/getMyEventEnd",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<EventVO>> getMyEventEnd(HttpSession session){
		List<EventVO> list = eventService.getMyEventEnd((int) session.getAttribute("loginUserIdx"));
		return new ResponseEntity<List<EventVO>>(list, HttpStatus.OK);
	} 
	
	@GetMapping("/eventModify")
	public String showModifyForm(@RequestParam("event_idx") int event_idx, Model model, HttpSession session) {
		String userType = (String) session.getAttribute("userType");
	    if (!"enter".equals(userType)) {
	        model.addAttribute("msg", "기업 회원만 접근할 수 있습니다.");
	        model.addAttribute("redirectUrl", "/member/login");
	        return "content/modal/alertRedirect";
	    }
		
		// 1. 기본 이벤트 정보
	    EventVO evo = eventService.getEventByIdx(event_idx);
	    model.addAttribute("evo", evo);

	    // 2. 첨부된 이미지들 (Cloudinary)
	    List<AttachFileVO> fileList = cloudinaryService.getFilesByEventIdx(event_idx);
	    model.addAttribute("fileList", fileList);

	    // 3. 외부 URL이 있는 경우 (선택사항)
	    List<String> externalUrls = evo.getExternalUrls(); // getter가 있다면
	    model.addAttribute("externalUrls", externalUrls);

	    // 4. 일정 정보
	    List<EventDayVO> eventDays = eventDayService.getEventDaysByEventId(event_idx);
	    model.addAttribute("eventDays", eventDays);

	    return "index"; // JSP 경로
	}

	@PostMapping("/eventModify")
	public String modifyEvent(
	    EventVO evo,
	    @RequestParam(value = "deleteUuids", required = false) String deleteUuidsRaw,
	    @RequestParam(value = "eventImages", required = false) List<MultipartFile> newFiles) {

	    List<String> deleteUuids = new ArrayList<>();
	    if (deleteUuidsRaw != null && !deleteUuidsRaw.trim().isEmpty()) {
	        deleteUuids = Arrays.asList(deleteUuidsRaw.split(","));
	    }

	    System.out.println("deleteUuids: " + deleteUuids);

	    eventService.modifyEventBasicInfo(evo);

	    if ((!deleteUuids.isEmpty()) || (newFiles != null && !newFiles.isEmpty() && newFiles.get(0).getSize() > 0)) {
	        cloudinaryService.updateEventImagesWithDeleteAndNewFiles(evo.getEvent_idx(), deleteUuids, newFiles);
	    }

	    return "redirect:/event/eventView?event_idx=" + evo.getEvent_idx();
	}
	
	//이벤트 컨텐츠 포멧
	public static String formatToHtml(String fullText) {
	    int startIdx = fullText.indexOf("[행사내용]");

	    if (startIdx == -1) {
	        String intro = fullText.trim();
	        return "<p>" + intro.replace("\n", " ") + "</p>";
	    }

	    // 소개 문단
	    String intro = fullText.substring(0, startIdx).trim();
	    String eventPart = fullText.substring(startIdx).trim();

	    StringBuilder html = new StringBuilder();

	    // 소개문 출력
	    html.append("<p>").append(intro.replace("\n", " ")).append("</p>\n\n");

	    // 행사내용 HTML 영역 시작
	    html.append("<div class=\"event-detail\">\n");
	    html.append("<h4>[행사내용]</h4>\n");

	    // 내용만 추출
	    String content = eventPart.replace("[행사내용]", "").trim();
	    String[] mainSections = content.split("(?=\\b\\d{1,2}\\.\\s?)");

	    for (String section : mainSections) {
	        section = section.trim();
	        if (section.isEmpty()) continue;

	        Matcher matcher = Pattern.compile("^(\\d{1,2})\\.\\s*").matcher(section);
	        String mainNumber = "";
	        String rest = section;

	        if (matcher.find()) {
	            mainNumber = matcher.group(1);
	            rest = section.substring(matcher.end()).trim();
	        } else {
	            continue;
	        }

	        int subStart = rest.indexOf("①");
	        String mainTitle = (subStart != -1) ? rest.substring(0, subStart).trim() : rest.trim();
	        String subItems = (subStart != -1) ? rest.substring(subStart).trim() : "";

	        html.append("  <h5>").append(mainNumber).append(". ").append(mainTitle).append("</h5>\n");

	        if (!subItems.isEmpty()) {
	            html.append("  <ul>\n");
	            String[] items = subItems.split("(?=[①②③④⑤⑥⑦⑧⑨⑩⑪⑫])");
	            for (String item : items) {
	                item = item.trim();
	                if (item.length() < 2) continue;
	                html.append("    <li>").append(item).append("</li>\n");
	            }
	            html.append("  </ul>\n\n");
	        }
	    }

	    html.append("</div> <!-- end of event-detail -->");

	    return html.toString().trim();
	}
}
