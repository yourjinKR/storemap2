package org.storemap.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class LetterVO {
	private int letter_idx, member_idx, letter_read;
	private String letter_content, letter_writer;
	private Date letter_regdate;
}
