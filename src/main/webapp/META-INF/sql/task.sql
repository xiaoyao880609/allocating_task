-- 任务表
CREATE TABLE `task` (
 `hist_no` int(11) NOT NULL AUTO_INCREMENT,
 `language` tinyint(1) NOT NULL DEFAULT '0',--0~1：简体，繁体--
 `tittle` varchar(50) NOT NULL,
 `week` tinyint(1) NOT NULL DEFAULT '0',--1~7: 星期一~星期日--
 `status` tinyint(1) NOT NULL DEFAULT '0',--0~5：未登录，已登录，检查中，已更换，完了，休载--
 `author` varchar(20) NULL,
 `holder` varchar(20) NOT NULL,
 `note` text NULL,
 `cre_ymdt` datetime NOT NULL,
 `release_time` varchar(20) NOT NULL,--发布时间--
 primary key(`hist_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;