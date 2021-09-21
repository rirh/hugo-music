<template>
  <div>
    123123
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { getSearchMultimatch } from "@/api";
const route = useRoute();
onMounted(async () => {
  const { result, code } = getSearchMultimatch(route.params);
  if (code !== 200) return;
  console.log(result);
});
</script>

<style lang="scss" scoped></style>
