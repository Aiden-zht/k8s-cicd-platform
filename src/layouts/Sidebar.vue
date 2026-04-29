<script setup>
import { useRouter, useRoute } from 'vue-router'
import { Monitor, Box, Cpu, Picture, Setting } from '@element-plus/icons-vue'
import { useClusterStore } from '../stores/cluster'

const props = defineProps({
  isCollapse: Boolean
})

const emit = defineEmits(['show-settings'])
const router = useRouter()
const route = useRoute()
const store = useClusterStore()

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
  { title: '设置', icon: Setting }
]

const handleSettings = () => {
  emit('show-settings')
}

const handleSelect = (index) => {
  if (!index) return // 设置项没有 index，不处理
  // 直接用 store.activeCluster，不依赖 route.query
  router.push({ path: index, query: { cluster: store.activeCluster } })
}
</script>

<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
    <div class="logo">
      <span v-if="!isCollapse">K8s CI/CD</span>
      <span v-else>K</span>
    </div>
    <el-menu
      :collapse="isCollapse"
      :default-active="$route.path"
      class="sidebar-menu"
      @select="handleSelect"
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
        :key="item.title"
        @click="handleSettings"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<style scoped>
.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #e6e6e6;
  transition: width 0.3s;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #303133;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #e6e6e6;
}

.sidebar-menu {
  border-right: none;
  background-color: #ffffff;
}

.sidebar-menu .el-menu-item,
.sidebar-menu .el-sub-menu__title {
  color: #303133;
}

.sidebar-menu .el-menu-item.is-active {
  color: #409eff;
  background-color: #ecf5ff;
}
</style>
