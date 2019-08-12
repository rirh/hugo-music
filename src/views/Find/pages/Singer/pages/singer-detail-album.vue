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
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    &-album {
      width: 150px;
      height: 130px;
      // background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?8661a9c0740afaf20956bb2941b2ecc8");
      background-image: url("../../../../../assets/coverall.png");
      background-position: 0 -845px;
      text-align: left;
      position: relative;
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
  <a-skeleton :loading="!data.hotAlbums" active>
    <div class="wapper">
      <dl class="list">
        <dd
          class="list-item"
          @click="handleGoAlbums(item)"
          v-for="(item,index) in data.hotAlbums"
          :key="index"
        >
          <div class="list-item-album">
            <a-avatar
              shape="square"
              class="list-item-album-img"
              :size="129"
              :onerror="errorImg"
              :src="item.picUrl"
              alt
            />
          </div>
          <strong class="list-item-name">{{item.name}}</strong>
          <span class="list-item-time">{{transformatDate(item.publishTime)}}</span>
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
  public handleGoAlbums(item: any) {
    this.$router.push({
      path: '/album-detail',
      query: item,
    });
  }
}
</script>
