<template>
  <div class="login">
    <div>
      <Link to="/">
        <Image
          class="logo"
          alt="logo"
          src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
        />
      </Link>
    </div>
    <div class="contant">
      <div class="card">
        <h1>{{ $t("login.welcomeBack") }}</h1>
        <h3>{{ $t("login.loginaccount") }}</h3>
        <br />
        <br />
        <div class="label">
          {{ $t("login.email") }}
        </div>
        <div class="cell">
          <input
            :placeholder="$t('login.emailPlaceholder')"
            v-model="form.email"
            type="text"
          />
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
          {{ $t("login.code") }}
        </div>
        <div>
          <input
            :placeholder="$t('login.codePlaceholder')"
            v-model="form.code"
            type="text"
          />
        </div>
        <div class="login-signin">
          <span @click="handle_go_sigin"> {{ $t("login.joinNow") }}? </span>
        </div>

        <Button
          :loading="form.sumbiting"
          :disabled="!(form.code && form.email)"
          class="login-btn"
          :style="{ width: form.sumbiting ? '60px!important' : '' }"
          @click="handle_login"
        >
          {{ $t("login.login") }}
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
import { useI18n } from "vue-i18n";
const i18n = useI18n();
const store = useStore();
const router = useRouter();
const form = reactive({
  email: "huibikuile@qq.com",
  code: "",
  tips: i18n.t("login.sendCode"),
  is_send: false,
  loading: false,
  sumbiting: false,
});
const handle_go_sigin = () => {
  if (process.env.IS_ELECTRON) {
    const { shell } = require("electron");
    shell.openExternal("http://signup.tigerzh.com/?appname=music");
  } else {
    window.location.href = "http://signup.tigerzh.com/?appname=music";
  }
};
const handle_login = () => {
  if (form.code && form.email) {
    form.sumbiting = true;
    postUserParams({
      email: form.email,
      code: form.code,
      function: "loginByEmail",
    })
      .then((response) => {
        form.sumbiting = false;
        if (response.userInfo) {
          store.commit("update_userinfo", response.userInfo);
          router.push("/");
        }
      })
      .catch((error) => {
        if (form.is_send) {
          form.tips = "0s";
          form.is_send = false;
          form.code = "";
        }
        form.sumbiting = false;
        throw error;
      });
  }
};

const start_compute_code = () => {
  let [code] = form.tips.split("s");
  code = Number(code);
  code = code - 1;
  form.tips = `${code}s`;
  if (code <= 0) {
    form.tips = i18n.t("login.sendAgain");
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
    email: form.email,
  })
    .then(() => {
      form.loading = false;
      form.tips = "60s";
      form.code = "";
      form.is_send = true;
      start_compute_code();
    })
    .catch((error) => {
      form.loading = false;
      throw error;
    });
};
</script>

<style lang="scss" scoped>
.login {
  padding: 20px;
  height: 100vh;
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
    margin-top: 15px;
    aspect-ratio: 1/1;
  }
  .contant {
    display: grid;
    place-items: center;
    margin-top: 10vh;
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
.login-signin {
  text-align: right;
  margin-top: 5px;
  font-size: 14px;
  opacity: 0.6;
  cursor: pointer;
  transition: all ease-in-out 200ms;
}
.login-signin:hover {
  opacity: 0.9;
}
.link,
.link:link,
.link:hover,
.link:active {
  color: inherit;
  text-decoration: none;
}
h1 {
  text-transform: uppercase;
}
</style>
