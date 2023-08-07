<template>
  <div id="app" v-loading.fullscreen.lock="fullscreenLoading" element-loading-background="rgba(0,0,0,0.05)">
    <router-view />
  </div>
</template>

<script>
export default {
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
