<template>
  <div>
    <Albums v-bind="$attrs" path="playlist" />
  </div>
</template>

<script setup>
import Albums from "@/components/Albums";
</script>

<style lang="scss" scoped></style>
