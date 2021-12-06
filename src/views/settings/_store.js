import { postUserParams } from "@/api";
export default {
  namespace: true,
  state: {
    appearance: "auto",
    userinfo: {}
  },
  mutations: {
    update_appearance(state, payload) {
      state.appearance = payload;
    },
    update_userinfo(state, payload) {
      state.userinfo = payload;
    }
  },
  actions: {
    verifedToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        postUserParams({
          function: "checkToken",
          token: state.userinfo.token && state.userinfo.token[0]
        })
          .then(response => {
            commit("update_userinfo", response.userInfo);
            resolve(response);
          })
          .catch(error => {
            commit("update_userinfo", {});
            reject(error);
            throw error;
          });
      });
    },
    chengeApparance({ commit }, playload) {
      commit("update_appearance", playload);
      if (playload !== "auto") {
        document.body.setAttribute("data-theme", playload);
        const contant = playload === "dark" ? "#222" : "#fff";
        document
          .querySelector('meta[name="theme-color"]')
          .setAttribute("content", contant);
      }
    }
  }
};
