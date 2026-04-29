<script setup>
import { onMounted } from 'vue'
import { useClusterStore } from '../../stores/cluster'

const store = useClusterStore()

onMounted(() => {
  store.fetchNodes()
})
</script>

<template>
  <div class="node-list">
    <el-card>
      <template #header>
        <span>节点管理</span>
      </template>
      <el-table :data="store.nodes" style="width: 100%" v-loading="store.loading">
        <el-table-column prop="name" label="节点名称" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag type="success">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色">
          <template #default="{ row }">
            <el-tag v-for="role in row.roles" :key="role" style="margin-right: 4px">{{ role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="cpu" label="CPU 使用" />
        <el-table-column prop="memory" label="内存使用" />
      </el-table>
    </el-card>
  </div>
</template>
