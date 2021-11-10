<template>
  <img
    ref="imageRef"
    :class="[url ? 'show' : 'hidden', 'animate__animated', animate || '']"
    :src="url"
    :alt="alt"
    @error="error"
  />
</template>

<script setup>
import {
  defineProps,
  ref,
  onMounted,
  onBeforeUnmount,
  toRefs,
  watch
} from "vue";
import { resizeImage } from "@/utils";
import errorImage from "@/assets/image/error.png";
const url = ref(null);
const imageRef = ref("imageRef");
const props = defineProps({
  src: String,
  alt: String,
  animate: String
});

const { src } = toRefs(props);
let intersectionObserver = null;

watch(src, params => {
  url.value = resizeImage(params);
});

onMounted(() => {
  intersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(item => {
      if (item.intersectionRatio > 0) {
        url.value = resizeImage(src.value);
      }
    });
  });
  intersectionObserver.observe(imageRef.value);
});
onBeforeUnmount(() => {
  intersectionObserver && intersectionObserver.disconnect();
});

const error = () => {
  url.value = errorImage;
};
</script>

<style lang="scss" scoped>
.show {
  opacity: 1;
}
.hidden {
  opacity: 0;
}
</style>
