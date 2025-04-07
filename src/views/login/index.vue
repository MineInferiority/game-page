<script setup>
  import { ref } from 'vue'
  import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
  import { loginApi } from '../../api/login'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  let loginForm = ref({username:'', password:''})
  // 登录
  const login = async () => {
    const res = await loginApi(loginForm.value)
    if(res.code){
      // 登录成功后，提示登录成功
      ElMessage.success('登录成功')
      // 登录成功后，将用户信息存储到localStorage中
      localStorage.setItem('LoginUser', JSON.stringify(res.data))
      // 登录成功后，跳转到首页
      router.push('/index')
    }else{
      ElMessage.error(res.msg) 
    }

  }
  // 重置
  const clear = () => {
    loginForm.value = {username:'', password:''}
  }
</script>

<template>
  <div id="container">
    <div class="login-form">
      <el-form label-width="80px">
        <p class="title">衡水式高中</p>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button" type="primary" @click="login">登 录</el-button>
          <el-button class="button" type="info" @click="clear">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
#container {
  margin-top: 0;  /* 背景距离顶部距离 */;
  padding: 450px;    /* 输入框距离顶部距离 和图片padding  */
  height:100vh;      /* 填充整个屏幕 */
  background-image: url('https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/04/20210122154401_ce079.jpg');
  background-repeat: no-repeat; /* 不重复 */
  background-size: cover;   /* 填充整个容器 */
  background-position: center;  /* 背景图片位置 */
  background-attachment: fixed;  /* 背景图片固定 */
  opacity: 1;  /* 背景透明度 */
}

.login-form {
  max-width: 400px;    /* 最大宽度 */
  padding: 30px;    /* 内边距 */
  margin: 0 auto;        /* 水平居中 */
  margin-top: 0;   /* 背景距离顶部距离 */
  border: 1px solid rgba(255, 255, 255, 0.5);   /* 输入框边框 */
  border-radius: 10px;         /* 边框圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);       /* 阴影 */
  background-color: rgba(255, 255, 255, 0);    /* 背景颜色 */
  text-align: center;          /* 文字居中 */
  opacity: 1;                  /* 整体透明度 */
 
}

.title { 
  font-size: 30px;
  font-family: '楷体';
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
}

.button {
  margin-top: 30px;  /* 按钮距离顶部距离 */
  width: 120px;      /* 按钮宽度 */
}
</style>