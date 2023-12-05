<!-- 自定义布局 需要重新组装 
<template>
  <ShLayout>
    写自定义布局内容
  </ShLayout>
</template>
-->
<!-- 本框架默认布局
<template>
  <ShLayout></ShLayout>
</template>
-->
<template>
  <ShLayout></ShLayout>
</template>
<script>
import logoUrl from '../assets/3hlogo.png'
import { ShLayout } from 'blackbox-ui'
export default {
  components: {
    ShLayout
  },
  data() {
    return {}
  },
  mounted() {
    const setting = {
      logoUrl: logoUrl, //标题图标
      breadHeader: 'breadcrumb' //breadHeader等于breadcrumb 为面包屑导航 tags为标签导航
    }
    this.$store.commit('configStore/SET_Setting', setting)
  },
  methods: {
    // 例子   登录之后 跳转 指定路由界面   或者使用 调用 登录之后的方法
    // <ShLayout :is-customize="true" @callback="callback"></ShLayout>
    // callback(value) {
    //   this.$router.push('/bbx/platform/appClient')
    //   let data = {
    //     checkedSvg: null,
    //     children: null,
    //     grade: 2,
    //     id: '8e44ffb862ec4bdab6e99e6287dbeacf',
    //     menuName: '应用管理',
    //     parentId: '923daa6c6c6540bfbfed9ee6441b1226',
    //     remark: '',
    //     sortNum: -1,
    //     svg: '',
    //     uncheckedSvg: null,
    //     url: '/bbx/platform/appClient'
    //   }
    //   this.$store.commit('tagsStore/addTag', data)
    // }
  }
}
</script>

<style lang="scss" scoped></style>
