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
            @blur="handle_change_nickname"
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
            @blur="handle_change_email"
          />
          <div class="tips">符合规范的邮箱</div>
        </div>
      </div>
      <div class="cell">
        <label for="mark">简介:</label>
        <div class="textfaild">
          <input
            v-model="userinfo.description"
            name="mark"
            id="mark"
            type="text"
            class="input"
            @blur="handle_change_description"
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
            readonly
          />
          <div class="tips">邀请小伙伴一起来玩耍吧～</div>
        </div>
      </div>

      <h2 style="margin-top:50px">个人基本资料</h2>
      <div class="cell">
        <label for="nickname">性别:</label>
        <div class="textfaild">
          <div class="textfaild-radio">
            <input
              v-model="userinfo.gender"
              name="sex"
              :value="1"
              id="man"
              type="radio"
              @change="handle_update_gender"
            />
            <label for="man">男</label>
            <input
              v-model="userinfo.gender"
              name="sex"
              id="woman"
              type="radio"
              checked
              :value="2"
              @change="handle_update_gender"
            />
            <label for="woman">女</label>
          </div>
          <div class="tips"></div>
        </div>
      </div>
      <h2 style="margin-top:50px">设备信息</h2>
      <div class="cell">
        <label for="nickname">设备信息:</label>
        <div class="textfaild">
          <span
            style="margin-right:5px;line-height:32px"
            v-for="(it, i) in userinfo.token"
            :title="it"
            :key="it"
          >
            设备{{ i + 1 }}
            <svg-icon
              class="icon"
              title="下线"
              @click="handle_logout(it)"
              icon-class="x"
            />
          </span>
        </div>
      </div>

      <div class="cell">
        <label for="nickname">上次登录IP:</label>
        <div class="textfaild">
          <span>{{ userinfo.last_login_ip }}</span>
        </div>
      </div>
      <div class="cell">
        <label for="nickname">上次登录时间:</label>
        <div class="textfaild">
          <span>{{
            userinfo.last_login_date
              ? dayjs(userinfo.last_login_date).format("YYYY年MM月DD日")
              : ""
          }}</span>
        </div>
      </div>
      <div class="cell">
        <label for="nickname">注册时间:</label>
        <div class="textfaild">
          <span>{{
            dayjs(userinfo.register_date).format("YYYY年MM月DD日")
          }}</span>
        </div>
      </div>
    </div>
    <br />

    <!-- {{ userinfo }} -->
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { useStore } from "vuex";
import { computed, reactive, watchEffect, ref } from "vue";
import Image from "@/components/Image";

// import Button from "@/components/Button";
import { postUploadFile, postUserParams } from "@/api";
const store = useStore();
const loading = ref(false);
const _userinfo = computed(() => store.state.settings.userinfo);
const userinfo = reactive({});
watchEffect(() => {
  Object.assign(userinfo, _userinfo.value);
  return _userinfo.value;
});
const handle_change_nickname = () => {
  const nickname = userinfo.nickname;
  const username = nickname;
  if (_userinfo.value.nickname !== nickname && username) {
    handle_update_user_info({
      uid: userinfo._id,
      nickname,
      username
    });
  }
};
const handle_change_email = () => {
  const email = userinfo.email;
  if (
    _userinfo.value.email !== email &&
    /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
  ) {
    handle_update_user_info({
      uid: userinfo._id,
      email
    });
  } else {
    //todo
  }
};

const handle_change_description = () => {
  const description = userinfo.description;
  if (description && _userinfo.value.description !== description) {
    handle_update_user_info({
      uid: userinfo._id,
      description
    });
  }
};

const handle_update_gender = () => {
  const gender = userinfo.gender;
  if (_userinfo.value.gender !== gender) {
    handle_update_user_info({
      uid: userinfo._id,
      gender
    });
  }
};

const handle_logout = token => {
  postUserParams({
    function: "logout",
    token
  }).then(() => {
    // Object.assign(userinfo, _userinfo.value);
  });
};
const hanle_cheng_file = e => {
  const [file] = e.target.files;
  if (file) {
    let param = new FormData(); // 创建form对象
    param.append("file", file); // 通过append向form对象添加数据
    postUploadFile(param).then(({ fileList }) => {
      const [{ download_url }] = fileList;
      userinfo.avatar = download_url;
      handle_update_user_info({
        uid: userinfo._id,
        avatar: download_url
      });
      // var reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = e => {
      //   // console.log(e.currentTarget.result);

      //   // https://apiauth.tigerzh.com/upload
      // };
    });
  }
};
const handle_update_user_info = params => {
  loading.value = true;
  postUserParams({
    function: "updateUser",
    ...params
  })
    .then(() => {
      loading.value = false;
    })
    .catch(error => {
      throw error;
    });
};
</script>

<style lang="scss" scoped>
.account {
  padding: 0 40px;
  height: 85vh;
  overflow-y: scroll;
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
        border: 3px solid var(--color-secondary);
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
      span {
        line-height: 32px;
      }
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
.icon {
  height: 1em;
  width: 1em;
  vertical-align: middle;
  cursor: pointer;
  margin-left: 3px;
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
