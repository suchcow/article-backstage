let express = require('express')

let router = express.Router();

let query = require('../util/query.js');

// 获取所有的分类
router.get('/sort', async(req, res) => {
    let sql = `select * from article_sort `;
    let data = await query(sql); // [{},{}]
    res.json(data);
})

// 获取点赞量最多的文章,降序排序
router.get('/article', async(req, res) => {
    let { _page = 1, _limit = 5 } = req.query;
    let offset = (_page - 1) * _limit;
    let sql = `select t1.*,t2.category from articles as t1 left join article_sort as t2 
    on t1.sort_id = t2.sort_id 
    where status = 1 order by praise desc 
    limit ${offset},${_limit}`;
    let data = await query(sql); // [{},{}]
    // 添加图片完整路径
    data.map(v => {
        if (v.cover) {
            v.cover = `http://localhost:4567/${v.cover}`
        }
    })
    res.json(data)
})


// 获取各个类的文章
router.get('/artOfEachSort', async(req, res) => {
    let { sort_id, _page = 1, _limit = 3 } = req.query;
    let offset = (_page - 1) * _limit;
    // console.log(sort_id);
    let sql = `select *from articles where sort_id =${sort_id} and status = 1 order by praise desc`;
    let data = await query(sql); // [{},{}]
    data.map(v => {
        if (v.cover) {
            v.cover = 'http://localhost:4000/' + v.cover
        }
    })
    res.json(data)
})




// 匹配失败提示用户
router.all('*', (req, res) => {
    res.json({ message: "请求错误" })
})

// 暴露路由中间件
module.exports = router;