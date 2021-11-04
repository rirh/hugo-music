<template>
  <div class="wapper">
    <div class="song">
      <Image class="image" :src="image" :alt="name" />
      <svg-icon
        class="play"
        :icon-class="current_id === id ? 'pause' : 'play'"
        alt=""
      />
    </div>
    <div class="">
      <div class="title" :title="name">{{ name }}</div>
      <div class="auth" :title="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import Image from "@/components/Image";
import { useStore } from "vuex";
const store = useStore();
const current_id = computed(() => store.state.sound.current_id);
defineProps({
  image: String,
  title: String,
  name: String,
  desc: String,
  id: Number
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
    margin-right: 10px;

    .image {
      width: 40px;
      border-radius: 0.5em;
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
  left: 50%;
  top: 50%;
  width: 1em;
  height: 1em;
  color: #fff;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(206, 126, 126, 0.08);
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  padding: 5px;
}

.wapper:hover .play {
  opacity: 0.65;
}
.wapper:active .play {
  transform: translate(-50%, -50%) scale(0.85);
}
</style>
