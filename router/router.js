const express = require('express');
const multer = require('multer');
const path = require('path');

// 创建文章封面文件夹
var image = multer({ dest: 'image/' });

// 创建用户头像文件夹
var user_avatar = multer({ dest: 'user_avatar/' });

// 得到一个路由器
let router = express.Router();

//  导入控制器 分类表
let Sortcontroller = require('../controller/Sortcontroller.js');

//  导入控制器 文章表
let Articlecontroller = require('../controller/Articlecontroller.js');

//  导入控制器 用户登录
let Usercontroller = require('../controller/Usercontroller.js');

// 在路由器身上绑定路由
router.get(/^\/$|^\/admin$/, Sortcontroller.admin); //展示 admin页面

router.get('/sort', Sortcontroller.sort); //展示 layui-sort 页面

router.get('/getSort', Sortcontroller.getSort); // 获取分类 sort 表数据

router.post('/deleteSort', Sortcontroller.deleteSort); // 删除分类 sort 表单行数据

router.get('/addSortTable', Sortcontroller.addSortTable); // 展示 addSortTable 添加分类表格页面 

router.post('/insertSortTable', Sortcontroller.insertSortTable); // 添加 sort 表格

router.get('/updateSortTable', Sortcontroller.updateSortTable); // 展示updateSortTable 编辑分类表格页面 

router.get('/getSingleData', Sortcontroller.getSingleData); // 编辑分类表,获取单条表数据 

router.post('/editSingData', Sortcontroller.editSingData); // 编辑 sort 表格

router.get('/article', Articlecontroller.article); // 展示 layui-article 文章表页面

router.post('/deleteArticle', Articlecontroller.deleteArticle); // 删除 article 文章表

router.get('/getArticle', Articlecontroller.getArticle); // 添加 article 表格 

router.get('/addArticleTable', Articlecontroller.addArticleTable); // 展示添加 addArticleTable 文章表页面  

router.post('/coverApi', image.single('file'), Articlecontroller.coverApi); // 上传文章封面图片

router.post('/insertArticleTable', Articlecontroller.insertArticleTable); // 添加文章接口

router.get('/updateArticleTable', Articlecontroller.updateArticleTable); // 展示编辑 Article 文章表页面    

router.get('/getArticleSort', Articlecontroller.getArticleSort); // 拿到文章分类 

router.get('/getArticleSingleData', Articlecontroller.getArticleSingleData); // 拿到要需要编辑的文章单行数据 

router.post('/updateSingArtile', Articlecontroller.updateSingArtile); // 编辑文章存入数据库

router.get('/login', Usercontroller.login); // 展示 layui-login 用户登录页面

router.get('/updatePass', Usercontroller.updatePass); // 展示 修改密码 页面

router.post('/login_api', Usercontroller.loginApi); // 验证登录接口 

router.get('/quitLogin', Usercontroller.quitLogin); // 退出登录

router.post('/insertUser', Usercontroller.insertUser); // 注册用户  

router.get('/getStatistic', Articlecontroller.getStatistic); // 统计出分类的文章总数 

router.get('/getMonthlyArt', Articlecontroller.getMonthlyArt); // 统计出每月发布的文章数

router.get('/getUserInfor', Usercontroller.getUserInfor); // 显示用户信息  updateUserAvatar

router.post('/uploadUserAvatar', user_avatar.single('user_avatar'), Usercontroller.uploadUserAvatar); // 上传用户头像  

router.post('/updateUserAvatar', user_avatar.single('user_avatar'), Usercontroller.updateUserAvatar); // 更换用户头像

router.post('/updatePassInfor', Usercontroller.updatePassInfor); // 修改密码  

// 暴露路由器
module.exports = router;