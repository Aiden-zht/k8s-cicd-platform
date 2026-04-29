<script setup>
import { computed, onMounted } from 'vue'
import { useAppStore } from '../../stores/apps'
import { useClusterStore } from '../../stores/cluster'

const store = useAppStore()
const clusterStore = useClusterStore()

onMounted(() => {
  store.fetchDeployments()
})

// 根据当前选中的集群过滤部署记录
const filteredDeployments = computed(() => {
  return store.deployments.filter(d => d.cluster === clusterStore.activeCluster)
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
          v-for="item in filteredDeployments"
          :key="item.time"
          :timestamp="item.time"
          placement="top"
        >
          <el-card>
            <h4>{{ item.app }} - {{ item.version }}</h4>
            <p>状态: <el-tag :type="item.status === 'Success' ? 'success' : 'danger'">{{ item.status }}</el-tag></p>
            <p>操作人: {{ item.operator }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<style scoped>
.deploy-history {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.deploy-history :deep(.el-card) {
  height: 100%;
  border: none;
  border-radius: 0;
}

.deploy-history :deep(.el-card__body) {
  height: calc(100% - 60px);
  padding: 0;
  overflow-y: auto;
}
</style>
