<template>
  <div></div>
</template>

<script setup>
import { useRoute, useRouter } from 'blackbox-ui'
import { LOGIN } from '@/project/apis/system'
import store from '@/blackbox/store'

const route = useRoute()
const router = useRouter()

const onLogin = async key => {
  const { code, data, msg } = await $post(LOGIN, {
    code: key,
    authenticationType: 'ZT2'
  })
  if (code === 0) {
    store.commit('userStore/setToken', data)
    router.push('/')
  } else if (code === 10021) {
    $message.error('未绑定用户')
  } else {
    $message.error(msg)
  }
}
const code = route.query.code
if (code) {
  onLogin(code)
}
</script>

<style lang="scss" scoped></style>
