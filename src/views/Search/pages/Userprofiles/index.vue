<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    font-size: 13px;
    padding: 7px 0;
    align-items: center;
  }
  .item:hover {
    background-color: var(--stripedHover);
  }
  .avatarUrl {
    margin-left: 30px;
  }
  .name {
    flex: 1;
    margin-left: 30px;
    color: var(--black);
    font-weight: 500;
    font-size: 14px;
  }
  .trackCount {
    width: 13%;
    color: var(--textColor);
    font-size: 12px;
  }
  .signature {
    width: 30%;
    text-align: left;
    color: var(--textColor);
    font-weight: normal;
    font-size: 12px;
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
      v-for="(userprofile,index) in data.userprofiles"
      :key="userprofile.id"
      @click="handleGoArtist(userprofile)"
    >
      <a-avatar
        class="avatarUrl"
        :size="60"
        icon="user"
        :src="userprofile.avatarUrl&&userprofile.avatarUrl"
      />
      <span class="name">
        {{(userprofile.nickname)}}&nbsp;
        <AIconfont
          class="icon heart"
          :style="{'color':userprofile.gender===2?'var(--red)':'var(--link)'}"
          :type="userprofile.gender===2?'icon-woman':'icon-man'"
        ></AIconfont>
      </span>

      <b class="signature" v-show="userprofile.signature">{{userprofile.signature}}</b>
    </dd>
    <div class="pagination">
      <a-pagination
        v-model="current"
        :total="countfilter(data.userprofileCount)"
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