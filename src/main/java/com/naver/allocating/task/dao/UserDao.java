package com.naver.allocating.task.dao;

import com.naver.allocating.task.model.User;

public interface UserDao {

	public void addUser(User user);
	
	public User getUserByIp(String ip);

}