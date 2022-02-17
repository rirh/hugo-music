<template>
  <div class="copyright">
    <div>
      Site data is provided by NetEase Cloud. Please contact to delete
      infringement.
    </div>
    <div>Copyright © 2021 - {{year}} tigerzh.com All Rights Reserved.</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const year = ref((new Date).getFullYear())
</script>

<style lang="scss" scoped>
.copyright {
  height: 45px;
  line-height: 20px;
  width: 100%;
  color: #333;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 0.5;
  padding-left: 20px;
  padding-bottom: calc(9vw + 45px);
  box-sizing: border-box;
}
</style>
