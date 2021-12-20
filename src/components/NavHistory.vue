<template>
  <div class="nav" :style="{ top: is_electron ? '30px' : '20px' }">
    <span class="icon-btn" @click="handle_back">
      <svg-icon
        title="点击可后退"
        icon-class="arrow-left"
        class="icon"
        :class="{ disactive: dis_back }"
      ></svg-icon>
    </span>
    <span class="icon-btn" @click="handle_next">
      <svg-icon
        :class="{ disactive: dis_forward }"
        title="点击可前进"
        icon-class="arrow-right"
        class="icon"
      ></svg-icon>
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const dis_back = ref(false);
const dis_forward = ref(false);
const is_electron = ref(process.env.IS_ELECTRON || false);

watch(
  () => route.fullPath,
  () => {
    dis_back.value = Boolean(!history?.state?.back);
    dis_forward.value = Boolean(!history?.state?.forward);
  },
  {
    immediate: true,
  }
);

const handle_back = () => {
  if (history?.state?.back) {
    router.go(-1);
  }
};
const handle_next = () => {
  if (history?.state?.forward) {
    history.forward();
  }
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
    color: #999;
  }
  .disactive {
    color: #ddd;
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
