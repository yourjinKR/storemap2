package org.storemap.service;

import lombok.Value;

public interface AIService {
    /**
     * 사용자 메시지를 AI 모델에 전달하고 응답을 반환
     * @param userMessage 사용자 입력
     * @return AI 응답 텍스트
     */
    String requestAIResponse(String userMessage) throws Exception;

}
