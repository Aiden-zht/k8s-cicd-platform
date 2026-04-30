<script setup>
import { computed, onMounted } from 'vue'
import { usePipelineStore } from '../../stores/pipelines'
import { useClusterStore } from '../../stores/cluster'
import { getStatusType } from '../../utils/status'

const store = usePipelineStore()
const clusterStore = useClusterStore()

onMounted(() => {
  store.fetchPipelines()
})

// 根据当前选中的集群过滤流水线
const filteredPipelines = computed(() => {
  return store.pipelines.filter(p => p.cluster === clusterStore.activeCluster)
})
</script>

<template>
  <div class="pipeline-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>流水线列表</span>
          <el-button type="primary">创建流水线</el-button>
        </div>
      </template>
      <el-table :data="filteredPipelines" style="width: 100%" v-loading="store.loading.pipelines">
        <el-table-column prop="name" label="流水线名称" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" effect="plain">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastRun" label="最近运行" />
        <el-table-column prop="duration" label="耗时" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="store.run(row.id)">运行</el-button>
            <el-button size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.pipeline-list {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.pipeline-list :deep(.el-card) {
  height: 100%;
  border: none;
  border-radius: 0;
}

.pipeline-list :deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
