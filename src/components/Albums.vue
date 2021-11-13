<template>
  <Link :to="`/${path}/${id}`">
    <div class="wapper">
      <div v-if="image" class="z-music-cover z-music-cover-hover">
        <Image
          style="max-height:300px;max-width:300px"
          :src="image"
          animate="animate__slideInUp"
          :alt="name"
        />
      </div>
      <div>
        <div v-if="name" class="title" :title="name">{{ name }}</div>
        <div v-if="desc" class="auth">
          <LinkWithArtists :artisits="desc"></LinkWithArtists>
        </div>
        <div v-if="count" class="count" :title="count">
          <svg-icon class="icon" icon-class="play"></svg-icon> {{ count }}
        </div>
      </div>
      <!-- <span class="play-con icon-btn">
        <svg-icon class="play" icon-class="arrow-right"></svg-icon>
      </span> -->
    </div>
  </Link>
</template>

<script setup>
import { defineProps } from "vue";
import Image from "@/components/Image";
import Link from "@/components/Link";
import LinkWithArtists from "@/components/LinkWithArtists";

defineProps({
  image: String,
  name: String,
  desc: {
    type: Array,
    default: () => []
  },
  count: String,
  id: Number,
  path: {
    default: () => "albums",
    type: String
  }
});
</script>

<style lang="scss" scoped>
.wapper {
  display: block;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  .play-con {
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 50%;
    transform: translate(220%, 90%);
    height: 20px;
    width: 20px;
    display: grid;
    place-items: center;
    .play {
      height: 1.2em;
      width: 1.2em;
      color: #fff;
      padding-left: 2px;
      opacity: 0.6;
    }
  }
  .count {
    line-height: 18px;
    word-break: break-word;
    font-weight: 600;
    opacity: 0.58;
    color: #000;
    font-size: 12px;

    .icon {
      margin-right: 3px;
      height: 8px;
      width: 8px;
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
