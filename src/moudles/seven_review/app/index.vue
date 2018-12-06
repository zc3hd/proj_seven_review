<template>
  <div class="app" :class='all.bg_name' id="app">
    <!-- 列表 -->
    <div class="box" :class='all.blur'>
      <!-- 工具栏 -->
      <div class="tool" :class='conf.tool_class'>
        <div class="add" @click='ev_add()'>{{conf.add_name}}</div>
      </div>
      <!-- -->
      <div class="box" v-show="conf.box_show">


        <!-- 列表的导航 -->
        <div class="nav" id="nav">
          <div class="item title">
            <div class="box">date</div>
          </div>

          <div class="item item_name" v-for='(obj,index) in conf.plans_data' @click='ev_upd(obj)'>
            <div class="box">{{obj.name}}</div>
          </div>
        </div>


        <!-- 列表 -->
        <div class="list_box" id="table">
          <!-- 标题 -->
          <div class="item title" :style="all.item.style">
            <div class="sp_box" v-for='ele in conf.all_chuo_arr' :style="fn_item_w(ele)">
              <span :class=fn_item_bg(ele)>{{ele}}</span>
            </div>
          </div>
          <div class="item" v-for='(obj,index) in conf.plans_data' :style="all.item.style">
            <div class="sp_box" v-for='ele in conf.all_chuo_arr' :style="fn_item_w(ele)">
              <span :class=fn_item_bg(ele)>
              {{fn_item_name(ele,obj)}}
              <div class="lun" v-show="fn_item_name(ele,obj)==''?false:true">{{fn_item_lun(ele,obj)}}</div>
            </span>
            </div>
          </div>
        </div>
      </div>

    </div>


    <!-- 弹窗 -->
    <div class="layer" v-show='layer.show'>
      <div class="box animated" :class='layer.box_class'>
        <!-- title -->
        <div class="title">add</div>
        <!-- list -->
        <div class="list">
          <div class="item">
            <div class="info">name</div>
            <div class="ipt">
              <input type="text" v-model="layer.name" placeholder="input name">
            </div>
          </div>
          <div class="item">
            <div class="info">review</div>
            <div class="ipt">
              <input type="text" v-model="layer.sum">
            </div>
          </div>
          <div class="item">
            <div class="info">start</div>
            <div class="ipt">
              <el-date-picker v-model="layer.date" type="date" placeholder="sel date" end-placeholder="conf.now_str"></el-date-picker>

            </div>
          </div>
        </div>
        <!-- btn -->
        <div class="btn save" @click='ev_save()'></div>
        <div class="btn close" @click='ev_close()'></div>
        <div class="btn del" @click='ev_del()' v-show='layer.del_show'></div>
      </div>
    </div>




  </div>
</template>
<script>
import app from './index.js';
export default app;
</script>
<style lang="less">
@import './index.less';
</style>
