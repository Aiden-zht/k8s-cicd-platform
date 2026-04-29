<script setup>
import { computed, onMounted } from 'vue'
import { usePipelineStore } from '../../stores/pipelines'
import { useClusterStore } from '../../stores/cluster'

const store = usePipelineStore()
const clusterStore = useClusterStore()

onMounted(() => {
  store.fetchRuns()
})

// 根据当前选中的集群过滤运行历史
const filteredRuns = computed(() => {
  return store.runs.filter(run => run.cluster === clusterStore.activeCluster)
})
</script>

<template>
  <div class="pipeline-history">
    <el-card>
      <template #header>
        <span>运行历史</span>
      </template>
      <el-table :data="filteredRuns" style="width: 100%" v-loading="store.loading">
        <el-table-column prop="pipeline" label="流水线" />
        <el-table-column prop="branch" label="分支" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Success' ? 'success' : 'danger'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="运行时间" />
        <el-table-column prop="duration" label="耗时" />
        <el-table-column label="操作">
          <template #default>
            <el-button size="small">查看日志</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
