/**
 * 统一的状态标签映射配置
 * 所有状态标签的显示样式和类型都通过这里统一管理
 */

export const statusMap = {
  // 集群状态
  'Running': { type: 'success', label: '运行中' },
  'Stopped': { type: 'danger', label: '已停止' },
  'Error': { type: 'danger', label: '错误' },

  // 节点状态
  'Ready': { type: 'success', label: '就绪' },
  'NotReady': { type: 'danger', label: '未就绪' },
  'SchedulingDisabled': { type: 'warning', label: '已禁用调度' },

  // 应用状态
  'Running': { type: 'success', label: '运行中' },
  'Stopped': { type: 'danger', label: '已停止' },
  'Pending': { type: 'warning', label: '等待中' },
  'Failed': { type: 'danger', label: '失败' },

  // 流水线/部署状态
  'Success': { type: 'success', label: '成功' },
  'Failed': { type: 'danger', label: '失败' },
  'Running': { type: 'warning', label: '运行中' },
  'Pending': { type: 'info', label: '等待中' }
}

/**
 * 获取状态对应的标签类型
 * @param {string} status - 状态值
 * @returns {string} Element Plus 标签类型
 */
export function getStatusType(status) {
  return statusMap[status]?.type || 'info'
}

/**
 * 获取状态对应的显示文本
 * @param {string} status - 状态值
 * @returns {string} 显示文本
 */
export function getStatusLabel(status) {
  return statusMap[status]?.label || status
}
