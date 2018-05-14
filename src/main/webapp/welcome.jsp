<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
	<meta http-equiv="pragma" content="no-cache" />
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
    <title>User Register</title>
	<c:import url="/WEB-INF/common/include.jsp"/>
  </head>
  <body>
	<form id="autoForm"></form>
  </body>
<script type="text/javascript">
$(function(){
	$("#autoForm").attr("action", "web/auto").submit();
});
</script>
</html>