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
    margin: 10px 15px;
    padding: 0 15px;
    outline: none;
  }
  .btn:active {
    outline: none;
    background-color: var(--tipscolor);
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
</style>

<template>
  <div class="wapper">
    <div class="header" style="width:100%">
      <div style="text-align:left;">
        <strong>账号</strong>
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
        <p>动画</p>
        <div>
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
        <div>
          <input type="radio" id="doubleclick" name="drone" value="huey" />
          <label for="doubleclick">双击播放单曲时，用当前单曲所在列表替换播放列表</label>
        </div>
        <div>
          <input type="radio" id="only" name="drone" value="huey" />
          <label for="only">双击播放单曲时，仅把当前歌曲添加到当前播放列表</label>
        </div>
        <br />
        <p>播放歌曲时：</p>
        <div>
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
        <div>
          <input type="radio" name="mail" id="all" />
          <label for="all">所有人</label>
        </div>
        <div>
          <input type="radio" name="mail" id="mention" />
          <label for="mention">我所关注的人</label>
        </div>
      </div>
      <br />
      <p>通知</p>
      <div>
        <input type="checkbox" id="beenfa" name="fa" />
        <label for="beenfa">歌单被收藏</label>
      </div>
      <div>
        <input type="checkbox" id="thumb" name="fa" />
        <label for="thumb">收到赞</label>
      </div>
      <div>
        <input type="checkbox" id="newfan" name="fa" />
        <label for="newfan">新粉丝</label>
      </div>
      <br />
      <p>推荐动态：</p>
      <div>
        <input type="checkbox" id="remm" name="fa" />
        <label for="remm">“朋友”页显示推荐动态（关闭后，朋友页将不再出现新的推荐动态）</label>
      </div>
      <br />
      <p>我的听歌排行：</p>
      <div>
        <input type="radio" name="top" id="topall" />
        <label for="topall">所有人</label>
      </div>
      <div>
        <input type="radio" name="top" id="topmention" />
        <label for="topmention">我所关注的人</label>
      </div>
      <div>
        <input type="radio" name="top" id="mine" />
        <label for="mine">仅我自己可见</label>
      </div>
      <br />
      <p>黑名单设置</p>
      <div>
        <span>我的黑名单</span>
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
            <td>John</td>
            <td>Doe</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>Doe</td>
            <td>Doe</td>
          </tr>
          <tr>
            <td>Jane</td>
            <td>Doe</td>
          </tr>
        </table>
       
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class HelloWorld extends Vue {
  @Prop() public data: any;
}
</script>