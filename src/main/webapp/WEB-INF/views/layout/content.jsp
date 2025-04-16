<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:choose>
	<c:when test="${path eq '/content/board/eventList'}">
		<jsp:include page="../content/board/eventList.jsp" />
	</c:when>
	<c:otherwise>
		<jsp:include page="../content/main.jsp" />
	</c:otherwise>
</c:choose>