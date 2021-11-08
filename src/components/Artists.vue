<template>
  <Link :to="`/${path}/${id}`">
    <div class="wapper">
      <div class="z-music-cover z-music-cover-hover">
        <Image class="artists" :src="image" :alt="name" />
      </div>
      <div>
        <div class="title" :title="name">{{ name }}</div>
      </div>
    </div>
  </Link>
</template>

<script setup>
import { defineProps } from "vue";
import Image from "@/components/Image";
import Link from "@/components/Link";
defineProps({
  image: String,
  name: String,
  path: {
    type: String,
    default: () => "artists"
  },
  id: Number
});
</script>

<style lang="scss" scoped>
.wapper {
  display: block;
  text-align: center;
  cursor: pointer;
  .artists {
    border-radius: 50%;
    width: 80%;
    overflow: hidden;
    &.img {
      transform: scale(1.2);
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
