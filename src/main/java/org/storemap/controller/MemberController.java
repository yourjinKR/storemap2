package org.storemap.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	// 로그인 화면
	@GetMapping("/login")
	public String loginPage() {
		return "index";
	}
	// 로그인 처리
	@PostMapping("/login")
	public String login(
			@RequestParam("memberId") String memberId,
			@RequestParam("memberPw") String memberPw,
			HttpSession session,
			Model model) {
		// 테스트
		if("admin".equals(memberId) && "1234".equals(memberPw)) {
			session.setAttribute("loginId", memberId);
			return "redirect:/";
		} else {
			model.addAttribute("msg","아이디 또는 비밀번호가 틀렸습니다.");
			model.addAttribute("page","login");
			return "index";
		}
	}
}
