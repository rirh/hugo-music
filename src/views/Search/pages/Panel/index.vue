<style lang="less" scoped>
.info {
  strong {
    font-size: 22px;
    color: var(--black);
  }
  span {
    font-size: 13px;
    color: #666;
  }
}
.type {
  padding-bottom: 10px;
  strong {
    font-size: 14px;
    color: #666;
    margin-right: 32px;
    cursor: pointer;
    font-weight: normal;
    transition: all 300ms linear;
  }
  strong:hover {
    color: var(--black);
  }
  .active {
    color: var(--black);
    font-weight: bold;
  }
}
</style>

<template>
  <div>
    <div class="info">
      <strong>{{keywords}}&nbsp;</strong>
      <span>找到 {{count}} {{type}}</span>
    </div>
    <br />
    <div class="type">
      <strong
        v-for="item in types"
        :key="item.value"
        :class="{'active':(~item.label.indexOf(type))}"
        @click="handleChangeType(item)"
      >{{item.label.substring(1,item.label.length)}}</strong>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
@Component({})
export default class Panel extends Vue {
  @Prop() public keywords: any;
  @Prop() public type: any;
  @Prop() public count: any;
  public types = [
    {
      label: '首单曲',
      value: 1,
    },
    {
      label: '位歌手',
      value: 100,
    },
    {
      label: '张专辑',
      value: 10,
    },
    {
      label: '个视频',
      value: 1014,
    },
    {
      label: '个歌单',
      value: 1000,
    },
    {
      label: '首歌词',
      value: 1006,
    },
    {
      label: '个主播电台',
      value: 1009,
    },
    {
      label: '位用户',
      value: 1002,
    },
    {
      label: '首MV',
      value: 1004,
    },
    {
      label: '个综合',
      value: 1018,
    },
  ];
  @Emit('on-item')
  public handleChangeType(item: any) {
    return item;
  }
}
</script>