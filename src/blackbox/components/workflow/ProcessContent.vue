<script setup>
import { computed, nextTick, ref } from 'vue'
import { bbxProcessRunTask, bbxProcessAdmin } from '@/blackbox/apis/workflow'
import { useForm } from 'blackbox-ui'
import NodeUserSelect from './NodeUserSelect.vue'
import ProcessProgressTable from './ProcessProgressTable.vue'
import processChoiceRadio from './processChoiceRadio.vue'
import { cloneDeep } from 'lodash'

const props = defineProps({
  //版本ID, 不必填
  processVersionId: {
    type: String,
    default: ''
  },
  //系统业务ID，必填
  processBusinessCode: {
    type: String,
    default: ''
  },
  //条件变量值
  processVariables: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 业务数据主键
  processDataId: {
    type: String,
    default: ''
  },
  processTaskId: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['loadList', 'isButton', 'grandpaTable'])

const { formRef, formValue, resetForm, validate } = useForm({
  processDealUsers: {},
  processTransferUsers: [],
  processVersionId: props.processVersionId,
  processRemark: ''
})
const grandpaTable = data => {
  emit('grandpaTable', data)
}
const backNodeData = ref([])

const backId = ref('')
const handleType = ref('insertSubmit')
const changeHandle = async e => {
  if (e === 'insertBack') {
    // 调用节点接口
    const { code, data, msg } = await $post(bbxProcessRunTask.findBackNodes, {
      processTaskId: props.processTaskId
    })
    if (code === 0) {
      backNodeData.value = data
      if (data.length == 1) {
        backId.value = data[0].id
      }
    } else {
      backNodeData.value = []
      $message.error(msg)
    }
  }
}

const progressRef = ref(null)
const loading = ref(false)
const process = ref({})

const arrRules = [
  {
    required: true,
    validator: (rule, value, callback) => {
      if (value && value.length) {
        callback()
      } else {
        callback('必填项不能为空')
      }
    },
    trigger: 'change'
  }
]

// 选择分支
const chooseIndex = ref(0)
const changeChoice = (node, activeIndex) => {
  chooseIndex.value = activeIndex
  const form = cloneDeep(formValue.value.processDealUsers)
  node.childNodes.forEach((item, index) => {
    if (activeIndex === index && item.approConf && !item.approConf.dealType) {
      form[item.id] = item.approConf.choosePersons
    } else {
      form[item.id] = []
    }
  })
  formValue.value.processDealUsers = form
}
// 删除formValue.value.processDealUsers空数据
const processDealUsers = computed(() => {
  const obj = formValue.value.processDealUsers || {}
  let processDealUsers = {}
  Object.keys(obj).forEach(key => {
    if (obj[key] && obj[key].length) {
      processDealUsers[key] = obj[key]
    }
  })
  return processDealUsers
})

// 流程管理-第一步节点
const findStartNodes = async row => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.findStartNodes, {
    processVersionId: props.processVersionId, //版本ID, 不必填
    processBusinessCode: props.processBusinessCode, //系统业务ID，必填
    processVariables: props.processVariables
  })

  loading.value = false
  if (code === 0) {
    process.value = data || {}
    let form = {}
    data.processNodeNexts.forEach(item => {
      const childNodes = item.childNodes || []
      childNodes.forEach(chil => {
        form[chil.id] = []
      })
      form[item.id] = []
    })
    formValue.value.processDealUsers = form
    formValue.value.processVersionId = data.processVersionId
    if (processType.value === 'add') {
      progressRef.value.loadList(data.processVersionId)
    }
  } else {
    $message.error(msg)
  }
}

// 流程任务-下一步节点
const findNextNodes = async row => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.findNextNodes, {
    processTaskId: props.processTaskId, //流程任务主键
    processVariables: props.processVariables
  })

  loading.value = false
  if (code === 0) {
    process.value = data || {}
    let form = {}
    data.processNodeNexts.forEach(item => {
      form[item.id] = []
    })
    formValue.value.processDealUsers = form
    formValue.value.processVersionId = data.processVersionId
    emit('isButton', data)
  } else {
    $message.error(msg)
  }
}

// 任务不同意按钮
const insertDisAgree = async () => {
  const res = await $post(bbxProcessRunTask.insertDisAgree, {
    processRemark: formValue.value.processRemark,
    processTaskId: props.processTaskId, //流程任务主键
    processDataId: props.processDataId //业务数据主键，必填
  })
  if (res.code === 0) {
    emit('loadList', res)
  } else {
    $message.error(msg)
  }
}

// 任务启动
const insertStart = async () => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.insertStart, {
    ...formValue.value,
    processDealUsers: processDealUsers.value,
    processDataId: props.processDataId, //业务数据主键，必填
    processVariables: props.processVariables
  })

  loading.value = false
  if (code === 0) {
    $message.success(msg)
    emit('loadList', data)
  } else {
    $message.error(msg)
  }
}
// 任务审批
const insertSubmit = async () => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.insertSubmit, {
    ...formValue.value,
    processDealUsers: processDealUsers.value,
    processTaskId: props.processTaskId, //流程任务主键
    processVariables: props.processVariables
  })

  loading.value = false
  if (code === 0) {
    $message.success(msg)
    emit('loadList', data)
  } else {
    $message.error(msg)
  }
}

// 任务转审(按钮)
const insertChange = async () => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.insertChange, {
    processDealUser: formValue.value.processTransferUsers,
    processRemark: formValue.value.processRemark,
    processTaskId: props.processTaskId //流程任务主键
  })

  loading.value = false
  if (code === 0) {
    $message.success(msg)
    emit('loadList', data)
  } else {
    $message.error(msg)
  }
}

// 任务撤销(按钮)
const insertRecall = async () => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.insertRecall, {
    ...formValue.value,
    processTaskId: props.processTaskId, //流程任务主键
    processDataId: props.processDataId
  })

  loading.value = false
  if (code === 0) {
    $message.success(msg)
    emit('loadList', data)
  } else {
    $message.error(msg)
  }
}
// 任务退回-退回
const insertBack = async () => {
  loading.value = true
  const { code, data, msg } = await $post(bbxProcessRunTask.insertBack, {
    processNodeId: backId.value,
    processRemark: formValue.value.processRemark,
    processTaskId: props.processTaskId, //流程任务主键
    processDataId: props.processDataId //业务数据主键，必填
  })

  loading.value = false
  if (code === 0) {
    $message.success(msg)
    emit('loadList', data)
  } else {
    $message.error(msg)
  }
}

// 转审列表
const deptPersonTree = ref([])
const findDeptPersonTree = async () => {
  const { code, data, msg } = await $post(bbxProcessAdmin.findDeptPersonTree, {})
  if (code === 0) {
    deptPersonTree.value = data || []
  } else {
    $message.error(msg)
  }
}
// 任务撤回
const insertRetract = async () => {
  const res = await $post(bbxProcessRunTask.insertRetract, {
    processTaskId: props.processTaskId //流程任务主键
  })
  if (res.code === 0) {
    emit('loadList', res)
  }
  $message.success(res.msg)
}

const onSubmit = () => {
  validate(() => {
    switch (handleType.value) {
      case 'insertStart':
        insertStart()
        break
      case 'insertSubmit':
        insertSubmit()
        break
      case 'insertChange':
        insertChange()
        break
      case 'insertRecall':
        insertRecall()
        break
      case 'insertBack':
        insertBack()
        break
      case 'insertRetract':
        insertRetract()
        break
      case 'insertDisAgree':
        insertDisAgree()
        break
    }
  })
}

const processType = ref('')

const show = ref(true)
const init = async () => {
  resetForm()
  show.value = false
  await nextTick()
  show.value = true
  await nextTick()
  if (props.type === 'add') {
    findStartNodes()
    processType.value = props.type
    handleType.value = 'insertStart'
  } else if (props.type === 'handle') {
    findNextNodes()
    handleType.value = 'insertSubmit'
    progressRef.value?.loadList()
  }
  if (props.type === 'view') {
    progressRef.value.loadList()
  }
  findDeptPersonTree()
}

const openFlowChart = () => {
  progressRef.value?.open()
}

defineExpose({
  init,
  onSubmit,
  insertStart,
  insertSubmit,
  insertChange,
  openFlowChart,
  insertRecall,
  insertRetract,
  insertDisAgree
})
</script>

<template>
  <div v-if="show">
    <div v-if="type != 'view'">
      <div class="flex items-center h-40 text-16">
        <div class="mr-10">
          <i class="el-icon-s-grid text-#409EFF"></i>
        </div>
        <div>流程处理</div>
      </div>
      <sh-form ref="formRef" :model="formValue">
        <sh-form-item
          v-if="
            process.operation?.agree?.status ||
            process.operation?.disAgree?.status ||
            process.operation?.change?.status ||
            process.operation?.back?.status ||
            process.operation?.recall?.status
          "
          label="操作"
        >
          <el-radio-group v-model="handleType" @change="changeHandle">
            <el-radio v-if="process.operation?.agree?.status && processType == 'add'" label="insertStart">{{
              process.operation?.agree?.text
            }}</el-radio>
            <!-- 同意 -->
            <el-radio v-if="process.operation?.agree?.status && processType != 'add'" label="insertSubmit">{{
              process.operation?.agree?.text
            }}</el-radio>
            <!-- 不同意 -->
            <el-radio v-if="process.operation?.disAgree?.status" label="insertDisAgree">{{
              process.operation?.disAgree.text
            }}</el-radio>
            <!-- 转审 -->
            <el-radio v-if="process.operation?.change?.status" label="insertChange">{{
              process.operation?.change.text
            }}</el-radio>
            <!-- 退回 -->
            <el-radio v-if="process.operation?.back?.status" label="insertBack">{{
              process.operation?.back.text
            }}</el-radio>
            <!-- 撤销 -->
            <el-radio v-if="process.operation?.recall?.status" label="insertRecall">{{
              process.operation?.recall.text
            }}</el-radio>
          </el-radio-group>
        </sh-form-item>
        <sh-form-item
          v-if="
            handleType != 'insertBack' &&
            (process.operation?.agree?.nextNodeName ||
              process.operation?.disAgree.nextNodeName ||
              process.operation?.change.nextNodeName ||
              process.operation?.back.nextNodeName ||
              process.operation?.recall.nextNodeName)
          "
          label="下一步"
        >
          <!-- 同意 -->
          <div
            v-if="process.operation?.agree?.status && (handleType === 'insertStart' || handleType === 'insertSubmit')"
          >
            {{ process.operation?.agree?.nextNodeName }}
          </div>
          <!-- 不同意 -->
          <div v-if="process.operation?.disAgree?.status && handleType === 'insertDisAgree'">
            {{ process.operation?.disAgree.nextNodeName }}
          </div>
          <!-- 转审 -->
          <div v-if="process.operation?.change?.status && handleType === 'insertChange'">
            {{ process.operation?.change.nextNodeName }}
          </div>
          <!-- 退回 -->
          <div v-if="process.operation?.back?.status && handleType === 'insertBack'">
            {{ process.operation?.back.nextNodeName }}
          </div>
          <!-- 撤销 -->
          <div v-if="process.operation?.recall?.status && handleType === 'insertRecall'">
            {{ process.operation?.recall.nextNodeName }}
          </div>
        </sh-form-item>
        <div v-if="['insertStart', 'insertSubmit'].indexOf(handleType) !== -1">
          <div v-for="item in process.processNodeNexts" :key="item.id" class="w-full">
            <!-- 非自选模式 -->
            <sh-form-item v-if="item.approConf && !item.approConf.dealType" label="处理人">
              <el-input :value="item.approConf.dealNames" disabled />
            </sh-form-item>
            <!-- 自选模式 -->
            <sh-form-item
              v-else-if="item.approConf && item.execute"
              label="处理人"
              :prop="`processDealUsers.${item.id}`"
              :rules="arrRules"
            >
              <NodeUserSelect v-model="formValue.processDealUsers[item.id]" :item="item"></NodeUserSelect>
            </sh-form-item>
            <!-- 选择分支 -->
            <div v-else-if="item.type === 'CHOICE_BRANCH'">
              <!-- 分支节点 -->
              <sh-form-item :label="item.text" prop="processChoice">
                <processChoiceRadio :item="item" @changeChoice="changeChoice"></processChoiceRadio>
              </sh-form-item>
              <div>
                <!-- 非自选模式 -->
                <sh-form-item
                  v-if="item.childNodes[chooseIndex].approConf && !item.childNodes[chooseIndex].approConf.dealType"
                  label="处理人"
                >
                  <el-input :value="item.childNodes[chooseIndex].approConf.dealNames" disabled />
                </sh-form-item>
                <!-- 自选模式 -->
                <sh-form-item
                  v-else-if="item.childNodes[chooseIndex].approConf && item.childNodes[chooseIndex].execute"
                  label="处理人"
                  :prop="`processDealUsers.${item.childNodes[chooseIndex].id}`"
                  :rules="arrRules"
                >
                  <NodeUserSelect
                    v-model="formValue.processDealUsers[item.childNodes[chooseIndex].id]"
                    :item="item.childNodes[chooseIndex]"
                  ></NodeUserSelect>
                </sh-form-item>
              </div>
            </div>
            <!-- 并行分支 -->
            <div v-else-if="item.type === 'PARALLEL_BRANCH'">
              <div v-for="(node, nodeIndex) in item.childNodes" :key="nodeIndex">
                <sh-form-item :label="`并行分支${nodeIndex + 1}`">
                  {{ node.text }}
                </sh-form-item>
                <!-- 非自选模式 -->
                <sh-form-item v-if="node.approConf && !node.approConf.dealType" label="处理人">
                  <el-input :value="node.approConf.dealNames" disabled />
                </sh-form-item>
                <!-- 自选模式 -->
                <sh-form-item
                  v-else-if="node.approConf && node.execute"
                  label="处理人"
                  :prop="`processDealUsers.${node.id}`"
                  :rules="arrRules"
                >
                  <NodeUserSelect v-model="formValue.processDealUsers[node.id]" :item="node"></NodeUserSelect>
                </sh-form-item>
              </div>
            </div>
          </div>
        </div>
        <sh-form-item
          v-if="handleType === 'insertChange'"
          label="处理人"
          :prop="`processTransferUsers`"
          :rules="arrRules"
        >
          <NodeUserSelect
            v-model="formValue.processTransferUsers"
            :item="{
              dealTypeCheck: 0,
              approConf: {
                choosePersons: deptPersonTree
              }
            }"
          ></NodeUserSelect>
        </sh-form-item>
        <sh-form-item v-if="handleType == 'insertBack'" label="退回节点" prop="backId">
          <el-select v-model="backId" placeholder="请选择退回节点">
            <el-option v-for="item in backNodeData" :key="item.id" :label="item.text" :value="item.id"> </el-option>
          </el-select>
        </sh-form-item>
        <sh-form-item
          v-if="process.operation?.opinion.status"
          :label="process.operation?.opinion?.text"
          prop="processRemark"
        >
          <el-input v-model="formValue.processRemark" type="textarea" placeholder="请输入" />
        </sh-form-item>
      </sh-form>
    </div>
    <!--    流程记录-->
    <ProcessProgressTable
      ref="progressRef"
      :type="type"
      :process-task-id="processTaskId"
      :process-data-id="processDataId"
      :process-version-id="processVersionId"
      @grandpaTable="grandpaTable"
    ></ProcessProgressTable>
  </div>
</template>

<style scoped lang="scss"></style>
