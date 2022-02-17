import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

import sound from "src/views/home/_store";
import settings from "src/views/settings/_store";
export default createStore({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    sound,
    settings
  }
});
