<template>
  <sh-app :app-id="appId">
    <div
      id="app"
      v-loading.fullscreen.lock="fullscreenLoading"
      class="wh-full"
      element-loading-background="rgba(0,0,0,0.05)"
    >
      <router-view />
    </div>
  </sh-app>
</template>

<script>
export default {
  data() {
    return {
      appId: 'demodemo'
    }
  },
  computed: {
    fullscreenLoading() {
      return this.$store.state.configStore.fullscreenLoading
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 移除首次加载loading
      if (document.getElementById('Loading')) {
        document.body.removeChild(document.getElementById('Loading'))
      }
    })
  }
}
</script>

<style lang="scss">
.driver-fix-stacking .el-dropdown-link {
  color: #666;
}
</style>
