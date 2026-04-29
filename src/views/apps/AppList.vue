<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../../stores/apps'

const store = useAppStore()

onMounted(() => {
  store.fetchApps()
})
</script>

<template>
  <div class="app-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>应用列表</span>
          <el-button type="primary">部署应用</el-button>
        </div>
      </template>
      <el-table :data="store.apps" style="width: 100%" v-loading="store.loading">
        <el-table-column prop="name" label="应用名称" />
        <el-table-column prop="image" label="镜像" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag type="success">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="replicas" label="副本数" />
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
