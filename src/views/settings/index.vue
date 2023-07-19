<template>
  <div class="settings">
    <div class="left">
      <h1 class="title">
        {{ $t("settings.settings") }}
      </h1>

      <Link to="/settings/account/" v-if="userinfo._id">
        <div class="cell" :class="{ active: route.name === 'account' }">
          {{ $t("settings.account") }}
          <svg-icon class="arrow" icon-class="arrow-right" />
        </div>
      </Link>
      <Link v-else to="/login">
        <div class="cell" :class="{ active: route.name === 'account' }">
          {{ $t("settings.account") }}
        </div>
      </Link>
      <Link to="/settings/general/">
        <div class="cell" :class="{ active: route.name === 'general' }">
          {{ $t("settings.general") }}
          <svg-icon class="arrow" icon-class="arrow-right" />
        </div>
      </Link>
      <Link to="/settings/theme/">
        <div class="cell" :class="{ active: route.name === 'theme' }">
          {{ $t("settings.theme") }}
          <svg-icon class="arrow" icon-class="arrow-right" />
        </div>
      </Link>
      <Link to="/settings/language/">
        <div class="cell" :class="{ active: route.name === 'language' }">
          {{ $t("settings.language") }}
          <svg-icon class="arrow" icon-class="arrow-right" />
        </div>
      </Link>
      <br />
      <div class="cell" @click="handle_logout" v-if="userinfo._id">
        <strong> {{ $t("settings.logout") }}</strong>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
  <!-- <h1 style="padding-left:20px">设置</h1>
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
    <div class="cell">
      <label for="theme">语言</label>
      <select
        @change="hanedleChangelang"
        name="theme"
        class="theme"
        id="theme"
        v-model="appearance"
      >
        <option value="auto"></option>
        <option value="light">🌕&nbsp;浅色</option>
        <option value="dark">🌑&nbsp;深色</option>
      </select>
    </div>
  </div> -->
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import Link from "@/components/Link";
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const route = useRoute();
const router = useRouter();
const userinfo = computed(() => store.state.settings.userinfo);
const handle_logout = () => {
  store.commit("update_userinfo", {});
  router.push("/settings");
};
</script>

<style lang="scss" scoped>
.settings {
  display: flex;
  // min-height: 80vh;
  height: 70vh;
  margin-bottom: 10px;
  overflow: hidden;

  .left {
    width: 30vw;
    min-width: 200px;
    padding: 35px 0;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid rgba(var(--color-hover-primary-rgb), 0.1);
    .title {
      padding-left: 40px;
      text-transform: capitalize;
    }
  }
  .right {
    flex: 1;
    padding: 35px 0;
    height: 100%;
    overflow: hidden;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 55px;
    padding: 0 40px;
    box-sizing: border-box;
    height: 55px;
    cursor: pointer;
    text-transform: capitalize;
    // width: 720px;
    // margin: 3px 20px;
    .arrow {
      height: 30px;
      width: 30px;
      color: var(--text-primary);
      opacity: 0.6;
    }
    label {
      font-size: 16px;
      font-weight: 500;
      opacity: 0.78;
    }
    select {
      min-width: 192px;
      font-weight: 600;
      padding: 8px 12px 8px 12px;
      border-radius: 8px;
      border: none;
      color: var(--color-text);
      background: var(--color-secondary);
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
  .cell:hover {
    // box-shadow: rgb(0 0 0 / 2%) 0px 0px 7px 6px;
    // border: 1px solid var(--color-secondary);
    background: var(--color-secondary-bg-for-transparent);
  }
  .active {
    // box-shadow: rgb(0 0 0 / 2%) 0px 0px 7px 6px;
    // border: 1px solid var(--color-secondary);
    background: var(--color-secondary);
  }
}
</style>
