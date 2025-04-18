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
	

	@GetMapping(value = "/getRanList",
			produces = {
					MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE
	})
	public ResponseEntity<List<EventVO>> getList(){
		log.info("getList..." + eventService.getRanList());
		
		return new ResponseEntity<List<EventVO>>(eventService.getRanList(), HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/getStoreRanList",
			produces = {MediaType.APPLICATION_JSON_VALUE}
	)
	public ResponseEntity<List<StoreVO>> getStoreRanList(){
		log.info("getStoreList....");
		
		return new ResponseEntity<List<StoreVO>>(storeService.getStoreRanList(), HttpStatus.OK);
	}
}
