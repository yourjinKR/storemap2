package org.storemap.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.AttachFileVO;
import org.storemap.domain.EnterVO;
import org.storemap.domain.EventVO;
import org.storemap.domain.MemberVO;
import org.storemap.domain.ReviewVO;
import org.storemap.domain.StoreLikeVO;
import org.storemap.domain.StoreVO;
import org.storemap.mapper.AttachFileMapper;
import org.storemap.mapper.MemberMapper;
import org.storemap.service.CommentLikeServiceImple;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventLikeServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.ReviewLikeServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreLikeServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/member")
@Controller
public class MemberController {
	@Autowired
	private MemberServiceImple memberService;
	@Autowired
	private EnterServiceImple enterService;
	@Autowired
	private StoreServiceImple storeService;
	@Autowired
	private StoreLikeServiceImple storeLikeService;
	@Autowired
	private EventLikeServiceImple eventLikeService;
	@Autowired
	private ReviewLikeServiceImple reviewLikeService;
	@Autowired
	private CommentLikeServiceImple commentLikeService;
	@Autowired
	private ReviewServiceImple reviewService;
	@Autowired
	private AttachFileMapper attachMapper;
	
	// 로그인 화면으로 이동
	@GetMapping("/login")
	public String loginPage(HttpServletRequest request, HttpSession session) {
		String referer = request.getHeader("Referer");
		if(referer != null && !referer.contains("/login")) {
			// URL에서 도메인을 제거해 상대경로로 저장
			String contextPath = request.getContextPath();
			String redirectPath = referer.replaceFirst("http?://[^/]+", "");
			session.setAttribute("redirectAfterLogin", redirectPath);
		}
		return "index";
	}
	
	// 로그인 처리
	@PostMapping("/login")
	public String Login(
			@RequestParam String id,
			@RequestParam String pw,
			HttpSession session,
			Model model) {
		// member 테이블 검증
		MemberVO member = memberService.mLogin(id, pw);
		if(member != null) {
			member.setMember_pw(null);
			//store 세션생성
			if(member.getMember_type().equals("owner")) {
				StoreVO store = storeService.getStore(member.getMember_idx());
				session.setAttribute("storeIdx", store.getStore_idx());
			}
			// NULL 체크를 추가하여 member_image가 NULL인 경우 처리
			if(member.getMember_image() != null) {
				AttachFileVO amvo = attachMapper.getAttach(member.getMember_image());
				// amvo가 null이 아닌 경우에만 파일 이름 설정
				if(amvo != null) {
					session.setAttribute("userFilename", amvo.getFilename());
				} else {
					// attachMapper에서 파일을 찾지 못한 경우 기본 이미지 설정
					session.setAttribute("userFilename", "member1.jpg");
				}
			} else {
				// member_image가 NULL인 경우 기본 이미지 설정
				member.setMember_image("member1.jpg"); // 기본 이미지 값 설정
				session.setAttribute("userFilename", "member1.jpg");
			}
			session.setAttribute("loginUserIdx", member.getMember_idx());
			session.setAttribute("loginUser", member.getMember_id());
			session.setAttribute("userName", member.getMember_name());
			session.setAttribute("userNickName", member.getMember_nickname());
			session.setAttribute("userType", member.getMember_type());
			session.setAttribute("userImage", member.getMember_image());
			
			String redirectUrl = (String) session.getAttribute("redirectAfterLogin");
			if(redirectUrl != null && redirectUrl.startsWith("/")) {
				session.removeAttribute("redirectAfterLogin");
				return "redirect:" + redirectUrl;
			}
			return "redirect:/";
		}
		// enter 테이블 검증
		EnterVO enter = enterService.eLogin(id, pw);
		if(enter != null) {
			enter.setEnter_pw(null);
			// NULL 체크를 추가하여 enter_image가 NULL인 경우 처리
			if(enter.getEnter_image() != null) {
				AttachFileVO aevo = attachMapper.getAttach(enter.getEnter_image());
				// aevo가 null이 아닌 경우에만 파일 이름 설정
				if(aevo != null) {
					session.setAttribute("userFilename", aevo.getFilename());
				} else {
					// attachMapper에서 파일을 찾지 못한 경우 기본 이미지 설정
					session.setAttribute("userFilename", "member1.jpg");
				}
			} else {
				// enter_image가 NULL인 경우 기본 이미지 설정
				enter.setEnter_image("enter1.jpg"); // 기본 이미지 값 설정
				session.setAttribute("userFilename", "member1.jpg");
			}
			session.setAttribute("loginUserIdx", enter.getEnter_idx());
			session.setAttribute("loginUser", enter.getEnter_id());
			session.setAttribute("userName", enter.getEnter_name());
			session.setAttribute("userRnum", enter.getEnter_rnum());
			session.setAttribute("userLoc", enter.getEnter_loc());
			session.setAttribute("userNum", enter.getEnter_num());
			session.setAttribute("userImage", enter.getEnter_image());
			session.setAttribute("userType", "enter");
			
			String redirectUrl = (String) session.getAttribute("redirectAfterLogin");
			if(redirectUrl != null && redirectUrl.startsWith("/")) {
				session.removeAttribute("redirectAfterLogin");
				return "redirect:" + redirectUrl;
			}
			return "redirect:/";
		}
		model.addAttribute("msg","아이디 또는 비밀번호가 틀렸습니다.");
		model.addAttribute("page","login");
		return "index";
	}
	
	// 회원정보 수정 화면으로 이동
	@GetMapping("/modifyInfo")
	public String modifyForm(@RequestParam("type") String type, HttpSession session, Model model) {
		if("personal".equals(type)) {
			// 개인
			String member_id = (String) session.getAttribute("loginUser");
			String member_name = (String) session.getAttribute("userName");
			String member_nickname = (String) session.getAttribute("userNickName");
			model.addAttribute("member_id", member_id);
			model.addAttribute("member_name", member_name);
			model.addAttribute("member_nickname", member_nickname);
		} else if("group".equals(type)) {
			// 단체
			String enter_id = (String) session.getAttribute("loginUser");
			String enter_name = (String) session.getAttribute("userName");
			int enter_rnum = (Integer)session.getAttribute("userRnum");
			String enter_loc = (String) session.getAttribute("userLoc");
			String enter_num = (String) session.getAttribute("userNum");
			model.addAttribute("enter_id", enter_id);
			model.addAttribute("enter_name", enter_name);
			model.addAttribute("enter_rnum", enter_rnum);
			model.addAttribute("enter_loc", enter_loc);
			model.addAttribute("enter_num", enter_num);
		}
		model.addAttribute("type", type);
		return "index";
	}
	
	// 개인 회원정보 수정 처리
	@PostMapping("/modifyPersonal")
	@ResponseBody
	public Map<String, Object> modifyMember(
	        @RequestParam("member_idx") int member_idx,
	        @RequestParam("member_id") String member_id,
	        @RequestParam("member_pw") String member_pw,
	        @RequestParam("member_name") String member_name,
	        @RequestParam("member_nickname") String member_nickname,
	        @RequestParam(value = "file", required = false) MultipartFile file,
	        HttpSession session) {
	    
	    Map<String, Object> result = new HashMap<>();
	    
	    MemberVO member = new MemberVO();
	    member.setMember_idx(member_idx);
	    member.setMember_id(member_id);
	    member.setMember_pw(member_pw);
	    member.setMember_name(member_name);
	    member.setMember_nickname(member_nickname);
	    
	    int res = memberService.modifyMember(file, member);
	    if(res > 0) {
	        session.setAttribute("userNickName", member.getMember_nickname());
	    }
	    result.put("result", res);
	    return result;
	}
	
	// 단체 회원정보 수정 처리
	@PostMapping("/modifyGroup")
	@ResponseBody
	public Map<String, Object> modifyEnter(
	        @RequestParam("enter_idx") int enter_idx,
	        @RequestParam("enter_id") String enter_id,
	        @RequestParam("enter_pw") String enter_pw,
	        @RequestParam("enter_name") String enter_name,
	        @RequestParam("enter_rnum") int enter_rnum,
	        @RequestParam("enter_loc") String enter_loc,
	        @RequestParam("enter_num") String enter_num,
	        @RequestParam(value = "file", required = false) MultipartFile file,
	        HttpSession session) {
	    
	    Map<String, Object> result = new HashMap<>();
	    
	    EnterVO enter = new EnterVO();
	    enter.setEnter_idx(enter_idx);
	    enter.setEnter_id(enter_id);
	    enter.setEnter_pw(enter_pw);
	    enter.setEnter_name(enter_name);
	    enter.setEnter_rnum(enter_rnum);
	    enter.setEnter_loc(enter_loc);
	    enter.setEnter_num(enter_num);
	    
	    int res = enterService.modifyEnter(file, enter);
	    result.put("result", res);
	    System.out.println("결과 : " + res);
	    return result;
	}
	
	// 로그아웃
	@PostMapping("/logout")
	@ResponseBody
	public Map<String, Object> logout(HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		session.invalidate();
		result.put("result", "success");
		return result; 
	}
		
	// 회원가입 화면으로 이동
	@GetMapping("/register")
	public String registerForm(@RequestParam String type, Model model, HttpServletRequest request) {
		model.addAttribute("page","member/register");
		model.addAttribute("type", type);
		request.setAttribute("path", "/member/register");
		return "index";
	}
	
	// 개인 아이디 중복 확인
	@GetMapping(value = "/checkId", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> checkId(@RequestParam("member_id") String member_id) {
		Map<String, Object> result = new HashMap<>();
		int existsInMember = memberService.checkId(member_id); 
		int existsInEnter = enterService.checkId(member_id); 
		int exists = (existsInMember > 0 || existsInEnter > 0) ? 1 : 0;
		result.put("result", exists);
		return result;
	}
	
	// 단체 아이디 중복 확인
	@GetMapping(value = "/echeckId", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> echeckId(@RequestParam("enter_id") String enter_id) {
		Map<String, Object> result = new HashMap<>();
		int existsInMember = memberService.checkId(enter_id); 
		int existsInEnter = enterService.checkId(enter_id); 
		int exists = (existsInMember > 0 || existsInEnter > 0) ? 1 : 0;
		result.put("result", exists);
		return result;
	}
	
	
	// 개인 회원가입 처리
	@PostMapping(value = "/register", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> registerMember(@RequestBody MemberVO member) {
		Map<String, Object> result = new HashMap<>();
		int res = memberService.insertMember(member);
		result.put("result", res);
		return result;
	}
	
	// 단체 회원가입 처리
	@PostMapping(value = "/register/group", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> registerEnter(@RequestBody EnterVO enter) {
		Map<String, Object> result = new HashMap<>();
		int res = enterService.insertEnter(enter);
		result.put("result", res);
		return result;
	}
	
	// 회원탈퇴 페이지로 이동
	@GetMapping("/delete")
	public String deletePage() {
		//model.addAttribute("path", "/member/delete");
		return "index";
	}
	
	@GetMapping("/mypage")
	public String getMyPage() {
		return "index";
	}
	
	@GetMapping(value = "/getMyLike/{type}",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> getMyLike(@PathVariable("type") String dataType, HttpSession session) {
		
		if(dataType.equals("event")) {
			List<EventVO> list = eventLikeService.getLikeList((int) session.getAttribute("loginUserIdx"));
			return new ResponseEntity<List<EventVO>>(list, HttpStatus.OK);
		}else if(dataType.equals("store")) {
			List<StoreVO> list = storeLikeService.getLikeList((int) session.getAttribute("loginUserIdx"));
			return new ResponseEntity<List<StoreVO>>(list, HttpStatus.OK);
		}else {
			List<ReviewVO> list = reviewLikeService.getLikeList((int) session.getAttribute("loginUserIdx"));
			return new ResponseEntity<List<ReviewVO>>(list, HttpStatus.OK);
		}
	}
	
	// 내 리뷰 목록
	@GetMapping(value = "/getMyReview",
			produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<ReviewVO>> getMyReview() {
		return null;
	}
	
//	@PostMapping("/delete") // 진행중
//	public String deleteMember(@RequestParam String pw, HttpSession session, Model model) {
//	    String loginId = (String) session.getAttribute("loginUser");
//	    String userType = (String) session.getAttribute("userType");
//
//	    if ("enter".equals(userType)) {
//	        EnterVO enter = enterService.eLogin(loginId, pw);
//	        if (enter == null) {
//	            model.addAttribute("msg", "비밀번호가 틀렸습니다.");
//	            return "index";
//	        }
//	        enterService.deleteEnter(enter.getEnter_idx());
//	    } else {
//	        MemberVO member = memberService.mLogin(loginId, pw);
//	        if (member == null) {
//	            model.addAttribute("msg", "비밀번호가 틀렸습니다.");
//	            return "index";
//	        }
//	        memberService.deleteMember(member.getMember_idx());
//	    }
//
//	    session.invalidate(); // 세션 삭제
//	    return "redirect:/"; // 메인으로
//	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
