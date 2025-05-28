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
import org.storemap.domain.AttachFileVO;
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
	

	// 메인 이벤트 진행중인 리스트
	@GetMapping(value = "/getLiveEvent",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE
	})
	public ResponseEntity<List<EventVO>> getLiveEvent(){
		return new ResponseEntity<List<EventVO>>(eventService.getLiveEvent(), HttpStatus.OK);
	}
	
	// 메인 이벤트 진행중인 리스트
	@GetMapping(value = "/getMainSlide",
			produces = {
					MediaType.APPLICATION_JSON_VALUE
	})
	public ResponseEntity<List<EventVO>> getMainSlide(){
		return new ResponseEntity<List<EventVO>>(eventService.getMainSlide(), HttpStatus.OK);
	}
	
	// 메인 이벤트 진행예정 리스트
	@GetMapping(value = "/getSoonEvent",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE
	})
	public ResponseEntity<List<EventVO>> getSoonEvent(){
		return new ResponseEntity<List<EventVO>>(eventService.getSoonEvent(), HttpStatus.OK);
	}
	
	// 메인 이벤트 리스트 종료
	@GetMapping(value = "/getListEndDate/{searchDate}",
			produces = {MediaType.APPLICATION_JSON_VALUE}
			)
	public ResponseEntity<List<EventVO>> getListEndDate(@PathVariable("searchDate") String searchDate){
		return new ResponseEntity<List<EventVO>>(eventService.getListEndDate(searchDate), HttpStatus.OK);
	}
	
	// 메인 점포 랜덤 리스트
	@GetMapping(value = "/getStoreRanList/{store_address}",
			produces = {MediaType.APPLICATION_JSON_VALUE}
	)
	public ResponseEntity<List<StoreVO>> getStoreRanList(@PathVariable("store_address") String store_address){
		return new ResponseEntity<List<StoreVO>>(storeService.getStoreRanList(store_address), HttpStatus.OK);
	}
}
