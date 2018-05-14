package com.naver.allocating.task.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.naver.allocating.task.dao.UserDao;
import com.naver.allocating.task.model.User;
import com.naver.allocating.task.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Transactional(isolation=Isolation.DEFAULT,propagation=Propagation.REQUIRED,readOnly=false)
	public void addUser(User user) {
		userDao.addUser(user);
	}

	public User getUserByIp(String ip) {
		return userDao.getUserByIp(ip);
	}

}