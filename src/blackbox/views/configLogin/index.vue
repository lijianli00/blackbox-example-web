<template>
  <div>
    <sh-config-login qc-login-api="qcLoginApi"></sh-config-login>
  </div>
</template>
<script>
import { ShConfigLogin } from 'blackbox-ui'

export default {
  components: { ShConfigLogin },
  data() {
    return {
      qcLoginApi: ''
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
