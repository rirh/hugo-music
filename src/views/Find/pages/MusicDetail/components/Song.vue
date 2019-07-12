<style lang="less" scoped>
.table {
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  margin-bottom: 8vw;
  &-tips {
    display: flex;
    justify-content: center;
    align-content: center;
    &-index {
      font-size: 13px;
    }
    &-heart {
      font-size: 16px;
    }
    &-down {
      font-size: 16px;
    }
  }
  &-song {
    color: var(--black);
  }
  &-auth {
    color: var(--black);
  }
  &-dj {
    color: var(--black);
  }
  &-dt {
    color: var(--tipsColor);
  }
}

.table td,
.table th {
  padding: 0.5vw;
  vertical-align: top;
}
.table td {
  font-size: 13px;
}
.table th {
  color: var(--tipsColor);
  font-size: 13px;
}
.striped {
  background-color: var(--striped);
}

.table tr:hover {
  background-color: var(--stripedHover);
}
.table th:hover {
  background-color: var(--stripedHover);
}
</style>

<template>
  <a-skeleton :loading="loadingSongs" active>
    <table class="table table-striped">
      <th v-for="(column) in columns" :key="column.name">{{column.name}}</th>
      <tr
        :class="{'striped':index%2===0}"
        v-for="(item,index) in data"
        :key="index"
        @dblclick="handleSong(item)"
      >
        <td class="table-tips">
          <span class="table-tips-index">{{leftpad(index+1)}}&nbsp;&nbsp;&nbsp;</span>
          <AIconfont
            :style="{color:item.mark?'':'var(--red)'}"
            class="table-tips-heart"
            :type="item.mark?'icon-heart-outline':'icon-heart'"
          />&nbsp;
          <AIconfont class="table-tips-down" type="icon-package-down" />
        </td>
        <td class="table-song">{{scliceValue(item&&item.al.name,22)}}</td>
        <td class="table-auth">{{scliceValue(item.al&&item.ar[0].name,9)}}</td>
        <td class="table-dj">{{scliceValue(item&&item.name,22)}}</td>
        <td class="table-dt">{{transformTimer(item&&item.dt/1000)}}</td>
      </tr>
    </table>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ERROR_IMG } from "@/constant/api";
import { get_play_song_detail } from "@/actions";
import { transformTimer, leftpad, scliceValue } from "@/util/filters";

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  @Prop() public data: any;
  public showDescription = false;
  public loadingSongs = true;

  public columns = [
    {
      name: "",
      key: "icon"
    },
    {
      name: "音乐标题",
      key: "name"
    },
    {
      name: "歌手",
      key: "ar"
    },
    {
      name: "专辑",
      key: "name"
    },
    {
      name: "时长",
      key: "name"
    }
  ];
  public transformTimer = (e: any) => transformTimer(e);
  public leftpad = (e: any) => leftpad(e, 2, 0);
  public scliceValue = (e: any, len: any) => scliceValue(e, len);

  @Watch("data")
  public handleChange(arg: any) {
    if (arg) {
      this.loadingSongs = false;
    }
  }
  public handleSong(item: any) {
    const reduceAuth = (a: any, b: any) => a.name || "" + b.name || "";

    const params = {
      id: item.id,
      name: item.al.name,
      auth: item.ar.reduce(reduceAuth, ""),
      image: item.al.picUrl,
      duration: item.dt
    };
    this.$store.commit("updata_music_data", params);
  }
}
</script>
