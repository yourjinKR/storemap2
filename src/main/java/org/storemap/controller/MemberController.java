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
import org.storemap.mapper.MemberMapper;
import org.storemap.service.CommentLikeServiceImple;
import org.storemap.service.EnterServiceImple;
import org.storemap.service.EventLikeServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.ReviewLikeServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreLikeServiceImple;

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
		if(member != null) {
			member.setMember_pw(null);
			session.setAttribute("loginUserIdx", member.getMember_idx());
			session.setAttribute("loginUser", member.getMember_id());
			session.setAttribute("userType", member.getMember_type());
			return "redirect:/";
		}
		// enter 테이블 검증
		EnterVO enter = enterService.eLogin(id, pw);
		if(enter != null) {
			enter.setEnter_pw(null);
			session.setAttribute("loginUser", enter.getEnter_id());
			session.setAttribute("userType", "enter");
			return "redirect:/";
		}
		model.addAttribute("msg","아이디 또는 비밀번호가 틀렸습니다.");
		model.addAttribute("page","login");
		return "index";
	}
	// 회원가입 화면으로 이동
	@GetMapping("/register")
	public String registerForm(@RequestParam String type, Model model, HttpServletRequest request) {
		model.addAttribute("page","member/register");
		model.addAttribute("type", type);
		request.setAttribute("path", "/member/register");
		return "index";
	}
	// 개인/점주 아이디 중복 확인
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
	
	// 개인/점주 회원가입 처리
	@PostMapping(value = "/register", produces = "application/json; charset=UTF-8")
	@ResponseBody
	public Map<String, Object> registerMember(@RequestBody MemberVO member) {
		Map<String, Object> result = new HashMap<>();
		int res = memberService.insertMember(member);
		result.put("result", res);
		return result;
	}
	
	
	// 개인/점주 회원가입 처리
//	@PostMapping("/register/personal")
//	public String registerMember(MemberVO member) {
//		memberService.insertMember(member);
//		return "redirect:/member/login";
//	}
	// 기관/단체 회원가입 처리
//	@PostMapping("/register/group")
//	public String registerEnter(EnterVO enter) {
//		enterService.insertEnter(enter);
//		return "redirect:/member/login";
//	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
