export const bbxProcessRunTask = {
  list: '/bbxProcessRunTask/list',
  findStartNodes: '/bbxProcessExecute/findStartNodes',
  findNextNodes: '/bbxProcessExecute/findNextNodes',
  insertStart: '/bbxProcessExecute/insertStart',
  insertSubmit: '/bbxProcessExecute/insertSubmit',
  insertChange: '/bbxProcessExecute/insertChange',
  insertRecall: '/bbxProcessExecute/insertRecall',
  getProcessProgress: '/bbxProcessExecute/getProcessProgress',
  insertBack: '/bbxProcessExecute/insertBack',
  insertDisAgree: '/bbxProcessExecute/insertDisAgree',
  insertRetract: '/bbxProcessExecute/insertRetract',
  findBackNodes: '/bbxProcessExecute/findBackNodes', //退回节点
  findProcess: '/bbxProcessExecute/findProcess' //触发流程
}
// 流程管理
export const bbxProcessAdmin = {
  findGroupByUnitId: '/bbxProcessAdmin/findGroupByUnitId',
  findPersonRoleByUnitId: '/bbxProcessAdmin/findPersonRoleByUnitId',
  findDeptPersonTree: '/bbxProcessAdmin/findDeptPersonTree',
  listPerson: '/bbxProcessAdmin/listPerson',
  findDeptTree: '/bbxProcessAdmin/findDeptTree',
  findUnitGroupTree: '/bbxProcessAdmin/findUnitGroupTree',
  listUnitPage: '/bbxProcessAdmin/listUnitPage'
}
