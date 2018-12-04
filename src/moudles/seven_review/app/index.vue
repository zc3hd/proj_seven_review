<template>
  <div class="app" :class='all.bg_name' id="app">
    <div class="box">
      <!-- 工具栏 -->
      <div class="tool">
      </div>
      <!-- title -->
      <div class="table" id="table">
        <!-- 标题 -->
        <div class="item title" :style="all.item.style">
          <div class="sp_box" v-for='ele in conf.all_chuo_arr' :style="fn_item_w(ele)">
            <span :class=fn_class_name(ele)>{{ele}}</span>
          </div>
        </div>
        <div class="item" v-for='(arr,key) in conf.task_date_obj' :style="all.item.style">
          <div class="sp_box" v-for='ele in conf.all_chuo_arr' :style="fn_item_w(ele)">
            <span :class=fn_class_name(ele)>{{fn_item_name(ele,arr,key)}}</span>
          </div>
        </div>
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
