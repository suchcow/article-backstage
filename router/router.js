const express = require('express');
const multer = require('multer');

// 设置传入文件的目录
var image = multer({ dest: 'image/' });

// 得到一个路由器
let router = express.Router();

//  导入控制器 分类表
let Sortcontroller = require('../controller/Sortcontroller.js');

//  导入控制器 分类表
let Articlecontroller = require('../controller/Articlecontroller.js');
// console.log(Sortcontroller);

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

router.post('/coverApi', image.single('cover'), Articlecontroller.coverApi); // 上传文章封面图片

router.post('/insertArticleTable', Articlecontroller.insertArticleTable); // 添加文章接口

router.get('/updateArticleTable', Articlecontroller.updateArticleTable); // 展示编辑 Article 文章表页面    

router.get('/getArticleSort', Articlecontroller.getArticleSort); // 拿到文章分类 

router.get('/getArticleSingleData', Articlecontroller.getArticleSingleData); // 拿到要需要编辑的文章单行数据 

router.post('/updateSingArtile', Articlecontroller.updateSingArtile); // 编辑文章存入数据库


// 暴露路由器
module.exports = router;