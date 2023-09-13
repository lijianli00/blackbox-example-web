<template>
  <div class="h-full login-box flex justify-end">
    <div class="absolute top-10% left-10% text-36 font-600">{{ title }}</div>
    <div class="w-9/24 h-full flex-center">
      <div class="login rounded-4">
        <p class="text-20 text-center font-600">用户登录</p>
        <div class="p-40">
          <sh-login-box :qc-login-api="qcLoginApi" class="w-260"></sh-login-box>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ShLoginBox } from 'blackbox-ui'
export default {
  components: { ShLoginBox },
  data() {
    return {
      return: {
        qcLoginApi: ''
      }
    }
  },
  computed: {
    title() {
      return this.$store.getters['userStore/title']
    }
  },
  created() {
    let url = 'https://2p25b84653.imdo.co/qcLogin'
    let appId = 'wx9435f53c15b0f67b'
    let hrefUrl =
      'https://open.weixin.qq.com/connect/oauth2/authorize?' +
      'appid=' +
      appId +
      '&redirect_uri=' +
      encodeURIComponent(url) +
      '&response_type=code' +
      '&scope=snsapi_userinfo' +
      '&state=${qRCodeKey}' +
      '&connect_redirect=1#wechat_redirect'
    this.qcLoginApi = hrefUrl
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
    background-color: #fff;
    padding-top: 30px;
    margin-top: -50px;
  }
}
</style>
