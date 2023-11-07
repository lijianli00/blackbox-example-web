<template>
  <sh-app>
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
import logoUrl from '../blackbox/assets/3hlogo.png'
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
    const setting = {
      logoUrl: logoUrl, //标题图标
      breadHeader: 'breadcrumb' //breadHeader等于breadcrumb 为面包屑导航 tags为标签导航
    }
    this.$store.commit('configStore/SET_Setting', setting)
  }
}
</script>

<style lang="scss">
.driver-fix-stacking .el-dropdown-link {
  color: #666;
}
</style>
