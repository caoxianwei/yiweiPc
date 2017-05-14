/* global document, window */

import * as types from './mutation-types'
import api from '../api'


export const updateUsername = ({ commit, rootState }, data) => {
        commit(types.USER_USERNAME, data)
}

export const updateLoginStatus = ({ commit, state, rootState }, data) => {
        commit(types.USER_ISLOGIN, data)
}

export const setSkin = ({ commit, state, rootState }, data) => {
        commit(types.SET_SKIN, data)
}

export const setUserInfo = ({ commit, state, rootState }, data) => {
        commit(types.SET_USERINFO, data)
}

export const setRefreshMoney = ({ commit, state, rootState }, data) => {
        commit(types.SET_REFRESHMONEY, data)
}

export const setDiaView = ({ commit, state, rootState }, data) => {
        commit(types.SET_DIAVIEW, data)
}

export const setFirstView = ({ commit, state, rootState }, data) => {
        commit(types.SET_FIRSTVIEW, data)
}

export const setBankcardView = ({ commit, state, rootState }, data) => {
        commit(types.SET_BANKCARDVIEW, data)
}

export const setUserdataView = ({ commit, state, rootState }, data) => {
        commit(types.SET_USERDATAVIEW, data)
}

export const setChangeInfoView = ({ commit, state, rootState }, data) => {
        commit(types.SET_CHANGEINFOVIEW, data)
}

export const setGamerecordView = ({ commit, state, rootState }, data) => {
        commit(types.SET_GAMERECORDVIEW, data)
}

export const setLotteryRecordView = ({ commit, state, rootState }, data) => {
        commit(types.SET_LOTTERYRECORDVIEW, data)
}

export const setLotteryDialogView = ({ commit, state, rootState }, data) => {
        commit(types.SET_LOTTERYDIALOGVIEW, data)
}

export const setLotteryOrderId = ({ commit, state, rootState }, data) => {
        commit(types.SET_LOTTERYORDERID, data)
}

export const setChessRecordView = ({ commit, state, rootState }, data) => {
        commit(types.SET_CHESSRECORDVIEW, data)
}

export const setFlowrecordView = ({ commit, state, rootState }, data) => {
        commit(types.SET_FLOWRECORDVIEW, data)
}

export const setMemberListId = ({ commit, state, rootState }, data) => {
        commit(types.SET_MEMBERLISTID, data)
}

export const setCode = ({ commit, state, rootState }, data) => {
        commit(types.SET_CODE, data)
}

export const setPlayMethod = ({ commit, state, rootState }, data) => {
        commit(types.SET_PLAY_METHOD, data)
}

export const setPlayMethodType = ({ commit, state, rootState }, data) => {
        commit(types.SET_PLAY_METHOD_TYPE, data)
}

export const setZWgamePlay = ({ commit, state, rootState }, data) => {
        commit(types.SET_ZWGAMEPLAY, data)
}

export const setZWmethodType = ({ commit, state, rootState }, data) => {
        commit(types.SET_ZWmethodType, data)
}

export const clearSelected = ({ commit, state, rootState }, data) => {
        commit(types.CLEAR_SELECTED, data)
}

export const setSelected = ({ commit, state, rootState }, data) => {
        commit(types.SET_SELECTED, data)
}

export const setCurbetting = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURBETTING, data)
}

export const clearBetting = ({ commit, state, rootState }, data) => {
        commit(types.CLEAR_CURBETTING, data)
}

export const setNowLotteryId = ({ commit, state, rootState }, data) => {
        commit(types.SET_NOWLOTTERYId, data)
}

export const setCurrentLottery = ({ commit, state, rootState }, data) => {
        commit(types.SET_CURRENTLOTTERY, data)
}

export const setGameNav = ({ commit, state, rootState }, data) => {
        commit(types.SET_GAMENAV, data)
}

export const setImmediatelyBet = ({ commit, state, rootState }, data) => {
        commit(types.SET_IMMEDIATELYBET, data)
}

export const setLastOpen = ({ commit, state, rootState }, data) => {
        commit(types.SET_LASTOPEN, data)
}

export const setClearInterval = ({ commit, state, rootState }, data) => {
        commit(types.SET_CLEARINTERVAL, data)
}

export const setTeamReportPerson = ({ commit, state, rootState }, data) => {
        commit(types.SET_TEAM_REPORT_PERSON, data)
}

export const setBetList = ({ commit, state, rootState }, data) => {
        commit(types.SET_BETLIST, data)
}

export const clearBetList = ({ commit, state, rootState }, data) => {
        commit(types.CLEAR_BETLIST, data)
}

export const setTeamDividendMonth = ({ commit, state, rootState }, data) => {
        commit(types.SET_TEAM_DIVIDEND_MONTH, data)
}

export const setTeamDividendAgent = ({ commit, state, rootState }, data) => {
        commit(types.SET_TEAM_DIVIDEND_AGENT, data)
}

export const setLhcPeiLv = ({ commit, state, rootState }, data) => {
        commit(types.SET_LHCPEILV, data)
}

export const setLhcBetList= ({ commit, state, rootState }, data) => {
        commit(types.SET_LHCBETLIST, data)
}

export const setTopDialogVisiable= ({ commit, state, rootState }, data) => {
        commit(types.SET_TOP_DIALOG_VISIABLE, data)
}

export const setDialogEmail= ({ commit, state, rootState }, data) => {
        commit(types.SET_TOP_DIALOG_EMAIL, data)
}

export const setMsgTitleIndex= ({ commit, state, rootState }, data) => {
        commit(types.SET_MSGTITLE, data)
}

export const setDialogMsg= ({ commit, state, rootState }, data) => {
        commit(types.SET_DIALOGMSG, data)
}

export const setEmailId= ({ commit, state, rootState }, data) => {
        commit(types.SET_EMAILID, data)
}

export const setOpenRecordType= ({ commit, state, rootState }, data) => {
        commit(types.SET_OPENRECORDTYPE, data)
}