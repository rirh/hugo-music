
<style lang="less" scoped>
</style>

<template>
  <a-skeleton :loading="loadingDetail" active>
    
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';
import {
  get_play_song_detail,
  get_play_song_comment,
  get_play_song_subscribers,
} from '@/actions';

@Component({ components: {} })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;

  public loadingDetail = true;


  @Prop() public data: any;

}
</script>
