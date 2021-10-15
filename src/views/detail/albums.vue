<template>
  <div class="wapper">
    <div class="z-music-cover z-music-cover-hover">
      <img :src="item.picUrl" :alt="item.name" />
    </div>
    <div>
      <div class="title" :title="item.name">{{ item.name }}</div>
      <div class="auth" :title="auth">{{ auth }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed } from "vue";
const props = defineProps({
  item: Object
});
const { item } = toRefs(props);
const auth = computed(() => {
  const foo = JSON.parse(JSON.stringify(item.value));
  let result = "";
  if (foo.artists) {
    result = foo.artists.map(e => e.name).toString();
  }
  return result;
});
</script>

<style lang="scss" scoped>
.wapper {
  display: block;
  .title {
    font-weight: 600;
    line-height: 20px;
    word-break: break-all;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .auth {
    font-size: 12px;
    opacity: 0.68;
    line-height: 18px;
    word-break: break-word;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
