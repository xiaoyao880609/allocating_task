package com.naver.allocating.task.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.naver.allocating.task.dao.TaskDao;
import com.naver.allocating.task.model.Task;
import com.naver.allocating.task.service.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskDao taskDao;

	@Transactional(isolation=Isolation.DEFAULT,propagation=Propagation.REQUIRED,readOnly=false)
	@Override
	public void addTask(Task task) {
		taskDao.addTask(task);
	}
	
	@Transactional(isolation=Isolation.DEFAULT,propagation=Propagation.REQUIRED,readOnly=false)
	@Override
	public void updateTask(Task task) {
		taskDao.updateTask(task);
	}

	@Transactional(isolation=Isolation.DEFAULT,propagation=Propagation.REQUIRED,readOnly=false)
	@Override
	public void deleteTask(Task task) {
		taskDao.deleteTask(task);
	}

	@Transactional(isolation=Isolation.DEFAULT,propagation=Propagation.REQUIRED,readOnly=false)
	@Override
	public void resetTask() {
		taskDao.resetTask();
	}

	@Override
	public Integer getTaskCnt(Task task) {
		return taskDao.getTaskCnt(task);
	}

	@Override
	public List<Task> getTaskList(Task task) {
		return taskDao.getTaskList(task);
	}
	
	@Override
	public List<Task> getTaskList4Export(Task task) {
		return taskDao.getTaskList(task);
	}

}