<template>
  <div class="app-container">
    <h1>For You</h1>
    <div class="box">
      <div class="fr-2"></div>
      <div class="fr-2"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getPersonalizedNewsong } from "@/api";
onMounted(() => {
  getPersonalizedNewsong().then(response => {
    console.log(response);
  });
});
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  background-color: #fff;
  .box {
    display: grid;
    gap: 44px 24px;
  }
  .fr-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
