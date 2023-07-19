<template>
  <!-- <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
            start your 14-day free trial
          </a>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div> -->
  <div class="login">
    <div>
      <Link to="/">
        <Image
          class="logo"
          alt="logo"
          src="https://c18e-system-1257416358.cos.na-ashburn.myqcloud.com/image/logo-512x160.png"
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
  if (import.meta.env.IS_ELECTRON) {
    // const { shell } = require("electron");
    // shell.openExternal("http://signup.tigerzh.com/?appname=music");
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
