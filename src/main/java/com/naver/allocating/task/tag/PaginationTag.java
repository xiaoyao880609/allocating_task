package com.naver.allocating.task.tag;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.tagext.TagSupport;

public class PaginationTag extends TagSupport {
	private static final long serialVersionUID = 1770762846946251997L;

	private int page = 1;
	private int pageSize = 20;
	private int totalCnt = 0;
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
	public int getTotalCnt() {
		return totalCnt;
	}
	public void setTotalCnt(int totalCnt) {
		this.totalCnt = totalCnt;
	}

	public int doEndTag() throws JspException {
		try {
			int totalPage = totalCnt % pageSize == 0 ? totalCnt/pageSize : totalCnt/pageSize + 1;//总页数
			if (totalCnt > 0) {
				if (totalPage > 0) {
					StringBuilder html = new StringBuilder();
					html.append("<nav style='text-align:center'>");
					html.append("<ul class='pagination'>");
					int start = 1;
					int end = totalPage;
					for (int i = 4; i >= 1; i--) {
						if ((page - i) >= 1) {
							start = page - i;
							break;
						}
					}
					for (int i = 4; i >= 1; i--) {
						if ((page + i) <= totalPage) {
							end = page + i;
							break;
						}
					}
					if (end - start + 1 <= 9) {// 如果小于9则右侧补齐
						Integer padLen = 9 - (end - start + 1);
						for (int i = padLen; i >= 1; i--) {
							if ((end + i) <= totalPage) {
								end = end + i;
								break;
							}
						}
					}
					if (end - start + 1 <= 9) {// 如果还小于9左侧补齐
						Integer padLen = 9 - (end - start + 1);
						for (int i = padLen; i >= 1; i--) {
							if ((start - i) >= 1) {
								start = start - i;
								break;
							}
						}
					}
					if (page > 1) {
						if (start > 1) {
							html.append("<li><a href='javascript:goPage(1)'>首页</a></li>");
						}
						html.append("<li><a href='javascript:goPage(" + (page - 1) + ")'>上一页</a></li>");
					}
					for (int i = start; i <= end; i++) {
						if (i == page) {
							html.append("<li class='active'><a href='javascript:void(0);'>" + i + "</a></li>");
						} else {
							html.append("<li><a href='javascript:goPage(" + i + ")'>" + i + "</a></li>");
						}
					}
					if (page < totalPage) {
						html.append("<li><a href='javascript:goPage(" + (page + 1) + ")'>下一页</a></li>");
						if (end < totalPage) {
							html.append("<li><a href='javascript:goPage(" + totalPage + ")'>尾页</a></li>");
						}
					}
					html.append("<li><a href='javascript:void(0)'>共" + totalPage + "页" + this.totalCnt + "条</a></li>");
					html.append("</ul>");
					html.append("</nav>");
					pageContext.getOut().println(html.toString());
				}
			}
        } catch (IOException e) {
            throw new JspException(e);  
        }
		return SKIP_BODY;
	}
}
