<template>
  <div class="daily-recommend-card">
    <Image :src="url" class="img" />
    <div class="container">
      <div class="title-box">
        <div class="title">
          <span>每</span>
          <span>日</span>
          <span>推</span>
          <span>荐</span>
        </div>
      </div>
    </div>
    <button @click="handle_play" class="play-button">
      <!-- <svg-icon icon-class="play" /> -->
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import Image from "@/components/Image";

defineProps({
  url: String
});
const emit = defineEmits(["on-play"]);
const handle_play = () => emit("on-play");
</script>

<style lang="scss" scoped>
.daily-recommend-card {
  border-radius: 1rem;
  height: 200px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: move 38s infinite;
  animation-direction: alternate;
  z-index: 0;
}

.container {
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.28));
  height: 198px;
  width: 50%;
  display: flex;
  align-items: center;
  border-radius: 0.94rem;
  z-index: 1;
}

.title-box {
  height: 148px;
  width: 148px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 25px;
  user-select: none;
  z-index: 1;
  .title {
    height: 100%;
    width: 100%;
    font-weight: 600;
    font-size: 64px;
    line-height: 48px;
    opacity: 0.96;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    place-items: center;
  }
}

.play-button {
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  position: absolute;
  right: 1.6rem;
  bottom: 1.4rem;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  margin-bottom: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 44px;
  transition: 0.2s;
  cursor: default;
  z-index: 1;

  .svg-icon {
    margin-left: 4px;
    height: 16px;
    width: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.44);
  }
  &:active {
    transform: scale(0.94);
  }
}

@keyframes move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
