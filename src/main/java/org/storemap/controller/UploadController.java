package org.storemap.controller;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.storemap.domain.AttachFileVO;
import org.storemap.service.AttachFileServiceImple;
import org.storemap.service.MemberServiceImple;
import org.storemap.service.MenuServiceImple;
import org.storemap.service.ReviewServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@Controller
public class UploadController {
	
	@Autowired
	private AttachFileServiceImple attachService;
	@Autowired
	private MemberServiceImple memberService;
	@Autowired
	private StoreServiceImple storeService;
	@Autowired
	private MenuServiceImple menuService;
	@Autowired
	private ReviewServiceImple reviewService;
	@Autowired
	private ServletContext servletContext;
	

	
	// 상대 경로로 파일 저장 위치 결정 메서드
	private String getUploadPath() {
		// 현재 실행되는 프로젝트의 루트 디렉토리
	    String projectRoot = System.getProperty("user.dir");
	    String path = servletContext.getRealPath("/resources/img");
	    String result = null;
	    int index = path.indexOf(".metadata");
	    String keyword = ".metadata";
	    if (index != -1) {
	        result = path.substring(0, index);
	    }
	    // 상대 경로 설정: src/main/webapp/resources/img
	    
	    String relativePath = "storemap2/src/main/webapp/resources/img";

	    File uploadDir = new File(result, relativePath);

	    // 디렉토리가 없으면 생성
	    if (!uploadDir.exists()) {
	        uploadDir.mkdirs();
	    }

	    log.info("상대경로 기반 업로드 경로: " + uploadDir.getAbsolutePath());

	    return uploadDir.getAbsolutePath();
	}
	
	//업로드
	@PostMapping("/uploadFormAction")
	public String uploadFormPost(MultipartFile[] uploadFile, Model model, RedirectAttributes rttr) {
		
		List<AttachFileVO> list = new ArrayList<AttachFileVO>();
		
		// 임시 디렉토리 확인
		File tempDir = new File("C:\\upload");
		if (!tempDir.exists()) {
			tempDir.mkdirs();
		}
		
		// 실제 저장 경로
		String uploadPath = getUploadPath();
		//String uploadPath = servletContext.getRealPath("/resources/img");
		log.info("uploadPath: "+uploadPath);
		
		// 폴더 만들어주기
		File uploadDir = new File(uploadPath);
		if(!uploadDir.exists()) {
			uploadDir.mkdirs();
		}
		
		int successCount = 0;
		
		for(MultipartFile multipartFile : uploadFile) {
			if(multipartFile.isEmpty()) continue; // 빈 파일 건너뛰기
			
			AttachFileVO attachDTO = new AttachFileVO();
			log.info("-----------------");
			log.info("Upload File Name: "+multipartFile.getOriginalFilename());			
			log.info("Upload File Size: "+multipartFile.getSize());	
			
			String uploadFileName = multipartFile.getOriginalFilename();
			// Windows 경로의 경우 백슬래시 처리
			uploadFileName = uploadFileName.substring(uploadFileName.lastIndexOf("\\")+1);
			log.info("only file name: "+uploadFileName);
			
			try {
				File saveFile = new File(uploadPath, uploadFileName);
				multipartFile.transferTo(saveFile);
				attachDTO.setFilename(uploadFileName);
				successCount++;
				list.add(attachDTO);
				
			} catch (Exception e) {
				log.error(e.getMessage());
			}
		}
		
		rttr.addFlashAttribute("message", successCount + "개 파일이 성공적으로 업로드되었습니다.");
	    return "redirect:/"; // 결과 페이지로 리다이렉트
		
	}
	
	/*--------------------------------------------------------------------------*/
	
	// 오늘 날짜의 경로를 문자열로 생성
	private String getFolder() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String str = sdf.format(date);
		return str.replace("-", File.separator);
	}
	
}