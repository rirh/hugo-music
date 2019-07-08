/**
 * 发现音乐
 */
export default [
  {
    path: '/find/recommed',
    name: '个性推荐',
    // <a-icon type="customer-service" />
    // type: 'customer-service',
    type: 'icon-wangyiyunyinle',
    component: () => import('@/views/Find/pages/Recommed/index.vue'),
    meta: { title: '个性推荐', keepAlive: true, permission: ['dashboard'] },
    children: [
      {
        path: '/find/music/detail',
        name: '歌单详情',
        // <a-icon type="customer-service" />
        type: 'customer-service',
        component: () => import('@/views/Find/pages/MusicDetail/index.vue'),
        meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
      },
    ],
  },
  {
    path: '/find/music',
    name: '歌单',
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/MusicList/index.vue'),
    meta: { title: '歌单', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/find/anchradio',
    name: '主播电台',
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/AanchrRadio/index.vue'),
    meta: { title: '主播电台', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/find/top',
    name: '排行榜',
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/Top/index.vue'),
    meta: { title: '排行榜', keepAlive: true, permission: ['dashboard'] },
  }, {
    path: '/find/singer',
    name: '歌手',
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/Singer/index.vue'),
    meta: { title: '歌手', keepAlive: true, permission: ['dashboard'] },
  },
  {
    path: '/find/latest',
    name: '最新音乐',
    // <a-icon type="customer-service" />
    type: 'customer-service',
    component: () => import('@/views/Find/pages/Latest/index.vue'),
    meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
  },
  // {
  //   path: '/find/music/detail',
  //   name: '歌单详情',
  //   // <a-icon type="customer-service" />
  //   type: 'customer-service',
  //   component: () => import('@/views/Find/pages/MusicDetail/index.vue'),
  //   meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
  // },
];
