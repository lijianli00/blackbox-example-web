<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formValue = ref({})

const str = 'dddd'
console.log(str)
</script>

<style lang="scss" scoped></style>
