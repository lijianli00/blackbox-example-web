<template>
  <div class="h-full login-box">
    <div>
      <i class="i-ic-baseline-search"></i>
      <sh-login-box class="login"></sh-login-box>
    </div>
  </div>
</template>

<script setup>
import { ShLoginBox } from 'blackbox-ui'
</script>

<style lang="scss" scoped>
.login-box {
  background-image: url(./img/login-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .login {
    position: absolute;
    top: 22%;
    right: 8%;
  }
}
</style>
