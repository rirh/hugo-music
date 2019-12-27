<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    font-size: 13px;
    padding: 7px 0;
  }
  .item:hover {
    background-color: var(--stripedHover);
  }
  .name {
    margin-left: 30px;
    background-image: url(/img/coverall.6cb90dbc.png);
    background-position: -2140px 376px;
    height: 82px;
    width: 95px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .albums {
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 20%;

    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      color: var(--black);
      font-weight: bold;
      display: inline-block;
    }
  }
  .artists {
    margin-left: 15%;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    b {
      font-weight: normal;
      color: var(--textColor);
    }
  }
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.striped {
  background-color: var(--striped);
}
</style>

<template>
  <dl class="list">
    <dd
      class="item"
      :class="{'striped':index%2===0}"
      v-for="(album,index) in data.albums"
      :key="album.id"
      @click="handleGoalbum(album)"
    >
      <span class="name">
        <a-avatar
          style="border-radius: 0px;margin:1px 0 0 2px"
          :size="76"
          shape="square"
          icon="user"
          :src="album.picUrl&&album.picUrl"
        />
      </span>

      <span class="albums">
        <span>{{(album.name)}}</span>
      </span>
      <span class="artists">
        {{(album.artists.map(e=>e.name)).join(',')}}
        <b
          v-show="album.artist.alias.map(e=>e).join(',')"
        >（{{album.artist.alias.map(e=>e).join(',')}}）</b>
      </span>
    </dd>
    <div class="pagination">
      <a-pagination
        v-model="current"
        :total="countfilter(data.albumCount)"
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
@Component({})
export default class Albums extends Vue {
  @Prop() public data: any;
  public loading = true;
  public current = 1;
  public count = 0;
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

  public handleGoalbum(item: any) {
    this.$router.push({
      path: '/album-detail',
      query: item,
    });
  }
  @Emit('on-pagination')
  public handleChangeSize(page: any) {
    // this.current = page;
    this.loading = true;
    return page;
  }
}
</script>