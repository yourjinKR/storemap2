package org.storemap.mapper;

import java.util.List;

import org.storemap.domain.CommentDeclarationVO;

public interface CommentDeclarationMapper {
	// 댓글 신고 등록
	public int insert(CommentDeclarationVO reportVO);
	// 댓글 신고 삭제
	public int delete(int comment_idx, int member_idx);
	// 댓글 신고 전체 삭제
	public int deleteAll(int comment_idx);
	// 조인 신고 목록
	public List<CommentDeclarationVO> getCommentDeclarationMap();
	// 조인 신고 디테일 목록
	public List<CommentDeclarationVO> getCommentDeclarationDetailMap();
}