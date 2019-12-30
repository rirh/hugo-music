<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 30px;
  .item {
    display: flex;
    font-size: 13px;
    padding: 7px 0;
    width: 33%;
    position: relative;
    flex-direction: column;
    .playtime {
      position: absolute;
      right: 7%;
      top: 10px;
      color: white;
      font-size: 12px;
      font-weight: 500;
    }
    .durationms {
      position: absolute;
      right: 7%;
      top: 120px;
      color: white;
      font-size: 12px;
      font-weight: 500;
    }
  }
  // .item:hover {
  //   background-color: var(--stripedHover);
  // }
  .cover {
    width: 93%;
    margin-left: 3%;
    height: 130px;
    overflow: hidden;
    object-fit: cover;
    background-size: 100%;
    filter: brightness(80%);
  }
  .cover:hover {
    cursor: pointer;
    transition: filter 0.3s;
    filter: brightness(1.1) contrast(110%);
  }
}
.info {
  margin-bottom: 15px;
  div {
    width: 94%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    font-weight: 500;
    margin: 5px 3%;
    color: var(--black);
  }
  p {
    width: 94%;
    margin-left: 3%;
    font-size: 12px;
    // margin: 0;
    color: var(--textColor);
  }
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>

<template>
  <dl class="list">
    <dd
      class="item"
      :class="{'striped':index%2===0}"
      v-for="(mv,index) in data.mvs"
      :key="mv.id"
      @click="handleGoalbum(mv)"
    >
      <a-avatar class="cover" shape="square" icon="user" :src="mv.cover&&mv.cover"></a-avatar>
      <span class="playtime">
        <AIconfont class="icon heart" type="icon-up1-copy"></AIconfont>
        {{transformW(mv.playCount)}}
      </span>
      <span class="durationms">{{transformTimer(mv.duration/1000)}}</span>
      <div class="info">
        <div>{{mv.name}}</div>
        <p>by&nbsp;{{mv.artists.map(e=>e.name).join(',')}}</p>
      </div>
    </dd>
    <div class="pagination">
      <a-pagination
        v-model="current"
        :total="countfilter(data.mvCount)"
        :defaultPageSize="100"
        @change="handleChangeSize"
      />
    </div>
  </dl>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import {
  transformW,
  transformatDate,
  transformTimer,
  leftpad,
} from '@/util/filters';
import { get_mv_detail } from '@/actions';
@Component({})
export default class Mvs extends Vue {
  @Prop() public data: any;
  public loading = true;
  public current = 1;
  public count = 0;
  public transformW = (e: any) => transformW(e);
  public transformTimer = (e: any) => transformTimer(e);
  public countfilter(count: number) {
    let result = 0;
    if (count) {
      result = count;
      this.count = count;
    } else {
      result = this.count;
    }
    return result;
  }

  public async handleGoalbum(item: any) {
    const res = await get_mv_detail(`mvid=${item.id}`);
    if (res.code === 200) {
      this.$store.commit('update_vedio_cursor', res);
      this.$store.commit('update_show_vedio_page', true);
      this.$router.push({
        path: '/mv-detail',
        query: res,
      });
    }
  }
  @Emit('on-pagination')
  public handleChangeSize(page: any) {
    // this.current = page;
    this.loading = true;
    return page;
  }
}
</script>