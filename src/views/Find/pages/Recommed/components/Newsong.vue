<style lang="less" scoped>
.newsong {
  &-tips {
    text-align: left;
    margin-left: 13px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-icon {
      font-size: 24px;
    }
  }
  &-newsong {
    padding: 10px;
    width: 100%;
    &-lists {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    &-list {
      flex: 0 0 42%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-top: 1px solid #efefef;
      margin: 0 4%;
      padding: 5px 0;
      cursor: pointer;

      &-left {
        position: relative;
        &-tips {
          position: absolute;
          height: 25px;
          width: 25px;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          background-color: rgba(255, 255, 255, 0.66);
          &-icon {
            font-size: 18px;
            color: var(--red);
          }
        }
        &-img {
          height: 60px;
          width: 60px;
          border-radius: 5px;
          overflow: hidden;
          object-fit: cover;
        }
      }
      &-index {
        width: 10%;
        color: #999;
      }
      &-right {
        &-name {
          text-align: left;
          font-size: 14px;
          font-weight: 500;
        }
        &-auth {
          text-align: left;
        }
      }
    }
  }
}
</style>

<template>
  <a-skeleton class="newsong" :loading="loading" active>
    <div class="newsong-newsong">
      <h3 class="newsong-tips">
        最新音乐
        <AIconfont class="newsong-tips-icon" type="icon-right" />
      </h3>
      <dl class="newsong-newsong-lists">
        <dd class="newsong-newsong-list" v-for="(newsong,index) in data" :key="index">
          <div class="newsong-newsong-list-left">
            <span class="newsong-newsong-list-left-tips">
              <AIconfont class="newsong-newsong-list-left-tips-icon" type="icon-up1-copy" />
            </span>
            <img class="newsong-newsong-list-left-img" :src="newsong.song.album.picUrl" alt />
          </div>
          <div class="newsong-newsong-list-index">{{index+1}}</div>
          <div class="newsong-newsong-list-right">
            <div class="newsong-newsong-list-right-name">{{newsong.name}}</div>
            <div class="newsong-newsong-list-right-auth">{{newsong.song.artists[0].name}}</div>
          </div>
        </dd>
      </dl>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  loading = true;
  @Prop() private data!: any;
  @Watch("data")
  handleChange(arg: any) {
    if (arg.length > 0) this.loading = false;
  }
}
</script>
