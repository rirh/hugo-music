<template>
  <div class="login">
    <div>
      <Link to="/login">
        <Image
          class="logo"
          alt="logo"
          src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
        />
      </Link>
    </div>
    <div class="contant">
      <div class="card">
        <h1>欢迎回来</h1>
        <h3>登录您的账户</h3>
        <br />
        <br />
        <div class="label">
          电子邮箱
        </div>
        <div class="cell">
          <input placeholder="请输入邮箱" v-model="form.email" type="text" />
          <Button
            class="tips"
            :loading="form.loading"
            :disabled="form.is_send"
            @click="handle_send_code"
            >{{ form.tips }}</Button
          >
        </div>
        <br />
        <div class="label">
          验证码
        </div>
        <div>
          <input placeholder="请输入验证码" v-model="form.code" type="text" />
        </div>

        <Button
          :loading="form.sumbiting"
          :disabled="form.sumbiting"
          class="login-btn"
          :style="{ width: form.sumbiting ? '60px!important' : '' }"
          @click="handle_login"
        >
          登录
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Link from "@/components/Link";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { postEmailCode, postUserParams } from "@/api";
const store = useStore();
const router = useRouter();
const form = reactive({
  email: "huibikuile@qq.com",
  code: "",
  tips: "发送验证码",
  is_send: false,
  loading: false,
  sumbiting: false
});

const handle_login = () => {
  form.sumbiting = true;
  postUserParams({
    email: form.email,
    code: form.code,
    function: "loginByEmail"
  })
    .then(response => {
      form.sumbiting = false;
      if (response.userInfo) {
        store.commit("update_userinfo", response.userInfo);
        router.push("/");
      }
    })
    .catch(error => {
      form.sumbiting = false;
      throw error;
    });
};

const start_compute_code = () => {
  let [code] = form.tips.split("s");
  code = Number(code);
  code = code - 1;
  form.tips = `${code}s`;
  if (code === 0) {
    form.tips = "重新获取";
    form.is_send = false;
  } else {
    setTimeout(() => {
      start_compute_code();
    }, 1000);
  }
};
const handle_send_code = () => {
  if (form.is_send) return;
  form.loading = true;
  postEmailCode({
    type: "login",
    email: form.email
  })
    .then(() => {
      form.loading = false;
      form.tips = "60s";
      form.code = "";
      form.is_send = true;
      start_compute_code();
    })
    .catch(error => {
      form.loading = false;
      throw error;
    });
};
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  .logo {
    height: 45px;
    min-height: 35px;
    max-height: 80px;
    background: transparent;
    border-radius: 0;
    filter: var(--img-primary);
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 30px;
    // aspect-ratio: 1/1;
  }
  .contant {
    display: grid;
    place-items: center;
    .card {
      text-align: left;
      width: 30vw;
      max-width: 500px;
      .label {
        // color: #6e7187;
        font-size: 15px;
        transform: translate(-54px, 0px) scale(0.75);
      }
      input {
        font-size: 15px;
        min-height: 35px;
        font-weight: 400;
        border: none;
        width: 100%;
        background: none;
        box-sizing: content-box;
        letter-spacing: inherit;
        -webkit-tap-highlight-color: transparent;
        border-bottom: 1px solid rgba(var(--color-hover-primary-rgb), 0.25);
        outline: none;
      }
      input:-internal-autofill-selected {
        appearance: menulist-button;
        background-image: none !important;
        background-color: -internal-light-dark(
          rgb(232, 240, 254),
          rgba(70, 90, 126, 0.4)
        ) !important;
        color: -internal-light-dark(black, white) !important;
      }
      .cell {
        position: relative;
        .tips {
          position: absolute;
          right: -10px;
          top: -10px;
        }
      }

      .login-btn {
        width: 300px !important;
        margin: 0 auto;
        margin-top: 45px;
        border-radius: 1em !important;
      }
    }
  }
}
</style>
