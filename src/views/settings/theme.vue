<template>
  <div class="contant">
    <h1>{{ $t("settings.theme") }}</h1>
    <div class="cell">
      <input
        v-model="appearance"
        type="radio"
        id="auto"
        name="theme"
        value="auto"
        checked
      />
      <label for="auto">😋&nbsp; {{ $t("settings.auto") }}</label>
    </div>
    <div class="cell">
      <input
        v-model="appearance"
        type="radio"
        id="light"
        name="theme"
        value="light"
      />
      <label for="light">🌕&nbsp; {{ $t("settings.light") }}</label>
    </div>

    <div class="cell">
      <input
        v-model="appearance"
        type="radio"
        id="dark"
        name="theme"
        value="dark"
      />
      <label for="dark">🌑&nbsp; {{ $t("settings.dark") }}</label>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore();

const appearance = ref("auto");
watchEffect(() => {
  appearance.value = store.state.settings.appearance;
  return store.state.settings.appearance;
});
watchEffect(() => {
  store.dispatch("chengeApparance", appearance.value);
  return appearance.value;
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
