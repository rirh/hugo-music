<template>
  <div>
    <div v-if="image" class="base-info">
      <slot name="image">
        <Image
          :class="[shape && 'shape']"
          animate="animate__fadeIn"
          v-if="image"
          :src="image"
        />
      </slot>
      <div class="desc">
        <h1>{{ name }}</h1>
        <slot name="tracks">
          <div class="con" v-if="tracks">
            <template v-for="(it, i) in tracks" :key="i">
              <span>{{ it.label }}</span>
              <span v-if="i !== tracks.length - 1">·</span>
            </template>
          </div>
        </slot>
        <div @click="show = true" class="det" :title="description">
          {{ description }}
        </div>
        <slot name="action">
          <div class="action">
            <Button v-if="showActions" @click="handle_play" icon-class="play">{{
              $t("searchResult.play")
            }}</Button>
          </div>
        </slot>
      </div>
    </div>
    <Modal
      :show="show"
      :close="handle_close"
      :show-footer="false"
      :click-outside-hide="true"
      :title="$t('searchResult.detail')"
    >
      <p>
        {{ description }}
      </p>
    </Modal>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import Image from "@/components/Image";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

defineProps({
  image: String,
  name: String,
  description: String,
  shape: String,
  tracks: {
    type: Array,
    default: () => []
  },
  showActions: {
    type: Boolean,
    default: () => false
  }
});
const show = ref(false);
const emit = defineEmits(["on-play"]);
const handle_play = () => {
  emit("on-play");
};
const handle_close = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped>
.base-info {
  display: grid;
  grid-template-columns: 270px auto;
  margin-bottom: 40px;
  width: 100%;
  // background-color: #fff;
  border-radius: 0.75em;
  padding: 20px;
  box-sizing: border-box;
  // align-items: flex-end;
  img {
    height: 270px;
    width: 100%;
    border-radius: 0.75em;
    user-select: none;
    aspect-ratio: 1/1;
    border: 1px solid rgba(0, 0, 0, 0.04);
    filter: blur(16 px) opacity(0.6);
    transform: scale(0.92, 0.96);
  }
  .shape {
    border-radius: 50%;
  }
  .desc {
    margin-left: 20px;
    flex: 1;
    align-self: center;
    h1 {
      font-weight: 36px;
      font-weight: 700;
    }
    .con {
      font-size: 14px;
      opacity: 0.68;
      margin-top: 2px;
    }
    .det {
      font-size: 14px;
      opacity: 0.68;
      margin-top: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      cursor: pointer;
    }
    .action {
      margin-top: 30px;
    }
  }
}
</style>
