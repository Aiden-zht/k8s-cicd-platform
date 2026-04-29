<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './AppHeader.vue'
import Sidebar from './Sidebar.vue'
import ClusterTabs from './ClusterTabs.vue'
import Settings from '../views/settings/Settings.vue'

const isCollapse = ref(false)
const showSettings = ref(false)
const route = useRoute()

const handleToggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleShowSettings = () => {
  showSettings.value = true
}

// 路由变化时隐藏设置
watch(() => route.path, () => {
  showSettings.value = false
})
</script>

<template>
  <el-container class="app-layout">
    <Sidebar :isCollapse="isCollapse" @show-settings="handleShowSettings" />
    <el-container>
      <el-header class="header">
        <AppHeader :isCollapse="isCollapse" @toggle-sidebar="handleToggleSidebar" />
      </el-header>
      <ClusterTabs />
      <el-main class="main-content">
        <div v-if="showSettings" class="settings-wrapper">
          <Settings />
        </div>
        <router-view v-else />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
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
  overflow-x: hidden;
}

.settings-wrapper {
  height: 100%;
}
</style>
