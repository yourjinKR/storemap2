<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
    <script type="text/javascript">
        window.onload = function() {
            alert("${msg}");
            location.href = "${redirectUrl}";
        };
    </script>