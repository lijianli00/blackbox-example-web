<template>
  <div class="h-full login-box">
    <div class="absolute top-10% left-10% text-36 font-600">{{ title }}</div>
    <div class="login shadow rounded-4">
      <p class="text-20 text-center font-600">用户登录</p>
      <div class="p-40">
        <sh-login-box class="w-260"></sh-login-box>
      </div>
    </div>
  </div>
</template>

<script>
import { ShLoginBox } from 'blackbox-ui'
export default {
  components: { ShLoginBox },
  computed: {
    title() {
      return this.$store.getters.title
    }
  }
}
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
