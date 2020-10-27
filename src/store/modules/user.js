const state = {
    userInfo: '',
    isLogin: false,
}
//将用户的信息存在一份localstorage中，取一个isLogin变量来记录登录状态
const getters = {
    getUserInfo(state) {
        if (!state.userInfo) {
            state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
        return state.userInfo;
    },
    isLogin(state) {
        if (!state.isLogin) {
            state.isLogin = Boolean(localStorage.getItem('isLogin'));
        }
        return state.isLogin;
    }
}
const mutations = {
    setUserInfo(state, user) {
        localStorage.setItem('userInfo', JSON.stringify(user));
        state.userInfo = user;
        localStorage.setItem('isLogin', true)
        state.isLogin = true;
    },
    removeUserInfo(state) {
        localStorage.removeItem('userInfo');
        state.userInfo = '';
        localStorage.removeItem('isLogin');
        state.isLogin = false;
    }

}
const actions = {

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}