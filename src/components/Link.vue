<template>
  <router-link class="link" :to="to"><slot /> </router-link>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  to: String
});
</script>

<style lang="scss" scoped>
.link,
.link:link,
.link:hover,
.link:active {
  text-decoration: none;
  color: inherit;
}
</style>
