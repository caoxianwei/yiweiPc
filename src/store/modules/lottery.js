import {
    LOTTERY_UNSHIFT,
    SET_CURRENTVIEW,
    SET_CURRENTLOTTERY,
    CLEARALL_LOTTERY,
    SET_PLAY_METHOD,
    SET_PLAY_METHOD_TYPE,
    SET_CURRENT_PLATE_VIEW,
    CLEAR_SELECTED,
    SET_SELECTED,
    SET_TRIGGER,
    SET_CURBETTING,
    CLEAR_CURBETTING,
    SET_ZWGAMEPLAY,
    SET_ZWmethodType,
    SET_NOWLOTTERYId,
    SET_IMMEDIATELYBET,
    SET_LASTOPEN,
    SET_BETLIST,
    CLEAR_BETLIST,
    SET_CLEARINTERVAL,
    SET_LHCPEILV,
    SET_LHCBETLIST,
} from '../mutation-types'

const state = {
    activedLottery: [],
    currentView : "game",
    currentLottery : "cai1",
    gamePlayMethod : "",
    playMethodType : "",
    // 记录当前中文玩法
    ZWgamePlay: "",
    ZWmethodType: "",
    selected : {},
    curBetting : {},
    nowBetLotteryId: '',
    isImmediatelyBet: Boolean,
    lastOpenRecord: {},
    betList : [],
    clearInterval: false,
    lhcPeiLv: '',
    lhcBetList: [],
}

const mutations = {
    [LOTTERY_UNSHIFT](state, lot) {
        var existsIndex = state.activedLottery.indexOf(lot)
        if(existsIndex > -1){
            state.activedLottery.splice(existsIndex, 1)
        } 
        state.activedLottery.unshift(lot)
    },
    [CLEARALL_LOTTERY](state) {
        state.activedLottery = []
    },
    [SET_CURRENTVIEW](state, curView) {
        state.currentView = curView
    },
    [SET_CURRENTLOTTERY](state, curLottery) {
        state.currentLottery = curLottery
    },
    [SET_PLAY_METHOD](state, playMethod) {
        state.gamePlayMethod = playMethod
    },
    [SET_PLAY_METHOD_TYPE](state, playMethodType) {
        state.playMethodType = playMethodType
    },  
    [CLEAR_SELECTED](state) {
        state.selected = {}
    }, 
    [SET_SELECTED](state, data) {
        var name = data.name || 'empty'
        state.selected[name] = data.selected
    }, 
    [SET_CURBETTING](state, data) {
        state.curBetting = data
    },
    [CLEAR_CURBETTING](state) {
        state.curBetting = {}
    },
    [SET_ZWGAMEPLAY](state, data) {
        state.ZWgamePlay = data
    },
    [SET_ZWmethodType](state, data) {
        state.ZWmethodType = data
    },
    [SET_NOWLOTTERYId](state, data) {
        state.nowBetLotteryId = data
    },
    [SET_IMMEDIATELYBET](state, data) {
        state.isImmediatelyBet = data
    },
    [SET_LASTOPEN](state, data) {
        state.lastOpenRecord = data
    },
    [SET_BETLIST](state, data) {
        state.betList = data
    },
    [CLEAR_BETLIST](state) {
        state.betList = []
    },
    [SET_CLEARINTERVAL](state, data) {
        state.clearInterval = data
    },
    [SET_LHCPEILV](state, data) {
        state.lhcPeiLv = data
    },
    [SET_LHCBETLIST](state, data) {
        state.lhcBetList = data
    },
}
export default {
    state,
    mutations
}