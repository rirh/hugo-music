<template>
  <div
    class="wapper"
    :style="{
      background: style.background
    }"
  >
    <div class="left">
      <div>
        <Image
          class="pic"
          alt=""
          crossorigin="Anonymous"
          :src="detail.picUrl"
          @load="handle_load_back"
        />
      </div>
      <h1
        class="title"
        style="margin-top:30px;opacity: 0.88;"
        :style="{
          color: style.text_color
        }"
      >
        {{ detail.name }}
      </h1>
      <div class="title" style="margin-top:10px;opacity: 0.58;">
        <strong
          class="al-name"
          :title="detail.al_name"
          :style="{
            color: style.text_color
          }"
          @click="handle_go_albums(detail.al_name_id)"
        >
          专辑： <span class="link">{{ detail.al_name }}</span>
        </strong>
        <strong
          class="ar-name"
          :title="detail?.ar_name?.map(it => it.name).toString()"
          :style="{
            color: style.text_color
          }"
        >
          歌手：
          <span
            class="link"
            v-for="(it, i) in detail.ar_name"
            :key="it.id"
            @click="handle_go_artists(it.id)"
            >{{ it.name
            }}{{ i !== detail?.ar_name?.length - 1 ? "/" : "" }}</span
          >
        </strong>
      </div>
      <br />
      <div class="slider">
        <span
          :style="{
            color: style.text_color
          }"
          class="no-select"
          >{{ to_time(current_progress) || "00:00" }}</span
        >
        <vue3-slider
          v-if="detail.picUrl"
          v-model="progress"
          width="70%"
          :height="4"
          :color="style.text_color"
          :max="current_duration"
          track-color="rgba(255,255,255,.18)"
          @drag-start="handle_toggle_play"
          @drag-end="handle_seek"
        />
        <span
          :style="{
            color: style.text_color
          }"
          class="no-select "
          >{{ to_time(current_duration) }}</span
        >
      </div>
      <div class="con-contal">
        <div class="contal" @click.stop="show_effect = true">
          <svg-icon
            class="sub-icon"
            :style="{
              color: style.text_color
            }"
            icon-class="whale"
          />
        </div>
        <div class="contal" @click.stop="handle_toggle_play">
          <svg-icon
            class="play"
            :icon-class="current_state !== 'play' ? 'play' : 'pause'"
            :style="{
              color: style.text_color
            }"
          />
        </div>
        <div class="contal" @click.stop="handle_open_commit">
          <svg-icon
            class="sub-icon"
            icon-class="topic"
            :style="{
              color: style.text_color
            }"
          />
        </div>
      </div>
    </div>
    <div
      class="right"
      v-if="detail.lyric && JSON.stringify(detail.lyric) !== '{}'"
    >
      <ul class="lyric-wapper">
        <template
          v-for="(lyric, i) in Object.values(detail.lyric || {})"
          :key="i"
        >
          <li
            v-if="lyric"
            class="no-select"
            @click="handle_set_seek(detail.lyric_arr_lyric[i])"
            :id="`lyric-${Object.keys(detail.lyric || {})[i]}`"
            :style="{
              color: style.text_color,
              opacity: is_current_lyric(i) ? 1 : 0.5,
              'font-size': is_current_lyric(i) ? '26px' : '24px'
            }"
          >
            {{ lyric }}
          </li>
        </template>
      </ul>
    </div>
    <svg-icon
      class="close"
      icon-class="arrow-down"
      @click.stop="handle_close_dashboard"
      :style="{
        color: style.text_color
      }"
    />
    <Modal
      :show="show_effect"
      :close="handle_close"
      :show-footer="false"
      :click-outside-hide="true"
      title="鲸海音效"
    >
      <div class="box fr-4 effecs">
        <Button
          title="原汁原味，听见音乐的力量"
          @click="handle_set_effects('cancelEffect')"
        >
          原声
        </Button>
        <Button
          title="一般的耳机可用不起这个音效"
          @click="handle_set_effects('delay')"
        >
          人声环绕
        </Button>
        <Button
          title="厚重的感觉如约而至"
          @click="handle_set_effects('lowpassFilter')"
        >
          低音增强
        </Button>
        <Button
          title="婉转清晰的高音"
          @click="handle_set_effects('highpassFilter')"
        >
          高音增强
        </Button>
        <Button
          title="真实重未如此美妙"
          @click="handle_set_effects('enhanceVocal')"
        >
          杜比音效
        </Button>
        <!-- <Button @click="handle_set_effects('stereo')">stereo</Button> -->
        <Button @click="handle_set_effects('removeVocal')">移除人声</Button>
        <Button
          title="左耳伴奏增强，右耳人声增强，请尽情享受3D增强效果"
          @click="handle_set_effects('splitterMerger')"
        >
          3D增强
        </Button>
        <Button title="加入会员和大家一起交流">
          <a
            href="http://signup.tigerzh.com?appname=music"
            target="_blank"
            rel="noopener noreferrer"
          >
            敬请期待
          </a>
        </Button>
      </div>
    </Modal>
    <Modal
      :show="comments.open"
      :close="handle_close_comments"
      :show-footer="false"
      :click-outside-hide="true"
      title="歌曲评论"
    >
      <Comment
        v-for="it in current_comments"
        :key="it.id"
        :avatar="it.user.avatarUrl"
        :auth="it.user.nickname"
        :content="it.content"
        :time="it.time"
        :beReplied="it.beReplied"
      />
      <Skeleton
        style="margin:3%"
        v-if="comments.loading"
        width="74%"
        height="60vh"
        animated
        bg="transparent"
      />
      <div class="loadmore" v-show="comments.more">
        <Button @click="handle_load_more_comments">加载更多</Button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { computed, watch, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import rgbaster from "rgbaster";
import vue3Slider from "vue3-slider";
import Image from "@/components/Image";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Comment from "@/components/Comment";
import Skeleton from "@/components/Skleleton";

const store = useStore();
const router = useRouter();

const style = ref({});
const show_effect = ref(false);
const commentsQuery = reactive({
  limit: 20,
  offset: 0,
  pageSize: 0,
  before: null
});
const comments = reactive({
  open: false,
  more: false
});
const current_duration = computed(
  () => store.state.sound.current_duration || 100
);
const current_progress = computed(() => store.state.sound.current_progress);
const current_state = computed(() => store.state.sound.current_state);
const current_id = computed(() => store.state.sound.current_id);
const current_comments = computed(() => store.state.sound.current_comments);

const play_list = computed(() => store.state.sound.play_list);
const progress = computed({
  get: () => current_progress.value || 0,
  set: () => {}
});

const handle_load_back = () => {
  const url = detail?.value?.picUrl; // 图片地址
  const options = {
    ignore: ["rgb(255,255,255)", "rgb(0,0,0)"], // 要忽略识别的颜色
    scale: 0.6 // 查询时缩小图片，降低精度。换取识别速度提高
  };
  if (!url) return;
  rgbaster(url, options)
    .then(response => {
      const [primary, success] = response;
      style.value = {
        background: `linear-gradient(to top left,${primary.color}, ${success.color})`,
        text_color:
          primary.color
            .replace(new RegExp(/[rgb()]/g), ",")
            .split(",")
            .reduce((e, c) => (c.length ? e + "," + (255 - Number(c)) : e))
            .replace(",", "rgb(") + ")"
      };
    })
    .catch(error => {
      throw error;
    });
};

const detail = computed(() => {
  let result = {};
  if (play_list.value[current_id.value]) {
    const song = play_list.value[current_id.value];
    if (song.songs) {
      const [detail] = song.songs;
      result.name = detail.name;
      result.picUrl = detail.al.picUrl;
      result.al_name = detail.al.name;
      result.al_name_id = detail.al.id;
      result.ar_name = detail.ar;
      result.comments = song?.comments || [];

      const lyr = song?.lrc?.lyric;
      if (lyr) {
        result.origin_lyric = lyr;
        const lyric = lyr.split("\n");
        result.lyric_arr_lyric = lyric;

        let lyric_result = {};
        lyric.forEach(lyri => {
          const [time, value] = lyri.split("]");
          let key = time.substr(1).split(".");
          key.splice(-1, 1);
          lyric_result[key.join(".")] = value;
        });
        result.lyric = lyric_result;
      }
    }
  }
  return result;
});

watch(current_progress, () => {
  const progress = to_time(current_progress.value);
  const times = Object.keys(detail.value.lyric || {});
  if (times.includes(progress)) {
    const el = document.getElementById(`lyric-${progress}`);
    el && el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

const time_to_sec = time => {
  const [m, s] = time.split(":");
  return Number(m * 60) + Number(s);
};

const handle_close_dashboard = () => {
  store.commit("update_dashboard_open", false);
};

const handle_load_more_comments = () => {
  commentsQuery.pageSize = commentsQuery.pageSize + 1;
  commentsQuery.offset = commentsQuery.pageSize * commentsQuery.limit;
  handle_fetch_commit();
};

const is_current_lyric = index => {
  let result = false;
  const lyric = JSON.parse(JSON.stringify(detail.value.lyric));
  const now = current_progress.value;
  const time = time_to_sec(Object.keys(lyric)[index]);
  if (Object.keys(lyric).length > index + 1) {
    const next_time = time_to_sec(Object.keys(lyric)[index + 1]);
    if (now <= next_time && now >= time) {
      result = true;
    }
  }
  return result;
};

const to_time = value => {
  if (!value) return "";
  const m = `${Math.floor((value / 60) % 60)}`.padStart(2, "0"),
    s = `${Math.floor(value % 60)}`.padStart(2, "0");
  return `${m}:${s}`;
};
const handle_open_commit = () => {
  comments.open = true;
  commentsQuery.pageSize = 0;
  store.commit("update_play_list_commit", []);
  handle_fetch_commit();
};
const handle_fetch_commit = () => {
  comments.loading = true;
  store.dispatch("fetch_comment_music", commentsQuery).then(response => {
    comments.more = response.more;
    comments.loading = false;
  });
};

const handle_seek = seek => {
  store.dispatch("seek", seek);
  handle_toggle_play();
};
const handle_set_seek = row => {
  if (/\[(.*?)\]/g.test(row)) {
    const [, time] = /\[(.*?)\]/g.exec(row);
    if (time) {
      let [m, s] = time.split(":");
      const seek = Number(m) * 60 + Number(s);
      store.dispatch("seek", seek);
    }
  }
  // const [] = p1.substring(1,6)
};
const handle_toggle_play = () => {
  store.dispatch("toggle_play");
};
// const handle_show_effec = () => {};
const handle_close = () => {
  show_effect.value = false;
};
const handle_close_comments = () => {
  comments.open = false;
};
const handle_set_effects = type => {
  store.dispatch(type);
};
const handle_go_albums = id => {
  router.push(`/albums/${id}`);
  handle_close_dashboard();
};
const handle_go_artists = id => {
  router.push(`/artists/${id}`);
  handle_close_dashboard();
};
</script>

<style lang="scss" scoped>
.wapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  background-color: var(--color-hover-primary);

  .left {
    flex: 1;
    color: var(--color-primary);
    text-align: left;
    .title {
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
      .al-name {
        width: 20vw;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ar-name {
        width: 20vw;
        overflow: hidden;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .pic {
      margin: 0 auto;
      width: 54vh;
      height: 54vh;
      margin-top: 50px;
      display: block;
      border-radius: 0.75em;
      user-select: none;
      object-fit: cover;
    }

    .slider {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 400px;
      margin: 0 auto;
      span {
        font-size: 15px;
        opacity: 0.58;
        min-width: 28px;
        padding: 10px;
      }
    }
    .con-contal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .contal {
      padding: 10px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      align-self: flex-end;
      margin: 10px 25px;
      .play {
        min-height: 40px;
        min-width: 40px;
        height: 2vw;
        width: 2vw;
        opacity: 1;
        transition: all 0.3s;
      }
      .play:hover {
        opacity: 0.8;
      }
      &:active {
        transform: scale(0.92);
      }
      .sub-icon {
        min-height: 30px;
        min-width: 30px;
        height: 1.5vw;
        width: 1.5vw;
        opacity: 1;
        transition: all 0.3s;
      }
      .sub-icon:hover {
        opacity: 0.8;
      }
      &:active {
        transform: scale(0.92);
      }
    }
  }
  .right {
    width: 40vw;
    color: var(--color-primary);

    .lyric-wapper {
      height: 90vh;
      overflow: auto;
      // margin: 0;
      padding: 0;
      margin-top: 50px;
      li {
        list-style-type: none;
        padding: 10px 30px;
        margin: 0 40px 0 0px;
        font-size: 24px;
        border-radius: 0.75em;
        cursor: pointer;
        opacity: 0.38;
        transition: all 0.3s;
        font-weight: 600;
        letter-spacing: -0.005em;

        &:hover {
          background-color: hsla(0, 0%, 100%, 0.08);
        }
        &:active {
          transform: scale(0.92);
        }
      }
    }
    .lyric-wapper::-webkit-scrollbar {
      display: none;
    }
  }
  .close {
    position: absolute;
    right: 30px;
    top: 30px;
    height: 1.5em;
    width: 1.5em;
    padding: 10px;
    border-radius: 10px;
    opacity: 0.7;
    z-index: 3;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.14);
    transition: all 0.2s;
    &:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.44);
    }
    &:active {
      transform: scale(0.92);
    }
  }
}
.link {
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    text-decoration: underline;
  }
}
.effecs {
  margin-top: 10px;
  gap: 10px 10px;
  button {
    border: none;
    padding: 10px;
    border-radius: 0.75em;
    background-color: var(--color-secondary);
    opacity: 0.6;
    transition: all 200ms;
    a,
    a:link,
    a:hover,
    a:active {
      text-decoration: none;
      color: inherit;
    }
  }
  button:hover {
    opacity: 1;
  }
}
.loadmore {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-content: center;
}

@media only screen and (max-width: 800px) {
  .left {
    display: none;
  }
  .right {
    width: 100% !important;
  }
}
</style>
