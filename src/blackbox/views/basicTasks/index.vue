<template>
  <div>
    <sh-query :form="formValue" @loadList="loadList" @reset="reset">
      <sh-input v-model="formValue.title" placeholder="请输入标题" clearable></sh-input>
    </sh-query>
    <sh-table ref="tableRef" :api="bbxProcessRunTask.list" :param="formValue">
      <sh-table-column type="index" label="序号" width="70" align="center"> </sh-table-column>
      <sh-table-column prop="title" label="标题" min-width="60"> </sh-table-column>
      <sh-table-column prop="businessDataId" label="表单数据主键" min-width="60"> </sh-table-column>
      <sh-table-column prop="nodeText" label="当前所在节点" min-width="60"> </sh-table-column>
      <sh-table-column prop="dealName" label="处理人" min-width="60"> </sh-table-column>
      <sh-table-column prop="createTime" label="创建时间" min-width="60"> </sh-table-column>
      <sh-table-column prop="status" label="状态" min-width="60">
        <template #default="scope">
          <el-tag v-if="scope.row.status == 1" type=""> 已处理 </el-tag>
          <el-tag v-else type="danger"> 未处理 </el-tag>
        </template>
      </sh-table-column>
      <sh-table-column label="操作" width="100">
        <template #default="scope">
          <el-button v-if="scope.row.status == 0" type="text" @click="openProcess('handle', scope.row)">
            处理
          </el-button>
          <el-button v-else type="text" @click="openProcess('view', scope.row)"> 查看 </el-button>
        </template>
      </sh-table-column>
    </sh-table>
    <FormDialog ref="processRef" @loadList="loadList"></FormDialog>
  </div>
</template>
<script setup>
import { bbxProcessRunTask } from '@/blackbox/apis/workflow'
import FormDialog from './components/FormDialog.vue'
import { ref } from 'vue'
const formValue = ref({
  dataSource: 0,
  title: ''
})
const tableRef = ref(null)

const loadList = () => {
  tableRef.value.loadList()
}
const reset = () => {
  formValue.value.dataSource = 0
  formValue.value.title = ''
  tableRef.value.loadList()
}
const processRef = ref(null)
const openProcess = (type, row) => {
  processRef.value.open(type, row)
}
</script>
<style scoped lang="scss"></style>
