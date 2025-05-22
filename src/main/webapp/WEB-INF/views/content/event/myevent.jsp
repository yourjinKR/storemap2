<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script type="text/javascript" src="/resources/js/myevent.js"></script>
<%-- <c:if test="${ loginUser eq '' or userType ne 'user'}">
<script type="text/javascript">
	alert("잘못 된 접근입니다.");
	location.href="/";
</script>
</c:if> --%>
<div class="event-wrap">
	<h3>이벤트 관리</h3>
	
	<ul class="main-tab">
		<li><a href="request" class="on">이벤트 승인</a></li>
		<li><a href="event">등록된 이벤트</a></li>
	</ul>
	
	<div class="tab-content request-content mt15 on">
		<ul>
			<li>
				<p class="on">이벤트 타이틀 :</p>
				<div class="request-detail on">
					<ul class="eday-tab">
						<li><a href="1" class="on">1일차</a></li>
						<li><a href="2">2일차</a></li>
						<li><a href="3">3일차</a></li>
						<li><a href="4">4일차</a></li>
						<li><a href="5">5일차</a></li>
						<li><a href="6">6일차</a></li>
						<li><a href="7">7일차</a></li>
						<li><a href="8">8일차</a></li>
						<li><a href="9">9일차</a></li>
					</ul>
					<div class="eday-content event1-eday1 on">
						<p>모집인원 / 최대인원</p>
						<table>
							<colgroup>
								<col width="*">
								<col width="150px">
								<col width="150px">
								<col width="75px">
								<col width="150px">
							</colgroup>
							<thead>
								<tr>
									<th>점포명</th>
									<th>품목</th>
									<th>신청날짜</th>
									<th>신고</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="t-l">신청 점포명</td>
									<td>붕어빵</td>
									<td>0000-00-00</td>
									<td>0</td>
									<td>
										<div class="btn-box">
											<button class="approve-btn" type="button">승인</button>
											<button class="reject-btn" type="button">취소</button>
										</div>	
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="eday-content event1-eday2"></div>
					<div class="eday-content event1-eday3"></div>
					<div class="eday-content event1-eday4"></div>
					<div class="eday-content event1-eday5"></div>
					<div class="eday-content event1-eday6"></div>
					<div class="eday-content event1-eday7"></div>
					<div class="eday-content event1-eday8"></div>
					<div class="eday-content event1-eday9"></div>
				</div>
			</li>
			<li>
				<p>이벤트 타이틀 :</p>
				<div class="request-detail">
					<ul class="eday-tab">
						<li><a href="1" class="on">1일차</a></li>
						<li><a href="2">2일차</a></li>
						<li><a href="3">3일차</a></li>
						<li><a href="4">4일차</a></li>
						<li><a href="5">5일차</a></li>
						<li><a href="6">6일차</a></li>
						<li><a href="7">7일차</a></li>
						<li><a href="8">8일차</a></li>
						<li><a href="9">9일차</a></li>
					</ul>
					<div class="eday-content event1-eday1 on">
						<table>
							<colgroup>
								<col width="*">
								<col width="150px">
								<col width="150px">
								<col width="75px">
								<col width="150px">
							</colgroup>
							<thead>
								<tr>
									<th>점포명</th>
									<th>품목</th>
									<th>신청날짜</th>
									<th>신고</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="t-l">신청 점포명</td>
									<td>붕어빵</td>
									<td>0000-00-00</td>
									<td>0</td>
									<td>
										<div class="btn-box">
											<button class="approve-btn" type="button">승인</button>
											<button class="reject-btn" type="button">취소</button>
										</div>	
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="eday-content event1-eday2"></div>
					<div class="eday-content event1-eday3"></div>
					<div class="eday-content event1-eday4"></div>
					<div class="eday-content event1-eday5"></div>
					<div class="eday-content event1-eday6"></div>
					<div class="eday-content event1-eday7"></div>
					<div class="eday-content event1-eday8"></div>
					<div class="eday-content event1-eday9"></div>
				</div>
			</li>
		</ul>
	</div>
	
	<div class="tab-content event-content ">
		<h4>진행 예정 중인 이벤트</h4>
		<ul>
			<li>
				<a href="/event/eventView?event_idx=1">
					<div class="img-box">
						<img alt="" src="">
					</div>
					<dl>
						<dt>이벤트 타이틀 :</dt>
						<dd>이벤트 기간 : </dd>	
						<dd>내용 : </dd>
					</dl>
				</a>
			</li>
		</ul>
	</div>
		
</div>