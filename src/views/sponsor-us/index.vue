<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

// 获取当前页面路由信息
const route = useRoute();

onMounted(() => {
  // 初始化代码可以放在这里
});
</script>

<template>
  <div class="sponsor-us-page">
        <section class="top-section">
            <p class="top-description"></p>
        </section>
    <!-- 页面背景图片 -->
    <section class="background-section">
      <div class="background-content">
        <h2 class="page-title"></h2>
      </div>
    </section>

    <!-- 赞助内容 -->
    <section class="sponsor-box">
      <div class="sponsor-content">
        <h3 class="sponsor-title">赞助说明</h3>
        <!-- 收款二维码 -->
        <div class="qr-code">
          <img src="https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/04/Snipaste_2025-04-04_20-17-08.png" alt="赞助二维码" />
        </div>

        <!-- 赞助说明文本 -->
        <p class="sponsor-description">请扫描二维码，向我们赞助。</p>

        <!-- 赞助方式 -->
        <p><strong>赞助方式：</strong>微信。</p>

        <!-- 联系我们 -->
        <p><strong>联系我们：</strong></p>
        <p>QQ：2379129929</p>
        <p>邮箱：xzy2379129929@outlook.com</p>
        <p>电话：157********</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sponsor-us-page {
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

.sponsor-box {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  margin-left: 10%;
  margin-right: 10%;
}

.sponsor-title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.sponsor-description {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.qr-code img {
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.sponsor-box p {
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 1.6;
  color: #333;
}

.sponsor-box strong {
  color: #2c3e50;
}
</style>
