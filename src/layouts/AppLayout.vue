<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from './AppHeader.vue'
import Sidebar from './Sidebar.vue'
import ClusterTabs from './ClusterTabs.vue'
import Settings from '../views/settings/Settings.vue'

const isCollapse = ref(false)
const showSettings = ref(false)
const route = useRoute()
const router = useRouter()

const handleToggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleShowSettings = () => {
  showSettings.value = true
}

// 初始化时检查：如果 URL 是 /settings，显示设置页面并修正 URL
onMounted(() => {
  if (route.path === '/settings') {
    showSettings.value = true
    // 用 replaceState 修改 URL，不触发路由跳转（避免闪现）
    const url = new URL(window.location)
    url.pathname = '/cluster'
    window.history.replaceState({}, '', url)
  }
})

// 设置页面的自定义面包屑
const settingsBreadcrumbs = computed(() => {
  if (showSettings.value) {
    return [
      { title: '系统设置', path: null }
    ]
  }
  return []
})

// 路由变化时隐藏设置（排除初始化时的修正）
watch(() => route.path, (newPath) => {
  if (newPath !== '/settings') {
    showSettings.value = false
  }
})
</script>

<template>
  <el-container class="app-layout">
    <Sidebar :isCollapse="isCollapse" @show-settings="handleShowSettings" />
    <el-container>
      <el-header class="header">
        <AppHeader 
          :isCollapse="isCollapse" 
          @toggle-sidebar="handleToggleSidebar"
          :custom-breadcrumbs="settingsBreadcrumbs"
        />
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
