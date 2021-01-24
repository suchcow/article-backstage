// 引入 mysql 数据库 query
let sqlQuery = require('../util/query.js');
let {
    message_err,
    delete_success,
    delete_fail,
    delete_abnormal,
    insert_success,
    insert_fail,
    getData_fail,
    update_success,
    update_fail,
    upload_success,
    upload_fail
} = require('../util/resMesssge.js');

const fs = require('fs');

let Articlecontroller = {
    // 展示 layui-article 文章表格页面
    article: (req, res) => {
        res.render('layui-article.html');
    },
    // 查询数据库获取 article 文章表
    getArticle: async(req, res) => {
        // console.log(req.query);
        let { page, limit: pagesize } = req.query;
        // 计算出每页起始行数
        let initial = (page - 1) * pagesize;
        let sql = `select t1.*,t2.category from articles t1 left join article_sort t2 on t1.sort_id = t2.sort_id order by sort_id limit ${initial}, ${pagesize}`;
        let sql2 = 'select count(*) as count from articles';
        let promise1 = sqlQuery(sql2); // [{count:7}] 查询的count数
        let promise2 = sqlQuery(sql); // [{},{},{}] 查询的数据
        //  data[[{count:7}],[{},{},{},{}]]   下标0的数据是count数,下标1的数据是查询的数据
        let data = await Promise.all([promise1, promise2]);
        // console.log(data);
        let result = {
            code: 0,
            count: data[0][0].count,
            msg: '',
            data: data[1]
        };
        // console.log(result);
        res.json(result);
    },
    // 删除文章 article 表单行数据
    deleteArticle: async(req, res) => {
        var response;
        let { article_id } = req.body;
        // console.log(article_id);
        if (!article_id) {
            res.json(message_err);
        } else {
            let mysql = `delete from articles where article_id=${article_id}`;
            try {
                var result = await sqlQuery(mysql);
                if (result.affectedRows) {
                    response = delete_success;
                } else {
                    response = delete_fail;
                }
            } catch (err) {
                console.log(err);
                response = delete_abnormal;
            }
        };
        res.json(response);
    },
    // 展示 addArticleTable 添加文章表格页面
    addArticleTable: (req, res) => {
        res.render('layui-addArticleTable.html');
    },
    // 上传文章封面接口
    coverApi: (req, res) => {
        // console.log(req.file);
        if (req.file) {
            let { originalname, filename, destination } = req.file;
            let newName = originalname.substring(originalname.lastIndexOf('.'));
            let oldPath = `${destination}${filename}`;
            let newPath = `${destination}${filename}${newName}`;
            fs.rename(oldPath, newPath, err => {
                if (err) throw err;
                upload_success.path = newPath;
                // console.log(upload_success);
                res.json(upload_success);
            })
        } else {
            res.json(upload_fail);
        };
    },
    // 添加文章
    insertArticleTable: async(req, res) => {
        let { title, author, content, sort_id, cover, status, release_time } = req.body;
        let sql = `insert into articles(title,author,content,sort_id,cover,status,release_time) 
        values('${title}','${author}','${content}','${sort_id}','${cover}','${status}','${release_time}')`;
        try {
            var result = await sqlQuery(sql);
            if (result.affectedRows) {
                response = insert_success;
            } else {
                response = insert_fail;
            }
        } catch (err) {
            console.log(err);
            response = delete_abnormal;
        }
        res.json(response);
    },
    // 展示编辑文章页面
    updateArticleTable: (req, res) => {
        res.render('layui-updateArticleTable.html');
    },
    // 获取文章分类
    getArticleSort: async(req, res) => {
        let sql = `select * from article_sort`;
        let result = await sqlQuery(sql);
        res.json(result);
    },
    // 获取要编辑的文章数据
    getArticleSingleData: async(req, res) => {
        let { article_id } = req.query;
        if (!article_id) {
            res.json(message_err);
            return;
        }
        let sql = `select * from articles where article_id=${article_id}`;
        let result = await sqlQuery(sql);
        if (result.length) {
            result[0].errcode = 0;
            res.json(result[0]);
        } else {
            res.json(getData_fail);
        }
    },
    // 编辑文章数据存入数据库
    updateSingArtile: async(req, res) => {
        // console.log(req.body);
        let { title, author, content, sort_id, cover, status, release_time, article_id } = req.body;
        if (!article_id) {
            res.json(message_err);
            return;
        }
        let sql = `update articles set title='${title}',author='${author}',content='${content}',sort_id='${sort_id}',cover='${cover}',status='${status}',release_time='${release_time}' where article_id=${article_id}`;
        try {
            var result = await sqlQuery(sql);
            if (result.affectedRows) {
                response = update_success;
            } else {
                response = update_fail;
            }
        } catch (err) {
            console.log(err);
            response = delete_abnormal;
        }
        res.json(response);
    }
};

// 暴露控制器
module.exports = Articlecontroller;