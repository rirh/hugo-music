import Vue from 'vue';
import Vuex from 'vuex';
import music from '@/stores/music';
import user from '@/stores/user';
import vedio from '@/stores/vedio';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    music,
    user,
    vedio,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
