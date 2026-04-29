<script setup>
import { ref } from 'vue'

const runs = ref([
  { id: 1, pipeline: 'frontend-ci', status: 'Success', branch: 'main', time: '2026-04-29 08:00', duration: '3m 20s' },
  { id: 2, pipeline: 'frontend-ci', status: 'Failed', branch: 'dev', time: '2026-04-28 16:30', duration: '1m 45s' }
])
</script>

<template>
  <div class="pipeline-history">
    <el-card>
      <template #header>
        <span>运行历史</span>
      </template>
      <el-table :data="runs" style="width: 100%">
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
