<style lang="less" scoped>
</style>

<template>
  <a-skeleton :loading="loadingSongs" active>
    <table>
      <tr v-for="(item,index) in columns" :key="index">
        <th>{{item.name}}</th>
      </tr>

      <tr v-for="(item,index) in data" :key="index">
        <td>{{index+1}}</td>
        <td>{{item.al&&item.al.name}}</td>
        <td>{{item.al&&item.ar[0].name}}</td>
        <td>{{item&&item.name}}</td>
        <td>{{transformTimer(item&&item.dt/1000)}}</td>
      </tr>
    </table>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_play_song_detail } from '@/actions';
import { transformTimer } from '@/util/filters';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  @Prop() public data: any;
  public showDescription = false;
  public loadingSongs = true;

  public columns = [
    {
      name: 'icon',
      key: 'icon',
    },
    {
      name: '音乐标题',
      key: 'name',
    },
    {
      name: '歌手',
      key: 'ar',
    },
    {
      name: '专辑',
      key: 'name',
    },
    {
      name: '时长',
      key: 'name',
    },
  ];
  public transformTimer = (e: any) => transformTimer(e);
  @Watch('data')
  public handleChange(arg: any) {
    if (arg) {
      this.loadingSongs = false;
    }
  }
}
</script>
