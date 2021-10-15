<template>
  <div class="wapper">
    <div class="song">
      <img :src="item.al.picUrl" :alt="item.name" />
    </div>
    <div class="">
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
  if (foo.ar) {
    result = foo.ar.map(e => e.name).toString();
  }
  return result;
});
</script>

<style lang="scss" scoped>
.wapper {
  display: flex;
  border-radius: 0.5em;
  padding: 10px 15px;
  align-items: center;
  // background-color: #fff;
  border-bottom: 1px solid #eee;
  .song {
    text-align: center;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    img {
      width: 40px;
      border-radius: 0.5em;
      margin-right: 10px;
      user-select: none;
      aspect-ratio: 1/1;
      border: 1px solid rgba(0, 0, 0, 0.04);
    }
  }
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
