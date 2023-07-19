<template>
  <div class="Comment">
    <Image
      class="avatar"
      animate="animate__slideIn"
      :src="avatar"
      :alt="auth"
    />
    <div class="contant">
      <div class="title">
        {{ auth }}
        <span class="time">{{
          time ? dayjs(time).format("YYYY/MM/DD") : ""
        }}</span>
      </div>
      <div class="con">
        <div>{{ content }}</div>
      </div>
    </div>
  </div>
  <Comment
    v-for="it in beReplied"
    :key="it.beRepliedCommentId"
    :avatar="it.user.avatarUrl"
    :auth="`@${it.user.nickname} ${$t('home.reply')} @${auth}`"
    :content="it.content"
    :beReplied="it.beReplied"
  />
</template>
<script>
export default {
  name: "Comment",
};
</script>
<script setup>
import { defineProps } from "vue";
import dayjs from "dayjs";
import Image from "@/components/Image";
defineProps({
  avatar: String,
  auth: String,
  content: String,
  time: String | Number,
  beReplied: Array,
});
</script>

<style lang="scss" scoped>
.Comment {
  display: flex;
  background: var(--color-secondary);
  border-radius: 0.75em;
  margin-bottom: 10px;
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 7px 6px;
  border: 1px solid var(--color-secondary);
  cursor: pointer;

  .avatar {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 1px solid rgba(var(--color-secondary), 0.2);
    margin-right: 10px;
    margin: 10px 0 0 10px;
  }
  .contant {
    flex: 1;
    padding: 10px;
    .title {
      font-size: 14px;
      opacity: 0.8;
      font-weight: bold;
      .time {
        font-size: 12px;
        font-weight: 200;
        opacity: 0.68;
        margin-left: 10px;
      }
    }
    .con {
      font-size: 14px;
      opacity: 0.9;
      margin: 5px 0;
      font-size: 400;
    }
  }
}
</style>
