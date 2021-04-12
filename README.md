## 项目说明文件

- 该项目基于express搭建
- 后台ui使用layui+mysql
- 使用其他技术layui+jQuery
-  加入进度条nprogress,在网页加载完毕之前加载进度条，加载完毕取消进度条

## 运行项目

- `npm i` 安装项目所有依赖包
- 导入sql文件,再修改 config/mysql_configure.json 数据库配置信息
- 执行 `npm run serve` 启动项目

## 增加集成富文本编译器wangEditor
- [官网](https://www.wangeditor.com/)
- [手册](https://doc.wangeditor.com/pages/01-%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8/01-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8.html)

- 初始化
```html
<body>
    <div id="div1">
        <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
    </div>
</body>
<!-- 或者使用npm安装 npm i wangeditor --save 引入 wangEditor.min.js 文件  -->
<script src="https://cdn.jsdelivr.net/npm/wangeditor@latest/dist/wangEditor.min.js"></script>
<script type="text/javascript">
    const E = window.wangEditor
    const editor = new E('#div1')
    editor.config.uploadImgShowBase64 = true; // 可以实现手动上传图片(转换成base64格式)
    editor.create()
</script>
```

## 增加数据可视化-echarts使用

- 文档：https://echarts.apache.org/zh/api.html#echarts 

- 快速入门建议查看菜鸟教程：https://www.runoob.com/echarts/echarts-tutorial.html

  如下基本用法：

  ```js
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>第一个 ECharts 实例</title>
      <!-- 引入 echarts.js -->
      <script src="https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js"></script>
  </head>
  <body>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 1000px;height:400px;"></div>
      <script type="text/javascript">
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('main'));
   
          // 指定图表的配置项和数据
          var option = {
              title: {
                  text: 'xx店铺销量清空'
              },
              tooltip: {},
              legend: {
                  data:['销量']
              },
              xAxis: {
                  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","内裤",'球鞋']
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: [5, 20, 36, 10, 10, 20,100,2000]
              }]
          };
   
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
      </script>
  </body>
  </html>
  ```

  ## 防止用户翻墙访问（需要做权限验证）

  说明： 有些路由需要登录后台有权限之后才可以进行操作，有session就说明有权限

  - 基本只要进入到后台执行的路由都需要权限验证

  - 在系统外面的路由就不需要验证即放行。如： `/login`, `/loginApi`, `/insertUser`出来这三个之外其他路由都需要权限验证

    ```js
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
    ```

    
