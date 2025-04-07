<script setup>
import { ref } from 'vue';

// 图片数据
const images = ref([
  { url: 'https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/03/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250401232222.png', alt: '', downloadLink: '/game-download', sponsorLink: '/sponsor-us' },
  { url: 'https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/03/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20250401232222.png', alt: '', downloadLink: '/game-download', sponsorLink: '/sponsor-us' },
  { url: 'https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/03/19248e96-2698-4870-b58c-e3c6f90a5033.png', alt: '', downloadLink: '/game-download', sponsorLink: '/sponsor-us' },
  { url: 'https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/03/76f6c550-11d4-4fca-af2f-79b714186c7f.png', alt: '', downloadLink: '/game-download', sponsorLink: '/sponsor-us' },
  { url: 'https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/03/8138487d-e52c-4f62-b78a-714c917fcdce.png', alt: '', downloadLink: '/game-download', sponsorLink: '/sponsor-us' }
]);
</script>

<template>
  <!-- 页面内容 -->
  <div class="main-content">
       <!-- 图片轮播 -->
      <section id="image-slider" class="image-slider">
        <el-carousel trigger="click" arrow="hover" type="default" interval="3000" height="100vh">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <div class="image-container">
              <img :src="image.url" :alt="image.alt" />
              <div class="overlay">
              
                <div class="artistic-text">衡水式高中</div>
                <a :href="image.downloadLink" class="btn download-btn">立即下载</a>
                <a :href="image.sponsorLink" class="btn sponsor-btn">赞助</a>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>


      <!-- 游戏简介 -->
  <section id="game-intro" class="section">
    <div class="container">
      <h2 class="section-title">游戏简介</h2>
      <p class="intro-text">
        欢迎来到《衡水式高中》！这款游戏将带你回到那段青涩的高中岁月，体验到不一样的学习与成长之旅。
        作为一名学生，你将经历严苛的学业挑战，结交不同的朋友，参与丰富多彩的课外活动。
        无论是挑战高考，还是追寻青春的梦想，《衡水式高中》都将为你提供一个独特的游戏体验。
      </p>
      <h3 class="feature-title">游戏特点：</h3>
      <ul class="feature-list">
        <li>丰富的游戏内容：包括学业、学习任务、社交活动、竞技对抗等多种游戏元素。</li>
        <li>安全可靠：游戏采用最新的安全技术，保护玩家的个人数据及游戏数据。</li>
        <li>游戏体验：你将体验到真实的高中生活，不仅仅是学习，还有青春期的爱与友情，快乐与烦恼。</li>
        <li>多样化的角色选择：选择你的个性角色，体验不同的人生道路，感受独特的成长历程。</li>
      </ul>
    </div>
  </section>
  </div>
</template>

<style scoped>
/* 图片轮播样式 */
.image-slider {
  width: 100vw;  /* 100%的视口宽度 */
  height: 100vh; /* 100%的视口高度 */

}
.image-slider .image-container {
  position: relative;
  width: 100%;
  height: 100%;    
  overflow: hidden; /* 隐藏超出容器的部分 */
}

.image-slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;  /* 保证图片覆盖整个容器 */
  transition: transform 0.3s ease;  /* 添加平滑过渡效果 */
  background-position: center;  /* 背景图片位置 */
  background-attachment: fixed;  /* 背景图片固定 */
  opacity: 1;  /* 背景透明度 */
}

/* 图片覆盖层样式  */
.overlay {
  position: absolute;    /* 绝对定位 */
  top: 0;              /* 距离顶部0 */
  left: 0;             /* 距离左边0 */
  width: 100%;         /* 宽度100% */
  height: 100%;        /* 高度100% */
  text-align: center;  /* 文本居中 */
  padding: 20px;       /* 内边距 */
}

.artistic-text {
  position: absolute;
  left: 270px;             /* 距离左边125px */
  bottom: 250px;           /* 距离底部150px */
  font-size: 40px;  /* 艺术字字体大小 */
  font-family: 'Brush Script MT', cursive;  /* 使用艺术字体 */
  color: #fff;      /* 字体颜色 */
  margin-top: 1000px;  /* 顶部间距 */;
  margin-bottom: 20px;  /* 底部间距 */
  margin-right: 975px;  /* 左边间距 */;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* 添加文字阴影 */
}

/* 下载按钮样式 */
.download-btn {
  position: absolute;
  left: 125px;             /* 距离左边125px */
  bottom: 150px;           /* 距离底部150px */
  width: 478px;            /* 按钮宽度478px */
  height: 102px;           /* 按钮高度102px */
  background-color: #ff7f50; /* 背景色 */
  color: white;            /* 字体颜色 */
  text-decoration: none;   /* 去掉下划线 */
  border-radius: 5px;      /* 圆角 */
  display: inline-block;   /* 内联块元素 */
  line-height: 102px;      /* 使文字垂直居中 */
  text-align: center;      /* 文字水平居中 */
}

.download-btn:hover {
  background-color: #ff4500;  /* 悬停时的背景色 */
}

/* 赞助按钮样式 */
.sponsor-btn {
  position: absolute;
  left: calc(125px + 478px + 25px); /* 距离下载按钮右边25px */
  bottom: 150px;            /* 距离底部150px */
  width: 110px;             /* 按钮宽度110px */
  height: 140px;            /* 按钮高度140px */
  background-color: #4CAF50; /* 背景色 */
  color: white;             /* 字体颜色 */
  text-decoration: none;    /* 去掉下划线 */
  border-radius: 5px;       /* 圆角 */
  display: inline-block;    /* 内联块元素 */
  line-height: 140px;       /* 使文字垂直居中 */
  text-align: center;       /* 文字水平居中 */
}

.sponsor-btn:hover {
  background-color: #45a049; /* 悬停时的背景色 */
}
/* 图片轮播样式结束 */

/* 游戏简介部分样式 */
/* 使html和body都平滑滚动 */
html, body {
  scroll-behavior: smooth; /* 平滑滚动 */
  margin: 0; /* 移除默认的外边距 */
  padding: 0; /* 移除默认的内边距 */
}
.section {
  padding: 0 0; /* 增加顶部和底部的间距，确保内容有足够的空间 */
  background-image: url('https://java-ai-web-inferior.oss-cn-beijing.aliyuncs.com/2025/04/20210204001434_6372e.png'); /* 设置背景图片 */
  background-size: cover; /* 背景图片填充整个视图 */
  background-position: center; /* 背景图片居中 */
  color: #fff; /* 文字颜色设置为白色，确保背景上的内容清晰可读 */
  min-height: 100vh; /* 确保这部分填满整个视图高度 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* 给文字添加阴影，增强可读性 */
}

.container {
  max-width: 1200px;  /* 设置最大宽度 */
  margin: 0 auto;    /* 使容器居中 */
  padding: 0 20px;   /* 给容器添加内边距 */
}

.section-title {
  font-size: 48px;    /* 标题字体大小 */
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.intro-text {
  font-size: 20px;     /* 文字字体大小 */
  line-height: 1.8;
  text-align: center;
  margin-bottom: 40px;
}

.feature-title {
  font-size: 28px;   /* 子标题字体大小 */
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
}

.feature-list {
  list-style-type: disc;   /* 列表项前添加圆点 */
  margin-left: 20px;
  color: #fff;
  font-size: 18px;
  line-height: 1.8;
}

.feature-list li {
  text-align: left;    /* 列表项左对齐 */
}

@media (max-width: 768px) {
  /* 在小屏幕设备上调整文字大小和布局 */
  .section-title {
    font-size: 32px;
  }

  .intro-text {
    font-size: 16px;
  }

  .feature-title {
    font-size: 24px;
  }

  .feature-list li {
    font-size: 16px;
  }
}
/* 游戏简介样式结束 */
</style>