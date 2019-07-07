<style lang="less" scoped>
.tags {
  display: flex;
  align-items: center;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &-left {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 10px;
    border: 1px solid var(--borderColor);
    border-radius: 20px;
    flex: 0 0 14%;

    &-text {
      font-weight: 400;
    }
    &-icon {
      font-size: 24px;
      color: var(--borderColor);
    }
  }
  &-right {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    &-tag:hover {
      font-weight: bold;
    }
  }
}
.types-all {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid var(--borderColor);
  margin-bottom: 1vw;
  font-weight: bold;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.types {
  display: flex;
  width: 73vw;
  flex-direction: column;
  overflow: scroll;
  height: 25vw;
  &-dl {
    display: flex;

    &-dt {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex: 0 0 5%;
    }
    &-list {
      display: flex;
      flex-wrap: wrap;
      flex: 0 0 95%;
      &-dd {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        width: 100px;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
}
</style>

<template>
  <a-skeleton :loading="loadingTag" active>
    <div class="tags">
      <a-popover placement="bottomLeft" v-model="showhot" trigger="click">
        <template slot="content">
          <div class="types-all" @click="handleType({name:'全部歌单'})">全部歌单</div>
          <div class="types">
            <dl class="types-dl" v-for="(values,key) in types" :key="key">
              <dt class="types-dl-dt">{{key}}</dt>
              <div class="types-dl-list">
                <dd
                  class="types-dl-list-dd"
                  v-for="(type,index) in values"
                  :key="index"
                  @click="handleType(type)"
                >{{type.name}}</dd>
              </div>
            </dl>
          </div>
        </template>
        <div class="tags-left" type="primary">
          <span class="tags-left-text">{{cursor}}</span>
          <AIconfont class="tags-left-icon" type="icon-chevron-right" />
        </div>
      </a-popover>
      <div class="tags-right">
        <span
          class="tags-right-tag"
          @click="handleType(tag)"
          v-for="(tag,index) in data"
          :key="index"
        >{{tag.name}}</span>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_cat_list } from '@/actions';
import { groupBy } from 'lodash';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public loadingTag = false;
  public showhot = false;
  public types = {};
  public cursor = '全部歌单';
  @Prop() public data: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loadingTag = false;
    }
  }
  public handleType(type: any) {
    if (this.showhot) {
      this.showhot = !this.showhot;
    }
    this.cursor = type.name;
    this.$emit('on-type', type);
  }
  public async mounted() {
    const { code, categories, sub } = await get_cat_list();
    if (code !== 200) {
      return;
    }
    this.types = this.mergeTypes(categories, sub);
  }
  public mergeTypes(categories: any, sub: any) {
    const result: any = {};
    const subs = groupBy(sub, 'category');
    for (const key in categories) {
      if (categories.hasOwnProperty(key)) {
        const element = categories[key];
        result[element] = subs[key];
      }
    }
    return result;
  }
}
</script>
