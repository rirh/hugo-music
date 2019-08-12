<style lang="less" scoped>
.wapper {
  padding: 2vw 0;
  margin-left: 1px;
}
.list {
  margin-top: 2vw;
}
.item {
  display: flex;
  align-items: center;
  padding: 0.5vw 3vw;
  &-con {
    margin: 0 0 0 1vw;
    display: flex;
    flex: 1;
  }
}
.item:hover {
  background-color: var(--stripedHover);
}
.striped {
  background-color: var(--striped);
}
</style>

<template>
  <a-skeleton :loading="loading" active>
    <div class="wapper">
      <h3 style="text-align:left;font-size:14px;margin:0 3vw">
        我订阅的电台
        <span style="color:var(--textColor);font-size:12px">({{data.count}})</span>
      </h3>
      <dl class="list">
        <dd
          class="item"
          :class="{'striped':index%2===0}"
          v-for="(item,index) in data.djRadios"
          :key="index"
        >
          <a-avatar :size="60" icon="user" shape="square" :src="item&&item.picUrl" />
          <div class="item-con">
            <span style="color:var(--black);flex:1;text-align:left">{{item.name}}</span>
            <span style="flex:0 0 21%;text-align:left">
              <span style="color:var(--textColor);font-size:12px">by</span>
              {{item.dj&&item.dj.nickname}}
            </span>
            <span style="flex:0 0 18%;color:var(--textColor);font-size:12px">节目{{item.programCount}}</span>
          </div>
        </dd>
      </dl>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { get_dj_sublist } from '@/actions';
@Component({})
export default class Radio extends Vue {
  public loading = true;
  public data = {};
  public async mounted() {
    this.init();
  }
  public async init() {
    this.loading = true;
    const userId = `uid=${this.detail.profile.userId}`;
    const res = await get_dj_sublist(userId);
    this.loading = false;
    if (res.code === 200) { this.data = res; }
  }
  get detail() {
    return this.$store.state.user.userDetail;
  }
}
</script>
