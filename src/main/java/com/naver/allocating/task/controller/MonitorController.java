package com.naver.allocating.task.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/monitor")
public class MonitorController {

	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView login(HttpServletRequest request) throws Exception {
		/*Map<String, String> result = new HashMap<String, String>();
		Set<Entry<Thread, StackTraceElement[]>> entrySet = Thread.getAllStackTraces().entrySet();
		for (Entry<Thread, StackTraceElement[]> entry : entrySet) {
			Thread thread = entry.getKey();
			StackTraceElement[] stacks = entry.getValue();
			if (thread.equals(Thread.currentThread())) {
				continue;
			}
			System.out.println("线程：" + thread.getName());
			for (StackTraceElement stack : stacks) {
				System.err.println(stack.toString());
			}
		}*/
		return new ModelAndView("monitor/thread_list");
	}
}