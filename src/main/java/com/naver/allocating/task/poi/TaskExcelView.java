package com.naver.allocating.task.poi;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.collections.CollectionUtils;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.view.document.AbstractXlsView;

import com.naver.allocating.task.model.Task;
import com.naver.allocating.task.service.TaskService;

public class TaskExcelView extends AbstractXlsView {

	private static final String FILE_NAME = "task_list";
	@Autowired
	private TaskService taskService;
	@Override
	protected void buildExcelDocument(Map<String, Object> model,
			Workbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddHHmm");
		String excelName = FILE_NAME + sdf.format(new Date()) + ".xls";
        response.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(excelName,"utf-8"));
        response.setContentType("application/ms-excel; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        @SuppressWarnings("unchecked")
        List<Task> taskList = (List<Task>) model.get("taskList");
        Sheet sheet = workbook.createSheet("User Detail");
        sheet.setDefaultColumnWidth(30);
        CellStyle cellStyle = workbook.createCellStyle();
        Font font = workbook.createFont();
        font.setFontName("Arial");
        cellStyle.setFillForegroundColor(HSSFColor.BLUE.index);
        cellStyle.setFillPattern((short) 1);
        font.setColor(HSSFColor.WHITE.index);
        cellStyle.setFont(font);
        Row header = sheet.createRow(0);
        header.createCell(0).setCellValue("Language");
        header.getCell(0).setCellStyle(cellStyle);
        header.createCell(1).setCellValue("Tittle");
        header.getCell(1).setCellStyle(cellStyle);
        header.createCell(2).setCellValue("Status");
        header.getCell(2).setCellStyle(cellStyle);
        header.createCell(3).setCellValue("Author");
        header.getCell(3).setCellStyle(cellStyle);
        header.createCell(4).setCellValue("Holder");
        header.getCell(4).setCellStyle(cellStyle);
        header.createCell(5).setCellValue("Note");
        header.getCell(5).setCellStyle(cellStyle);
        header.createCell(6).setCellValue("Release Time");
        header.getCell(6).setCellStyle(cellStyle);
        header.createCell(7).setCellValue("Week");
        header.getCell(7).setCellStyle(cellStyle);
        int rowCount = 1;
        if (CollectionUtils.isNotEmpty(taskList)) {
        	for (Task task : taskList) {
        		Row userRow = sheet.createRow(rowCount++);
				userRow.createCell(0).setCellValue(task.getLanguage() == 0 ? "简体" : "繁体");
        		userRow.createCell(1).setCellValue(task.getTittle());
        		switch (task.getStatus()) {
				case 1:
					userRow.createCell(2).setCellValue("已登录");
					break;
				case 2:
					userRow.createCell(2).setCellValue("检查中");
					break;
				case 3:
					userRow.createCell(2).setCellValue("修改中");
					break;
				case 4:
					userRow.createCell(2).setCellValue("完了");
					break;
				default:
					userRow.createCell(2).setCellValue("未登录");
					break;
				}
        		userRow.createCell(3).setCellValue(task.getAuthor());
        		userRow.createCell(4).setCellValue(task.getHolder());
        		userRow.createCell(5).setCellValue(task.getNote());
        		userRow.createCell(6).setCellValue(task.getReleaseTime());
        		switch (task.getWeek()) {
				case 2:
					userRow.createCell(7).setCellValue("星期二");
					break;
				case 3:
					userRow.createCell(7).setCellValue("星期三");
					break;
				case 4:
					userRow.createCell(7).setCellValue("星期四");
					break;
				case 5:
					userRow.createCell(7).setCellValue("星期五");
					break;
				case 6:
					userRow.createCell(7).setCellValue("星期六");
					break;
				case 7:
					userRow.createCell(7).setCellValue("星期日");
					break;
				default:
					userRow.createCell(7).setCellValue("星期一");
					break;
				}
        		
        	}
        }
    }
}
