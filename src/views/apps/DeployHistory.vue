<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '../../stores/apps'

const store = useAppStore()

onMounted(() => {
  store.fetchDeployments()
})
</script>

<template>
  <div class="deploy-history">
    <el-card>
      <template #header>
        <span>部署记录</span>
      </template>
      <el-timeline>
        <el-timeline-item
          v-for="item in store.deployments"
          :key="item.time"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h4>{{ item.app }} - {{ item.version }}</h4>
            <p>状态: <el-tag type="success">{{ item.status }}</el-tag></p>
            <p>操作人: {{ item.operator }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>
