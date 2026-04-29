# K8s CI/CD Platform - Design Spec

**Date**: 2026-04-29
**Status**: Approved
**Project**: Vue 3 前端，面向 K8s 的 CI/CD 平台，UI 参考 Rancher

---

## 1. 整体架构

### 技术栈
- Vue 3 (Composition API + `<script setup>`)
- Vite 构建工具
- Vue Router 4（路由）
- Pinia（状态管理）
- Element Plus（UI 组件库）
- Axios（HTTP 请求，对接 Mock）
- Vue i18n（可选，国际化）

### 项目结构
```
src/
├── layouts/          # 布局组件（含侧边栏）
├── views/            # 页面级组件
│   ├── cluster/      # 集群管理
│   ├── apps/         # 应用部署
│   ├── pipelines/    # CI/CD 流水线
│   ├── registry/     # 镜像仓库
│   └── settings/     # 设置
├── components/       # 通用组件
├── stores/           # Pinia stores
├── api/              # API 接口（Mock）
├── router/           # 路由配置
├── mock/             # Mock 数据
└── utils/            # 工具函数
```

### 核心设计原则
- 侧边栏作为 `AppLayout` 布局组件的一部分
- 每个功能模块独立 `view` + `store` + `api` 三层
- Mock 数据集中管理，后期切换真实 API 只需改 `api/` 层

---

## 2. 侧边栏与布局

### 布局结构
```
┌─────────────────────────────────────────────┐
│  Header (顶部栏：logo、用户、通知、面包屑)   │
├──────────┬──────────────────────────────────┤
│          │                                  │
│ Sidebar  │       Main Content               │
│ (侧边栏) │       (路由页面内容)              │
│          │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
```

### 侧边栏导航配置
```js
[
  {
    title: '集群管理', icon: 'Monitor', children: [
      { title: '集群列表', path: '/cluster' },
      { title: '节点管理', path: '/cluster/nodes' }
    ]
  },
  {
    title: '应用部署', icon: 'Box', children: [
      { title: '应用列表', path: '/apps' },
      { title: '部署记录', path: '/apps/deployments' }
    ]
  },
  {
    title: 'CI/CD', icon: 'Cpu', children: [
      { title: '流水线列表', path: '/pipelines' },
      { title: '运行历史', path: '/pipelines/history' }
    ]
  },
  {
    title: '镜像仓库', icon: 'Picture', children: [
      { title: '镜像列表', path: '/registry' },
      { title: '仓库配置', path: '/registry/config' }
    ]
  },
  {
    title: '设置', icon: 'Setting', path: '/settings'
  }
]
```

### Rancher 风格关键点
- 侧边栏可折叠（collapse）
- 深色/浅色主题切换
- 当前激活项高亮
- 面包屑导航显示在顶部

---

## 3. 功能模块

### 3.1 集群管理（Cluster）
- **集群列表**：表格展示集群名称、状态、版本、节点数、创建时间
- **节点管理**：展示节点列表（名称、状态、角色、CPU/内存用量），支持标签筛选

### 3.2 应用部署（Apps）
- **应用列表**：表格展示应用名、镜像、状态、副本数、创建时间
- **部署记录**：时间线展示部署历史，支持回滚操作

### 3.3 CI/CD 流水线（Pipelines）
- **流水线列表**：卡片/表格展示流水线名称、状态（成功/失败/运行中）、最近运行时间
- **流水线编辑器**：参考 Rancher，支持可视化步骤编排（源码拉取 → 构建 → 推送 → 部署）
- **运行历史**：日志查看、状态追踪

### 3.4 镜像仓库（Registry）
- **镜像列表**：展示镜像名、标签、大小、推送时间
- **仓库配置**：表单配置仓库地址、认证信息

### Mock 数据策略
- 每个模块在 `mock/` 下有对应的数据文件
- API 层用 Promise + setTimeout 模拟异步
- 数据包含典型 K8s 资源结构

---

## 4. 数据流与错误处理

### 数据流
```
用户操作 → View 组件 → Store (Pinia) → API 层 → Mock 数据
                    ↓
               响应式更新 → 组件重新渲染
```

### Pinia Store 设计（每个模块一个 store）
```js
export const usePipelineStore = defineStore('pipelines', {
  state: () => ({ list: [], loading: false, error: null }),
  actions: {
    async fetchPipelines() { /* 调用 api，更新 state */ },
    async runPipeline(id) { /* 触发运行 */ }
  }
})
```

### 错误处理
- API 层统一拦截，错误存入 store.error
- 页面用 ElMessage 提示用户
- 列表页空状态：无数据 / 加载失败 / 网络错误 分别展示

### 路由守卫
- 未实现页面显示 "开发中" 占位页
- 404 兜底页

---

## 5. 开发计划

1. 安装依赖（Element Plus、Pinia、Vue Router、Axios）
2. 搭建布局框架（Header + Sidebar + Main）
3. 配置路由和 Mock 数据
4. 逐个实现功能模块
5. 联调优化
