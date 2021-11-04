<template>
  <div class="nav">
    <span class="icon-btn" @click="handle_back">
      <svg-icon
        title="点击可后退"
        icon-class="arrow-left"
        class="icon"
      ></svg-icon>
    </span>
    <span class="icon-btn" @click="handle_next">
      <svg-icon
        title="点击可前进"
        icon-class="arrow-right"
        class="icon"
      ></svg-icon>
    </span>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const handle_back = () => {
  router.go(-1);
};
const handle_next = () => {
  history.forward();
};
</script>

<style lang="scss" scoped>
.nav {
  position: absolute;
  right: 20px;
  top: 20px;
  .icon {
    height: 1.5em;
    width: 1.5em;
    color: #666;
  }
  .icon-btn:first-child {
    margin-right: 10px;
  }
  .icon-btn {
    padding: 5px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-grid;
    align-items: center;
  }
  .icon-btn:hover {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}
</style>
