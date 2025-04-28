package org.storemap.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.storemap.domain.EnterVO;
import org.storemap.domain.MemberVO;
import org.storemap.domain.StoreVO;
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
	
	// 로그인 화면으로 이동
	@GetMapping("/login")
	public String loginPage() {
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
		StoreVO store;
		if(member != null) {
			if(member.getMember_type() == "owner") {
				store = storeService.getStore(member.getMember_idx());
				session.setAttribute("storeIdx", store.getStore_idx());
			}
			member.setMember_pw(null);
			session.setAttribute("loginUserIdx", member.getMember_idx());
			session.setAttribute("loginUser", member.getMember_id());
			session.setAttribute("userName", member.getMember_name());
			session.setAttribute("userNickName", member.getMember_nickname());
			session.setAttribute("userType", member.getMember_type());
			session.setAttribute("userImage", member.getMember_image());
			return "redirect:/";
		}
		// enter 테이블 검증
		EnterVO enter = enterService.eLogin(id, pw);
		if(enter != null) {
			enter.setEnter_pw(null);
			session.setAttribute("loginUserIdx", enter.getEnter_idx());
			session.setAttribute("loginUser", enter.getEnter_id());
			session.setAttribute("userName", enter.getEnter_name());
			session.setAttribute("userRnum", enter.getEnter_rnum());
			session.setAttribute("userLoc", enter.getEnter_loc());
			session.setAttribute("userNum", enter.getEnter_num());
			session.setAttribute("userImage", enter.getEnter_image());
			session.setAttribute("userType", "enter");
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
	@PostMapping(value = "/modifyInfo/personal", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> modifyMember(@RequestBody MemberVO member, HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		int res = memberService.modifyMember(member);
		if(res > 0) {
			session.setAttribute("userNickName",member.getMember_nickname());
		}
		result.put("result", res);
		return result;
	}
	
	// 단체 회원정보 수정 처리
	@PostMapping(value = "/modifyInfo/group", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> modifyEnter(@RequestBody EnterVO enter, HttpSession session) {
		Map<String, Object> result = new HashMap<>();
		int res = enterService.modifyEnter(enter);
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
	
	// 첨부파일
	
	
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
	
	// 로그인 화면으로 이동
	@GetMapping("/delete")
	public String deletePage() {
		//model.addAttribute("path", "/member/delete");
		return "index";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
