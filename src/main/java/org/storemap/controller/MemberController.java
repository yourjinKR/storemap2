package org.storemap.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	public String mLogin(
			@RequestParam String id,
			@RequestParam String pw,
			@RequestParam String type,
			HttpSession session,
			Model model) {
		if("member".equals(type)) {
			MemberVO loginUser = memberService.mLogin(id, pw);
			// 검증
			if(loginUser != null) {
				session.setAttribute("loginUser", loginUser);
				return "redirect:/";
			}
		} else {
			EnterVO loginUser = enterService.eLogin(id, pw);
			// 검증
			if(loginUser != null) {
				session.setAttribute("loginUser", loginUser);
				return "redirect:/";
			}
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
	// 개인/점주 회원가입 처리
	@PostMapping("/register")
	public String registerMember(MemberVO member) {
		memberService.insertMember(member);
		return "redirect:/member/login";
	}
	
	// 기관/단체 회원가입 처리(삭제)
//	@PostMapping("/register")
//	public String registerEnter(EnterVO enter) {
//		enterService.insertEnter(enter);
//		return "redirect:/member/login";
//	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
