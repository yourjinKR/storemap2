package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.mapper.TestMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class TestServiceImple implements TestService{
	
	@Autowired
	private TestMapper mapper;
	
	@Override
	public int test() {
		int result = mapper.test();
		log.info("service page");
		return result;
	}
}
