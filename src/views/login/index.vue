<template>
  <div class="h-full login-box">
    <div class="login">
      <p class="text-[#202837] tracking-widest text-center text-40 font-bold mb-90">{{ title }}</p>
      <sh-login-box></sh-login-box>
    </div>
  </div>
</template>

<script setup>
import { ShLoginBox } from 'blackbox-ui'
const title = import.meta.env.VITE_APP_TITLE
</script>

<style lang="scss" scoped>
.login-box {
  background-image: url(./img/login-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .login {
    position: absolute;
    top: 11%;
    right: 8%;
  }
}
</style>
