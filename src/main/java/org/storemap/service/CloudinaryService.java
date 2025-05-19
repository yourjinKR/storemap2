package org.storemap.service;
import com.cloudinary.Cloudinary;

import lombok.extern.log4j.Log4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.storemap.domain.AttachFileVO;
import org.storemap.mapper.AttachFileMapper;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Log4j
@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Autowired
	private AttachFileMapper mapper;
    
    
    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }
    // 파일 업로드
    public String uploadFile(MultipartFile file) {
        try {
            // 원본 파일 이름에서 확장자 추출
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new IllegalArgumentException("파일 이름이 비어있습니다.");
            }
            
            String fileName = originalFilename.substring(0, originalFilename.indexOf("."));
            
            // UUID를 활용한 고유 파일 이름 생성
            String uuid = UUID.randomUUID().toString();
            String uniqueFilename = uuid +"_"+ fileName;

            // Cloudinary 업로드 옵션 설정
            Map<String, Object> uploadOptions = new HashMap<>();
            uploadOptions.put("public_id", uniqueFilename);

            // Cloudinary에 업로드
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadOptions);
            
            // attachDAO에 insert
            AttachFileVO vo = new AttachFileVO();
            vo.setFilename(originalFilename);
            vo.setUuid(uuid);
            mapper.insertAttach(vo);
            
            // 업로드된 파일 URL 반환
            return uuid;
            
        } catch (IOException e) {
            throw new RuntimeException("Cloudinary 파일 업로드 실패", e);
        }
    }
    
    // 파일 삭제
    public boolean deleteFile(String uuid) {
        try {
            // Cloudinary에서 파일 삭제
            AttachFileVO vo = mapper.getAttach(uuid);
            if(vo != null) {
            	String fileName = vo.getUuid() + "_" + vo.getFilename(); // Cloudinary에서 삭제할 파일 이름
            	log.info(fileName);
            	// Cloudinary에서 파일 삭제
            	String public_id = fileName.substring(0, fileName.indexOf("."));
            	Map<String, Object> deleteOptions = new HashMap<>();
            	deleteOptions.put("invalidate", true);
            	Map<String, Object> deleteResult = cloudinary.uploader().destroy(public_id,deleteOptions);
            	// 삭제 결과 확인
            	if (deleteResult.containsKey("result") && "ok".equals(deleteResult.get("result"))) {
            		// 삭제 성공, 데이터베이스에서 파일 정보도 삭제
            		mapper.deleteAttach(vo.getUuid());
            		return true;
            	} else {
            		return false;
            	}
            }else {
            	return false;
            }

        } catch (IOException e) {
            throw new RuntimeException("Cloudinary 파일 삭제 실패", e);
        } catch (Exception e) {
            throw new RuntimeException("파일 삭제 중 오류 발생", e);
        }
    }
    
}