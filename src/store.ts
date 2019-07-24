import Vue from 'vue';
import Vuex from 'vuex';
import music from '@/stores/music';
import user from '@/stores/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    music,
    user,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
