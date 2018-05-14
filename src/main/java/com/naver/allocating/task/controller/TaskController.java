package com.naver.allocating.task.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.naver.allocating.task.model.Task;
import com.naver.allocating.task.model.User;
import com.naver.allocating.task.poi.TaskExcelView;
import com.naver.allocating.task.service.TaskService;
import com.naver.allocating.task.service.UserService;

@Controller
@RequestMapping("/web")
public class TaskController {
	@Autowired
	private UserService userService;
	@Autowired
	private TaskService taskService;
	@RequestMapping(value = "auto", method = RequestMethod.GET)
	public ModelAndView login(HttpServletRequest request) throws Exception {
		ModelAndView model = null;
		String ip = request.getRemoteAddr();
		User user = userService.getUserByIp(ip);
		if (user == null) {
			model = new ModelAndView("user/register");
		} else {
			return new ModelAndView("redirect:/web/task");
		}
		return model;
	}

	@RequestMapping(value = "task", method = RequestMethod.GET)
	public ModelAndView task(HttpServletRequest request, Task task) throws Exception {
		String ip = request.getRemoteAddr();
		User user = userService.getUserByIp(ip);
		List<Task> taskList = taskService.getTaskList(task);
		task.setTotalCnt(taskService.getTaskCnt(task));
		return new ModelAndView("task/task_list").addObject("user", user).addObject("task", task).addObject("taskList", taskList);
	}
	
	@ResponseBody
	@RequestMapping(value = "task/save", method = RequestMethod.POST)
	public ModelAndView saveTask(HttpServletRequest request, Task task) throws Exception {
		try {
			taskService.addTask(task);
		} catch (Exception e) {
		}
		return new ModelAndView("redirect:/web/task");
	}
	
	@ResponseBody
	@RequestMapping(value = "task/update", method = RequestMethod.POST)
	public boolean updateTask(HttpServletRequest request, Task task) throws Exception {
		try {
			taskService.updateTask(task);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	@ResponseBody
	@RequestMapping(value = "task/delete", method = RequestMethod.POST)
	public boolean deleteTask(HttpServletRequest request, Task task) throws Exception {
		try {
			taskService.deleteTask(task);
		} catch (Exception e) {
			return false;
		}
		return true;
	}

	@RequestMapping(value = "export", method = RequestMethod.GET)
	public ModelAndView export(HttpServletRequest request, Task task) throws Exception {
		Map<String, Object> model = new HashMap<String, Object>();
		List<Task> taskList = taskService.getTaskList4Export(task);
		model.put("taskList", taskList);
		TaskExcelView taskExcelView = new TaskExcelView();
		return new ModelAndView(taskExcelView, model);
	}

	@ResponseBody
	@RequestMapping(value = "register", method = RequestMethod.POST)
	public Map<String, Object> register(HttpServletRequest request, @RequestBody User user) throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		try {
			String ip = request.getRemoteAddr();
			user.setIp(ip);
			userService.addUser(user);
		} catch (Exception e) {
			result.put("success", false);
			return result;
		}
		result.put("success", true);
		return result;
	}
}