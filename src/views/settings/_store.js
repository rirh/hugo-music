import { postUserParams } from "@/api";
export default {
  namespace: true,
  state: {
    appearance: "auto",
    userinfo: {},
    locales: process.env.VUE_APP_DEFAULT_LOCALE,
    spreadflower: process.env.VUE_APP_DEFAULT_SPREAD_FLOWERS
  },
  mutations: {
    update_spread_flower(state, payload) {
      state.spreadflower = payload;
    },
    update_appearance(state, payload) {
      state.appearance = payload;
    },
    update_locales(state, payload) {
      state.locales = payload;
    },
    update_userinfo(state, payload) {
      state.userinfo = payload;
    }
  },
  actions: {
    postUpdateUser({state},payload){
      if(state.userinfo._id){
        if(!payload.uid)payload.uid= state.userinfo._id
        if(!payload.function)payload.function= 'updateUser'
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
            response.userInfo.appearance&&(state.appearance=response.userInfo.appearance)
            response.userInfo.locales&&(state.locales=response.userInfo.locales)
            if(response.userInfo.spreadflower!==undefined){
              state.spreadflower=response.userInfo.spreadflower
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
    chengeApparance({ commit }, playload) {
      commit("update_appearance", playload);
      let contant;
      if (playload !== "auto") {
        document.body.setAttribute("data-theme", playload);
       contant = playload === "dark" ? "#222" : "#fff";
       
      }else{
        const now = new Date().getHours();
        document.body.setAttribute("data-theme", now>10?'light':'dark');
        document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", contant);
      }
    }
  }
};
