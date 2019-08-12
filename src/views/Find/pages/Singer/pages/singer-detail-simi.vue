<style lang="less" scoped>
.wapper {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 1vw 2vw 9vw 2vw;
}
.list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  &-item {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    &-album {
      &-img {
        border-radius: 5px;
        filter: brightness(80%);
      }
    }
    &-name {
      margin-top: 0.5vw;
      font-weight: 500;
    }
    &-time {
      margin: 0.8vw 0;
      font-size: 12px;
      color: #999;
    }
  }
}
.list-item-album-img:hover {
  filter: brightness(95%);
}
</style>

<template>
  <a-skeleton :loading="!data.artists" active>
    <div class="wapper">
      <dl class="list">
        <dd
          class="list-item"
          @click="handleGoSinger(item)"
          v-for="(item,index) in data.artists"
          :key="index"
        >
          <div class="list-item-album">
            <a-avatar
              shape="square"
              class="list-item-album-img"
              :size="130"
              :onerror="errorImg"
              :src="item.img1v1Url"
              alt
            />
          </div>
          <strong class="list-item-name">{{item.name}}</strong>
        </dd>
      </dl>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { get_artist_desc } from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { transformatDate } from '@/util/filters';

@Component({})
export default class Album extends Vue {
  public errorImg = ERROR_IMG;
  public loading = true;
  @Prop() public data: any;
  public transformatDate = (e: any) => transformatDate(e, false);
  public handleGoSinger(item: any) {
    this.$router.push({
      path: '/singer',
      query: item,
    });
  }
}
</script>
