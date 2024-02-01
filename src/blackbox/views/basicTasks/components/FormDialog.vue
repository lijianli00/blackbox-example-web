<script setup>
import { ref, nextTick } from 'vue'
import { ProcessContent } from '@/blackbox/components'
const showModal = ref(false) //打开或关闭业务表单弹窗
const loading = ref(false) //加载状态
const formValue = ref({ processDataId: '', processVariables: '' }) //表单业务值
const type = ref('add') //业务表单状态
const processBusinessCode = ref('') //系统业务ID，必填
const processVersionId = ref('') //版本ID, 不必填
const processTaskId = ref('') //任务ID
const timer = ref('') //每次加载组件得唯一key
const processRef = ref(null) //流程处理组件
const emit = defineEmits(['loadList'])
const loadList = () => {
  close()
  emit('loadList')
}
const close = () => {
  showModal.value = false
}
const onSubmit = () => {
  processRef.value.onSubmit()
}
const openFlowChart = () => {
  processRef.value.openFlowChart()
}
const open = async (handleType, row) => {
  loading.value = true
  showModal.value = true
  type.value = handleType
  if (handleType === 'add') {
    processBusinessCode.value = row.businessCode
    formValue.value.processDataId = $dayjs().valueOf() + ''
    processVersionId.value = row.versionId
  } else {
    formValue.value.processDataId = row.businessDataId
    processVersionId.value = ''
    processTaskId.value = row.id
  }
  timer.value = new Date().getTime()
  await nextTick()
  processRef.value.init()
  loading.value = false
}
const processVariables = ref({}) //输入条件变量转换值 数据对象
// 条件变量输入框  方法
const changeVariables = async () => {
  processVariables.value = JSON.parse(formValue.value.processVariables)
  await nextTick()
  processRef.value.init()
}
const grandpaData = ref({})

const grandpaTable = data => {
  grandpaData.value = data.operation
}
const retract = async () => {
  await nextTick()
  processRef.value.insertRetract()
}
const operation = ref({})
const isButton = data => {
  operation.value = data.operation
}
// 导出组件方法  此方式适用与vue2.7以上版本组件式api
defineExpose({
  open
})
</script>

<template>
  <sh-dialog :visible.sync="showModal" :loading="loading" :title="`流程表单`" :append-to-body="true" width="50%">
    <sh-form v-if="type != 'view'" ref="formRef" :model="formValue" label-width="120px">
      <sh-form-item label="业务主键" prop="processDataId" rules="required">
        <sh-input v-model="formValue.processDataId" placeholder="请输入" :disabled="type !== 'add'" />
      </sh-form-item>
      <sh-form-item label="条件变量" prop="processVariables" rules="required">
        <sh-input v-model="formValue.processVariables" type="textarea" placeholder="请输入" @blur="changeVariables" />
      </sh-form-item>
    </sh-form>
    <ProcessContent
      :key="timer"
      ref="processRef"
      :type="type"
      :process-business-code="processBusinessCode"
      :process-data-id="formValue.processDataId"
      :process-task-id="processTaskId"
      :process-version-id="processVersionId"
      :process-variables="processVariables"
      @loadList="loadList"
      @isButton="isButton"
      @grandpaTable="grandpaTable"
    >
    </ProcessContent>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button @click="openFlowChart">流程图</el-button>
        <el-button v-if="type != 'view'" type="primary" @click="onSubmit"> 提交 </el-button>
        <el-button
          v-if="operation?.retract?.status || (type == 'view' && grandpaData?.retract?.status)"
          type="primary"
          @click="retract"
        >
          {{ operation?.retract?.text || grandpaData?.retract?.text }}</el-button
        >
      </div>
    </template>
  </sh-dialog>
</template>

<style scoped lang="scss"></style>
