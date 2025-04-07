<script setup >
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ElIcon, ElHeader, ElFooter, ElCarousel, ElCarouselItem } from 'element-plus';

// 声明响应式数据
const loginName = ref('游客');
const isScrolled = ref(true);
const lastScrollTop = ref(0);
const scrollThreshold = 300;
let scrollTimeout = null;

// 滚动事件处理函数
const handleScroll = () => {
  const currentScrollTop = window.scrollY;
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(() => {
    if (currentScrollTop > lastScrollTop.value && currentScrollTop > scrollThreshold) {
      isScrolled.value = false;
    } else if (currentScrollTop < lastScrollTop.value || currentScrollTop <= scrollThreshold) {
      isScrolled.value = true;
    }
    lastScrollTop.value = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }, 200);
};

// 退出登录功能
const logout = () => {
  ElMessageBox.confirm('您确认退出登录吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  .then(async () => {
    ElMessage.success('退出登录成功');
    localStorage.removeItem('LoginUser');
    router.push('/login');
  })
  .catch(() => {
    ElMessage.info('您已取消退出登录');
  });
};

// 添加平滑滚动的函数
const scrollToSection = () => {
  const section = document.getElementById('game-intro');
  section.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    isScrolled.value = true;
  }, 810);
};

const router = useRouter();

onMounted(() => {
  const loginUser = JSON.parse(localStorage.getItem('LoginUser'));
  if (loginUser && loginUser.name) {
    loginName.value = loginUser.name;
  }

  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
   <div id="app">
    <!-- Header 区域 -->
    <el-header :class="{'fixed-header': true, 'visible': isScrolled}" class="header">
      <div id="title">   
          衡水式高中
        </div>
      <span class="right_tool">
         <router-link to="/index">
          <el-icon></el-icon> 主页
        </router-link>
        <a href="javascript:void(0)" @click="scrollToSection">游戏简介</a>
        <router-link to="/game-download">
          <el-icon><Download /></el-icon> 游戏下载
        </router-link> 
        <router-link to="/dev-announcements">
          <el-icon><Announcement /></el-icon> 开发公告
        </router-link>
        <router-link to="/sponsor-us">
          <el-icon><Star /></el-icon> 赞助我们
        </router-link>
        <router-link to="/feedback">
          <el-icon><ChatDotCircle /></el-icon> 建议反馈
        </router-link>
        <!-- <router-link to="/login">
          <el-icon><Login /></el-icon> 登录接口
        </router-link> -->
      </span>
    </el-header>

    <!-- 动态加载页面内容 -->
    <router-view />
    
    <!-- Footer 区域 -->
    <el-footer class="footer">
      <span>© 2025 衡水式高中 版权所有</span>
    </el-footer>
  </div>
</template>

<style scoped>
/* 导航栏样式 */
.header {
  display: flex;      /* 水平排列 */
  justify-content: space-between;  /* 两端对齐 */
  align-items: center;   /* 垂直居中 */
  background-color: #333;  /* 背景色 */
  padding: 10px 20px;   /* 内边距 */
  transition: top 0.3s ease; /* 平滑过渡 */
}
/* 添加滚动后的导航栏样式 */
.fixed-header {
  position: fixed;  /* 固定在顶部 */
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 保证导航栏在页面其他内容之上 */
  background-color: rgb(51, 36, 36);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* 阴影 */
  transition: transform 0.3s ease-in-out; /* 平滑过渡 */
  transform: translateY(-100%); /* 默认隐藏在上方 */
}
/* 可见时显示导航栏 */
.fixed-header.visible {
  transform: translateY(0); /* 可见时从上方滑入 */
}
/* 导航栏标题样式 */
#title {
  color: rgb(255, 255, 255);   /* 字体颜色 */
  font-size: 24px;   /* 字体大小 */
  color: white;   /* 字体颜色 */
  margin: 0 10px;  /* 外边距 */
  text-decoration: none;  /* 删除下划线 */
}
/* 右侧工具栏样式 */
.right_tool a {
  color: white;   /* 字体颜色 */
  margin: 0 10px;  /* 外边距 */
  text-decoration: none;  /* 删除下划线 */
}

.right_tool a:hover {
  text-decoration: underline;   /* 添加下划线 */
}

/* 导航栏样式结束 */

/* 底部样式 */
.footer {
  text-align: center;
  padding: 20px;
  background-color: rgb(51, 36, 36);
  color: white;
}

</style>
