<template>
  <div class="app" id="app">
    <div class="box">
      <div class="title">
        <span>用户名</span>
        <span>计划数界值</span>
        <span>计划内容</span>
        <span>邮箱</span>
        <span>是否发邮件</span>
        <span class="last">操作</span>
      </div>
      <!-- list -->
      <div class="list">
        <div class="item" v-for='(ele,index) in data.all'>
          <span>{{ele.name}}</span>
          <span>{{ele.plans_limit}}</span>
          <span>{{ele.plans}}</span>
          <span>{{ele.email}}</span>
          <span>{{ele.email_key?"yes":"no"}}</span>
          <span class="last">
            <span class="btn upd" @click='upd(ele)'>upd</span>
            <span class="btn del" @click='del(ele)'>del</span>
          </span>
        </div>
      </div>
    </div>


    <div class="layer" v-show='conf.layer_show'>
      <input type="text" v-model='conf.layer_limit'>
      <div class="btn save" @click="save">save</div>
      <div class="btn close" @click="close">close</div>
    </div>
  </div>
</template>
<script>
import obj from './index.js';
export default obj;
</script>
<style lang="less">
@import './index.less';
</style>
