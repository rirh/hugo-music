<style lang="less" scoped>
.wapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1vw 2vw 9vw 2vw;
}
pre {
  font-size: 12px;
  color: #888;
  letter-spacing: 0.8px;
  line-height: 20px;
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  white-space: pre-line;
}
.lists {
  display: flex;
  flex-direction: column;
}
strong {
  font-size: 16px;
}
</style>

<template>
  <a-skeleton :loading="!data.introduction" active>
    <div class="wapper">
      <strong>简介</strong>
      <br />
      <pre>{{data.briefDesc}}</pre>
      <br />
      <dl class="lists" v-for="(item,index) in data.introduction" :key="index">
        <dt>
          <strong>{{item.ti}}</strong>
        </dt>
        <br />
        <pre v-html="item.txt"></pre>
      </dl>
      <br />
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { get_artist_desc } from '@/actions';
import { ERROR_IMG } from '@/constant/api';

@Component({})
export default class Descs extends Vue {
  public errorImg = ERROR_IMG;
  public loading = true;
  @Prop() public data: any;
}
</script>
