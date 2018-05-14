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
    <div class="container">
    <h2 class="page-header">用户初始化界面</h2>
	<form class="form-horizontal">
		<div class="form-group">
			<label for="nickname" class="col-md-2 control-label">姓名</label>
			<div class="col-md-5">
			  <input type="text" class="form-control" id="name" name="name" placeholder="name">
			</div>
		</div>
		<div class="form-group">
			<div class="col-sm-offset-2 col-sm-10">
			  <button type="button" id="register" class="btn btn-success">注册</button>
			</div>
		</div>
	</form>
    </div>
    <form id="autoForm"></form>
  </body>
<script type="text/javascript">
$(function(){
	var validator = $('.form-horizontal').validate({
        errorElement : 'span',
        errorClass : 'help-block',
        focusInvalid : true,
        rules : {
            name : {
                required : true
            },
        },
        messages : {
        	name : {
				required : "请输入姓名",
        	}
        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement : function(error, element) {
        	if ($(element[0]).attr('id') == null) {
        		error.appendTo(element.parent().parent().parent());
        	} else {
	        	error.appendTo(element.parent().parent());
        	}
        }
    });
    $("#register").click(function() {
    	if (validator.form()) {
    		$.ajax({
    			url: '/web/register',
    			type: 'post',
    			cache: false,
    			contentType: "application/json",
    			dataType : 'json',
    			data: JSON.stringify({
    				"name" : $("#name").val()
    			}),
    			error : function(err){
    				console.log(err);
    			},
    			success : function(msg){
    				console.log(msg);
    				if (msg.success) {
    					alert("初始化用户信息成功,将自动跳转任务列表界面。");
    					$("#autoForm").attr("action", "/web/auto").submit();
    				} else {
    					alert("初始化用户信息失败，请稍后再试！");
    				}
    			}
    		})
    	} else {
    		validator.resetForm();
    	}
    });
});
</script>
</html>