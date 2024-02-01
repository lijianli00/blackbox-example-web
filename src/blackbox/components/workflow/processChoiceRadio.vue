<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-radio-group v-model="radio" @change="changeChoice">
    <el-radio v-for="(node, nodeIndex) in item.childNodes" :key="nodeIndex" :label="nodeIndex">
      {{ node.text }}{{ item.nodeIndex }}
    </el-radio>
  </el-radio-group>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const radio = ref(0)

const emit = defineEmits(['changeChoice'])

const changeChoice = () => {
  emit('changeChoice', props.item, radio.value)
}
changeChoice(props.item)
</script>

<style lang="scss" scoped></style>
