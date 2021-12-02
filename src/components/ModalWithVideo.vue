<template>
  <Modal
    :show="_prop.open"
    :close="handle_close"
    :show-footer="false"
    frame
    :width="'80vw'"
    :click-outside-hide="true"
  >
    <video ref="videoRef" class="video-ref" autoplay controls :src="_prop.url">
      <!-- <source type="video/mp4" /> -->
    </video>
  </Modal>
</template>

<script setup>
import {
  defineProps,
  reactive,
  ref,
  defineEmits,
  computed,
  watch
} from "vue";
import { useStore } from "vuex";
import Plyr from "plyr";
import Modal from "./Modal.vue";
const store = useStore();
const videoRef = ref();
const current_state = computed(() => store.state.sound.current_state);

const _prop = defineProps({
  open: {
    type: Boolean,
    default: () => false
  },
  url: String
});
const modal_options = reactive({
  ..._prop,
  options: {
    settings: ["quality"],
    autoplay: true,
    quality: {
      default: 1080,
      options: [1080, 720, 480, 240]
    }
  }
});
const plyr = ref(null);
watch(
  _prop,
  () => {
    if (_prop.open) {
      if (!plyr.value) {
        plyr.value = new Plyr(videoRef.value, modal_options.options);
      } else {
        if (current_state.value === "play") {
          store.dispatch("toggle_play");
        }
        plyr.value.play();
      }
    }
  },
  { immediate: true, deep: true }
);

const emit = defineEmits(["on-close"]);
const handle_close = () => {
  if (plyr.value) plyr.value.pause();
  emit("on-close");
};
</script>

<style lang="scss" scoped>
.video-ref {
  max-height: 67vh;
  width: 100%;
}
</style>
