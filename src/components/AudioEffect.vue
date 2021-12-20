<template>
  <Modal
    :show="show_effect"
    :close="handle_close"
    :show-footer="false"
    :click-outside-hide="true"
    :title="$t('home.whaleAudioEffect')"
  >
    <div class="box fr-4 effecs">
      <Button
        :title="$t('home.originalEffectTips')"
        @click="handle_set_effects('cancelEffect')"
      >
        {{ $t("home.originalEffect") }}
      </Button>
      <Button
        :title="$t('home.vocalSurroundEffectTips')"
        @click="handle_set_effects('delay')"
      >
        {{ $t("home.vocalSurroundEffect") }}
      </Button>
      <Button
        :title="$t('home.bassBoostEffectTips')"
        @click="handle_set_effects('lowpassFilter')"
      >
        {{ $t("home.bassBoostEffect") }}
      </Button>
      <Button
        :title="$t('home.trebleEnhancementEffectTips')"
        @click="handle_set_effects('highpassFilter')"
      >
        {{ $t("home.trebleEnhancementEffect") }}
      </Button>
      <Button
        :title="$t('home.dolbySoundEffectTips')"
        @click="handle_set_effects('enhanceVocal')"
      >
        {{ $t("home.dolbySoundEffect") }}
      </Button>
      <!-- <Button @click="handle_set_effects('stereo')">stereo</Button> -->
      <Button
        :title="$t('home.removeVoiceEffectTips')"
        @click="handle_set_effects('removeVocal')"
      >
        {{ $t("home.removeVoiceEffect") }}</Button
      >
      <Button
        :title="$t('home.3DEnhancementEffectTips')"
        @click="handle_set_effects('splitterMerger')"
      >
        {{ $t("home.3DEnhancementEffect") }}
      </Button>
      <Button :title="$t('home.exploreNowTips')">
        <a href="#" @click="handle_go_export" rel="noopener noreferrer">
          {{ $t("home.exploreNow") }}
        </a>
      </Button>
    </div>
  </Modal>
</template>

<script setup>
import { defineProps, watchEffect, defineEmits, ref } from "vue";
import { useStore } from "vuex";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
const store = useStore();
const _props = defineProps({
  open: {
    type: Boolean,
    default: () => false,
  },
});
const show_effect = ref(false);

watchEffect(() => {
  show_effect.value = _props.open;
  return _props.open;
});
const _emits = defineEmits(["on-close"]);
const handle_close = () => {
  _emits("on-close");
};
const handle_go_export = () => {
  if (process.env.IS_ELECTRON) {
    const { shell } = require("electron");
    shell.openExternal("http://signup.tigerzh.com/?appname=music");
  } else {
    window.location.href = "http://signup.tigerzh.com/?appname=music";
  }
};
const handle_set_effects = (type) => {
  store.dispatch(type);
};
</script>

<style lang="scss" scoped>
.effecs {
  margin-top: 10px;
  gap: 10px 10px;
  button {
    border: none;
    padding: 10px;
    border-radius: 0.75em;
    background-color: var(--color-secondary);
    opacity: 0.6;
    transition: all 200ms;
    text-transform: capitalize;
    a,
    a:link,
    a:hover,
    a:active {
      text-decoration: none;
      color: inherit;
    }
  }
  button:hover {
    opacity: 1;
  }
}
</style>
