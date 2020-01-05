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
      border: 1px solid var(--line);
    }
    .card {
      box-shadow: 0px 2px 2px #efefef;
      -webkit-box-shadow: 0px 2px 2px #efefef;
      -moz-box-shadow: 0px 2px 2px #efefef;
    }
    .song {
      background-color: var(--line);
      border-radius: 5px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      margin-top: 10px;
      .songfaq {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
      }
    }
    .vedio {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 10px;
      border: 1px solid var(--line);
    }
  }
}
</style>

<template>
  <div class="detail">
    <dl>
      <dd class="list" v-for="(item,index) in params.event" :key="index">
        <a-card class="card" :style="'width: 100%;border-radius:10px'">
          <div>
            <a-avatar
              class="avatar"
              :size="40"
              icon="user"
              :src="item.user.avatarUrl&&item.user.avatarUrl"
            />
            <strong style="margin-left:15px;font-size:13px">{{item.user.nickname}}</strong>
          </div>

          <div class="con">
            <div>{{ JSON.parse(item.json).msg}}</div>
            <div class="song" v-if="JSON.parse(item.json).song">
              <a-avatar
                :size="40"
                shape="square"
                icon="user"
                :src="JSON.parse(item.json).song.album.picUrl"
              />
              <span class="songfaq">
                <span>{{JSON.parse(item.json).song.album.name}}</span>
                <span>{{JSON.parse(item.json).song.album.artists.map(e=>e.name).toString()}}</span>
              </span>
            </div>
            <div class="video" v-if="JSON.parse(item.json).video">
              <a-avatar
                class="vedio"
                shape="square"
                icon="user"
                :style="`height:60vh`"
                :src="JSON.parse(item.json).video.coverUrl"
              />
            </div>
          </div>
        </a-card>
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