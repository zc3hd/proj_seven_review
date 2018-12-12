<template>
  <div class="app" :class='str.class_bg' id="app">
    <!-- 主体盒子 -->
    <div class="box" :class='str.class_blur'>

      <!-- 工具栏 -->
      <div class="tool">
        <div class="add" :class='$x_add_btn_class' @click='ev_plan_add()'>
          <!-- 登录后的按钮 -->
          {{$x_add_btn_name}}
          <!-- 登录 -->
          <cpt_login v-show='$x_login_box_show'></cpt_login>
        </div>
        
        <!-- 用户操作 -->
        <div class="user_info" v-show="$x_box_show">
          <div class="item user" @click='ev_user()'></div>
          <div class="item leave" @click='ev_user_close()'></div>
        </div>
      </div>

      <!-- 计划列表盒子 -->
      <div class="box" v-show="$x_box_show">

        <!-- 计划表的title导航 -->
        <div class="nav" id="nav">
          <div class="item title">
            <div class="box">date</div>
          </div>

          <div class="item item_name" v-for='(obj,index) in conf.plans_arr' @click='ev_plan_upd(obj)'>
            <div class="box">{{obj.name}}</div>
          </div>
        </div>


        <!-- 列表 -->
        <div class="list_box" id="table">
          <!-- 标题 -->
          <div class="item title" :style="str.heng_bar.style">
            <div class="sp_box" v-for='ele in conf.all_chuo_arr' :style="list_item_w(ele)">
              <span :class=list_item_bg(ele)>{{ele}}</span>
            </div>
          </div>
          
          <!-- 真实的数据 -->
          <div class="item" v-for='(obj,index) in conf.plans_arr' :style="str.heng_bar.style">
            <div class="sp_box" v-for='ele in conf.all_chuo_arr' :style="list_item_w(ele)">
              <span :class=list_item_bg(ele)>
              {{list_item_name(ele,obj)}}
              <div class="lun" v-show="list_item_name(ele,obj)==''?false:true">{{list_item_lun(ele,obj)}}</div>
            </span>
            </div>
          </div>
        </div>

      </div>

    </div>


    <!-- 计划的弹窗 -->
    <div class="plan_layer" v-show='plan_layer.show'>
      <div class="box animated" :class='plan_layer.class_animate'>
        <!-- title -->
        <div class="title">add</div>
        <!-- list -->
        <div class="list">
          <div class="item">
            <div class="info">name</div>
            <div class="ipt">
              <input type="text" v-model="plan_layer.name" placeholder="input name">
            </div>
          </div>
          <div class="item">
            <div class="info">review</div>
            <div class="ipt">
              <input type="text" v-model="plan_layer.sum">
            </div>
          </div>
          <div class="item">
            <div class="info">start</div>
            <div class="ipt">
              <el-date-picker v-model="plan_layer.date" type="date" placeholder="sel date" end-placeholder="conf.now_str"></el-date-picker>

            </div>
          </div>
        </div>
        <!-- btn -->
        <div class="btn close" @click='ev_plan_close()'></div>
        <div class="btn save" @click='ev_plan_save()'></div>
        <div class="btn del" @click='ev_plan_del()' v-show='plan_layer.del_show'></div>
      </div>
    </div>


    <!-- 用户信息的弹窗 -->
    <div class="user_layer" v-show='user_layer.show'>
      <div class="box" >
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
              <input type="text" v-model="user_layer.ps">
            </div>
          </div>
          <div class="item">
            <div class="info">计划数界值</div>
            <div class="ipt">
              <input type="text" v-model="user_layer.plans_limit" disabled=true>
            </div>
          </div>
          <div class="item">
            <div class="info">邮箱</div>
            <div class="ipt">
              <input type="text" v-model="user_layer.email">
            </div>
          </div>
          <div class="item">
            <div class="info">发送邮件</div>
            <div class="ipt">
              <template>
                <el-radio v-model="user_layer.email_key" label="1" disabled>on</el-radio>
                <el-radio v-model="user_layer.email_key" label="0" disabled>off</el-radio>
              </template>
            </div>
          </div>
        </div>
        <!-- btn -->
        <div class="tool">
          <div class="btn" @click='user_layer.show = false'>取消</div>
          <div class="btn" @click='ev_user_save()'>确认</div>
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
