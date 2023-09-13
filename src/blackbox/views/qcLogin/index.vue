<template>
  <div class="h-100vh flex-center w-100vw">
    <div v-if="loginInput">
      <div class="flex">
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户管理" name="first"></el-tab-pane>
          <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        </el-tabs>
      </div>

      <div v-if="activeName == 'first'" mt-15 w-70vw>
        <sh-form ref="loginFrom" label-width="0px">
          <sh-form-item prop="loginName">
            <el-input v-model="form.bindData.loginName" placeholder="账号/手机号" size="default">
              <template #prefix>
                <i class="el-input__icon el-icon-user"></i>
              </template>
            </el-input>
          </sh-form-item>
          <sh-form-item prop="password">
            <el-input v-model="form.bindData.password" placeholder="密码" size="default"> </el-input>
          </sh-form-item>
          <sh-form-item class="margin-none">
            <el-button type="primary" class="w-full" size="default" @click="binding">绑定</el-button>
          </sh-form-item>
        </sh-form>
      </div>
      <div v-if="activeName == 'second'" mt-15 w-70vw>
        <sh-form ref="loginName" label-width="0px">
          <div class="c-red">{{ message2 }}</div>
          <sh-form-item prop="loginName">
            <el-input v-model="form2.bindData.loginName" placeholder="手机号" size="default">
              <template #prefix>
                <i class="el-icon-mobile-phone"></i>
              </template>
            </el-input>
          </sh-form-item>
          <sh-form-item prop="authCode" :span="14" class="send_code">
            <el-input v-model="form2.bindData.authCode" placeholder="请输入验证码" size="default"> </el-input>
          </sh-form-item>
          <sh-form-item :span="10" class="send_code">
            <el-button type="primary" class="w-full" size="default" :disabled="!!countDown" @click="validatePhone">
              {{ sendText }}
            </el-button>
          </sh-form-item>
          <sh-form-item class="margin-none">
            <el-button type="primary" class="w-full" size="default" @click="onSubmit">绑定</el-button>
          </sh-form-item>
        </sh-form>
      </div>
      <div class="c-red">{{ message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message2: '',
      activeName: 'first',
      countDown: 0,
      timer: null,
      loginInput: false,
      message: '',
      form: {
        type: 'PASSWORD', // 绑定校验类型，可以自定义，然后在addUser方法中根据type自行处理。默认四种类型：手机认证码校验：AUTH_CODE_PHONE；邮箱认证码校验：AUTH_CODE_EMAIL；密码校验：PASSWORD；新用户：NEW_USER。
        authenticationType: 'WECHAT_OFFICIAL_SPECIAL', // 认证类型，随login时的类型
        id: '', // 关联第三方用户的数据格式。
        bindData: {
          // 用于绑定或新建用户信息。根据实际需求填写需要的信息
          // PASSWORD绑定类型时必填项，认证管理会自行校验
          loginName: '',
          password: ''
        }
      },
      form2: {
        type: 'AUTH_CODE_PHONE', // 绑定校验类型，可以自定义，然后在addUser方法中根据type自行处理。默认四种类型：手机认证码校验：AUTH_CODE_PHONE；邮箱认证码校验：AUTH_CODE_EMAIL；密码校验：PASSWORD；新用户：NEW_USER。
        authenticationType: 'WECHAT_OFFICIAL_SPECIAL', // 认证类型，随login时的类型
        id: '', // 关联第三方用户的数据格式。
        bindData: {
          // 用于绑定或新建用户信息。根据实际需求填写需要的信息
          // PASSWORD绑定类型时必填项，认证管理会自行校验
          loginName: '',
          authCode: '' // 认证码
        }
      }
    }
  },
  computed: {
    sendText() {
      return this.countDown ? `${this.countDown}s后重发` : '发送验证码'
    }
  },
  created() {
    this.getBaseInfos()
  },
  methods: {
    validatePhone() {
      this.getAuthCode()
    },
    getAuthCode() {
      this.$post(
        this.$store.state.userStore.env.VUE_APP_PORT + '/oauth/getAuthCode',
        {
          authName: this.form2.bindData.loginName,
          authenticationType: 'WECHAT_OFFICIAL_SPECIAL'
        },
        res => {
          if (res.code === 0) {
            this.message2 = res.msg
            this.countDown = 60
            this.timer = setInterval(() => {
              if (this.countDown) {
                this.countDown--
              } else {
                this.clearInterval(this.timer)
              }
            }, 1000)
          }
        },
        err => {
          this.message2 = err.msg
        }
      )
    },
    binding() {
      this.$post(
        this.$store.state.userStore.env.VUE_APP_PORT + '/oauth/threeUserBind',
        this.form,
        res => {
          if (res.code == 0) {
            this.message = '绑定成功'
            let browser = navigator.userAgent.toLowerCase()
            if (browser.match(/MicroMessenger/i) == 'micromessenger') {
              //这个可以关闭安卓系统的手机
              document.addEventListener(
                'WeixinJSBridgeReady',
                function () {
                  WeixinJSBridge.call('closeWindow')
                },
                false
              )
              //这个可以关闭ios系统的手机
              WeixinJSBridge.call('closeWindow')
            }
          }
        },
        err => {
          this.message = err.msg
        }
      )
    },
    getBaseInfos() {
      const code = this.getQueryString('code') // 截取路径中的code
      const state = this.getQueryString('state')
      if (!code) {
      }
      if (code) {
        const data = {
          code: code,
          qRCodeKey: state,
          authenticationType: 'WECHAT_OFFICIAL_SPECIAL'
        }
        this.$post(
          this.$store.state.userStore.env.VUE_APP_PORT + '/oauth/login',
          data,
          res => {
            if (res.code === 0) {
              this.loginInput = false
              this.message = '登录成功'
              // 获取当前手机状态
              let browser = navigator.userAgent.toLowerCase()
              if (browser.match(/MicroMessenger/i) == 'micromessenger') {
                //这个可以关闭安卓系统的手机
                document.addEventListener(
                  'WeixinJSBridgeReady',
                  function () {
                    WeixinJSBridge.call('closeWindow')
                  },
                  false
                )
                //这个可以关闭ios系统的手机
                WeixinJSBridge.call('closeWindow')
              }
            }
          },
          err => {
            this.message = '请绑定账号！'
            this.loginInput = true
            this.form.id = err.data
            this.form2.id = err.data
          }
        )
      }
    },
    // 编码函数
    getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      }
      return null
    },

    onSubmit() {
      this.$post(
        this.$store.state.userStore.env.VUE_APP_PORT + '/oauth/threeUserBind',
        this.form2,
        res => {
          if (res.code == 0) {
            this.message = '绑定成功'
            let browser = navigator.userAgent.toLowerCase()
            if (browser.match(/MicroMessenger/i) == 'micromessenger') {
              //这个可以关闭安卓系统的手机
              document.addEventListener(
                'WeixinJSBridgeReady',
                function () {
                  WeixinJSBridge.call('closeWindow')
                },
                false
              )
              //这个可以关闭ios系统的手机
              WeixinJSBridge.call('closeWindow')
            }
          }
        },
        err => {
          this.message = err.msg
        }
      )
    }
  }
}
</script>

<style lang="scss" scope>
.send_code {
  .el-button {
    padding-left: 0;
    padding-right: 0;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  ::v-deep(.el-input__inner) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
}
html,
body {
  font-family: PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei;
  min-width: auto;
}
.el-tabs__content {
  width: 100%;
}
</style>
