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
> 
> 具体页面展示可见 http://114.115.178.208:9528

## 登录界面

登录界面主要实现了登录、注册和忘记密码

### 登录

由于暂时使用了Mock.js作为假数据，所以账号只有身为超级管理员的admin和身为普通成员的editor

主要对用户名和密码进行了数据校验，用户名校验主要查看用户名中是否有非法字符如“：”，密码校验主要查看密码是否由数字和字母组成且限制其为8-18位，校验结果如下

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-01-04-image.png)

### 注册

主要对用户名、手机号、QQ号、电子邮箱、密码进行了校验，校验结果如下：

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-03-36-image.png)

若数据格式正确，则需要滑动验证码才可成功注册，如下：

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-06-36-image.png)

### 忘记密码

这里预设计手机号为数据库主键，故此处根据手机号来校验，校验原理同上

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-07-17-image.png)

同样的，提交时需要滑动验证码正确才可提交

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-07-59-image.png)

## 主页面

由于目前数据较少，故主界面暂时不写，待后端有数据后再写，且我认为此处不论管理员还是普通员工二者都可看

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-09-56-image.png)

## 控制中心

### 权限设置

超级管理员可见用户管理、子系统管理、角色管理和用户组管理，而普通用户则只可见子系统管理

### 用户管理

对于用户管理，实现了基础的增删改查页面

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-12-53-image.png)

数据校验则主要有四个，用户名校验、部门校验、年龄校验、工资校验。

用户名校验与部门校验类似用户校验故不表，年龄校验检验输入是否为1-159的正整数，工资校验检验输入是否为正浮点数，如下：

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-15-20-image.png)

### 子系统管理

对于子系统管理，实现了基础的增删改查页面

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-16-25-image.png)

数据校验则主要有四个，类型校验、描述校验、排名校验、分数校验。

类型校验与描述校验类似用户校验故不表，排名校验与分数校验主要查看输入值是否为正整数，如下：

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-18-16-image.png)

### 角色管理与用户组管理

由于二者功能类似，故放在一起描述。因为我认为一个公司内角色和用户组较少，故只实现了增删改功能。二者主要页面如下：

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-20-35-image.png)

![](C:\Users\九三\AppData\Roaming\marktext\images\2022-06-06-12-20-49-image.png)

数据校验方面主要使用了英文校验，即检验输入是否为英文；正整数校验，即检验输入是否为正整数

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
