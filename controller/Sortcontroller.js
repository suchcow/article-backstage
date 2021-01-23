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

let Sortcontroller = {
    // 展示 admin页面
    admin: (req, res) => {
        res.render('layui-admin.html');
    },
    // 展示 layui-sort 页面
    sort: (req, res) => {
        res.render('layui-sort.html');
    },
    // 获取分类表数据
    getSort: async(req, res) => {
        let sql = 'select * from article_sort order by rank';
        let result = await sqlQuery(sql);
        res.json(result);
    },
    // 删除分类 sort 表单行数据
    deleteSort: async(req, res) => {
        var response;
        let { article_id } = req.body;
        // console.log(article_id);
        if (!article_id) {
            res.json(message_err);
        } else {
            let mysql = `delete from article_sort where article_id=${article_id}`;
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
    // 展示 addSortTable 添加分类表格页面
    addSortTable: (req, res) => {
        res.render('layui-addSortTable.html');
    },
    // 添加分类 sort 表格 updateSortTable
    insertSortTable: async(req, res) => {
        let { category, rank, add_time } = req.body;
        let sql = `insert into article_sort(category,rank,add_time) values('${category}',${rank},'${add_time}')`;
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
    // 展示updateSortTable 编辑分类表格页面 
    updateSortTable: (req, res) => {
        res.render('layui-updateSortTable.html');
    },
    // 编辑分类表,获取单条分类 sort 表数据
    getSingleData: async(req, res) => {
        let { article_id } = req.query;
        if (!article_id) {
            res.json(message_err);
            return;
        }
        let sql = `select * from article_sort where article_id=${article_id}`;
        let result = await sqlQuery(sql);
        if (result.length) {
            result[0].errcode = 0;
            res.json(result[0]);
        } else {
            res.json(getData_fail);
        }
    },
    // 编辑分类表,存入分类 sort 表数据
    editSingData: async(req, res) => {
        // console.log(req.body);
        let { category, rank, add_time, article_id } = req.body;
        if (!article_id) {
            res.json(message_err);
            return;
        }
        let sql = `update article_sort set category='${category}',rank=${rank},add_time='${add_time}' where article_id=${article_id}`;
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
    },
    // 展示 layui-article 文章表格页面
    article: (req, res) => {
        res.render('layui-article.html');
    },
    // 查询数据库获取 article 文章表
    getArticle: async(req, res) => {
        let sql = 'select * from articles';
        let result = await sqlQuery(sql);
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
            // console.log(newName)
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
        let { title, author, content, sort, cover, status, release_time } = req.body;
        let sql = `insert into articles(title,author,content,sort,cover,status,release_time) 
        values('${title}','${author}','${content}','${sort}','${cover}','${status}','${release_time}')`;
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
        let { title, author, content, sort, cover, status, release_time, article_id } = req.body;
        if (!article_id) {
            res.json(message_err);
            return;
        }
        let sql = `update articles set title='${title}',author='${author}',content='${content}',sort='${sort}',cover='${cover}',status='${status}',release_time='${release_time}' where article_id=${article_id}`;
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
module.exports = Sortcontroller;