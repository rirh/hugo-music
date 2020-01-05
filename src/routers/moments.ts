/**
 * 搜索
 */
export default [
    {
        path: '/moments/index',
        name: '动态',
        // <a-icon type="customer-service" />
        // type: 'customer-service',
        type: 'icon-wangyiyunyinle',
        component: () => import('@/views/Friends/pages/index.vue'),
        meta: { title: '搜索', keepAlive: true, permission: ['dashboard'] },
        // children: [
        //   {
        //     path: '/music-detail',
        //     name: '歌单详情',
        //     // <a-icon type="customer-service" />
        //     type: 'customer-service',
        //     component: () => import('@/views/Find/pages/MusicDetail/index.vue'),
        //     meta: { title: '最新音乐', keepAlive: true, permission: ['dashboard'] },
        //   },
        // ],
    },


];
