<style lang="less" scoped>
/* For demo */
.wapper {
  width: 100%;
  padding-bottom: 10vh;
  &-order {
    display: flex;
    flex-direction: column;
    margin-top: 5vw;
    align-items: center;
    justify-content: center;
    &-tips {
      color: var(--textColor);
      font-size: 12px;
    }
    &-button {
      background-color: transparent;
      width: 130px;
      border: 1px solid var(--red);
      color: var(--red);
      border-radius: 20px;
      font-weight: 500;
      font-size: 12px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
    }
  }
}
.order-header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &-logo {
    position: absolute;
    left: 0vw;
    top: 0vw;
    font-size: 24px;
    color: var(--textColor);
  }
}
.ordermodal /deep/ .ant-modal-header {
  padding: 12px 10px;
  border: none;
}

.ordermodal /deep/ .ant-modal-body {
  padding: 24px 0;
}
.ordermodal {
  &-main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &-tips {
      color: var(--textColor);
      font-size: 13px;
      font-weight: inherit;
      margin-top: 2vw;
    }
    &-def {
      text-decoration: underline;
      color: #333;
      font-size: 12px;
    }
    &-btn {
      height: 30px;
      border-radius: 20px;
      width: 80px;
      color: var(--bgColor);
      border: none;
      background: -webkit-linear-gradient(180deg, var(--btnRed), var(--red));
      margin: 1vw 0 3vw 0;
    }
    &-lists {
      width: 100%;
    }
    &-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5vw 2vw;
      width: 100%;
      border-bottom: 1px solid var(--line);
      font-size: 13px;
      &-logo {
        font-size: 14px;
      }
    }
    &-list:hover {
      background-color: var(--line);
    }
  }
}
</style>


<template>
  <div class="wapper">
    <Swiper :data="banners" />
    <br />
    <div v-for="(template,index) in templates" :key="index">
      <component :data="template.data" :is="template.component" />
    </div>
    <div class="wapper-order">
      <p class="wapper-order-tips">现在可以根据个人喜好, 自由调整首页栏目顺序啦~</p>
      <button @click="showOrder=true" class="wapper-order-button">调整栏目顺序</button>
    </div>
    <a-modal
      class="ordermodal"
      v-model="showOrder"
      :width="330"
      :mask="false"
      :maskClosable="false"
      :closable="false"
      centered
      :footer="null"
    >
      <template slot="title">
        <div class="order-header">
          <AIconfont class="order-header-logo" @click="showOrder=false" type="icon-close"></AIconfont>
          <h4>调整栏目顺序</h4>
        </div>
      </template>
      <div class="ordermodal-main">
        <p class="ordermodal-main-tips">想调整首页栏目的顺序?按住右边的按钮拖动即可</p>
        <dl class="ordermodal-main-lists">
          <dd class="ordermodal-main-list" v-for="(template,index) in templates" :key="index">
            <span>{{template.name}}</span>
            <a-icon class="ordermodal-main-list-logo" type="align-right" />
          </dd>
        </dl>
        <a class="ordermodal-main-def">恢复默认排序</a>
        <a-button class="ordermodal-main-btn">确认</a-button>
      </div>
    </a-modal>
    <!-- <Recommed :data="recommeds" />
    <Exclusive :data="privates" />
    <Newsong :data="newsongs" />
    <RecommedMv :data="recommedmvs" />
    <DjProgram :data="djprograms" />-->
  </div>
</template>

<script lang="ts">
import Swiper from './components/Swiper.vue';
import Recommed from './components/Recommed.vue';
import Exclusive from './components/Exclusive.vue';
import Newsong from './components/Newsong.vue';
import RecommedMv from './components/RecommedMv.vue';
import DjProgram from './components/DjProgram.vue';
import { Component, Vue } from 'vue-property-decorator';
import {
  get_banner,
  get_personalized,
  get_private_content,
  get_new_song,
  get_personalized_mv,
  get_dj_program,
} from '@/actions';
import axios from 'axios';

@Component({
  components: { Swiper, Recommed, Exclusive, Newsong, RecommedMv, DjProgram },
})
export default class Home extends Vue {
  public showOrder = false;
  private banners = [];
  private templates = [
    {
      name: '推荐歌单',
      component: Recommed,
      data: [],
    },
    {
      name: '独家放送',
      component: Exclusive,
      data: [],
    },
    {
      name: '最新音乐',
      component: Newsong,
      data: [],
    },
    {
      name: '推荐MV',
      component: RecommedMv,
      data: [],
    },
    {
      name: '主播电台',
      component: DjProgram,
      data: [],
    },
  ];

  public async mounted() {
    this.init();
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
  public async init() {
    const respone = await axios.all([
      get_banner(),
      get_personalized(),
      get_private_content(),
      get_new_song(),
      get_personalized_mv(),
      get_dj_program(),
    ]);
    const mergeData = (e: any, i: any) => {
      if (e.code === 200) {
        if (e.banners) {
          this.banners = e.banners;
        }
        if (e.result) {
          this.templates[i - 1].data = e.result;
        }
      }
    };
    respone.forEach(mergeData);
    // const [
    //   bannersRes,
    //   personaRes,
    //   privateRes,
    //   newsongRes,
    //   recommedmvRes,
    //   djprogramRes
    // ] = respone;
    // if (bannersRes.code === 200) {
    //   this.banners = bannersRes.banners;
    // }
    // if (personaRes.code === 200) {
    //   this.recommeds = personaRes.result.slice(0, 10);
    // }
    // if (privateRes.code === 200) {
    //   this.privates = privateRes.result;
    // }
    // if (newsongRes.code === 200) {
    //   this.newsongs = newsongRes.result;
    // }
    // if (recommedmvRes.code === 200) {
    //   this.recommedmvs = recommedmvRes.result;
    // }
    // if (djprogramRes.code === 200) {
    //   this.djprograms = djprogramRes.result;
    // }
  }
}
</script>
