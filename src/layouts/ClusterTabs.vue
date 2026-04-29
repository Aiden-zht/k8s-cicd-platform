<script setup>
import { computed, onMounted } from 'vue'
import { useClusterStore } from '../stores/cluster'

const store = useClusterStore()

onMounted(() => {
  if (store.clusters.length === 0) {
    store.fetchClusters()
  }
})

const handleClick = (clusterName) => {
  store.setActiveCluster(clusterName)
}
</script>

<template>
  <div class="cluster-tabs">
    <div
      v-for="cluster in store.clusters"
      :key="cluster.name"
      class="cluster-tab"
      :class="{ active: store.activeCluster === cluster.name }"
      @click="handleClick(cluster.name)"
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
  align-items: flex-end;  /* 底部对齐，让激活标签"浮起" */
  padding: 0 10px;
  gap: 4px;
}

.cluster-tab {
  position: relative;
  z-index: 1;
  padding: 8px 16px;
  background-color: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: all 0.3s;
  margin-bottom: -1px;  /* 与下方内容无缝 */
}

.cluster-tab:hover {
  background-color: #e8e8e8;
}

.cluster-tab.active {
  z-index: 10;              /* 最前面 */
  font-size: 15px;            /* 稍大 */
  font-weight: 600;
  box-shadow: 0 -3px 10px rgba(0,0,0,0.12);  /* 浮起阴影 */
  background-color: #ffffff;   /* 纯白，与内容区融合 */
  border-top: 2px solid #409eff;  /* 顶部高亮 */
  color: #409eff;
  margin-bottom: -1px;  /* 与下方内容无缝 */
}
</style>
