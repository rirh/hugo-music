<template>
  <div class="box fr-2-1 SongWithInfo">
    <div>
      <Song v-bind="attrs" :notShowHover="true" />
    </div>
    <div class="text-center">
      {{ publishTime }}
    </div>
    <div class="text-right">{{ duration }}</div>
  </div>
</template>

<script setup>
import { useAttrs, defineProps } from "vue";
import Song from "@/components/Songs";
const attrs = useAttrs();
defineProps({
  publishTime: String,
  duration: String
});
</script>

<style lang="scss" scoped>
.SongWithInfo {
  width: 100%;
  align-items: center;

  .text-right {
    text-align: right;
  }
  .text-center {
    text-align: center;
  }
}
.fr-2-1 {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);
}
</style>
