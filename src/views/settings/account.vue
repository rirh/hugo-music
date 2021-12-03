<template>
  <div class="account">
    <h1>我的账户</h1>
    <div class="contant">
      {{ userinfo }}
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();
const userinfo = computed(() => store.state.settings.userinfo);
</script>

<style lang="scss" scoped>
.account {
  padding: 0 40px;
  .contant {
    width: 500px;
    white-space: break-spaces;
    overflow: scroll;
  }
}
</style>
