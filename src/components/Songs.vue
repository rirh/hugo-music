<template>
  <div class="wapper">
    <div class="song">
      <Image class="image" :src="image" :alt="name" />
      <Image class="play" :src="play" alt="play" />
    </div>
    <div class="">
      <div class="title" :title="name">{{ name }}</div>
      <div class="auth" :title="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps} from "vue";
import play from "@/assets/image/play.svg";
import Image from "@/components/Image";

defineProps({
  image: String,
  title: String,
  name: String,
  desc: String
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
  cursor: pointer;
  transition: all 200ms;
  .song {
    text-align: center;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    position: relative;
    .image {
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
.play {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
}
.wapper:hover .play {
  opacity: 0.65;
}
.wapper:active .play {
  transform: scale(0.85);
}
</style>
