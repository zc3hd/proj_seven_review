# 7天复习计划表

### 1.说明

* 根据遗忘曲线制作的记忆节点日期计划表。
* 使用自己的template，前端业务全部用vue。

--------------

* 计划有：
* 1.登录：用户登录成功后，用户管理自己的计划数据，增删改查。
* 2.登录：admin可以管理用户数据，可管理用户总计划数、登录、发邮件和删除。可看用户计划列表。
* 3.注册：用户名、密码和邮箱。
* 4.登录界面：用户登录成功后走用户的动画，admin登录直接转跳。(多页面)
* 5.多页面。
* 6.前端实现节点的计算。api只是负责存储。

### 2.过程

* 原有数据经过处理是生成好的数据，就是加工后的数据和刚开始的数据都是一个引用地址，不能进行数组添加新的元素。只能是回来的新数组参加添加完数据后，经过运算后，得到新数组，才能进行页面渲染。按正常逻辑，数据的组装不应该放在前端实现。

-----

* element-ui按需引入。import { Message } from 'element-ui';
```
【在全局进行引入】
import { DatePicker,Message } from 'element-ui';
Vue.use(DatePicker);
Vue.prototype.$ele_msg = Message;
```

----

* 基于webpack-004的架子，但本项目又不同。webpack-004目录结构是vue_demo整个是个功能模块，下面有很多子模块，都属于vue_demo。所以内部有个最终输出是app模块，且文件夹下面有测试自己的模块入口index.html和JS，为了自己测试用。在vue_demo外应该还有个真正的html和JS。
* 现在我们的结构是有user和admin两个页面，每个页面下面的文件夹包含：本功能的组件、测试HTML和JS。login组件虽说是属于plan组件的，但login最先展示，又有转跳到admin管理user的业务，故放到最外面。store.js不用说了，放在最外面。
* vuex公共属性的命名方式：$xxxx。感觉更好的应该是_$x_name。

----

* scoped属性只是保证其他组件的class不影响自己，但是根组件的样式还是会影响的。
* 实现登录框和新增按钮是一个box，出现一个问题：登录成功后，列表没有横向滚动条。原因：一开始页面初始化的时候，不应该渲染页面，现在提前渲染，又没有宽度，所有没有滚动条。
* 解决：登录成功后再进行渲染，设置监听：
```
  watch: {
    【vue2.0 监听计算元素】
    $x_box_show: function(val, old_val) {
      if (val) {
        this.__init();
      }
    },
  },
```

-----------------

* axios往后台发送post请求，node接收不到数据，原因：
```
1.axios默认的请求内容类型：Content-Type: application/json;charset=UTF-8
2.但是后台的解析是：app.use(bodyParser.urlencoded({ extended: false })); 仅仅解析为urlencoded的请求体主体。说明以前是误区。
3.很奇怪：前端设置：axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';后台也设置app.use(bodyParser.urlencoded({ extended: false })); 也是接收不到数据

4.【解决一】后台设置JSON解析
前端：什么都不要动。不要加：axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

后台：设置这个中间件就可以：app.use(bodyParser.json());

5.【解决二】前端使用urlencode传数据
前端：配置axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded

let param = new URLSearchParams();
param.append('name', me.obj.name);
param.append('ps', me.obj.ps);

me.$ajax({data: param})

后台：app.use(bodyParser.urlencoded({ extended: false }));
```


* dev模式express接收post请求。需要把-解析post请求体的中间件-写在API函数内部，不然不能解析。
```
function API(app) {
  app.use(bodyParser.json());
}
```

* 如何本地数据库的转移：涉及到数据库的来回下载、跟新和上传。见cmd.js。

---------------

* 前端vue公共库的引入和输出？涉及到两个问题，一个就是全部公共库引入，要不就是直接引入，要不就是引入再打包输出。按需引入就是按需加载，但是只是压缩到当前组件的JS内。那个配置只是对公共库有效。见webpack-003
* webpack如何实现后台端口的代理？最好的方式：前端有监听前端的JS和HTML的dev服务，后台有后台代码监听的功能。这样就不用一直重启服务。省时间？前后分别监控的话，就涉及到跨域。可以试试。不分离的话，后台就无法监控。修改后台代码后只能手动启动。这个问题通过webpack的代理服务器实现，详情见webpack-005；

--------------------------------

* 至此，项目开发算告一个段落了。发现部署到网上进行访问还是有点卡的。
* **2019/1/3**：计划的复习日期排布逻辑全部放到后台，支持用户的每个计划自定义邮件提醒时间；
* **2019/1/4**
```
viewport：浏览器默认页面body宽度是980px；你在440px屏幕看100%的980px，是不是就是要缩小看？那就设置body宽度为设备宽度，然后还是100%看，那相当于就是屏幕看正好。
```
























