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