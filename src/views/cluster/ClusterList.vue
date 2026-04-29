<script setup>
import { onMounted } from 'vue'
import { useClusterStore } from '../../stores/cluster'
import { Monitor } from '@element-plus/icons-vue'

const store = useClusterStore()

onMounted(() => {
  store.fetchClusters()
})
</script>

<template>
  <div class="cluster-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>集群列表</span>
          <el-button type="primary">添加集群</el-button>
        </div>
      </template>
      <el-table :data="store.clusters" style="width: 100%" v-loading="store.loading">
        <el-table-column prop="name" label="集群名称" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag type="success">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="version" label="K8s 版本" />
        <el-table-column prop="nodes" label="节点数" />
        <el-table-column prop="createdAt" label="创建时间" />
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
