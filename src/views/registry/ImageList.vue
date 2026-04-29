<script setup>
import { onMounted } from 'vue'
import { useRegistryStore } from '../../stores/registry'

const store = useRegistryStore()

onMounted(() => {
  store.fetchImages()
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
      <el-table :data="store.images" style="width: 100%" v-loading="store.loading">
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
