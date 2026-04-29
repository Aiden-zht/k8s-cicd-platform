<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import AppHeader from './AppHeader.vue'
import Sidebar from './Sidebar.vue'
import ClusterTabs from './ClusterTabs.vue'

const isCollapse = ref(false)
const showSettings = ref(false)
const theme = ref('light')
const language = ref('zh-CN')

const handleToggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleShowSettings = () => {
  showSettings.value = true
}

const handleCloseSettings = () => {
  showSettings.value = false
}

const saveSettings = () => {
  ElMessage.success('设置已保存')
}
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
        <div v-if="showSettings" class="settings-inline">
          <div class="settings-header">
            <el-button @click="handleCloseSettings">← 返回</el-button>
            <h3>系统设置</h3>
          </div>
          <div class="settings-content">
            <el-card>
              <el-form label-width="120px">
                <el-form-item label="主题">
                  <el-radio-group v-model="theme">
                    <el-radio value="light">浅色</el-radio>
                    <el-radio value="dark">深色</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="语言">
                  <el-select v-model="language">
                    <el-option label="简体中文" value="zh-CN" />
                    <el-option label="English" value="en-US" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="saveSettings">保存</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
        <router-view v-else />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  width: 100vw;
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
  width: 100%;
}

.app-layout {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

.settings-inline {
  height: 100%;
  padding: 20px;
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.settings-content {
  max-width: 800px;
}
</style>
