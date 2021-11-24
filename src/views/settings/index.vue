<template>
  <h1 style="padding-left:20px">设置</h1>
  <div class="settings">
    <div class="cell">
      <label for="theme">外观</label>
      <select
        @change="hanedleChangeTheme"
        name="theme"
        class="theme"
        id="theme"
        v-model="appearance"
      >
        <option value="auto">😋&nbsp;自动</option>
        <option value="light">🌕&nbsp;浅色</option>
        <option value="dark">🌑&nbsp;深色</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const appearance = ref("auto");
onMounted(() => {
  appearance.value = store.state.settings.appearance;
});
const hanedleChangeTheme = () => {
  store.dispatch("chengeApparance", appearance.value);
};
</script>

<style lang="scss" scoped>
.settings {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 720px;
    margin: 0 20px;
    label {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.78;
    }
    select {
      min-width: 192px;
      font-weight: 600;
      border: none;
      padding: 8px 12px 8px 12px;
      border-radius: 8px;
      color: var(--color-text);
      background: var(--color-secondary-bg);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
}
</style>
