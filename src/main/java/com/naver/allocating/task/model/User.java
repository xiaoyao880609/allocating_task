package com.naver.allocating.task.model;

import java.io.Serializable;
import java.util.Date;

public class User implements Serializable {
	private static final long serialVersionUID = -3587660107424578631L;
	private String ip;
	private String name;
	private Date creYmdt;
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreYmdt() {
		return creYmdt;
	}
	public void setCreYmdt(Date creYmdt) {
		this.creYmdt = creYmdt;
	}
}
