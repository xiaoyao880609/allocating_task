-- 用户表
CREATE TABLE `user` (   
 `ip` varchar(20) not null,
 `name` varchar(20) not null,
 `cre_ymdt` datetime DEFAULT NULL,
 primary key(`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
