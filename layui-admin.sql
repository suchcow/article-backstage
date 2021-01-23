/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : layui-admin

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2021-01-20 22:54:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET gbk DEFAULT '' COMMENT '文章标题',
  `author` varchar(50) DEFAULT '' COMMENT '作者',
  `content` text COMMENT '文章内容',
  `sort` varchar(50) DEFAULT '' COMMENT '文章所属分类',
  `cover` varchar(255) DEFAULT '' COMMENT '封面图路径',
  `status` tinyint(4) DEFAULT '0' COMMENT '文章发布状态: 0-未发布  1-已发布  2-审核中',
  `release_time` datetime DEFAULT NULL COMMENT '发布时间',
  PRIMARY KEY (`article_id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('1', '朝花夕拾', '鲁迅', '人生就像一座山，重要的不是它的高低，而在于灵秀；人生就像一场雨，重要的不是它的大小，而在于及时。天空一碧如洗，灿烂的阳光正从密密的松针的缝隙间射下来，形成一束束粗粗细细的光柱，把飘荡着轻纱般薄雾的林荫照得通亮。', '教育', '', '1', '2021-01-20 17:29:23');
INSERT INTO `articles` VALUES ('2', '昨日-今天-明天', '赵本山', '人生只有三天，活在昨天的人迷惑；活在明天的人等待；活在今天的人最踏实。你永远无法预测意外和明天哪个来得更早，所以，我们能做的，就是尽最大的努力过好今天。请记住：今天永远是昨天死去的人所期待的明天。', '教育', '', '1', '2021-01-20 18:12:54');
INSERT INTO `articles` VALUES ('6', '遮天', '辰东', '做人不能太段德，做狗不能太黑皇; 不为成仙，只为在红尘中等你归来；我儿王腾有大帝之姿', '小说', '', '1', '2021-01-20 18:14:11');
INSERT INTO `articles` VALUES ('8', '奥斯卡几个', '阿瑟的', '萨达来看电视剧打开呢进度款纪念馆副科级电脑凯撒奖喀什发卡机拉丝机沙经理看哈看似骄傲了电视剧AV那是a', '阿瑟的', 'image/ef14c76528043b828b18b51a2b2baa8d.jpg', '0', '0000-00-00 00:00:00');
INSERT INTO `articles` VALUES ('9', '代课教师凤凰山科技', '手打了吗', ';拉杂卡利尼奇我就能理解三拉手机弹幕,askdnx,vmlaksf', '是的', 'image/41d387c6a5962a908612c1eb90cd5440.jpg', '0', '2021-01-20 20:40:30');
INSERT INTO `articles` VALUES ('10', '努力学习', '康仔', '康仔太努力,每天晚上学习到凌晨四点', '教育', 'image/c42218dd24b844bfc522241a12dae7b4.jpg', '0', '2021-01-20 20:52:10');
INSERT INTO `articles` VALUES ('11', '范德萨', '的萨芬', '电风扇', '第三方', 'image/33ec777f6bd17279cbc4dd827ffabcd8.jpg', '0', '2021-01-20 21:59:05');

-- ----------------------------
-- Table structure for article_sort
-- ----------------------------
DROP TABLE IF EXISTS `article_sort`;
CREATE TABLE `article_sort` (
  `sort_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '添加时间',
  `category` varchar(50) DEFAULT '' COMMENT '类别',
  `rank` smallint(6) DEFAULT NULL COMMENT '排序',
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`sort_id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article_sort
-- ----------------------------
INSERT INTO `article_sort` VALUES ('25', '少儿', '9', '2021-01-19 22:06:39');
INSERT INTO `article_sort` VALUES ('2', '体育', '1', '2021-01-04 15:37:46');
INSERT INTO `article_sort` VALUES ('3', '生活', '2', '2020-12-09 10:38:00');
INSERT INTO `article_sort` VALUES ('4', '军事', '3', '2020-08-13 10:10:12');
INSERT INTO `article_sort` VALUES ('5', '娱乐', '4', '2020-10-03 20:45:11');
INSERT INTO `article_sort` VALUES ('22', '阿飞', '0', '2021-01-19 21:46:02');
INSERT INTO `article_sort` VALUES ('24', '军事', '32', '2021-01-19 21:57:33');
INSERT INTO `article_sort` VALUES ('28', '教育', '0', '2021-01-19 22:09:06');
INSERT INTO `article_sort` VALUES ('27', '康仔', '15', '2021-01-19 22:08:44');
INSERT INTO `article_sort` VALUES ('26', '发财', '12', '2021-01-19 22:07:59');
INSERT INTO `article_sort` VALUES ('29', '小说', '100', '2021-01-20 00:09:49');

-- ----------------------------
-- Table structure for user_admin
-- ----------------------------
DROP TABLE IF EXISTS `user_admin`;
CREATE TABLE `user_admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET gbk DEFAULT '' COMMENT '用户名',
  `password` char(32) DEFAULT '' COMMENT '密码',
  `user_avatar` varchar(255) DEFAULT '' COMMENT '头像路径',
  `last_login` datetime DEFAULT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`admin_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_admin
-- ----------------------------
