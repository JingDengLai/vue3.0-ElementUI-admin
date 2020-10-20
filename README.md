# vue-admin

基于 Vue + Element UI 的后台管理系统解决方案。

## 功能

-   [x] Element UI
-   [x] 登录/注销
-   [x] Dashboard
-   [x] 表格
-   [x] Tab 选项卡
-   [x] 表单
-   [x] 图表 :bar_chart:
-   [x] 富文本编辑器
-   [x] markdown 编辑器
-   [x] 图片拖拽/裁剪上传
-   [x] 支持切换主题色 :sparkles:
-   [x] 列表拖拽排序
-   [x] 权限测试
-   [x] 404 / 403
-   [x] 三级菜单
-   [x] 自定义图标
-   [x] 可拖拽弹窗
-   [x] 国际化

## 安装步骤

```
// 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn
npm install

// 开启服务器，浏览器访问 http://localhost:8080
npm run serve

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

## 其他注意事项

### 一、如果我不想用到上面的某些组件呢，那我怎么在模板中删除掉不影响到其他功能呢？

举个栗子，我不想用 Vue-Quill-Editor 这个组件，那我需要分四步走。

第一步：删除该组件的路由，在目录 src/router/index.js 中，找到引入改组件的路由，删除下面这段代码。

```JavaScript
{
    // 富文本编辑器组件
    path: '/editor',
    component: resolve => require(['../components/page/VueEditor.vue'], resolve)
},
```

第二步：删除引入该组件的文件。在目录 src/components/page/ 删除 VueEditor.vue 文件。

第三步：删除该页面的入口。在目录 src/components/common/Sidebar.vue 中，找到该入口，删除下面这段代码。

```js
{
	index: 'editor',
	title: '富文本编辑器'
},
```

第四步：卸载该组件。执行以下命令：
npm un vue-quill-editor -S

完成。

### 二、如何切换主题色呢？

第一步：打开 src/main.js 文件，找到引入 element 样式的地方，换成浅绿色主题。

```javascript
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import './assets/css/theme-green/index.css';       // 浅绿色主题
```

第二步：打开 src/App.vue 文件，找到 style 标签引入样式的地方，切换成浅绿色主题。

```javascript
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
/*@import "./assets/css/theme-green/color-green.css";   !*浅绿色主题*!*/
```

第三步：打开 src/components/common/Sidebar.vue 文件，找到 el-menu 标签，把 background-color/text-color/active-text-color 属性去掉即可。



## 组件封装使用
基于axios封装请求方法

- utils/request.js: 封装axios基本配置
- api/base.js: 管理接口域名
- api/index.js: 管理API


### 一、封装axios
request.js
```javascript
//引入axios包
import axios from 'axios';
// 创建实例并设置连接超时时间，可自定义
const service = axios.create({
    timeout: 5000
});
// 设置post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/*
* 请求拦截器
* */

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

/*
* 响应拦截器
* */

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
// export default方法导出
export default service;
```

### 二、管理接口域名
base.js
```javascript
let url;

// 根据业务需求决定
url = 'http://xxx.xxx.com'

export default url;
```

### 三、管理API
index.js是一个api接口的出口，这样就可以把api接口根据功能划分为多个模块，利于多人协作开发，比如一个人只负责一个模块的开发等，还能方便每个模块中接口的命名哦

```javascript
import axios from '../utils/request';   // 导入request中创建的axios实例
import url from './base';   // 导入接口域名列表
import qs from 'qs';    // 根据需求是否导入qs模块

// 根据业务分模块
const cent = {
    // post 请求
    login (params){
        return axios.post(`${url}/login`,qs.stringify(params))
    },
    // get 请求
    fetchData(query){
        return axios.get('./table.json',{params:query})
    }
}



export default { cent };
```

### 四、为了方便api的调用，我们需要将其挂载到vue的原型上
main.js
```javascript
import api from './api' // 导入api接口

Vue.prototype.$api = api; // 将api挂载到vue的原型上
```

### 五、使用用例
```vue
methods: {    
    onLoad() {      
       this.$api.cent.fetchData(this.query).then(res => {
           console.log(res);
       });
    }  
}
```
