<template>
  <div>
    <div>123</div>
    <div class="noto:6"></div>
    <div class="i-logos-atomic-icon w-50px h-50px"></div>

    <n-icon size="40" color="#0e7a0d">
      <add />
    </n-icon>
    <sh-icon name="app"></sh-icon>
    <sh-icon name="theme-dark" />
    <sh-icon name="close"></sh-icon>
    <div m2 f-c hover="op80">
      <a i-carbon-logo-github text-3xl text-white href="https://github.com/chris-zhu" target="_blank" />
      <div i-carbon:3d-cursor text-3xl text-white />
      <button text-white text-3xl class="i-carbon-sun" />
    </div>
  </div>
</template>

<script setup>
import { Add } from '@vicons/ionicons5'
</script>

<style lang="scss" scoped></style>
