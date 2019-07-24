<style lang="less" scoped>
.tabs {
  text-align: left;
}
.tabs /deep/ .ant-tabs-bar {
  margin: 0;
}
.comment {
  text-align: center;
  margin: 2vw 0 8vw 0;
}
</style>

<template>
  <a-skeleton :loading="loadingDetail" active>
    <a-tabs v-model="active" class="tabs" defaultActiveKey="1" @change="changeTabs">
      <a-tab-pane class="tasb-list" tab="歌曲列表" key="1">
        <Song :data="songs" />
      </a-tab-pane>
      <a-tab-pane :tab="`评论 ${data.info&&data.info.commentCount}`" key="2" forceRender>
        <div class="comment">
          <Comment :data="comments" />
          <br />
          <a-pagination
            @change="handlePage"
            v-model="commentscurrent"
            :defaultPageSize="20"
            :total="comments.total"
          />
        </div>
      </a-tab-pane>
      <a-tab-pane tab="专辑详情" key="3">
        <div class="comment">
          <p style="text-align:left">{{data.description}}</p>
        </div>
      </a-tab-pane>
      <!-- <a-button slot="tabBarExtraContent">Extra Action</a-button> -->
    </a-tabs>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';
import {
  get_play_song_detail,
  get_album_comment,
  get_play_song_subscribers,
} from '@/actions';
import Song from './Song.vue';
import Comment from './Comment.vue';

@Component({ components: { Song, Comment } })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public showDescription = false;
  public active = '1';
  public loadingDetail = true;
  public songs = [];
  public comments = [];
  public commentscurrent = 1;
  public makers = [];
  public makerscurrent = 1;

  @Prop() public data: any;
  @Prop() public playlist: any;

  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, false);
  @Watch('data')
  public async handleChange(arg: any) {
    if (arg) {
      this.loadingDetail = false;
      this.songs = this.playlist;
    }
  }
  public handlePage(e: any) {
    this.commentscurrent = e;
    this.initComment();
  }
  public async initComment() {
    const { id } = this.data;
    const res = await get_album_comment(
      `id=${id}&offset=${(this.commentscurrent - 1) * 20}`,
    );
    if (res.code === 200) {
      this.comments = res;
    }
  }
  public async initMakers() {
    const { id } = this.playlist;
    const res = await get_play_song_subscribers(
      `id=${id}&offset=${(this.makerscurrent - 1) * 20}`,
    );
    if (res.code === 200) {
      this.makers = res.subscribers;
    }
  }

  public async changeTabs(a: any) {
    if (a === '2') {
      if (this.comments.length === 0) {
        this.initComment();
      }
    }
    if (a === '3') {
      if (this.makers.length === 0) {
        this.initMakers();
      }
    }
  }
}
</script>
