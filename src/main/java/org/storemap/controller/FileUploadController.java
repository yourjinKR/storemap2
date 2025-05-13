package org.storemap.controller;

import org.storemap.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class FileUploadController {

    private final CloudinaryService cloudinaryService;

    @Autowired
    public FileUploadController(CloudinaryService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    /**
     * 업로드 폼 페이지를 반환합니다.
     * 
     * @return 업로드 폼 JSP 페이지
     */
    @GetMapping("/uploadForm")
    public String uploadForm() {
        return "uploadForm";
    }

    /**
     * 업로드된 파일을 처리하고 결과 URL을 View에 전달합니다.
     * 
     * @param file 업로드할 파일
     * @param model 모델 객체
     * @return 업로드 결과 JSP 페이지
     */
    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file, Model model) {
        String url = cloudinaryService.uploadFile(file);
        model.addAttribute("url", url);
        return "/admin/noticeWrite"; // 업로드 결과를 보여줄 뷰 이름
    }
}