<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

// 获取当前页面路由信息
const route = useRoute();
const currentDate = ref(new Date().toLocaleString()); // 初始化当前日期
onMounted(() => {
  // 初始化代码可以放在这里
});
</script>

<template>
  <div class="dev-announcements-page">
     <section class="top-section">
        <p class="top-description"></p>
    </section>
    <!-- 开发公告框 -->
    <section class="announcement-box">
      <div class="announcement-content">
        <h3 class="announcement-title">开发公告</h3>
        <div class="announcement-details">
          <p><strong>当前时间：</strong>{{ currentDate }}</p>
          <p><strong>开发公告内容：</strong>我们将于下周推出新的版本，包含优化和修复。</p>
          <p><strong>开发公告内容：</strong>新的功能将包括更流畅的游戏体验和更多的互动功能。</p>
          <p><strong>开发公告内容：</strong>我们正在加紧开发新的扩展包，敬请期待。</p>
          <p><strong>开发公告内容：</strong>感谢大家的支持，反馈意见我们将认真考虑。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>

.dev-announcements-page {
  padding: 0;
  /* 背景图片 */
  background-image: url('https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/04/20210122154401_ce079.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}
/* 顶部描述样式 */
.top-section {
  padding: 1px; /* 内边距 */
}
/* 开发公告框样式 */
.announcement-box {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  border-radius: 8px;
  margin-top: 300px; /* 添加顶部边距 */
  margin-left: 10%;
  margin-right: 10%;
}

.announcement-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.announcement-details p {
  font-size: 18px;
  margin-bottom: 15px;
  line-height: 1.6;
  color: #333;
}

.announcement-details strong {
  color: #2c3e50;
}
/* 开发公告框样式结束 */
</style>
