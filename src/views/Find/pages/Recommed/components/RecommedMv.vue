<style lang="less" scoped>
.recommedmv {
  padding: 1vw;
  &-tips {
    text-align: left;
    margin-left: 1vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-icon {
      font-size: 24px;
    }
  }
  &-recommedmvs {
    padding: 10px;
    width: 100%;
    &-main {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      &-list {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        cursor: pointer;

        &-tips {
          position: absolute;
          right: 16px;
          top: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          color: white;
        }
        &-toptips {
          position: absolute;
          top: 0;
          left: 0;
          width: 90%;
          padding: 10px 7px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          opacity: 0;
          margin-left: 5%;
          background: rgba(9, 0, 0, 0.8);
          font-size: 12px;
          z-index: 1;
          font-weight: 450;
          transition: all linear 300ms;
          border-radius: 5px;
        }
        &-img {
          border-radius: 5px;
          height: 100%;
          width: 90%;
          overflow: hidden;
          object-fit: cover;
          filter: brightness(80%);
        }
        &-name {
          font-size: 13px;
          text-align: left;
          padding: 5px 0;
          // word-break: break-all;
          width: 90%;
          color: #333;
          font-weight: 450;
          &-title {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.recommedmv-recommedmvs-main-list:hover .recommedmv-recommedmvs-main-list-img {
  filter: brightness(95%);
}
.recommedmv-recommedmvs-main-list:hover .recommedmv-recommedmvs-main-list-tips {
  opacity: 0;
}
.recommedmv-recommedmvs-main-list:hover
  .recommedmv-recommedmvs-main-list-toptips {
  opacity: 0.7;
   top: 0;
}
</style>

<template>
  <a-skeleton :loading="loadingRecommedmv" active>
    <div class="recommedmv">
      <div class="recommedmv-recommedmvs">
        <h3 class="recommedmv-tips">
          推荐MV
          <AIconfont class="recommedmv-tips-icon" type="icon-right" />
        </h3>
        <div class="recommedmv-recommedmvs-main">
          <div
            @click="handleItem(recommedmv)"
            v-for="(recommedmv,index) in data"
            :key="index"
            class="recommedmv-recommedmvs-main-list"
          >
            <span class="recommedmv-recommedmvs-main-list-tips">
              <AIconfont class="recommedmv-recommedmvs-list-playcount-logo" type="icon-up1-copy" />
              <span
                class="recommedmv-recommedmvs-list-playcount-count"
              >{{transformW(recommedmv.playCount)}}</span>
            </span>
            <span class="recommedmv-recommedmvs-main-list-toptips">{{recommedmv.copywriter}}</span>
            <a-avatar
              shape="square"
              :onerror="errorImg"
              class="recommedmv-recommedmvs-main-list-img"
              :src="recommedmv.picUrl"
              alt
            />

            <div class="recommedmv-recommedmvs-main-list-name">
              <div
                class="recommedmv-recommedmvs-main-list-name-title"
              >{{recommedmv.name.length>20?`${recommedmv.name.substring(0,20)}...`:recommedmv.name}}</div>
              <div style="color:#999">{{recommedmv.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_video_detail, get_mv_detail } from '@/actions';
@Component({})
export default class Home extends Vue {
  public loadingRecommedmv = true;
  public errorImg = ERROR_IMG;
  @Prop() private data!: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loadingRecommedmv = false;
    }
  }

  public async handleItem(item: any) {
    const res = await get_mv_detail(`mvid=${item.id}`);
    if (res.code === 200) {
      this.$router.push({
        path: '/mv-detail',
        query: res,
      });
      this.$store.commit('update_vedio_cursor', res);
      this.$store.commit('update_show_vedio_page', true);
    }
  }
  /**
   * 转化为万做单位函数
   */
  public transformW(args: any) {
    let result: any = 0;
    const batter = 10000;
    const cursor = Number(args);
    if (!isNaN(cursor)) {
      if (cursor > batter) {
        const value = Math.floor(cursor / batter);
        result = `${value}万`;
      } else {
        result = cursor;
      }
    }
    return result;
  }
}
</script>
