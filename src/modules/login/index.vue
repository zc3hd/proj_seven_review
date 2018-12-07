<template>
  <div class="box" id="login">
    <!-- 列表 -->
    <div class="login_box">
      <div class="item">
        <div class="info">username</div>
        <div class="ipt">
          <input type="text" v-model="obj.name" placeholder="username">
        </div>
      </div>
      <div class="item">
        <div class="info">password</div>
        <div class="ipt">
          <input type="text" v-model="obj.ps" placeholder="***">
        </div>
      </div>
    </div>
    <!-- 工具栏 -->
    <div class="tool">
      <div class="item">
        <div class="btn">register</div>
      </div>
      <div class="item">
        <div class="btn" @click.stop='sign'>sign</div>
      </div>
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
