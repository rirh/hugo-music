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
