<style lang="less" scoped>
.wapper{
  display: flex;
  flex-direction: column;

  &-list{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex: 1;
    &-img{
      height: 14vw;
      width: 14vw;
    }
    &-top{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
    }
  }
}
</style>

<template>
  <a-skeleton :loading="loadingTop" active>
      <dl  class="wapper">
        <dt></dt>
        <dd class="wapper-list" v-for="(item,index) in list" :key="index">
          <span class="wapper-list-img">
            <a-avatar class="wapper-list-img" shape="square" :onerror="errorImg" :src="item&&item.coverImgUrl" alt />
          </span>
          <span class="wapper-list-top">
            <span class="wapper-list-top-list" v-for="(top,tindex) in item.tracks" :key="tindex">
              <span>{{top.first}}</span>
              <span>{{top.second}}</span>
            </span>
          </span>
        </dd>
      </dl>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_top_list } from '@/actions';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public loadingTop = false;
  public list = [];
  @Prop() public data: any;
  public async mounted() {
    const { code, list } = await get_top_list();
    if (code === 200) { this.list = list; }
  }
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.name) {
      this.loadingTop = false;
    }
  }
}
</script>
