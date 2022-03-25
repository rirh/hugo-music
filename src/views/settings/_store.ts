import { postUserParams } from "src/api";
import { Setting } from 'src/@types'
const settingState: Setting.asObject = {
  appearance: "auto",
  userinfo: {},
  locales: `${import.meta.env.VITE_APP_DEFAULT_LOCALE}`,
  spreadflower: `${import.meta.env.VITE_APP_DEFAULT_SPREAD_FLOWERS}`,
  lyricBgMode: `${import.meta.env.VITE_APP_DEFAULT_BG_MODE}`,
}
export default {
  namespace: true,
  state: settingState,
  mutations: {
    update_lyric_bg_mode(state: Setting.asObject, payload: string) {
      state.lyricBgMode = payload;
    },
    update_spread_flower(state: Setting.asObject, payload: string) {
      state.spreadflower = payload;
    },
    update_appearance(state: Setting.asObject, payload: string) {
      state.appearance = payload;
    },
    update_locales(state: Setting.asObject, payload: string) {
      state.locales = payload;
    },
    update_userinfo(state: Setting.asObject, payload: any) {
      state.userinfo = payload;
    }
  },
  actions: {
    postUpdateUser({ state }, payload: any) {
      if (state.userinfo._id) {
        if (!payload.uid) payload.uid = state.userinfo._id
        if (!payload.function) payload.function = 'updateUser'
        return postUserParams(payload)
      }
    },
    verifedToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        postUserParams({
          function: "checkToken",
          token: state.userinfo.token && state.userinfo.token[0]
        })
          .then(response => {
            commit("update_userinfo", response.userInfo);
            response.userInfo.appearance && (state.appearance = response.userInfo.appearance)
            response.userInfo.locales && (state.locales = response.userInfo.locales)
            if (response.userInfo.spreadflower !== undefined) {
              state.spreadflower = response.userInfo.spreadflower
            }
            resolve(response);
          })
          .catch(error => {
            commit("update_userinfo", {});
            reject(error);
            throw error;
          });
      });
    },
    chengeApparance({ commit }, playload: string) {
      commit("update_appearance", playload);
      let contant;
      if (playload !== "auto") {
        document.body.setAttribute("data-theme", playload);
        contant = playload === "dark" ? "#222" : "#fff";

      } else {
        const now = new Date().getHours();
        document.body.setAttribute("data-theme", now > 10 ? 'light' : 'dark');
        (document as any)
          .querySelector('meta[name="theme-color"]')
          .setAttribute("content", contant);
      }
    }
  }
};
