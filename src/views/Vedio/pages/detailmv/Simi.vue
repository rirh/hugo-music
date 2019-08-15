<style lang="less" scoped>
.simi {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 1vw;
  &-dt {
    text-align: left;
    width: 100%;
    margin: 0;
  }
  &-lists {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin: 0;
  }

  &-item {
    margin: 0.6em 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-left {
      flex: 0 0 47%;
      position: relative;
    }
    &-playTime {
      position: absolute;
      right: 5px;
      top: 3px;
      color: white;
    }
    &-right {
      flex: 0 0 53%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0 1vw;
      overflow: hidden;
      &-title {
        color: var(--black);
        font-size: 13px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: left;
      }
      &-name {
        color: var(--textColor);
        font-size: 12px;
        margin-top: 1vw;
      }
    }
    &-img {
      height: 8vw;
      width: 100%;
      filter: brightness(80%);
      transition: filter 0.3s;
    }
  }
}
.simi-item:hover .simi-item-img {
  filter: brightness(95%);
}
</style>

<template>
  <div class="simi">
    <h3 class="simi-dt">相关推荐</h3>
    <dl class="simi-lists">
      <dd class="simi-item" @click="handleItem(item)" v-for="(item,index) in data.mvs" :key="index">
        <div class="simi-item-left">
          <a-avatar class="simi-item-img" shape="square" icon="user" :src="item.cover" />
          <span class="simi-item-playTime">
            <AIconfont type="icon-up1-copy" />
            <span>{{transformW(item.playCount)}}</span>
          </span>
        </div>
        <div class="simi-item-right">
          <span class="simi-item-right-title">{{item.name}}</span>
          <span class="simi-item-right-title">{{item.briefDesc}}</span>
          <span class="simi-item-right-name">{{filterName(item.artists)}}</span>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { get_video_url, get_video_group } from '@/actions';
import { transformW, transformatDate } from '@/util/filters';

@Component({ components: {} })
export default class Radio extends Vue {
  @Prop() private data!: any;
  public transformW = (e: any) => transformW(e);
  public handleItem(item: any) {
    this.$emit('on-simi', item);
  }
  public filterName(args: any) {
    let result = '';
    if (args) {
      const temp = args.map((e: any) => e.name);
      if (temp) {
        result = temp.toString();
      }
    }
    return result;
  }
}
</script>
