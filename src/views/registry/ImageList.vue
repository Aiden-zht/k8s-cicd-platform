<script setup>
import { computed, onMounted } from 'vue'
import { useRegistryStore } from '../../stores/registry'
import { useClusterStore } from '../../stores/cluster'

const store = useRegistryStore()
const clusterStore = useClusterStore()

onMounted(() => {
  store.fetchImages()
})

// 根据当前选中的集群过滤镜像
const filteredImages = computed(() => {
  return store.images.filter(img => img.cluster === clusterStore.activeCluster)
})
</script>

<template>
  <div class="image-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>镜像列表</span>
          <el-button type="primary">拉取镜像</el-button>
        </div>
      </template>
      <el-table :data="filteredImages" style="width: 100%" v-loading="store.loading">
        <el-table-column prop="name" label="镜像名称" />
        <el-table-column prop="tag" label="标签" />
        <el-table-column prop="size" label="大小" />
        <el-table-column prop="pushedAt" label="推送时间" />
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
