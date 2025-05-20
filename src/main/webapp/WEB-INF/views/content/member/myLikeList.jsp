<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<ul class="sub-tab">
	<li><a href="event" ${param.sub eq 'event' or param.sub eq null ? 'class="on"' : '' }>이벤트</a></li>
	<li><a href="store" ${param.sub eq 'store' ? 'class="on"' : '' }>점포</a></li>
	<li><a href="review" ${param.sub eq 'review' ? 'class="on"' : '' }>리뷰</a></li>
</ul>

<!-- 이벤트 좋아요 -->
<div class="sub-tab-content event-content mt15 ${param.sub eq 'event' or param.sub eq null ? 'on' : '' }">
	<ul>
		
	</ul>
</div>
<!-- 점포 좋아요 -->
<div class="sub-tab-content store-content mt15 ${param.sub eq 'store' ? 'on' : '' }">
	<ul>
		
	</ul>
</div>
<!-- 리뷰 좋아요 -->
<div class="sub-tab-content review-content mt15 ${param.sub eq 'review' ? 'on' : '' }">
	<ul>
		
	</ul>
</div>