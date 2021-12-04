<template>
  <div class="account">
    <h1>账号信息设置</h1>
    <div class="contant">
      <div class="header">
        <Image
          class="image"
          animate="animate__slideInUp"
          :src="
            userinfo.avatar ||
              'https://tva1.sinaimg.cn/crop.12.0.1217.1217.180/006mNGdajw8fbeqv6matxj30yi0xtacp.jpg?KID=imgbed,tva&Expires=1638551868&ssig=P7hhiHQQFs'
          "
          :alt="userinfo.username"
        />
        <input
          type="file"
          class="file"
          @change="hanle_cheng_file"
          accept="image/*"
        />
      </div>
      <div style="margin-top:50px" class="cell">
        <label for="nickname">昵称:</label>
        <div class="textfaild">
          <input
            v-model="userinfo.nickname"
            name="nickname"
            id="nickname"
            type="text"
            class="input"
          />
          <div class="tips">4～30个字符，支持中英文、数字</div>
        </div>
      </div>
      <div class="cell">
        <label for="nickname">邮箱:</label>
        <div class="textfaild">
          <input
            v-model="userinfo.email"
            name="email"
            id="email"
            type="text"
            class="input"
          />
          <div class="tips">符合规范的邮箱</div>
        </div>
      </div>
      <div class="cell">
        <label for="mark">简介:</label>
        <div class="textfaild">
          <input
            v-model="userinfo.mark"
            name="mark"
            id="mark"
            type="text"
            class="input"
          />
          <div class="tips">简单介绍一下自己吧～1～140个字符</div>
        </div>
      </div>
      <div class="cell">
        <label for="my_invite_code">邀请码:</label>
        <div class="textfaild">
          <input
            v-model="userinfo.my_invite_code"
            name="my_invite_code"
            id="my_invite_code"
            type="text"
            class="input"
          />
          <div class="tips">简单介绍一下自己吧～1～140个字符</div>
        </div>
      </div>

      <h2 style="margin-top:50px">个人基本资料</h2>
      <div class="cell">
        <label for="nickname">性别:</label>
        <div class="textfaild">
          <div class="textfaild-radio">
            <input v-model="userinfo.sex" name="sex" id="man" type="radio" />
            <label for="man">男</label>
            <input
              v-model="userinfo.sex"
              name="sex"
              id="woman"
              type="radio"
              checked
            />
            <label for="woman">女</label>
          </div>
          <div class="tips"></div>
        </div>
      </div>
    </div>

    <!-- {{ userinfo }} -->
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive, watchEffect } from "vue";
import Image from "@/components/Image";
import { postUploadFile } from "@/api";
const store = useStore();
const _userinfo = computed(() => store.state.settings.userinfo);
const userinfo = reactive({});
watchEffect(() => {
  Object.assign(userinfo, _userinfo.value);
  console.log(userinfo);

  return _userinfo.value;
});
const hanle_cheng_file = e => {
  const [file] = e.target.files;
  if (file) {
    console.log(file);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      // console.log(e.currentTarget.result);
      userinfo.avatar = e.currentTarget.result;
      // https://apiauth.tigerzh.com/upload
      let param = new FormData(); // 创建form对象
      param.append("file", file); // 通过append向form对象添加数据
      param.append("filename", file.name); // 通过append向form对象添加数据
      postUploadFile(param, { filename: file.name }).then(response => {
        console.log(response);
      });
    };
  }
};
</script>

<style lang="scss" scoped>
.account {
  padding: 0 40px;
  .contant {
    width: 100%;
    white-space: break-spaces;
    overflow: hidden;
    .header {
      width: 100%;
      text-align: center;
      position: relative;

      .image {
        width: 100px;
        height: 100px;
        border: 1px solid var(--color-secondary);
        border-radius: 50%;
      }
      .file {
        position: absolute;
        opacity: 0;
        // left: cala(50% - 50px);
        height: 100px;
        width: 100px;
        left: calc(50% - 50px);
      }
    }
    .textfaild {
      width: 100%;
      flex: 1;
    }
    .cell {
      display: flex;
      margin-top: 10px;
      label {
        font-weight: bold;
        font-size: 16px;
        line-height: 32px;
        margin-right: 10px;
      }
      .input {
        height: 32px;
        font-size: 12px;
        -webkit-appearance: none;
        background: transparent;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        background: var(--color-secondary-bg-for-transparent);
        outline: none;
        padding: 10px;
        border: none;
        border-radius: 10px;
        min-width: 300px;
        box-sizing: border-box;
        flex: 1;
        width: 100%;
        max-width: 100%;

        // width: 100%;
      }
      .input:focus {
        border: 2px solid;
      }
      .tips {
        font-size: 12px;
        margin-top: 5px;
        opacity: 0.68;
      }
    }
  }
}
.textfaild-radio {
  display: flex;
  align-items: center;
}
input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #999;
  transition: 0.2s all linear;
  outline: none;
  margin-right: 10px;

  position: relative;
}

input[type="radio"]:checked {
  border: 6px solid black;
}
</style>
