<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Monitor, Box, Cpu, Picture, Setting } from '@element-plus/icons-vue'

const route = useRoute()
const isCollapse = ref(false)

const menuItems = [
  {
    title: '集群管理',
    icon: Monitor,
    children: [
      { title: '集群列表', path: '/cluster' },
      { title: '节点管理', path: '/cluster/nodes' }
    ]
  },
  {
    title: '应用部署',
    icon: Box,
    children: [
      { title: '应用列表', path: '/apps' },
      { title: '部署记录', path: '/apps/deployments' }
    ]
  },
  {
    title: 'CI/CD',
    icon: Cpu,
    children: [
      { title: '流水线列表', path: '/pipelines' },
      { title: '运行历史', path: '/pipelines/history' }
    ]
  },
  {
    title: '镜像仓库',
    icon: Picture,
    children: [
      { title: '镜像列表', path: '/registry' },
      { title: '仓库配置', path: '/registry/config' }
    ]
  }
]

const singleMenuItems = [
  { title: '设置', icon: Setting, path: '/settings' }
]

const breadcrumbs = computed(() => {
  const matched = route.matched.filter(r => r.name)
  return matched.map(r => ({
    title: r.meta?.title || r.name,
    path: r.path
  }))
})
</script>

<template>
  <el-container class="app-layout">
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <div class="logo">
        <span v-if="!isCollapse">K8s CI/CD</span>
        <span v-else>K</span>
      </div>
      <el-menu
        :collapse="isCollapse"
        :default-active="route.path"
        router
        class="sidebar-menu"
      >
        <template v-for="item in menuItems" :key="item.title">
          <el-sub-menu :index="item.children[0].path">
            <template #title>
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
            >
              {{ child.title }}
            </el-menu-item>
          </el-sub-menu>
        </template>
        <el-menu-item
          v-for="item in singleMenuItems"
          :key="item.path"
          :index="item.path"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <div class="header-left">
          <el-icon class="collapse-btn" @click="isCollapse = !isCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="crumb in breadcrumbs"
              :key="crumb.path"
              :to="{ path: crumb.path }"
            >
              {{ crumb.title }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <el-avatar :size="32" />
        </div>
      </el-header>

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

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #1f2d3d;
}

.sidebar-menu {
  border-right: none;
  background-color: #304156;
}

.sidebar-menu .el-menu-item,
.sidebar-menu .el-sub-menu__title {
  color: #bfcbd9;
}

.sidebar-menu .el-menu-item.is-active {
  color: #409eff;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.collapse-btn {
  cursor: pointer;
  font-size: 20px;
}

.main-content {
  background-color: #f0f2f5;
  padding: 20px;
}
</style>
