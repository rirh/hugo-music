import vue from '@vitejs/plugin-vue';
import createAutoImport from './auto-import'
import createCompression from './compression'
import createSvgIcon from './svg-icon'

export default function createVitePlugins(viteEnv, isBuild = false) {
    process.env.VITE_APP_BUILD_TIME = `${Date.now()}`;
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSvgIcon(isBuild))
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
