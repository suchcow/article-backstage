const express = require('express');
const path = require('path');
const artTemplate = require('art-template');
const express_template = require('express-art-template');

const app = express();
// 导入路由模块
let router = require('./router/router.js');

// 托管静态资源
app.use(express.static(path.join(__dirname)));

// 设置中间件，获取post请求参数
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// 引入session会话技术
let session = require('express-session');

// 初始化session,定义session一些配置
let options = {
    name: "LUOZHIKANG", // 待会写入到cookie中标识
    secret: "!@#$%^&*(LUO)", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        maxAge: 60000 * 10, // session在cookies存活10分钟，
    }
};
app.use(session(options));

// 配置模板的路径
app.set('views', __dirname + '/views/');

// 设置express_template模板引擎的静态文件扩展名为.html
app.engine('html', express_template);

// 使用模板引擎扩展名为html
app.set('view engine', 'html');

// 在进入到路由匹配函数之前，要进行验证权限
app.use(function(req, res, next) {
    let path = req.path.toLowerCase(); // 1.获取当前访问路由
    let noSession = ['/login', '/loginApi', '/insertUser'] // 2. 定义放行的路由，即不需要权限验证
    if (noSession.includes(path)) {
        // 如果为 true 放行
        next();
    } else {
        // 否则需要验证权限 session
        if (req.session.userInfo) {
            // 有权限，放行
            next();
        } else {
            // 则否,跳转到登录页面 
            res.redirect('/login');
        }
    }
});

// 使用路由中间件
app.use(router);

app.listen(4567, () => {
    console.log('server is running at port 4567')
});