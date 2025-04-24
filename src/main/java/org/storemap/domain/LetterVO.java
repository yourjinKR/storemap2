package org.storemap.domain;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LetterVO {
	private int letter_idx, letter_read;
	private String letter_receiver, letter_content, letter_writer, auth;
	private Date letter_regdate;
}
