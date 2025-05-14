package org.storemap.service;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    @Autowired
    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    /**
     * 파일을 Cloudinary에 업로드합니다.
     * 
     * @param file 업로드할 파일
     * @return 업로드된 파일의 URL
     */
    public String uploadFile(MultipartFile file) {
        try {
            // 원본 파일 이름에서 확장자 추출
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                throw new IllegalArgumentException("파일 이름이 비어있습니다.");
            }
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
            
            // UUID를 활용한 고유 파일 이름 생성
            String uniqueFilename = UUID.randomUUID().toString() +"_"+ originalFilename;

            // Cloudinary 업로드 옵션 설정
            Map<String, Object> uploadOptions = new HashMap<>();
            uploadOptions.put("public_id", uniqueFilename);

            // Cloudinary에 업로드
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), uploadOptions);

            // 업로드된 파일 URL 반환
            return (String) uploadResult.get("url");
        } catch (IOException e) {
            throw new RuntimeException("Cloudinary 파일 업로드 실패", e);
        }
    }
}