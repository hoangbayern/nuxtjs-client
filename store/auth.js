export const state = () => ({
    loggedIn: false,
    token: null,
    username: null,
  });
  
  export const mutations = {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setToken(state, token) {
      state.token = token;
    },
    setUsername(state, username) {
      state.username = username;
    },
  };
  
  export const actions = {
    login({ commit }, { token, username }) {
      console.log('Login');
      commit('setLoggedIn', true);
      commit('setToken', token);
      commit('setUsername', username);
    },
    logout({ commit }) {
      console.log('Logout');
      commit('setLoggedIn', false);
      commit('setToken', null);
      commit('setUsername', null);
    },
  };
  