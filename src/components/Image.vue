<template>
  <img ref="imageRef" :src="url" :alt="alt" />
</template>

<script setup>
import { defineProps, ref, onMounted, toRefs } from "vue";
const url = ref("");
const imageRef = ref("imageRef");
const props = defineProps({
  src: String,
  alt: String
});

const { src } = toRefs(props);
onMounted(() => {
  let intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(item => {
      if (item.intersectionRatio > 0) {
        url.value = src.value;
        intersectionObserver.unobserve(imageRef.value);
      }
    });
  });
  intersectionObserver.observe(imageRef.value);
});
</script>

<style lang="scss" scoped></style>
