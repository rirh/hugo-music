import vue from '@vitejs/plugin-vue';
import dayjs from 'dayjs'
import createAutoImport from './auto-import'
import createCompression from './compression'
import createSvgIcon from './svg-icon'

export default function createVitePlugins(viteEnv: any, isBuild = false) {
    process.env.VITE_APP_BUILD_TIME = `${dayjs().format("YYYY-MM-DD HH:mm:ss")}`; ;
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSvgIcon(isBuild))
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
