<template>
  <div>
    <div v-if="list.length">
      <div class="flex items-center h-40 text-16">
        <div class="mr-10">
          <i class="el-icon-s-grid text-#409EFF"></i>
        </div>
        <div>流程处理记录</div>
      </div>
      <sh-table ref="tableRef" :data="list" :default-load="false" :height="null" :show-page="false">
        <sh-table-column type="index" label="序号" width="70" align="center"> </sh-table-column>
        <sh-table-column prop="nodeText" label="任务名称"> </sh-table-column>
        <sh-table-column prop="dealName" label="执行人"> </sh-table-column>
        <sh-table-column prop="createTime" label="开始时间"> </sh-table-column>
        <sh-table-column prop="updateTime" label="结束时间"> </sh-table-column>
        <sh-table-column prop="handlerTypeName" label="处理结果"> </sh-table-column>
        <sh-table-column prop="remark" label="意见"> </sh-table-column>
      </sh-table>
    </div>
    <!-- 流程图 -->
    <ShFlowChart ref="chartRef" :node-tree="nodeTree" :version="version" :version-name="versionName"></ShFlowChart>
  </div>
</template>

<script setup>
import { bbxProcessRunTask } from '@/blackbox/apis/workflow'
import { ref } from 'vue'
import { ShFlowChart } from 'blackbox-ui'

const props = defineProps({
  processDataId: {
    type: String,
    default: ''
  },
  processTaskId: {
    type: String,
    default: ''
  },
  processVersionId: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
})
const tableRef = ref(null)
const emit = defineEmits(['grandpaTable'])
// 流程图
const chartRef = ref(null)
const list = ref([])
const nodeTree = ref({})
const version = ref('')
const versionName = ref('')
const loading = ref(false)
const loadList = async id => {
  loading.value = true
  if (props.type != 'add') {
    const { code, data, msg } = await $post(bbxProcessRunTask.getProcessProgress, {
      processDataId: props.processDataId,
      processTaskId: props.processTaskId
    })
    loading.value = false
    if (code === 0) {
      list.value = data.taskRecords || []
      nodeTree.value = data.nodeTree || {}
      version.value = data.version
      versionName.value = data.versionName
      emit('grandpaTable', data)
    } else {
      $message.error(msg)
    }
  } else {
    const { code, data, msg } = await $post(bbxProcessRunTask.findProcess, {
      processVersionId: id
    })
    if (code === 0) {
      list.value = data.taskRecords || []
      nodeTree.value = data.nodeTree || {}
      version.value = data.version
      versionName.value = data.versionName
      emit('grandpaTable', data)
    } else {
      $message.error(msg)
    }
  }
}

const open = () => {
  chartRef.value?.open()
}

defineExpose({
  loadList,
  open
})
</script>

<style lang="scss" scoped></style>
