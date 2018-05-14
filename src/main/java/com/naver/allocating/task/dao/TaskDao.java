package com.naver.allocating.task.dao;

import java.util.List;

import com.naver.allocating.task.model.Task;

public interface TaskDao {

	public void addTask(Task task);

	public void updateTask(Task task);

	public void deleteTask(Task task);

	public void resetTask();

	public Integer getTaskCnt(Task task);

	public List<Task> getTaskList(Task task);
	
	public List<Task> getTaskList4Export(Task task);

}