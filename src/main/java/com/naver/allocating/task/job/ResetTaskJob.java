package com.naver.allocating.task.job;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.naver.allocating.task.service.TaskService;

public class ResetTaskJob extends QuartzJobBean {

	@Autowired
	private TaskService taskService;
	
	@Override
	protected void executeInternal(JobExecutionContext context)
			throws JobExecutionException {
		taskService.resetTask();
	}

}