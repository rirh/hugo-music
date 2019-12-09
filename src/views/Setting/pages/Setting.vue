<style lang="less" scoped>
.wapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 3vw;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
  padding-bottom: 20vh;
  .btn {
    border-radius: 20px;
    margin: 10px 15px 10px 0;
    padding: 2px 21px;
    font-size: 13px;
    outline: none;
    color: var(--black);
  }

  .hr {
    width: 100%;
    height: 1px;
    background-color: #efefef;
    border: none;
  }
  .header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  }
  .gem {
    width: 100%;
    input {
      margin-right: 10px;
    }
  }
}
.th {
  display: flex;
}
.icon {
  font-size: 20px;
  margin: 0px 10px;
  height: 30px;
  width: 30px;
  display: inline-block;
  background: var(--tagBg);
  text-align: center;
  border-radius: 50%;
  vertical-align: middle;
  line-height: 30px;
}
strong {
  color: var(--black);
  font-size: 15px;
}

p {
  font-size: 13px;
  margin: 0 0 5px;
  color: var(--black);
}
input[type="text"] {
  outline: none;
  border: 1px solid #d6d6d6;
  border-radius: 4px;
  height: 100%;
  padding: 0 10px;
}
input[type="radio"],
input[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  // border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 1px solid var(--textColor);
  transition: 0.2s all linear;
  outline: none;
}

input:checked {
  border: 6px solid var(--red);
}

input[type="radio"] {
  border-radius: 50%;
}
input[type="checkbox"] {
  border-radius: 25%;
}
.row {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
}

div {
  color: var(--black);
}
div span {
  color: var(--tipsColor);
}
th {
  color: var(--tipsColor);
  font-size: 13px;
  font-weight: normal;
}
td {
  font-size: 13px;
  width: 33%;
  padding: 10px 0 0;
  height: 45px;
}
table {
}
.btn:active {
  outline: none;
  border: solid 1px var(--tagBg);
  background-color: var(--tipscolor);
  color: var(--tipscolor);
}

label {
  font-size: 12px;
}
</style>

<template>
  <div class="wapper">
    <div class="header" style="width:100%">
      <div style="text-align:left;">
        <strong style="margin-right:10px">帐号</strong>
        <span class="icon">
          <AIconfont type="icon-wechat" />
        </span>
        <span class="icon">
          <AIconfont type="icon-qqchat" />
        </span>
        <span class="icon">
          <AIconfont type="icon-douban" />
        </span>
      </div>
      <br />
      <div>
        <button class="btn">绑定账号</button>
        <button class="btn">修改个人信息</button>
      </div>
      <hr class="hr" />
    </div>
    <br />
    <div class="gem">
      <p>
        <strong>常规</strong>
      </p>
      <div>
        <p>动画:</p>
        <div class="row">
          <input id="amin" type="checkbox" name="amin" />
          <label for="amin">
            禁用动画效果
            <span>（减少部分资源占用）</span>
          </label>
        </div>
        <br />
        <p>
          播放列表：
          <span>单曲、节目</span>
        </p>
        <div class="row">
          <input type="radio" id="doubleclick" name="drone" value="huey" />
          <label for="doubleclick">双击播放单曲时，用当前单曲所在列表替换播放列表</label>
        </div>
        <div class="row">
          <input type="radio" id="only" name="drone" value="huey" />
          <label for="only">双击播放单曲时，仅把当前歌曲添加到当前播放列表</label>
        </div>
        <br />
        <p>播放歌曲时：</p>
        <div class="row">
          <input id="noti" type="checkbox" name="noti" />
          <label for="noti">启动系统播放通知栏</label>
        </div>
        <br />
        <hr class="hr" />
      </div>
      <div class="gem">
        <p>
          <strong>消息与隐私</strong>
        </p>
        <p>私信（接收私信提醒）</p>
        <div class="row">
          <input type="radio" name="mail" id="all" />
          <label for="all">所有人</label>
        </div>
        <div class="row">
          <input type="radio" name="mail" id="mention" />
          <label for="mention">我所关注的人</label>
        </div>
      </div>
      <br />
      <p>通知</p>
      <div class="row">
        <input type="checkbox" id="beenfa" name="fa" />
        <label for="beenfa">歌单被收藏</label>
      </div>
      <div class="row">
        <input type="checkbox" id="thumb" name="fa" />
        <label for="thumb">收到赞</label>
      </div>
      <div class="row">
        <input type="checkbox" id="newfan" name="fa" />
        <label for="newfan">新粉丝</label>
      </div>
      <br />
      <p>推荐动态：</p>
      <div class="row">
        <input type="checkbox" id="remm" name="fa" />
        <label for="remm">
          “朋友”页显示推荐动态
          <span>（关闭后，朋友页将不再出现新的推荐动态）</span>
        </label>
      </div>
      <br />
      <p>我的听歌排行：</p>
      <div class="row">
        <input type="radio" name="top" id="topall" />
        <label for="topall">所有人可见</label>
      </div>
      <div class="row">
        <input type="radio" name="top" id="topmention" />
        <label for="topmention">我所关注的人</label>
      </div>
      <div class="row">
        <input type="radio" name="top" id="mine" />
        <label for="mine">仅我自己可见</label>
      </div>
      <br />
      <p>黑名单设置</p>
      <div>
        <em style="margin-right:20px; font-style:normal">我的黑名单</em>
        <button class="btn">查看</button>
      </div>
      <p>
        <strong>快捷键</strong>
      </p>
      <div>
        <table>
          <tr>
            <th>功能说明</th>
            <th>快捷键</th>
            <th>全局快捷键</th>
          </tr>
          <tr>
            <td>暂停播放</td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>上一首</td>
            <td>
              <input type="text" />
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
        </table>
      </div>
      <br />
      <div class="row">
        <input type="checkbox" id="golbal_shut" />
        <label for="golbal_shut">
          启用全局快捷键
          <span>（云音乐在后台也能响应）</span>
        </label>
        <button class="btn">恢复默认</button>
      </div>
      <div class="row">
        <input type="checkbox" id="media_shut" />
        <label for="media_shut">使用系统媒体快捷键</label>
      </div>
      <br />
      <hr class="hr" />
      <br />
      <div>
        <p>
          <strong>下载设置</strong>
        </p>
        <div>音质选择</div>
        <div class="row">
          <span style="margin-right:20px;color:var(--black)">试听</span>
          <input type="radio" name="try-listen" id="try_low" />
          <label for="try_low">普通</label>
          <input style="margin-left:10px" type="radio" name="try-listen" id="try_high" />
          <label for="try_high">较高</label>
          <input style="margin-left:10px" type="radio" name="try-listen" id="try_best" />
          <label for="try_best">极高</label>
        </div>
        <div class="row">
          <span style="margin-right:20px;color:var(--black)">下载</span>
          <input type="radio" name="dow-listen" id="dow_low" />
          <label for="dow_low">普通</label>
          <input style="margin-left:10px" type="radio" name="dow-listen" id="dow_high" />
          <label for="dow_high">较高</label>
          <input style="margin-left:10px" type="radio" name="dow-listen" id="dow_best" />
          <label for="dow_best">极高</label>
        </div>
      </div>
      <br />
      <div>
        <p>缓存设置：</p>
        <div class="row">
          <span style="color:var(--black)">缓存最大占用量</span>
          <a-slider style="width:20vw" v-model="max_moneny" :tooltipVisible="false" />
          <!-- <input type="range" min="0" max="100" value="10" /> -->
          <span style="margin-right:20px">{{max_moneny}}</span>
          <button class="btn">清除缓存</button>
        </div>
        <br />
        <div>
          <p>音乐命名格式</p>
          <div class="row">
            <input type="radio" name="name_type" id="name_type_songs_name" />
            <label for="name_type_songs_name">歌曲名</label>
          </div>
          <div class="row">
            <input type="radio" name="name_type" id="name_type_songs_name_ar" />
            <label for="name_type_songs_name_ar">歌手-歌曲名</label>
          </div>
          <div class="row">
            <input type="radio" name="name_type" id="name_type_songs_ar_name" />
            <label for="name_type_songs_ar_name">歌曲名-歌手</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class Setting extends Vue {
  @Prop() public data: any;
  // 最大内存占用
  public max_moneny = 30;
}
</script>