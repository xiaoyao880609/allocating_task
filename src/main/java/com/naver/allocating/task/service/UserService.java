package com.naver.allocating.task.service;

import com.naver.allocating.task.model.User;

public interface UserService {
	
	public void addUser(User user);

	public User getUserByIp(String ip);
}
