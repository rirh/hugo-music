<template>
  <div class="contant">
    <h1>{{ $t("settings.general") }}</h1>
    <h3>{{ $t("settings.spreadflower") }} 🎉</h3>
    <p>{{ $t("settings.sprflquertion1") }} ?</p>
    <div class="cell">
      <input
        v-model="spreadflower"
        type="radio"
        id="auto"
        name="theme"
        :value="true"
        checked
      />
      <label for="auto"> {{ $t("settings.yes") }}</label>
    </div>
    <div class="cell">
      <input
        v-model="spreadflower"
        type="radio"
        id="light"
        name="theme"
        :value="false"
      />
      <label for="light">{{ $t("settings.no") }}</label>
    </div>
    <h3>{{ $t("settings.lyricBackgroundTips") }}</h3>
    <p>{{ $t("settings.lyricBackgroundTips") }} ?</p>
    <div class="cell">
      <input
        v-model="lyricBgMode"
        type="radio"
        id="blur"
        name="lyricBackgroundTips"
        :value="'blur'"
        checked
      />
      <label for="blur"> {{ $t("settings.blur") }}</label>
    </div>
    <div class="cell">
      <input
        v-model="lyricBgMode"
        type="radio"
        id="dynamic"
        name="lyricBackgroundTips"
        :value="'dynamic'"
      />
      <label for="dynamic">{{ $t("settings.motionBlur") }}</label>
    </div>
    <div class="cell">
      <input
        v-model="lyricBgMode"
        type="radio"
        id="gradient"
        name="lyricBackgroundTips"
        :value="'gradient'"
      />
      <label for="gradient">{{ $t("settings.gradient") }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();

const spreadflower = ref("auto");
const lyricBgMode = ref("blur");
watchEffect(() => {
  spreadflower.value = store.state.settings.spreadflower;
  lyricBgMode.value = store.state.settings.lyricBgMode;
  return store.state.settings.spreadflower;
});
watchEffect(() => {
  store.commit("update_spread_flower", spreadflower.value);
  store.dispatch("postUpdateUser", { spreadflower: spreadflower.value });
  return spreadflower.value;
});
watchEffect(() => {
  store.commit("update_lyric_bg_mode", lyricBgMode.value);
  store.dispatch("postUpdateUser", { lyricBgMode: lyricBgMode.value });
  return spreadflower.value;
});
</script>

<style lang="scss" scoped>
.contant {
  padding: 0 40px;
  .cell {
    // line-height: 30px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    label {
      margin-right: 15px;
      line-height: 32px;
    }

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      border-radius: 50%;
      width: 16px;
      height: 16px;

      border: 2px solid #999;
      transition: 0.2s all linear;
      outline: none;
      margin-right: 10px;

      position: relative;
    }

    input:checked {
      border: 6px solid black;
    }
  }
}
</style>
