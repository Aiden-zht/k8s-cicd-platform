<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const theme = ref('light')
const language = ref('zh-CN')

const save = () => {
  ElMessage.success('设置已保存')
}
</script>

<template>
  <div class="settings">
    <el-card :body-style="{ padding: '20px', height: '100%' }" class="settings-card">
      <h3>系统设置</h3>
      <el-form label-width="120px" class="settings-form">
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
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.settings {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}

.settings :deep(.el-card) {
  height: 100%;
  border: none;
  border-radius: 0;
}

.settings :deep(.el-card__body) {
  height: calc(100% - 40px);
  overflow-y: auto;
}

.settings h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.settings-form {
  max-width: 600px;
}
</style>
