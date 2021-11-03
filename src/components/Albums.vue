<template>
  <div class="wapper">
    <div class="z-music-cover z-music-cover-hover">
      <Image :src="image" :alt="name" />
    </div>
    <div>
      <div class="title" :title="name">{{ name }}</div>
      <div class="auth" :title="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import Image from '@/components/Image'
defineProps({
  image: String,
  name: String,
  desc: String
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
