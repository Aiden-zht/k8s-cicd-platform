<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Fold, Expand } from '@element-plus/icons-vue'

const route = useRoute()
const emit = defineEmits(['toggle-sidebar'])

const props = defineProps({
  isCollapse: Boolean,
  customBreadcrumbs: Array
})

const breadcrumbs = computed(() => {
  if (props.customBreadcrumbs && props.customBreadcrumbs.length >0) {
    return props.customBreadcrumbs
  }
  const matched = route.matched.filter(r => r.name)
  return matched.map(r => {
    // 将路由名映射为中文
    const titleMap = {
      'ClusterList': '集群列表',
      'NodeList': '节点管理',
      'AppList': '应用列表',
      'DeployHistory': '部署记录',
      'PipelineList': '流水线列表',
      'PipelineHistory': '运行历史',
      'ImageList': '镜像列表',
      'RegistryConfig': '仓库配置',
      'Settings': '系统设置'
    }
    return {
      title: titleMap[r.name] || r.meta?.title || r.name,
      path: r.path
    }
  })
})
</script>

<template>
  <div class="app-header">
    <div class="header-left">
      <el-icon class="collapse-btn" @click="emit('toggle-sidebar')">
        <Fold v-if="!isCollapse" />
        <Expand v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="crumb in breadcrumbs"
          :key="crumb.path"
          :to="crumb.path ? { path: crumb.path } : null"
        >
          {{ crumb.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right">
      <el-avatar :size="32" />
    </div>
  </div>
</template>

<style scoped>
.app-header {
  height: 60px;
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

.header-right {
  display: flex;
  align-items: center;
}
</style>
