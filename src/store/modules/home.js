export default {
  state: {
    show: true,
  },
  mutations: {
    switch(state) {
      state.show = state.show ? '执行了mutations' : '未执行mutations';
    }
  },
  actions: {
    switch(context) {
      context.commit('switch');
    }
  },
  getters: {
    reverse(state) {
      return !state.show;
    }
  }
}
