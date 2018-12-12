<template>
  <div class="box" id="login">
    <!-- 工具栏 -->
    <div class="tool">
      <div class="item" :class='(conf.key=="register"?"ac":"")'  @click.stop='nav("register")'>register</div>
      <div class="item" :class='(conf.key=="sign"?"ac":"")' @click.stop='nav("sign")'>sign</div>
    </div>

    <!-- 列表 -->
    <div class="login_box">

      <div class="item" :style='conf.item_h'>
        <div class="info" :style='conf.item_info_lh' >username</div>
        <div class="ipt" :style='conf.item_ipt_padding'>
          <input type="text" v-model="obj.name" placeholder="username">
        </div>
      </div>

      <div class="item" :style='conf.item_h'>
        <div class="info" :style='conf.item_info_lh'>password</div>
        <div class="ipt" :style='conf.item_ipt_padding'>
          <input type="password" v-model="obj.ps" placeholder="***">
        </div>
      </div>

      <div class="item" v-show='(conf.key=="register"?true:false)' :style='conf.item_h'>
        <div class="info" :style='conf.item_info_lh'>email</div>
        <div class="ipt" :style='conf.item_ipt_padding'>
          <input type="text" v-model="obj.email" placeholder="username">
        </div>
      </div>
      
      <div class="btn" @click.stop='ev'></div>
    </div>
    
  </div>
</template>
<script>
import obj from './index.js';
export default obj;
</script>
<style lang="less" scoped>
@import './index.less';
</style>
