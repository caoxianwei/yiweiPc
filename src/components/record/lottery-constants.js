var lotterylist = [
	{
        value: '-1',
        label: '全部'
    }, {
        value: '1',
        label: '重庆时时彩'
    }, {
        value: '2',
        label: '江西时时彩'
    }, {
        value: '3',
        label: '黑龙江时时彩'
    }, {
        value: '6',
        label: '新疆时时彩'
    }, {
        value: '7',
        label: '天津时时彩'
    }, {
        value: '8',
        label: '广东11选5'
    }, {
        value: '9',
        label: '江西11选5'
    }, {
        value: '10',
        label: '山东11选5'
    }, {
        value: '4',
        label: '福彩3D'
    }, {
        value: '5',
        label: '排列3'
    }, {
        value: '11',
        label: '五分彩'
    }, {
        value: '12',
        label: '分分彩'
    }, {
        value: '13',
        label: '北京赛车PK10'
    }, {
        value: '14',
        label: '香港六合彩'
    }, {
        value: '15',
        label: '三分彩'
    }
]
var bingoFlagList = [{
      value: '-1',
      label: '全部'
    }, {
      value: '0',
      label: '未开奖'
    }, {
      value: '1',
      label: '已中奖'
    }, {
      value: '2',
      label: '未中奖'
    }, {
      value: '3',
      label: '中奖停追'
    }, {
      value: '4',
      label: '已撤单'
    }
]
var gamelist = [{
	    value: '-1',
	    label: '全部'
	}, {
	    value: '1',
	    label: '百家乐'
	}, {
	    value: '2',
	    label: '牛牛'
	}
]
var typelist = [{
        value: '-1',
        label: '全部'
    }, {
        value: '0',
        label: '充值'
    }, {
        value: '1',
        label: '取款'
    }, {
        value: '7',
        label: '取款撤单'
    }, {
        value: '6',
        label: '管理员加减钱'
    }, {
        value: '9',
        label: '投注'
    }, {
        value: '8',
        label: '个人返点'
    }, {
        value: '10',
        label: '下级返点'
    }, {
        value: '11',
        label: '中奖'
    }, {
        value: '12',
        label: '中奖停追'
    }, {
        value: '13',
        label: '撤单'
    }, {
        value: '14',
        label: '佣金'
    }, {
        value: '44',
        label: '分红转入'
    },{
        value: '45',
        label: '转入彩票'
    }, {
        value: '46',
        label: '转入棋牌'
    }
]
var typelist2 = [{
        value: '-1',
        label: '全部'
    }, {
        value: '3',
        label: '转出'
    }, {
        value: '4',
        label: '转入'
    }, {
        value: '5',
        label: '返点'
    }, {
        value: '6',
        label: '盈亏'
    }
]

var chessTypeList = [{
                    value: '-1',
                    label: '全部'
                }, {
                    value: '3',
                    label: '转出彩票'
                }, {
                    value: '4',
                    label: '转入棋牌'
                }, {
                    value: '5',
                    label: '返点'
                }, {
                    value: '6',
                    label: '输赢'
                }]

var balanceList = [{
        value: '-1',
        label: '全部'
    }, {
        value: '0',
        label: '无额用户'
    }, {
        value: '1',
        label: '有额用户'
    }
]

var sortList = [{
        value: 'addTime',
        label: '按注册时间'
    }, {
        value: 'balance',
        label: '按余额'
    }
]
                
export default {
	lotterylist : lotterylist,
	bingoFlagList : bingoFlagList,
	gamelist : gamelist,
    typelist: typelist,
    typelist2: typelist2,
    chessTypeList : chessTypeList,
    balanceList : balanceList,
    sortList : sortList,
}
