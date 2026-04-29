<script setup>
import { ref } from 'vue'
import AppHeader from './AppHeader.vue'
import Sidebar from './Sidebar.vue'
import ClusterTabs from './ClusterTabs.vue'

const isCollapse = ref(false)

const handleToggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<template>
  <el-container class="app-layout">
    <Sidebar :isCollapse="isCollapse" />
    <el-container>
      <el-header class="header">
        <AppHeader :isCollapse="isCollapse" @toggle-sidebar="handleToggleSidebar" />
      </el-header>
      <ClusterTabs />
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-layout {
  height: 100vh;
}

.header {
  padding: 0;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  height: 60px !important;
}

.main-content {
  background-color: #f0f2f5;
  padding: 0;
}
</style>
