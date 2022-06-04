# 博思实训作业2

目前主要实现了基于Vue的静态权限界面，假数据方面使用了Mock.js，主要编写了主界面、登录有关页面、用户控制有关页面、角色控制有关页面、用户组控制有关页面、子系统控制有关页面。

## 数据校验

主要的数据校验在[validate.js](src/utils/validate.js)，主要对用户名、邮箱、密码等进行了校验，具体内容可见原文件

## 主要页面

> 登录有关页面主要有登录、注册和找回密码
> 
> 用户控制有关页面主要有控制页面、新增用户、修改用户、删除用户
> 
> 其余控制页面也大致相仿

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

开启页面 http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
