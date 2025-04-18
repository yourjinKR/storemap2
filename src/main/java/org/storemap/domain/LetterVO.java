package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LetterVO {
	private int letter_idx, member_idx, letter_read;
	private String letter_content, letter_writer;
	private Date letter_regdate;
}
