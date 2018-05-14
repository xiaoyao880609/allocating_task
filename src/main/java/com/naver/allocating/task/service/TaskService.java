package com.naver.allocating.task.service;

import java.util.List;

import com.naver.allocating.task.model.Task;

public interface TaskService {
	
	public void addTask(Task task);

	public void updateTask(Task task);

	public void deleteTask(Task task);

	public void resetTask();// for job

	public Integer getTaskCnt(Task task);

	public List<Task> getTaskList(Task task);
	
	public List<Task> getTaskList4Export(Task task);
}
