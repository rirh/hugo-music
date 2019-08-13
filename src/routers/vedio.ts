/**
 * 发现音乐
 */
export default [
    {
        path: '/vedio/index',
        name: '视频',
        // <a-icon type="customer-service" />
        // type: 'customer-service',
        type: 'icon-wangyiyunyinle',
        component: () => import('@/views/Vedio/pages/Vedio.vue'),
        meta: { title: '我的电台', keepAlive: true, permission: ['dashboard'] },

    }, {
        path: '/vedio/mv',
        name: 'MV',
        // <a-icon type="customer-service" />
        // type: 'customer-service',
        type: 'icon-wangyiyunyinle',
        component: () => import('@/views/Vedio/pages/Mv.vue'),
        meta: { title: '我的电台', keepAlive: true, permission: ['dashboard'] },

    },


];
