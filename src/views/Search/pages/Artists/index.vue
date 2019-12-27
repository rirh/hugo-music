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
  }
  .artists {
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--black);
    font-weight: bold;
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
      v-for="(artist,index) in data.artists"
      :key="artist.id"
      @click="handleGoArtist(artist)"
    >
      <a-avatar
        class="name"
        :size="60"
        shape="square"
        icon="user"
        :src="artist.img1v1Url&&artist.img1v1Url"
      />
      <span class="artists">
        {{(artist.name)}}
        <b
          v-show="artist.alias.map(e=>e).join(',')"
        >（{{artist.alias.map(e=>e).join(',')}}）</b>
      </span>
    </dd>
    <div class="pagination">
      <a-pagination
        v-model="current"
        :total="countfilter(data.artistCount)"
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
export default class Artists extends Vue {
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

  public handleGoArtist(item: any) {
    this.$router.push({
      path: '/singer',
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