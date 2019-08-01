import Vue from 'vue'
import vuex from 'vuex'
import home from './modules/home.js';

Vue.use(vuex);

export default new vuex.Store({
  modules: {
    home: home
  }
})
