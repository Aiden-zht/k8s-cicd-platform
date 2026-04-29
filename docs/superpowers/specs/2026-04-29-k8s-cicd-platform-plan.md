# K8s CI/CD Platform - Implementation Plan

**Date**: 2026-04-29
**Based on**: 2026-04-29-k8s-cicd-platform-design.md

---

## Phase 1: 基础依赖与配置

### 1.1 安装依赖
```bash
npm install element-plus @element-plus/icons-vue
npm install vue-router pinia axios
npm install -D unplugin-auto-import unplugin-vue-components
```

### 1.2 配置 Element Plus
- 在 `main.js` 中注册 Element Plus
- 配置自动导入（unplugin）

### 1.3 配置 Vue Router
- 创建 `src/router/index.js`
- 定义基础路由结构（空占位页）

### 1.4 配置 Pinia
- 创建 `src/stores/` 目录
- 在 `main.js` 中注册

---

## Phase 2: 布局框架

### 2.1 创建 AppLayout 组件
- 文件路径：`src/layouts/AppLayout.vue`
- 包含：侧边栏 + 顶部栏 + 主内容区
- 侧边栏：可折叠、导航菜单、图标
- 顶部栏：Logo、面包屑、用户头像、主题切换

### 2.2 配置路由与布局
- 所有页面路由使用 AppLayout 作为父布局
- 实现面包屑生成逻辑

---

## Phase 3: Mock 数据层

### 3.1 创建 Mock 数据结构
- `src/mock/cluster.js` - 集群与节点数据
- `src/mock/apps.js` - 应用与部署数据
- `src/mock/pipelines.js` - 流水线数据
- `src/mock/registry.js` - 镜像仓库数据

### 3.2 创建 API 层
- `src/api/cluster.js`
- `src/api/apps.js`
- `src/api/pipelines.js`
- `src/api/registry.js`
- 统一使用 Promise + setTimeout 模拟异步

---

## Phase 4: 功能模块实现

### 4.1 集群管理模块
**文件**：
- `src/views/cluster/ClusterList.vue`
- `src/views/cluster/NodeList.vue`
- `src/stores/cluster.js`

**功能**：
- 集群列表表格（名称、状态、版本、节点数）
- 节点列表表格（名称、状态、角色、资源用量）
- 标签筛选

### 4.2 应用部署模块
**文件**：
- `src/views/apps/AppList.vue`
- `src/views/apps/DeployHistory.vue`
- `src/stores/apps.js`

**功能**：
- 应用列表表格
- 部署记录时间线
- 回滚操作

### 4.3 CI/CD 流水线模块
**文件**：
- `src/views/pipelines/PipelineList.vue`
- `src/views/pipelines/PipelineHistory.vue`
- `src/views/pipelines/PipelineEditor.vue`（简化版）
- `src/stores/pipelines.js`

**功能**：
- 流水线列表（卡片/表格）
- 运行历史与日志查看
- 可视化步骤编排（基础版）

### 4.4 镜像仓库模块
**文件**：
- `src/views/registry/ImageList.vue`
- `src/views/registry/RegistryConfig.vue`
- `src/stores/registry.js`

**功能**：
- 镜像列表表格
- 仓库配置表单

### 4.5 设置页面
**文件**：`src/views/settings/Settings.vue`
**功能**：基础设置占位页

---

## Phase 5: 优化与完善

### 5.1 错误处理
- API 层统一错误处理
- 空状态、加载状态、错误状态展示

### 5.2 主题与样式
- 实现深色/浅色主题切换
- 调整样式贴近 Rancher 风格

### 5.3 响应式优化
- 移动端适配（侧边栏自动折叠）

---

## 执行顺序

1. Phase 1 → 2 → 3（基础搭建，顺序执行）
2. Phase 4.1 → 4.2 → 4.3 → 4.4 → 4.5（模块可并行）
3. Phase 5（最后优化）

---

## 验证标准

- `npm run dev` 启动成功
- 侧边栏导航正常跳转
- 每个模块页面能展示 Mock 数据
- 面包屑正确生成
- 无明显样式错误
