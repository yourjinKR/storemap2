package org.storemap.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.storemap.domain.EnterVO;
import org.storemap.mapper.EnterMapper;

import lombok.extern.log4j.Log4j;

@Log4j
@Service
public class EnterServiceImple implements EnterService{
	@Autowired
	private EnterMapper enterMappter;
	
	@Override
	public EnterVO eLogin(String enter_id, String enter_pw) {
		return enterMappter.eLogin(enter_id, enter_pw);
	}
	@Override
	public int insertEnter(EnterVO enter) {
		int result = enterMappter.insertEnter(enter);
		return result;
	}
}
