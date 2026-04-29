# K8s CI/CD Platform - Update Design

**Date**: 2026-04-29
**Status**: Approved
**Based on**: 2026-04-29-k8s-cicd-platform-design.md
**Update Type**: UI/UX Improvements

---

## 1. 整体布局重构

### 组件拆分
将 `AppLayout.vue` 拆分为以下组件：
- `AppHeader.vue` - 顶部栏（logo、面包屑、用户）
- `ClusterTabs.vue` - 集群标签栏（新组件）
- `Sidebar.vue` - 侧边栏（调亮颜色）
- `AppLayout.vue` - 组合以上组件

### 新布局层次
```
┌──────────────────────────────────────────────────┐
│  AppHeader (logo、面包屑、用户)                  │
├──────────────────────────────────────────────────┤
│  ClusterTabs (集群标签栏，类似浏览器标签页)       │
├──────────┬───────────────────────────────────────┤
│ Sidebar  │   Main Content (无边距，全屏填充)      │
│ (白色)   │                                       │
└──────────┴───────────────────────────────────────┘
```

---

## 2. 侧边栏样式调整

### 颜色方案
- **背景色**: `#ffffff`（白色，原 `#304156`）
- **文字颜色**: `#303133`（深色，原 `#bfcbd9`）
- **激活状态**: `#409eff`（保持不变）
- **边框/分割线**: `#e6e6e6`

### 样式代码
```css
.sidebar {
  background-color: #ffffff;
  border-right: 1px solid #e6e6e6;
}

.sidebar-menu {
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
```

---

## 3. 集群标签栏设计

### 功能特性
- **位置**: Header 下方，独立一行
- **常驻设计**: 无关闭按钮，集群标签常驻显示
- **集群命名**: 格式如 `dev01-1`, `dev01-2`, `unite-1`

### 视觉设计
- 样式：类似浏览器标签页
  - 圆角只作用于上方（`border-radius: 8px 8px 0 0`）
  - 激活标签：白色背景 + 底部 2px 高亮边框（#409eff）
  - 非激活标签：浅灰背景 `#f5f7fa`
- 无 "+" 添加按钮（集群通过其他方式管理）

### 交互
- 点击切换集群
- 切换后主内容区显示对应集群的资源

### Mock 数据
```js
const clusters = [
  { name: 'dev01-1', status: 'Running', version: 'v1.28.2' },
  { name: 'dev01-2', status: 'Running', version: 'v1.28.2' },
  { name: 'unite-1', status: 'Running', version: 'v1.27.8' }
]
```

---

## 4. 应用列表完整操作集

### 表格列
```
| 应用名称 | 镜像 | 状态 | 副本数 | 创建时间 | 操作 |
```

### 操作按钮（完整操作集）
1. **重启** - 重新启动应用
   - 点击后弹出确认对话框
   - 确认后调用 API 重启

2. **扩缩容** - 调整副本数
   - 点击后弹出对话框
   - 输入新的副本数
   - 提交后更新

3. **查看日志** - 查看应用日志
   - 点击后打开抽屉（Drawer）或跳转到日志页
   - 显示实时日志内容

4. **编辑配置** - 编辑应用配置
   - 点击后弹出对话框
   - 显示 YAML 编辑器或表单
   - 提交后更新配置

5. **卸载** - 删除应用
   - 点击后弹出二次确认对话框
   - 确认后调用 API 删除

### 顶部操作按钮
- **部署应用** - 现有按钮，保持不变
- **刷新** - 重新获取应用列表

### Mock 数据增强
```js
{
  id: 1,
  name: 'nginx-app',
  image: 'nginx:1.25',
  status: 'Running',
  replicas: '3/3',
  createdAt: '2026-03-10',
  yaml: 'apiVersion: apps/v1\nkind: Deployment\n...',  // 用于编辑
  logs: '2026-04-29 10:00:00 Started container\n...'     // 用于查看日志
}
```

---

## 5. 全屏无边距设计

### 当前问题
- `.main-content` 有 `padding: 20px`
- 内容区域有留白，未完全填充

### 修改方案
```css
.main-content {
  background-color: #f0f2f5;
  padding: 0;  /* 去掉内边距 */
}

/* 让视图容器填满 */
.app-list, .cluster-list, .node-list, 
.pipeline-list, .image-list, .deploy-history {
  height: 100%;
  padding: 20px;  /* 在组件内部加 padding，而不是 main-content */
}

/* el-card 填满 */
.el-card {
  height: 100%;
  border-radius: 0;
}
```

### 效果
- 内容完全填充视口，无外边距
- 卡片紧贴浏览器边缘（圆角可选）

---

## 6. 实现顺序

1. **重构布局组件** - 拆分 AppLayout 为多个子组件
2. **调整侧边栏样式** - 修改颜色和样式
3. **实现集群标签栏** - 新建 ClusterTabs 组件
4. **更新应用列表** - 增加完整操作按钮和对话框
5. **调整页面填充** - 修改 CSS 实现全屏无边距
6. **更新 Mock 数据** - 增加新字段和操作

---

## 7. 验证标准

- 侧边栏变为白色背景，文字清晰可见
- 集群标签栏显示在 Header 下方，样式类似浏览器标签
- 应用列表有完整操作按钮（重启、扩缩容、日志、编辑、卸载）
- 页面内容完全填充视口，无多余边距
- 所有操作有对应的对话框/抽屉交互
