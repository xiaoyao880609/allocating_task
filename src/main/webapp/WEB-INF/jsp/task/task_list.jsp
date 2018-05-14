<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="pager" uri="/pagination-examples-taglib"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<title>task list</title>
<head>
<c:import url="/WEB-INF/common/include.jsp"/>
<body>
	<div class="container">
		<p class="text-right">
			欢迎，<strong>${user.name}</strong> 先生/女士 
		</p>
	    <div id="head_div" style="display:block;">
		<h2 class="page-header">
		Create Area&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button id="task_save" type="button" class="btn btn-success">创建</button>
		</h2>
		<form id="save_form" method="post">
		<div class="row">
			<div class="col-md-1"><label>标题</label></div>
			<div class="col-md-3">
				<input type="text" id="save_tittle" name="tittle" class="form-control">
			</div>
			<div class="col-md-1"><label>星期</label></div>
			<div class="col-md-2">
				<select class="form-control" name="week">
			    	<option value="1">星期一</option>
			    	<option value="2">星期二</option>
			    	<option value="3">星期三</option>
			    	<option value="4">星期四</option>
			    	<option value="5">星期五</option>
			    	<option value="6">星期六</option>
			    	<option value="7">星期日</option>
			    </select>
			</div>
			<div class="col-md-1"><label>语言</label></div>
			<div class="col-md-2">
				<select class="form-control" name="language">
			    	<option value="0">简体</option>
			    	<option value="1">繁体</option>
			    </select>
			</div>
		</div>
		<div class="row" style="margin-top: 16px;">
			<div class="col-md-1"><label>发布时间</label></div>
			<div class="col-md-2">
				<input type="text" id="save_release_time" name="releaseTime" class="form-control">
			</div>
			<div class="col-md-1"><label>作者</label></div>
			<div class="col-md-2">
				<input type="text" name="author" class="form-control">
			</div>
			<div class="col-md-1"><label>备注</label></div>
			<div class="col-md-3">
				<textarea name="note" class="form-control" rows="2"></textarea>
			</div>
		</div>
		<input type="hidden" id="holder" name="holder" value="${user.name}">
		</form>
		<h2 class="page-header">
		Search Area&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button id="task_search" type="button" class="btn btn-info">检索</button>
		</h2>
		<form id="search_form" method="get">
		<div class="row">
			<div class="col-md-1"><label>标题</label></div>
			<div class="col-md-2">
				<input type="text" name="tittle" class="form-control" value="${task.tittle}">
			</div>
			<div class="col-md-1"><label>作者</label></div>
			<div class="col-md-2">
				<input type="text" name="author" class="form-control" value="${task.author}">
			</div>
			<div class="col-md-1"><label>状态</label></div>
			<div class="col-md-2">
				<select class="form-control" name="status">
			    	<option value="6">全部</option>
			    	<option value="0"<c:if test='${task.status eq 0}'> selected</c:if>>未登录</option>
			    	<option value="1"<c:if test='${task.status eq 1}'> selected</c:if>>已登录</option>
			    	<option value="2"<c:if test='${task.status eq 2}'> selected</c:if>>检查中</option>
			    	<option value="3"<c:if test='${task.status eq 3}'> selected</c:if>>修改中</option>
			    	<option value="4"<c:if test='${task.status eq 4}'> selected</c:if>>完了</option>
			    	<option value="5"<c:if test='${task.status eq 5}'> selected</c:if>>休载</option>
			    </select>
			</div>
			<div class="col-md-1"><label>语言</label></div>
			<div class="col-md-2">
				<select class="form-control" name="language">
			    	<option value="0"<c:if test='${task.language ne 1}'> selected</c:if>>简体</option>
			    	<option value="1"<c:if test='${task.language eq 1}'> selected</c:if>>繁体</option>
			    </select>
			</div>
		</div>
		<input type="hidden" id="week" name="week" value="${task.week}">
		<input type="hidden" name="totalCnt" value="${task.totalCnt}">
	   	<input type="hidden" id="page" name="page" value="${task.page}">
	   	<input type="hidden" name="pageSize" value="${task.pageSize}">
		</form>
		</div>
	    <h2 class="page-header">
	    Result Area&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
		<button id="hide_btn" type="button" class="btn btn-primary">隐藏</button>
		&nbsp;&nbsp;
		<button id="show_btn" type="button" class="btn btn-primary">显示</button>
		&nbsp;&nbsp;
		<button id="export_btn" type="button" class="btn btn-primary">导出</button>
	    </h2>
	    <ul class="nav nav-tabs">
			<li<c:if test='${task.week eq 0}'> class="active"</c:if>><a onclick="javascript:searchByWeek(0);" href="javascript:void(0);" data-toggle="tab">全部</a></li>
			<li<c:if test='${task.week eq 1}'> class="active"</c:if>><a onclick="javascript:searchByWeek(1);" href="javascript:void(0);" data-toggle="tab">星期一</a></li>
			<li<c:if test='${task.week eq 2}'> class="active"</c:if>><a onclick="javascript:searchByWeek(2);" href="javascript:void(0);" data-toggle="tab">星期二</a></li>
			<li<c:if test='${task.week eq 3}'> class="active"</c:if>><a onclick="javascript:searchByWeek(3);" href="javascript:void(0);" data-toggle="tab">星期三</a></li>
			<li<c:if test='${task.week eq 4}'> class="active"</c:if>><a onclick="javascript:searchByWeek(4);" href="javascript:void(0);" data-toggle="tab">星期四</a></li>
			<li<c:if test='${task.week eq 5}'> class="active"</c:if>><a onclick="javascript:searchByWeek(5);" href="javascript:void(0);" data-toggle="tab">星期五</a></li>
			<li<c:if test='${task.week eq 6}'> class="active"</c:if>><a onclick="javascript:searchByWeek(6);" href="javascript:void(0);" data-toggle="tab">星期六</a></li>
			<li<c:if test='${task.week eq 7}'> class="active"</c:if>><a onclick="javascript:searchByWeek(7);" href="javascript:void(0);" data-toggle="tab">星期日</a></li>
		</ul>
		<div class="tab-content">
			<div class="tab-pane fade in active">
				<p>
					<table class="table">
					    <thead>
					    <tr>
					        <th style="width:30px;">语言</th>
					        <th style="width:80px;">标题</th>
					        <th style="width:60px;">状态</th>
					        <th style="width:60px;">作者</th>
					        <th style="width:50px;">担当者</th>
					        <th style="width:40px;">发布时间</th>
					        <th style="width:100px;">备注</th>
					        <c:if test="${task.week eq 0}"><th style="width:40px;">星期</th></c:if>
					        <th style="width:30px;">操作</th>
					    </tr>
					    </thead>
					    <tbody id="listTable">
					    <c:forEach var="subTask" items="${taskList}" varStatus="status">
						    <tr class="<c:choose><c:when test='${status.index % 2 eq 0 }'>info</c:when><c:otherwise>danger</c:otherwise></c:choose>">
						    	<td>
						        <c:choose>
						        	<c:when test="${subTask.language eq 0}">简体</c:when>
						        	<c:otherwise>繁体</c:otherwise>
						        </c:choose>
						        </td>
						        <td><input type="text" class="form-control" value="${subTask.tittle}"></td>
						        <td>
						        <select histNo="${subTask.histNo}">
							    	<option value="0"<c:if test='${subTask.status eq 0}'> selected</c:if>>未登录</option>
							    	<option value="1"<c:if test='${subTask.status eq 1}'> selected</c:if>>已登录</option>
							    	<option value="2"<c:if test='${subTask.status eq 2}'> selected</c:if>>检查中</option>
							    	<option value="3"<c:if test='${subTask.status eq 3}'> selected</c:if>>修改中</option>
							    	<option value="4"<c:if test='${subTask.status eq 4}'> selected</c:if>>完了</option>
							    	<option value="5"<c:if test='${subTask.status eq 5}'> selected</c:if>>休载</option>
							    </select>
						        </td>
						        <td><input type="text" class="form-control" value="${subTask.author}"></td>
						        <td>${subTask.holder}</td>
						        <td><input type="text" class="form-control" value="${subTask.releaseTime}"></td>
						        <td><textarea class="form-control" rows="1" data-toggle="popover" data-placement="bottom" data-content="${subTask.note}">${subTask.note}</textarea></td>
						        <c:if test="${task.week eq 0}">
							        <td>
							        <c:if test="${subTask.week eq 1}">星期一</c:if>
							        <c:if test="${subTask.week eq 2}">星期二</c:if>
							        <c:if test="${subTask.week eq 3}">星期三</c:if>
							        <c:if test="${subTask.week eq 4}">星期四</c:if>
							        <c:if test="${subTask.week eq 5}">星期五</c:if>
							        <c:if test="${subTask.week eq 6}">星期六</c:if>
							        <c:if test="${subTask.week eq 7}">星期日</c:if>
							        </td>
						        </c:if>
						        <td>
							        <button type="button" class="btn btn-warning btn-sm" onclick="javascript:updateTask(this);" histNo="${subTask.histNo}">保存</button>
							        <button type="button" class="btn btn-danger btn-sm" onclick="javascript:deleteTask(this);" histNo="${subTask.histNo}">删除</button>
						        </td>
						    </tr>
					    </c:forEach>
					    </tbody>
					</table>
				    <pager:pagination totalCnt="${task.totalCnt}" page="${task.page}" pageSize="${task.pageSize}"/>
				</p>
			</div>
		</div>
    </div>
</body>
<script type="text/javascript">
function goPage(page) {
	$("#page").val(page);
	$("#search_form").attr("action", "/web/task").submit();
}
function searchByWeek(week) {
	$("#page").val(1);
	$("#week").val(week);
	$("#search_form").attr("action", "/web/task").submit();
}
function updateTask(obj) {
	$.ajax({
		url: '/web/task/update',
		type: 'post',
		dataType: 'json',
		data: {
			histNo : $(obj).attr("histNo"),
			tittle : $($(obj).parent().siblings().get(1)).find("input").val(),
			status : $($(obj).parent().siblings().get(2)).find("select").val(),
			author : $($(obj).parent().siblings().get(3)).find("input").val(),
			holder : $("#holder").val(),
			releaseTime : $($(obj).parent().siblings().get(5)).find("input").val(),
			note : $($(obj).parent().siblings().get(6)).find("textarea").val()
		},
		error: function() {
			alert('服务器异常，请稍后再试。');
		},
		success: function(result) {
			if(result) {
				$(obj).parents().next("td").text($("#holder").val());
				$($(obj).parent().siblings().get(6)).find("textarea").attr("data-content", $($(obj).parent().siblings().get(6)).find("textarea").val());
				alert('更新状态成功。');
			} else {
				alert('更新状态失败，请稍后再试。');
			}
		}
	});
}
function deleteTask(obj) {
	$.ajax({
		url: '/web/task/delete',
		type: 'post',
		dataType: 'json',
		data: {
			histNo : $(obj).attr("histNo")
		},
		error: function() {
			alert('服务器异常，请稍后再试。');
		},
		success: function(result) {
			if(result) {
				$("#page").val(1);
				$("#search_form").attr("action", "/web/task").submit();
			} else {
				alert('删除任务失败，请稍后再试。');
			}
		}
	});
}
$(document).ready(function() {
	$("[data-toggle='popover']").popover();
	$(document).mouseup(function(e){
		if($(e.target).parent("[data-toggle='popover']").length == 0) {
		  $("[data-toggle='popover']").popover('hide');
		}
	});
	$("#show_btn").click(function(){
		$("#head_div").attr("style", "display:block;");
	});
	$("#hide_btn").click(function(){
		$("#head_div").attr("style", "display:none;");
	});
	$("#task_save").click(function(){
		if ($.trim($("#save_tittle").val()).length < 1) {
			alert("标题不能为空！");
		} else if ($.trim($("#save_release_time").val()).length >20) {
			alert("发布时间长度不能超过20个字符！");
		} else {
			$("#save_form").attr("action", "/web/task/save").submit();
		}
	});
	$("#task_search").click(function(){
		$("#page").val(1);
		$("#search_form").attr("action", "/web/task").submit();
	});
	$("#export_btn").click(function(){
		$("#page").val(1);
		$("#search_form").attr("action", "/web/export").submit();
	});
});
</script>
</html>