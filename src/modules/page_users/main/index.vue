<template>
  <div class="app" id="app">
    <!-- 列表 -->
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
        <div class="item" v-for='(ele,index) in conf.list' v-show='(ele.name=="arminc"?false:true)'>
          <span>{{ele.name}}</span>
          <span>{{ele.plans_limit}}</span>
          <span>{{ele.plans}}</span>
          <span>{{ele.email}}</span>
          <span>{{ele.email_key=="1"?"on":"off"}}</span>
          <span class="last">
            <span class="btn upd" @click='upd(ele)'>upd</span>
          <span class="btn del" @click='del(ele)'>del</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 用户信息的弹窗 -->
    <div class="user_layer" v-show='conf.layer_show'>
      <div class="box">
        <!-- title -->
        <div class="title">user info</div>
        <!-- list -->
        <div class="list">
          <div class="item">
            <div class="info">name</div>
            <div class="ipt">
              <input type="text" v-model="user_layer.name" disabled=true>
            </div>
          </div>
          <div class="item">
            <div class="info">ps</div>
            <div class="ipt">
              <input type="text" v-model="user_layer.ps" disabled=true>
            </div>
          </div>
          <div class="item">
            <div class="info">邮箱</div>
            <div class="ipt">
              <input type="text" v-model="user_layer.email" disabled=true>
            </div>
          </div>
          <div class="item">
            <div class="info">计划数界值</div>
            <div class="ipt">
              <input type="text" v-model="user_layer.plans_limit">
            </div>
          </div>
          <div class="item">
            <div class="info">发送邮件</div>
            <div class="ipt">
              <template>
                <el-radio v-model="user_layer.email_key" label="1">on</el-radio>
                <el-radio v-model="user_layer.email_key" label="0">off</el-radio>
              </template>
            </div>
          </div>
        </div>
        <!-- btn -->
        <div class="tool">
          <div class="btn" @click='conf.layer_show = false'>取消</div>
          <div class="btn" @click='save()'>确认</div>
        </div>
      </div>
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
