<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<ul class="sub-tab">
	<li><a href="event" class="on">이벤트</a></li>
	<li><a href="store">점포</a></li>
	<li><a href="review">리뷰</a></li>
</ul>

<!-- 이벤트 좋아요 -->
<div class="sub-tab-content event-content mt15 on">
	<ul>
		<li>
			<a>
				<div class="img-box">
					<img src="">
				</div>
				<dl>
					<dt>이벤트 타이틀</dt>
					<dd>이벤트 기간 : </dd>	
					<dd>내용 : </dd>
				</dl>
				<div class="like-box">
					<input type="checkbox" id="likeChk01" checked>
					<label for="likeChk01" class="material-symbols-outlined">
			      		favorite
			      	</label>
				</div>
			</a>
		</li>
	</ul>
</div>
<!-- 점포 좋아요 -->
<div class="sub-tab-content store-content mt50">
</div>
<!-- 리뷰 좋아요 -->
<div class="sub-tab-content review-content mt50">
</div>