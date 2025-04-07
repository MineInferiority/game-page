import { createRouter, createWebHistory } from 'vue-router';

import IndexView from '@/views/index/index.vue';
import LogView from '@/views/log/index.vue';
import LayoutView from '@/views/layout/index.vue';
import LoginView from '@/views/login/index.vue';
import GameDownloadView from '@/views/download/index.vue';
import AnouncementView from '@/views/announcement/index.vue';
import SponsorView from '@/views/sponsor-us/index.vue';
import FeedbackView from '@/views/feedback/index.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView },
    { path: '/', redirect: '/index' },
    {
      path: '/',
      component: LayoutView,
      children: [
        { path: '/index', name: 'index', component: IndexView },
        { path: '/log', name: 'log', component: LogView },
        { path: '/game-download', name: 'download', component: GameDownloadView },
        { path: '/dev-announcements', name: 'announcement', component: AnouncementView },
        { path: '/sponsor-us', name: 'sponsor', component: SponsorView },
        { path: '/feedback', name: 'feedback', component: FeedbackView },
      ]
    }
  ]
});

export default router;