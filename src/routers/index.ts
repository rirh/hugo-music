import findRouters from './find';
/**
 * 网易云音乐nav导航
 */
export default [
  {
    path: '/find',
    name: '发现音乐',
    // <a-icon type="customer-service" />
    // type: 'customer-service',
    type: 'icon-wangyiyunyinle',
    component: () => import('@/views/Find/index.vue'),
    meta: { title: '发现音乐', keepAlive: true, permission: ['dashboard'] },
    redirect: '/find/recommed',
    children: [...findRouters],
  },
  {
    path: '/private',
    name: '私人FM',
    // <a-icon type="coffee" />
    // type: 'coffee',
    type: 'icon-FM',
    component: () => import('@/views/Private/index.vue'),
    meta: { title: '私人FM', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/vedio',
    name: '视频',
    // <a-icon type="video-camera" />
    // type: 'video-camera',
    type: 'icon-youtube',
    component: () => import('@/views/Vedio/index.vue'),
    meta: { title: '视频', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/friends',
    name: '朋友',
    // <a-icon type="team" />
    // type: 'team',
    type: 'icon-friend',
    component: () => import('@/views/Friends/index.vue'),
    meta: { title: '朋友', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/dowload',
    name: '下载管理',
    // <a-icon type="download" />
    // type: 'download',
    type: 'icon-package-down',
    component: () => import('@/views/Dowload/index.vue'),
    meta: { title: '下载管理', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/radio',
    name: '我的电台',
    // <a-icon type="fire" />
    // type: 'fire',
    type: 'icon-diantai2',
    component: () => import('@/views/Radio/index.vue'),
    meta: { title: '我的电台', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/favorite',
    name: '我的收藏',
    // <a-icon type="heart" />
    // type: 'heart',
    type: 'icon-favoritestarrate',
    component: () => import('@/views/Favorite/index.vue'),
    meta: { title: '我的收藏', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/music-detail',
    name: '歌单详情',
    show: true,
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/MusicDetail/index.vue'),
    meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/album-detail',
    name: '专辑详情',
    show: true,
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/AlbumDetail/index.vue'),
    meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
  }, {
    path: '/userinfo',
    name: '用户详情',
    show: true,
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Auth/User.vue'),
    meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/edit-user-info',
    name: '编辑用户信息',
    show: true,
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Auth/Edit.vue'),
    meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
  },



];
