<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import {  FeedbackApi } from '@/api/feedback'; // 导入 API 函数
import { ElMessage } from 'element-plus';

// 路由和状态管理
const route = useRoute();

// 定义反馈内容
const feedbackContent = ref('');

// 处理提交
const submitFeedback = () => {
  if (!feedbackContent.value.trim()) {
    ElMessage.error('反馈内容不能为空');
    return;
  }
    // 调用 API 函数提交反馈
    const feedbackData = feedbackContent.value;

    FeedbackApi(feedbackData)
      .then(() => {
        // 处理成功响应
        ElMessage.success('感谢您的反馈，我们已收到您的建议！');
      })
      .catch(() => {
        // 处理错误响应
        ElMessage.error('提交失败，请稍后重试');      
      });
  feedbackContent.value = ''; // 清空输入框
};

onMounted(() => {
  // 页面加载时的初始化逻辑
});
</script>

<template>
  <div class="feedback-page">
    <section class="top-section">
        <p class="top-description"></p>
    </section>
    <!-- 页面背景图片 -->
    <section class="background-section">
      <div class="background-content">
        <h2 class="page-title"></h2>
      </div>
    </section>

    <!-- 反馈内容 -->
    <section class="feedback-box">
      <div class="feedback-content">
        <h3 class="feedback-title">建议反馈</h3>
  
        <!-- 反馈说明 -->
        <p class="feedback-description">请填写建议反馈内容:
        </p>

        <!-- 输入框 -->
        <textarea
          v-model="feedbackContent"
          class="feedback-textarea"
          placeholder="请输入您的建议..."
          rows="6"
        ></textarea>

        <!-- 提交按钮 -->
        <button @click="submitFeedback" class="submit-btn">提交反馈</button>
      </div>
            <!-- 联系我们 -->
            <p>以下方式或许会更快的处理你的反馈意见：</p>
        <p>QQ：2379129929</p>
        <p>邮箱：xzy2379129929@outlook.com</p>
        <p>电话：157********</p>
    </section>
   
  </div>
</template>

<style scoped>
.feedback-page {
  padding: 0;
  /* 背景图片 */
  background-image: url('https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/04/20210122154401_ce079.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
.top-section {
  padding: 1px; /* 内边距 */
}

.background-section {
  text-align: center;
  margin-top: 10%;
  padding: 20px;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: white;
}

.feedback-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}

.feedback-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.feedback-description {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.feedback-textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #45a049;
}

.submit-btn:active {
  background-color: #3e8e41;
}
</style>
