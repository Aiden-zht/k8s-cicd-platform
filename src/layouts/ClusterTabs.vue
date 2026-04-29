<script setup>
import { ref, onMounted } from 'vue'
import { useClusterStore } from '../stores/cluster'

const store = useClusterStore()
const activeCluster = ref('dev01-1')

onMounted(() => {
  if (store.clusters.length === 0) {
    store.fetchClusters()
  } else {
    activeCluster.value = store.clusters[0]?.name || 'dev01-1'
  }
})
</script>

<template>
  <div class="cluster-tabs">
    <div
      v-for="cluster in store.clusters"
      :key="cluster.name"
      class="cluster-tab"
      :class="{ active: activeCluster === cluster.name }"
      @click="activeCluster = cluster.name"
    >
      {{ cluster.name }}
    </div>
  </div>
</template>

<style scoped>
.cluster-tabs {
  height: 40px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 4px;
}

.cluster-tab {
  padding: 8px 16px;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: all 0.3s;
}

.cluster-tab:hover {
  background-color: #e8e8e8;
}

.cluster-tab.active {
  background-color: #ffffff;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  font-weight: 500;
}
</style>
