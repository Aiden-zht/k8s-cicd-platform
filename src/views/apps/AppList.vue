<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '../../stores/apps'
import { useClusterStore } from '../../stores/cluster'
import { getStatusType } from '../../utils/status'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useAppStore()
const clusterStore = useClusterStore()
const scaleDialogVisible = ref(false)
const editDialogVisible = ref(false)
const logDrawerVisible = ref(false)
const currentApp = ref(null)
const newReplicas = ref(1)

onMounted(() => {
  store.fetchApps()
})

// 根据当前选中的集群过滤应用
const filteredApps = computed(() => {
  return store.apps.filter(app => app.cluster === clusterStore.activeCluster)
})

const handleRestart = (app) => {
  ElMessageBox.confirm(`确定要重启应用 ${app.name} 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success(`应用 ${app.name} 正在重启`)
  })
}

const handleScale = (app) => {
  currentApp.value = app
  newReplicas.value = parseInt(app.replicas) || 1
  scaleDialogVisible.value = true
}

const confirmScale = () => {
  ElMessage.success(`应用 ${currentApp.value.name} 副本数已调整为 ${newReplicas.value}`)
  scaleDialogVisible.value = false
}

const handleLogs = (app) => {
  currentApp.value = app
  logDrawerVisible.value = true
}

const handleEdit = (app) => {
  currentApp.value = app
  editDialogVisible.value = true
}

const handleUninstall = (app) => {
  ElMessageBox.confirm(`确定要卸载应用 ${app.name} 吗？此操作不可恢复！`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success(`应用 ${app.name} 已卸载`)
  })
}

const handleRefresh = () => {
  store.fetchApps()
}
</script>

<template>
  <div class="app-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>应用列表</span>
          <div>
            <el-button @click="handleRefresh">刷新</el-button>
            <el-button type="primary">部署应用</el-button>
          </div>
        </div>
      </template>
      <el-table :data="filteredApps" style="width: 100%" v-loading="store.loading.apps">
        <el-table-column prop="name" label="应用名称" />
        <el-table-column prop="image" label="镜像" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" effect="plain">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="replicas" label="副本数" />
        <el-table-column prop="createdAt" label="创建时间" />
        <el-table-column label="操作" width="400">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleRestart(row)">重启</el-button>
            <el-button type="warning" size="small" @click="handleScale(row)">扩缩容</el-button>
            <el-button size="small" @click="handleLogs(row)">日志</el-button>
            <el-button type="info" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleUninstall(row)">卸载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 扩缩容对话框 -->
    <el-dialog v-model="scaleDialogVisible" title="扩缩容" width="400px">
      <el-form>
        <el-form-item label="应用">
          {{ currentApp?.name }}
        </el-form-item>
        <el-form-item label="副本数">
          <el-input-number v-model="newReplicas" :min="1" :max="10" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="scaleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmScale">确定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑配置对话框 -->
    <el-dialog v-model="editDialogVisible" title="编辑配置" width="600px">
      <el-input type="textarea" :rows="10" v-model="currentApp.yaml" />
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editDialogVisible = false; ElMessage.success('配置已更新')">保存</el-button>
      </template>
    </el-dialog>

    <!-- 日志抽屉 -->
    <el-drawer v-model="logDrawerVisible" title="应用日志" size="50%">
      <pre>{{ currentApp?.logs || '暂无日志' }}</pre>
    </el-drawer>
  </div>
</template>

<style scoped>
.app-list {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.app-list :deep(.el-card) {
  height: 100%;
  border: none;
  border-radius: 0;
}

.app-list :deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 0;
}

.app-list :deep(.el-table) {
  width: 100% !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
