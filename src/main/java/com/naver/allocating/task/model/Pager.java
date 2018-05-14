package com.naver.allocating.task.model;

import java.io.Serializable;

public class Pager implements Serializable {
	private static final long serialVersionUID = -549683850672069337L;

	private int totalCnt = 0;
	private int page = 1;
	private int pageSize = 50;
	public int getTotalCnt() {
		return totalCnt;
	}
	public void setTotalCnt(int totalCnt) {
		this.totalCnt = totalCnt;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getOffSet() {
		return page == 1 ? 0 : (page - 1) * pageSize;
	}
}