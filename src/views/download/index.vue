<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

// 设置响应式数据
const downloadInfo = ref([
  { date: '2025-04-02', fileName: '衡水式高中安装包.zip', size: '1.5 GB', downloadLink: '/game-download/hs-high-school.zip' },
  { date: '2025-04-01', fileName: '衡水式高中补丁包.zip', size: '100 MB', downloadLink: '/game-download/hs-high-school-patch.zip' }
]);

// 获取当前页面路由信息
const route = useRoute();

onMounted(() => {

});
</script>

<template>
  <div class="game-download-page">
    <!-- 页面内容 -->
    <section class="top-section">
        <p class="top-description"></p>
    </section>

    <section class="hero-section">
      <div class="hero-content">
        <h2 class="page-title">游戏下载</h2>
        <p class="page-description">这是衡水式高中 游戏下载页面。</p>
      </div>
    </section>

    <section class="download-section">
      <h3 class="section-title">下载方式</h3>
      <!-- 使用透明表格类 -->
      <el-table :data="downloadInfo" border class="transparent-table">
        <el-table-column label="日期" prop="date" width="180"></el-table-column>
        <el-table-column label="文件名" prop="fileName" width="300"></el-table-column>
        <el-table-column label="文件大小" prop="size" width="150"></el-table-column>
        <el-table-column label="下载地址">
          <template #default="{ row }">
            <a :href="row.downloadLink" target="_blank" class="download-link">点击下载</a>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <section class="download-instruction">
      <h3 class="instruction-title">下载说明</h3>
      <p class="instruction-text">请下载文件，并解压到指定目录。</p>
    </section>
  </div>
</template>

<style scoped>
.game-download-page {
  padding: 0;
  /* 背景图片 */
  background-image: url('https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/04/20210122154401_ce079.jpg');
  background-size: cover; /* 背景图片填充整个视图 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
  background-attachment: fixed; /* 背景图片固定 */
  min-height: 100vh; /* 最小高度为视口高度 */
}

.top-section {
  padding: 1px; /* 内边距 */
}
/* 游戏下载 */
.hero-section {
  margin-top: 15%; /* 与顶部的间距 */;
  text-align: center; /* 将标题居中 */
  margin-bottom: 40px; /* 底部间距 */
}

.page-title {
  font-size: 36px;  /* 标题字体大小 */
  font-weight: bold; /* 标题字体粗细 */
  margin-top: 0; /* 标题与顶部的间距 */;
}

.page-description {
  font-size: 18px;  /* 描述字体大小 */
  margin-bottom: 20px;  /* 描述与标题之间的间距 */
}

.hero-image {
  max-width: 100%;  /* 图片最大宽度 */
  height: auto;   /* 保持图片的宽高比 */
  border-radius: 8px;    /* 图片圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* 阴影 */
}
/* 下载方式 */
.download-section {
  margin-top: 10px;  /* 下载方式与标题之间的间距 */
  padding: 20px;   /* 内边距 */
  border-radius: 8px;  /* 边框圆角 */
}
.section-title {
  font-size: 28px;  /* 标题字体大小 */
  font-weight: bold;  /* 标题字体粗细 */
  text-align: center;  /* 标题居中 */
  margin-bottom: 20px;
}
.download-link {
  color: #ff7f50;  /* 链接颜色 */
  text-decoration: none;  /* 链接样式 */
  font-weight: bold;  /* 链接字体粗细 */

}

.download-link:hover {
  color: #ff4500;  /* 鼠标悬停时的链接颜色 */
}
/* 下载方式结束 */
/* 下载说明 */
.download-instruction {
  margin-top: 10px;  /* 下载说明与标题之间的间距 */
  text-align: center;  /* 下载说明居中 */
}

.instruction-title {
  font-size: 24px;  /* 标题字体大小 */
  font-weight: bold;  /* 标题字体粗细 */
}

.instruction-text {
  font-size: 16px;  /* 描述字体大小 */
  line-height: 1.6;  /* 行高 */
  color: #555;   /* 描述颜色 */
}
</style>