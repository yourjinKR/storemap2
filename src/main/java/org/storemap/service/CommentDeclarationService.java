package org.storemap.service;

import java.util.List;

import org.storemap.domain.CommentDeclarationVO;

public interface CommentDeclarationService {
	// 댓글 신고 등록
	public int register(CommentDeclarationVO vo);
	// 댓글 신고 삭제
	public int remove(int comment_idx, int member_idx);
	// 댓글 신고 삭제
	public int removeAll(int comment_idx);
	// 조인된 신고 목록 조회
	public List<CommentDeclarationVO> getDeclarationMap();
	// 조인된 신고 목록 조회
	public List<CommentDeclarationVO> getDeclarationDetailMap();
}