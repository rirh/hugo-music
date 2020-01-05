<style lang="less" scoped>
.detail {
  padding: 10px 15px;
  margin-bottom: 100px;

  .list {
    display: flex;
    .con {
      flex: 1;
      padding: 10px 15px;
    }
    .avatar {
    }
  }
}
</style>

<template>
  <div class="detail">
    <dl>
      <dd class="list" v-for="(item,index) in params.event" :key="index">
        <a-avatar
          class="avatar"
          :size="40"
          icon="user"
          :src="item.user.avatarUrl&&item.user.avatarUrl"
        />
        <div class="con">
          <span>{{ JSON.parse(item.json).msg}}</span>
        </div>
      </dd>
    </dl>
  </div>
</template>
<script lang="ts">
import { get_event } from '@/actions';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class Moments extends Vue {
  @Prop() public data: any;
  public params = {};
  public async mounted() {
    this.params = await get_event(`pagesize=30`);
  }
}
</script>