// 引入 mysql 数据库 query
let sqlQuery = require('../util/query.js');
let {
    login_success,
    login_fail,
    register_success,
    register_fail
} = require('../util/resMesssge.js');

const fs = require('fs');

let Usercontroller = {
    // 展示 login 登录页面
    login: (req, res) => {
        res.render('layui-login.html');
    },
    // 展示 register 注册页面
    register: (req, res) => {
        res.render('layui-login.html');
    },
    // 查询数据库获取 user_admin 用户表
    loginApi: async(req, res) => {
        let { username, password } = req.body;
        // console.log(username, password);
        let sql = `select * from user_admin where username='${username}' and password='${password}'`;
        let result = await sqlQuery(sql);
        console.log(result);
        if (result.length) {
            // .把用户信息存入到会话session中，
            let userInfo = result[0];
            req.session.userInfo = userInfo;
            res.json(login_success);
        } else {
            res.json(login_fail);
        }
    },
    // // 上传文章封面接口 
    // coverApi: (req, res) => {
    //     // console.log(req.file);
    //     if (req.file) {
    //         let { originalname, filename, destination } = req.file;
    //         let newName = originalname.substring(originalname.lastIndexOf('.'));
    //         let oldPath = `${destination}${filename}`;
    //         let newPath = `${destination}${filename}${newName}`;
    //         fs.rename(oldPath, newPath, err => {
    //             if (err) throw err;
    //             upload_success.path = newPath;
    //             // console.log(upload_success);
    //             res.json(upload_success);
    //         })
    //     } else {
    //         res.json(upload_fail);
    //     };
    // },
    // 注册存入数据库
    insertUser: async(req, res) => {
        let { username, password } = req.body;
        let sql = `insert into user_admin(username,password) values('${username}','${password}')`;
        try {
            var result = await sqlQuery(sql);
            if (result.affectedRows) {
                res.json(register_success);
            } else {
                res.json(register_fail);
            }
        } catch (err) {
            console.log(err);
            res.json(delete_abnormal);
        }
    },

    // 退出登录
    quitLogin: (req, res) => {
        // 清空session并重定向到登录页面
        req.session.destroy(err => {
            if (err) { throw err; }
        })
        res.json({ message: '退出成功' })
    }

};

// 暴露控制器
module.exports = Usercontroller;