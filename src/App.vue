<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
:root{
  --red:#d5504b;
  --btnRed:#d33a31;
  --white:#f0c2c0;
  --black:#2f2f2f;
  --bgColor:#ededed;
  --menuHover:#e2e2e2;
  --tipsColor:#888;
}
body{
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
