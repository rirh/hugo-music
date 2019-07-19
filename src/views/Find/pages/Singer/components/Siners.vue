<style lang="less" scoped>
.siners {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 6vw 0;
  // &-item {
  //   display: flex;
  //   flex-direction: column;
  //   margin: 1vw 0.5vw;
  //   &-img {
  //     height: 14vw;
  //     width: 14vw;
  //   }
  // }
}
.singer-item {
  display: flex;
  flex-direction: column;
  margin: 1vw 0.5vw;
}
.singer-item-img {
  height: 14vw;
  width: 14vw;
}
.singer-item-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 14vw;
}
</style>


<template>
  <a-skeleton :loading="data.length===0" active>
    <div class="siners">
      <div class="singer-item" v-for="(item,index) in data" :key="index">
        <a-avatar
          shape="square"
          class="singer-item-img"
          :onerror="errorImg"
          :src="item&&item.img1v1Url"
          @click="handleMusicDetail(item)"
          alt
        />
        <strong class="singer-item-name">{{item.name}}</strong>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';

@Component({})
export default class Singers extends Vue {
  public errorImg = ERROR_IMG;
  public loadingSinger = true;
  @Prop() public data: any;
  @Watch('data')
  public handleChange(arg: any) {
    this.loadingSinger = false;
  }
  @Emit('on-item')
  public handleitem(item: any) {
    return item;
  }
}
</script>
