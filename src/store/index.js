import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import sound from "@/views/home/_store";
export default createStore({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    sound
  }
});
