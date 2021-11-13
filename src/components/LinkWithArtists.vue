<template>
  <Link
    class="LinkWithArtists"
    :to="`/artists/${it.id}`"
    v-for="it in artisits"
    :key="it.id"
  >
    <slot>{{ it.name }}&nbsp;</slot>
  </Link>
</template>

<script setup>
import { defineProps } from "vue";
import Link from "@/components/Link";
defineProps({
  artisits: {
    require: true,
    default: () => [],
    type: Array
  }
});
</script>

<style lang="scss" scoped>
.LinkWithArtists {
  text-decoration: none !important;
  color: inherit!important;
}
.LinkWithArtists:hover {
  text-decoration: underline !important;
}
</style>
