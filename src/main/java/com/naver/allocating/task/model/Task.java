package com.naver.allocating.task.model;

import java.io.Serializable;
import java.util.Date;

public class Task extends Pager implements Serializable {
	private static final long serialVersionUID = -3587660107424578631L;
	private String histNo;
	private String tittle;
	private Integer week = 0;
	private Integer status = 6;
	private Integer language = 0;
	private String author;
	private String holder;
	private String note;
	private Date creYmdt;
	private String releaseTime;
	public String getHistNo() {
		return histNo;
	}
	public void setHistNo(String histNo) {
		this.histNo = histNo;
	}
	public String getTittle() {
		return tittle;
	}
	public void setTittle(String tittle) {
		this.tittle = tittle.trim();
	}
	public Integer getWeek() {
		return week;
	}
	public void setWeek(Integer week) {
		this.week = week;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getLanguage() {
		return language;
	}
	public void setLanguage(Integer language) {
		this.language = language;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author.trim();
	}
	public String getHolder() {
		return holder;
	}
	public void setHolder(String holder) {
		this.holder = holder.trim();
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note.trim();
	}
	public Date getCreYmdt() {
		return creYmdt;
	}
	public void setCreYmdt(Date creYmdt) {
		this.creYmdt = creYmdt;
	}
	public String getReleaseTime() {
		return releaseTime;
	}
	public void setReleaseTime(String releaseTime) {
		this.releaseTime = releaseTime.trim();
	}
}
