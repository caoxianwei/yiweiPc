import {
    SET_HIS_LOTTERY,
    SET_HIS_SDATE,
    SET_HIS_TYPE
} from '../mutation-types'

const state = {
    lottery: '',
    sdate: '0',  // 0: 今天 1：昨天 2：前天
    stype: '0' // '0': 'haoma' '1': 'qushi'
}

const mutations = {
    [SET_HIS_LOTTERY](state, data) {
        state.lottery = data
    },
    [SET_HIS_SDATE](state, data) {
        state.sdate = data
    },
    [SET_HIS_TYPE](state, data) {
        state.stype = data
    }
}

export default {
    state,
    mutations
}
