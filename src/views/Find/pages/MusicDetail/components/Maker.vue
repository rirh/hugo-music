<style lang="less" scoped>
.makers {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    flex: 0 0 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-img {
      width: 8vw;
      height: 8vw;
      margin-right: 2vw;
    }
    &-right {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      &-name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: left;
      }
    }
  }
}
</style>

<template>
  <a-skeleton :loading="loadingSongs" active>
    <dl class="makers">
      <dd class="makers-item" v-for="(item ,index) in data" :key="index">
        <a-avatar class="makers-item-img" :onerror="errorImg" :src="item.avatarUrl" alt />
        <span class="makers-item-right">
          <span class="makers-item-right-name">
            <span>{{item.nickname}}&nbsp;</span>
            <AIconfont
              :style="{color:item.gender?'var(--red)':'var(--link)'}"
              :type="item.gender?'icon-woman':'icon-man'"
            />
          </span>
          <span>{{item.signature}}</span>
        </span>
      </dd>
    </dl>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_play_song_detail } from '@/actions';
import { transformTimer, leftpad, scliceValue } from '@/util/filters';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  @Prop() public data: any;
  public showDescription = false;
  public loadingSongs = true;


  @Watch('data')
  public handleChange(arg: any) {
    if (arg) {
      this.loadingSongs = false;
    }
  }

}
</script>
