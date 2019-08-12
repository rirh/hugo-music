<style lang="less" scoped>
.newsong {
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
      flex: 0 0 44%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-top: 1px solid #efefef;
      margin: 0 3%;
      padding: 1vw 0;
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
        // display: flex;
        // justify-content: flex-start;
        // align-items: flex-start;
        // flex-direction: column;
        align-self: flex-start;
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
.newsong-newsong-list:hover {
  background-color: var(--stripedHover);
}
</style>

<template>
  <a-skeleton :loading="loading" active>
    <div class="newsong">
      <div class="newsong-newsong">
        <h3 class="newsong-tips" @click="$router.push({path:'/find/latest'})">
          最新音乐
          <AIconfont class="newsong-tips-icon" type="icon-right" />
        </h3>
        <dl class="newsong-newsong-lists">
          <dd
            class="newsong-newsong-list"
            @click="handlePlay(newsong)"
            v-for="(newsong,index) in data"
            :key="index"
          >
            <div class="newsong-newsong-list-left">
              <span class="newsong-newsong-list-left-tips">
                <AIconfont class="newsong-newsong-list-left-tips-icon" type="icon-up1-copy" />
              </span>
              <a-avatar
                shape="square"
                class="newsong-newsong-list-left-img"
                :onerror="errorImg"
                :src="newsong.song.album.picUrl"
                alt
              />
            </div>
            <div class="newsong-newsong-list-index">{{index+1}}</div>
            <div class="newsong-newsong-list-right">
              <div class="newsong-newsong-list-right-name">{{newsong.name}}</div>
              <div class="newsong-newsong-list-right-auth">{{newsong.song.artists[0].name}}</div>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';

@Component({})
export default class Home extends Vue {
  public loading = true;
  public errorImg = ERROR_IMG;
  @Prop() private data!: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loading = false;
    }
  }
  public handlePlay(args: any) {
    const reduceAuth = (a: any, b: any) => a.name || '' + b.name || '';

    const params = {
      id: args.id,
      name: args.name,
      auth: args.song.artists
        .map((e: any) => e.name)
        .toString()
        .split(',')
        .join('/'),
      image: args.song.album.picUrl,
      duration: args.song.duration,
    };
    this.$store.commit('updata_music_data', params);
  }
}
</script>
