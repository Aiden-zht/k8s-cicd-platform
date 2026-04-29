# K8s CI/CD Platform - Cluster Tabs & Settings Design

**Date**: 2026-04-29
**Status**: Approved
**Based on**: 2026-04-29-k8s-cicd-platform-update-design.md
**Update Type**: Cluster tabs interaction, settings display, layout refinement

---

## 1. 集群标签层次感设计

### 视觉浮起 + z-index 在最前

**非激活标签**
```css
.cluster-tab {
  position: relative;
  z-index: 1;
  padding: 8px 16px;
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  transition: all 0.3s;
}
```

**激活标签（层次感）**
```css
.cluster-tab.active {
  z-index: 10;              /* 最前面 */
  font-size: 15px;           /* 稍大 */
  font-weight: 600;
  box-shadow: 0 -3px 10px rgba(0,0,0,0.12);  /* 浮起阴影 */
  background: #ffffff;        /* 纯白，与内容区融合 */
  border-top: 2px solid #409eff;  /* 顶部高亮 */
  transform: translateY(1px);  /* 与下方内容无缝 */
  color: #409eff;
}
```

### 视觉效果
- 激活标签在视觉上"浮起"并覆盖其他标签边缘
- 底部与内容区白色融为一体，像一张纸从标签延续下来
- 阴影营造层次感，激活标签"在前"

---

## 2. 集群状态管理（Pinia + URL 同步）

### Pinia Store 增强
```js
// stores/cluster.js
export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters: [],
    activeCluster: 'dev01-1',  // 当前选中集群
    loading: false
  }),
  actions: {
    setActiveCluster(name) {
      this.activeCluster = name
      // 同步到 URL（不刷新页面）
      const url = new URL(window.location)
      url.searchParams.set('cluster', name)
      window.history.pushState({}, '', url)
    },
    initFromURL() {
      const params = new URLSearchParams(window.location.search)
      const cluster = params.get('cluster')
      if (cluster && this.clusters.find(c => c.name === cluster)) {
        this.activeCluster = cluster
      }
    },
    async fetchClusters() {
      this.loading = true
      try {
        this.clusters = await getClusters()
        this.initFromURL()  // 初始化时从 URL 恢复状态
      } finally {
        this.loading = false
      }
    }
  }
})
```

### Mock 数据增加 cluster 字段
```js
export const apps = [
  { id: 1, name: 'nginx-app', cluster: 'dev01-1', image: 'nginx:1.25', ... },
  { id: 2, name: 'redis-cache', cluster: 'dev01-2', image: 'redis:7.2', ... }
]
```

### 组件数据过滤
所有页面组件读取 `store.activeCluster`，过滤数据：
```js
const filteredApps = computed(() => 
  store.apps.filter(app => app.cluster === store.activeCluster)
)
```

---

## 3. 设置页面"在本页面显示"

### 方案：状态控制，不跳转路由

**Sidebar.vue 修改**
- "设置"菜单项不设置 index（不跳转）
- 点击触发事件通知父组件

**AppLayout.vue 修改**
- 增加 `showSettings` 状态
- 监听侧边栏事件，切换状态
- 主内容区根据状态显示不同内容

```vue
<template>
  <el-main class="main-content">
    <div v-if="showSettings" class="settings-inline">
      <div class="settings-header">
        <el-button @click="showSettings = false">← 返回</el-button>
        <h3>系统设置</h3>
      </div>
      <div class="settings-content">
        <!-- 设置内容直接显示在这里 -->
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
          </el-form>
        </el-card>
      </div>
    </div>
    <router-view v-else />
  </el-main>
</template>
```

---

## 4. 页面两侧不留空

### CSS 调整
```css
.app-layout {
  height: 100vh;
  width: 100vw;           /* 确保填满视口宽度 */
}

.cluster-tabs {
  margin: 0;
  padding: 0 10px;
  width: 100%;             /* 填满宽度 */
}

.main-content {
  padding: 0;
  overflow-x: hidden;      /* 防止水平滚动 */
}

/* 确保所有视图容器无水平滚动 */
.app-list, .cluster-list, .node-list,
.pipeline-list, .image-list, .deploy-history {
  padding: 0;
  margin: 0;
  height: 100%;
}

/* el-card 填满 */
.el-card {
  border-radius: 0;
  border-left: none;
  border-right: none;
}
```

---

## 5. 实现顺序

1. **更新 ClusterTabs 组件** - 增加层次感样式，连接 Pinia store
2. **更新 Pinia store** - 增加 activeCluster，URL 同步
3. **更新 Mock 数据** - 增加 cluster 字段
4. **修改设置显示方式** - 状态控制，不跳转路由
5. **调整页面不留空** - CSS 微调
6. **更新所有视图组件** - 使用过滤后的数据

---

## 6. 验证标准

- 选中集群标签有浮起效果，z-index 在最前
- 切换集群后，左侧所有内容（应用、节点、流水线等）只显示当前集群数据
- 刷新页面后，URL 中的集群参数能恢复选中状态
- 点击设置后，主内容区显示设置内容，带返回按钮
- 页面两侧完全无留空，填满视口
