'use strict';


// 所有的计划
export default  [
// 
  {
    name: "vue",
    date: '2018-11-28',
    info: `
    `,
  },
  
  // 
  {
    name: "node",
    date: '2018-11-27',
    info: `
    `,
  },

  // 










  // 
  {
    name: "webpack-3",
    date: '2018-11-06',
    info: `
    
    dir: demo_webpack_learn
    demo_003：对vue项目单个组件的测试和打包

    1.需要在每个模块下有个HTML和JS，入口。
    2.vue的build输出：less不会剥离，里面的图片路径会随着图片位置的改变而改变。
    3.组件异步加载，打包会打包到单独的JS里，命名从0开始
    4.自己的JS模块异步加载，打包单独打包，命名按照自己的名字开始。
    `,
  },
  // 
  {
    name: "webpack-2",
    date: '2018-11-05',
    info: `
    
    dir: demo_webpack_learn
    demo_002：对webpack稍微深入的了解，node_api方法，比上一版本好的地方就是html也会有刷新。

    1.自动刷新分为 iframe 和 inline刷新
    2.inline刷新的实现方式有两种，一个是命令行模式。一个是node api方法
    3.这个主要是实现node api方法。配置项和gulp一样，指定一个功能模块。编译的时候编译到一样的目录下。
    `,
  },
  // 
  {
    name: "webpack-1",
    date: '2018-11-02',
    info: `
    
    demo: demo_webpack_learn

    001：算是对目前开发单个模块（js）的webpack开发打包工具了。

    1.dev模式：入口html 、入口JS、less的配置即可；
    2.build模式：
       输出路径、

       输出name、
       入口js（和异步JS）的输出配置
       css的输出配置

       html的指定和输出，这个插件可以灵活的处理js和css的路径，但是不能处理css里面引用图片字体的路径

       所以：img、fonts的输出路径是由src里面目录结构决定的，也是决定了css的输出路径
    3.最后配置的地方就是gulp一样，指定一个要改的功能模块路径。
      只是index.html改变，页面不会刷新。
    `,
  },

];

