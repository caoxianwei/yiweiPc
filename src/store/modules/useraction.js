import {
	SET_USERINFO,
	SET_REFRESHMONEY,
	SET_DIAVIEW,
	SET_FIRSTVIEW,
    SET_BANKCARDVIEW,
    SET_USERDATAVIEW,
    SET_CHANGEINFOVIEW,
    SET_GAMERECORDVIEW,
    SET_LOTTERYRECORDVIEW, 
    SET_LOTTERYDIALOGVIEW,
    SET_LOTTERYORDERID,
    SET_CHESSRECORDVIEW,
    SET_FLOWRECORDVIEW,
    SET_MEMBERLISTID,
    SET_CODE,
    SET_GAMENAV,
    SET_TEAM_REPORT_PERSON,
    SET_TEAM_DIVIDEND_MONTH,
    SET_TEAM_DIVIDEND_AGENT,
    SET_TOP_DIALOG_VISIABLE,
    SET_TOP_DIALOG_EMAIL,
    SET_MSGTITLE,
    SET_DIALOGMSG,
    SET_EMAILID,
    SET_OPENRECORDTYPE,
} from '../mutation-types'

const state = {
	userInfo: {},
	refreshMoney: {},
	diaView: '',
	firstView: '',
    bankcardView: 'cardlist',
    userdataView: '',
    changeInfoView: '',
    gamerecordView: '',
    lotteryRecordView: '',
    lotteryDialogView: '',
    lotteryOrderId: '',
    chessRecordView: '',
    flowrecordView: '',
    memberListId : '',
    code: '',
    gameNav : 'lottery',
    teamReportPerson : '',
    teamDividendMonth : '',
    teamDividendAgent : '',
    topDialogVisiable : false,
    topDialogEmail : false,
    msgtitleindex : '',
    dialogMsg : false,
    emailId : '',
    openRecordType: false,
}

const mutations = {
	[SET_USERINFO](state,userInfo) {
        state.userInfo = userInfo
    },
    [SET_REFRESHMONEY](state,refreshMoney) {
        state.refreshMoney = refreshMoney
    },
    [SET_DIAVIEW](state,diaView) {
        state.diaView = diaView
    },
    [SET_FIRSTVIEW](state,firstView) {
        state.firstView = firstView
    }, 
    [SET_BANKCARDVIEW](state,bankcardView) {
        state.bankcardView = bankcardView
    }, 
    [SET_USERDATAVIEW](state,userdataView) {
        state.userdataView = userdataView
    }, 
    [SET_CHANGEINFOVIEW](state,changeInfoView) {
        state.changeInfoView = changeInfoView
    },
    [SET_GAMERECORDVIEW](state,gamerecordView) {
        state.gamerecordView = gamerecordView
    },
    [SET_LOTTERYRECORDVIEW](state,lotteryRecordView) {
        state.lotteryRecordView = lotteryRecordView
    },
    [SET_LOTTERYDIALOGVIEW](state,lotteryDialogView) {
        state.lotteryDialogView = lotteryDialogView
    },
    [SET_LOTTERYORDERID](state,lotteryOrderId) {
        state.lotteryOrderId = lotteryOrderId
    },
    [SET_CHESSRECORDVIEW](state,chessRecordView) {
        state.chessRecordView = chessRecordView
    },
    [SET_FLOWRECORDVIEW](state,flowrecordView) {
        state.flowrecordView = flowrecordView
    },
    [SET_MEMBERLISTID](state,memberListId) {
        state.memberListId = memberListId
    },
    [SET_CODE](state,code) {
        state.code = code
    },
    [SET_GAMENAV](state,type) {
        state.gameNav = type
    },
    [SET_TEAM_REPORT_PERSON](state,value){
        state.teamReportPerson = value
    },
    [SET_TEAM_DIVIDEND_MONTH](state,value){
        state.teamDividendMonth = value
    }, 
    [SET_TEAM_DIVIDEND_AGENT](state,value){
        state.teamDividendAgent = value
    }, 
    [SET_TOP_DIALOG_VISIABLE](state,value){
        state.topDialogVisiable = value
    },
    [SET_TOP_DIALOG_EMAIL](state,value){
        state.topDialogEmail = value
    },
    [SET_MSGTITLE](state,value){
        state.msgtitleindex = value
    },
    [SET_DIALOGMSG](state,value){
        state.dialogMsg = value
    },
    [SET_EMAILID](state,emailId) {
        state.emailId = emailId
    },
    [SET_OPENRECORDTYPE](state,openRecordType) {
        state.openRecordType = openRecordType
    },
}


export default {
	state,
	mutations
}