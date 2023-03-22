<template>
  <div class="h-full login-box">
    <div class="login shadow">
      <p class="text-20 text-center">项目名称</p>
      <div class="p-20">
        <sh-login-box class="w-320"></sh-login-box>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShLoginBox } from 'blackbox-ui'
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background-image: url(./img/login-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .login {
    position: absolute;
    top: 20%;
    right: 8%;
    background-color: #fff;
    padding-top: 30px;
  }
}
</style>
