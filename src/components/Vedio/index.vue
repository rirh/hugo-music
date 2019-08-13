<style lang="less" scoped>

</style>

<template>
  <div class="wapper">
    123
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get_song_url, get_check_music, get_user_record } from '@/actions';
import { notification, Modal } from 'ant-design-vue';
import Drawer from '@/components/Drawer';
import { ERROR_IMG } from '@/constant/api';

@Component({ components: { Drawer } })
export default class Music extends Vue {

}
</script>
