<template>
  <img
    ref="imageRef"
    :class="url ? 'show animate__animated animate__fadeInUp' : 'hidden'"
    :src="url"
    :alt="alt"
  />
</template>

<script setup>
import { defineProps, ref, onMounted, onBeforeUnmount, toRefs } from "vue";
const url = ref("");
const imageRef = ref("imageRef");
const props = defineProps({
  src: String,
  alt: String
});

const { src } = toRefs(props);
let intersectionObserver = null;
onMounted(() => {
  intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(item => {
      if (item.intersectionRatio > 0) {
        url.value = src.value;
      }
    });
  });
  intersectionObserver.observe(imageRef.value);
});
onBeforeUnmount(() => {
  intersectionObserver && intersectionObserver.disconnect();
});
</script>

<style lang="scss" scoped>
.show {
  opacity: 1;
}
.hidden {
  opacity: 0;
}
</style>
