<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view></router-view>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'netease',
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style>
:root {
  --bordercolor: #d3d3d3;
  
}
/* CSS */
</style>
