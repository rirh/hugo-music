<style lang="less" scoped>
.effects {
  padding: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    // background-color: var(--tagBg);
    // color: #333;
    // border-radius: 10px;
    margin: 10px;
    // padding: 10px;
    // width: 50%;
    -webkit-box-sizing: border-box;
    span {
      margin-right: 10px;
      font-weight: bold;
    }
  }
}
</style>

<template>
  <div class="effects">
    <div class="item">
      <span>经典原声</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>测试声音</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>环绕声音</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>低音增强</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>高音增强</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>人声增强</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>人声消除</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>回声缭绕</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <div class="item">
      <span>声道增强</span>
      <a-switch defaultChecked @change="onChange" />
    </div>
    <a-button class="item" @click="$store.commit('set_effects',0)">原声</a-button>
    <a-button class="item" @click="$store.commit('set_effects',1)">测试声音</a-button>
    <a-button class="item" @click="$store.commit('set_effects',2)">环绕声音</a-button>
    <a-button class="item" @click="$store.commit('set_effects',3)">低音增强</a-button>
    <a-button class="item" @click="$store.commit('set_effects',4)">高音增强</a-button>
    <a-button class="item" @click="$store.commit('set_effects',5)">人声增强</a-button>
    <a-button class="item" @click="$store.commit('set_effects',6)">人声消除</a-button>
    <a-button class="item" @click="$store.commit('set_effects',7)">回声缭绕</a-button>
    <a-button class="item" @click="$store.commit('set_effects',8)">声道增强</a-button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({})
export default class Effect extends Vue {
  @Prop() public data: any;
  onChange() {}
}
</script>