<template>
  <div>
    <el-input
      :value="showName"
      placeholder="请选择处理人"
      suffix-icon="el-icon-search"
      readonly
      @click.native="openTree(item)"
    ></el-input>

    <sh-tree-dialog
      title="选择人员"
      :radio="radio"
      :close="false"
      :list="list"
      :dialog-visible.sync="dialogTreeVisible"
      @handleEvent="handleEvent"
    ></sh-tree-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  value: {
    type: Array,
    default: () => {
      return []
    }
  },
  item: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const emit = defineEmits(['input'])

const showName = computed(() => {
  return (props.value || [])
    .map(item => {
      return item.userName
    })
    .join(',')
})

// 弹框树
const radio = ref(false)
const dialogTreeVisible = ref(false)
const list = ref([])
const handleEvent = node => {
  let arr = []
  if (radio.value) {
    // 必须选择人
    if (node.nodeType !== 'person') {
      $message.error('请选择人员')
      return
    }
    arr.push({
      userId: node.id,
      userName: node.text,
      unitId: node.unitId
    })
  } else {
    arr = node
      .filter(item => {
        return item.nodeType === 'person'
      })
      .map(item => {
        return {
          userId: item.id,
          userName: item.text,
          unitId: item.unitId
        }
      })
  }
  emit('input', arr)
  dialogTreeVisible.value = false
}
const openTree = row => {
  radio.value = !row.approConf.dealTypeCheck
  list.value = row.approConf.choosePersons || []
  dialogTreeVisible.value = true
}
</script>

<style lang="scss" scoped></style>
