<style lang="less" scoped>

</style>

<template>
  <a-skeleton :loading="loading" active>
    
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { get_video_url, get_video_group } from '@/actions';

@Component({ components: {} })
export default class Radio extends Vue {

}
</script>
