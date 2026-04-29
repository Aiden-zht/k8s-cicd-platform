<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const config = ref({
  url: 'harbor.example.com',
  username: '',
  password: ''
})

const save = () => {
  ElMessage.success('配置已保存')
}
</script>

<template>
  <div class="registry-config">
    <el-card>
      <template #header>
        <span>仓库配置</span>
      </template>
      <el-form :model="config" label-width="120px">
        <el-form-item label="仓库地址">
          <el-input v-model="config.url" placeholder="请输入镜像仓库地址" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="config.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="config.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
