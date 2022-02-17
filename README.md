

<div id="top"></div>

[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/AliMales/NotesMusic">
    <img src="src/assets/images/logo192.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Z ORG | MUSIC</h3>
  <p align="center">
    music regardless of country 
    <br />
    <a href="https://github.com/AliMales/NotesMusic"><strong>探索文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/AliMales/NotesMusic">查看 Demo</a>
    ·
    <a href="https://github.com/AliMales/NotesMusic/issues">反馈bug</a>
    ·
    <a href="https://github.com/AliMales/NotesMusic/issues">提交需求</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>目录</summary>
  <ol>
    <li>
      <a href="#about-the-project">关于项目</a>
      <ul>
        <li><a href="#built-with">打包框架</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">快速开始</a>
      <ul>
        <li><a href="#prerequisites">环境</a></li>
        <li><a href="#installation">安装</a></li>
      </ul>
    </li>
    <li><a href="#usage">使用</a></li>
    <li><a href="#roadmap">看板</a></li>
    <li><a href="#contributing">贡献</a></li>
    <li><a href="#license">证书</a></li>
    <li><a href="#contact">联系人</a></li>
    <li><a href="#acknowledgments">鸣谢</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## 关于项目
西筹OpenAlpha(大V支持)是西筹金融科技出品的一站式基金投研平台，提供投前基金筛选、基金经理排名、市场总览、基金组合回测、业绩归因等功能。
据基金业协会公布的数据，截止2021年一季度，我国公募基金的总规模已经达到了21亿元，同时，购买基金的人数也达到了6亿人，均为历史新高。随着基金的蓬勃发展，财富管理行业已经成为一个未来火热的方向。
西筹金融科技致力于为财富管理机构及相关从业者打造一站式基金投研平台。



![Product Name Screen Shot][product-screenshot]

首页截图.

<p align="right">(<a href="#top">返回顶部</a>)</p>



### 打包框架

* [Vue.js](https://vuejs.org/)
* [Vitejs](https://vitejs.dev/)

<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- GETTING STARTED -->
## 快速开始

安装node环境和包管理工具

### 环境

* 
  ```sh
  npm install npm@latest -g
  ```
* node>=12.0.0
* npm>=6.0.0

### 安装


1. clone 当前仓库
2. pnpm i  
3. pnpm dev 


<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- USAGE EXAMPLES -->
## 使用

## Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- ROADMAP -->
## 看板

##### 2022-02-16

- 解决小程序端缓存问题
- 错误引导页面上线

##### 2022-01-26

- 解决画图重复数据
- 优化列表
- 新增单选弹窗逻辑

##### 2022-01-25

- 解决bug

##### 2022-01-24

- 增加提示弹窗
- 增加排序
- 结果查询
- 删除缓存
- 解决弹窗问题

##### 2022-01-22

- 修改成立年限和获奖次数

##### 2022-01-21

- 小程序通过审核 配置金融科技小程序信息
- 调试小程序从单聊界面进入
- 配置金融科技公众号

##### 2022-01-20

- 小程序审核未通过重新提交审核
  （因为审核人员无法进入小程序 这里的方案是截取小程序模拟器的运行图 加上录屏）
- 多级条件联动讨论以及处理方案

##### 2022-01-19

- 配置正式环境
- 发布大openalpha程序体验版本
- 修改获取属性接口拆分成两个接口
- 调试修改参数接口（修改无变化问题）
- 提交小程序审核

##### 2022-01-18

- 小程序提交审核
- 线上正式环境切换
- 小程序正式环境部署
- 每日会议小程序问题
- 确定jssdk跳转方案
- 小程序返回方案确定
- 小程序获取用户信息方案确定

##### 2022-01-17

- 部署测试环境
- 对接基金接口
- 讨论关于基金筛选属性对应相关会议
- 部署后台系统

##### 2022-01-08

- 小程序申请

##### 2021-12-27

- 讨论新方案回复关键字时候
- 实践回复关键字链接不可行
- 寻找前端技术专家交流方案
- 解决方案
  - 使用小程序嵌套Webview进行开发
  - 各项功能使用网页形式
  - 小程序使用西筹主体
  - 通过场景值获取公众号信息

##### 2021-12-24

- 开发搜索页面
- 部署服务

##### 2021-12-23

- 搭建页面框架
- 搭建管理系统框架

##### 2021-12-22

- 讨论会议
- 方案
  - 使用HideMenu 隐藏传播入口
  - 使用超长的链接
  - 接管后台 获取用户与大V之间的关系
- 遗留问题
  - 方式入侵性太大
  - 目标用户难以接受
  - 开发工作量大 重复工作大

##### 2021-12-21

- 决定使用菜单栏值配置方案
- 遗留问题
  1. 如何保证用户从指定的公众号进入？
  2. 如何拿到用户信息

##### 2021-12-20

- 需求会议



- [x] 修改日志 
- [x] 返回顶部按钮
- [ ] 多语言
    - [ ] 英文

查看 [open issues](https://github.com/AliMales/NotesMusic/issues) 完整的issues列表

<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- CONTRIBUTING -->
## 贡献

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- LICENSE -->
## License

 MIT License.

<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- CONTACT -->
## 联系人

only_tigerhu@163.com

Project Link: [https://github.com/AliMales/NotesMusic](https://github.com/AliMales/NotesMusic)

<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## 鸣谢


<p align="right">(<a href="#top">返回顶部</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/AliMales/NotesMusic/blob/master/README.md
[product-screenshot]: ./src/assets/images/banner.png
