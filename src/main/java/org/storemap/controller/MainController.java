package org.storemap.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.storemap.domain.EventVO;
import org.storemap.domain.StoreVO;
import org.storemap.service.AnnounceServiceImple;
import org.storemap.service.EventServiceImple;
import org.storemap.service.StoreServiceImple;

import lombok.extern.log4j.Log4j;

@Log4j
@RequestMapping("/main")
@RestController
public class MainController {
	@Autowired
	private AnnounceServiceImple announceService;
	@Autowired
	private EventServiceImple eventService;
	@Autowired
	private StoreServiceImple storeService;
	

	// 메인 이벤트 랜덤 리스트
	@GetMapping(value = "/getRanList",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE
	})
	public ResponseEntity<List<EventVO>> getList(){
		log.info("getList..." + eventService.getRanList());
		
		return new ResponseEntity<List<EventVO>>(eventService.getRanList(), HttpStatus.OK);
	}
	
	// 메인 이벤트 리스트 종료
	@GetMapping(value = "/getListEndDate/{searchDate}",
			produces = {MediaType.APPLICATION_JSON_VALUE}
			)
	public ResponseEntity<List<EventVO>> getListEndDate(@PathVariable("searchDate") String searchDate){
		
		log.info("getListEndDate....");
		log.info("searchDate...." + searchDate);
		
		return new ResponseEntity<List<EventVO>>(eventService.getListEndDate(searchDate), HttpStatus.OK);
	}
	
	// 메인 점포 랜덤 리스트
	@GetMapping(value = "/getStoreRanList/{store_address}",
			produces = {MediaType.APPLICATION_JSON_VALUE}
	)
	public ResponseEntity<List<StoreVO>> getStoreRanList(@PathVariable("store_address") String store_address){
		log.info("getStoreList....");
		log.info("store_address : " + store_address);
		
		return new ResponseEntity<List<StoreVO>>(storeService.getStoreRanList(store_address), HttpStatus.OK);
	}
}
