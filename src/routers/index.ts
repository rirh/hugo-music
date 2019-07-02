import findRouters from './find';
/**
 * 网易云音乐nav导航
 */
export default [
  {
    path: '/find',
    name: '发现音乐',
    // <a-icon type="customer-service" />
    type: 'customer-service',
    // component: () => import('@/views/Find/index.vue'),
    meta: { title: '发现音乐', keepAlive: true, permission: ['dashboard'] },
    redirect: '/find/recommed',
    children: [ ...findRouters ],
  },
  {
    path: '/private',
    name: '私人FM',
    // <a-icon type="coffee" />
    type: 'coffee',
    component: () => import('@/views/Private/index.vue'),
    meta: { title: '私人FM', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/vedio',
    name: '视频',
    // <a-icon type="video-camera" />
    type: 'video-camera',
    component: () => import('@/views/Vedio/index.vue'),
    meta: { title: '视频', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/friends',
    name: '朋友',
    // <a-icon type="team" />
    type: 'team',
    component: () => import('@/views/Friends/index.vue'),
    meta: { title: '朋友', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/dowload',
    name: '下载管理',
    // <a-icon type="download" />
    type: 'download',
    component: () => import('@/views/Dowload/index.vue'),
    meta: { title: '下载管理', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/radio',
    name: '我的电台',
    // <a-icon type="fire" />
    type: 'fire',
    component: () => import('@/views/Radio/index.vue'),
    meta: { title: '我的电台', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/favorite',
    name: '我的收藏',
    // <a-icon type="heart" />
    type: 'heart',
    component: () => import('@/views/Favorite/index.vue'),
    meta: { title: '我的收藏', keepAlive: true, permission: ['dashboard'] },
  },



];
