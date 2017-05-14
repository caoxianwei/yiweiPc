import {
    USER_ISLOGIN,
    USER_USERNAME,
    SET_SKIN,
} from '../mutation-types'

const state = {
    isLogin: true,
    username:'',
    userMail:'',
    accountBalance:'',
    skin : '',
}

const mutations = {
    [USER_ISLOGIN](state, isLogin) {
        state.isLogin = isLogin
    },
    [USER_USERNAME](state, username) {
        state.username = username
    }, 
    [SET_SKIN](state, skin) {
        state.skin = skin
    },
}

export default {
    state,
    mutations
}
