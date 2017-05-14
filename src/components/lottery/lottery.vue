<template>
	<div class="lottery">
        <div class="cai-name-stl">{{currentLotteryName}}</div>
		<lottery-logo></lottery-logo>
		<show-time class="show-time-size"></show-time>
		<game-record class="game-record"></game-record>
		<div class="yilou-size" @click.stop="switchYilouLengre">
			<span name="yilou" class="yilou-but yilou-bg f-16 t-a-c">遗漏</span>
			<span name="lengre" class="lenre-but  f-16 t-a-c">冷热</span>
            <div v-if="showYilou" class="lengre-content-bg c-p">
                <span  name="leakDatas" class="yilou-but-r yilou-bg f-16 t-a-c">当前遗漏</span>
            </div>
            <div v-if="!showYilou" class="lengre-content-bg c-p" @click.stop="switchLengre">
                <span name="hot30" class="lengre-but-r yilou-bg f-16 t-a-c">30期</span>
                <span name="hot60" class="lengre-but-r f-16 t-a-c">60期</span>
                <span name="hot100" class="lengre-but-r f-16 t-a-c">100期</span>
            </div>
		</div>
        <div v-show="!showYilouLengre" class="cover-leak"></div>
		<example></example>
		<div class="add-num" v-if="this.currentLottery != 'cai14'">
			<span class="f-15 jiangjin">奖金：{{bonus.toFixed(2)}}</span>
			<span class="f-15 fandian">返点：{{lotteryRebates}}%</span>
			<div class="jianhao" @click.prevent="reduceRebates"></div>
			<el-slider class="slider my-lottery-slider" v-model="rebates" :max='maxs' :min='0' :step='steps' :show-tooltip="false"></el-slider>
			<div class="jiahao" @click.prevent="addRebates"></div>
			<div id="jiangjinTop" class="jiangjinzuigao" @click.prevent="setFandianTop"></div>
			<div id="fandianTop" class="fandianzuigao" @click.prevent="setJiangjinTop"></div>
			<p class="f-18 jiesuan t-a-c">你选择了<span>{{count}}</span>注，共<span>{{money.toFixed(2)}}</span>元</p>
			<div class="betting-multiple f-14">
				<span class="multiple-l">倍数</span>
				<div class="multiple-jianhao" @click.prevent="reduceNum"></div>
				<div class="multiple-num t-a-c">
					<el-select v-model="multiple" placeholder="请选择倍数">
						<el-option v-for="(item, index) in 100" :key="index" :label="item" :value="item"></el-option>
					</el-select>
				</div>
				<div class="multiple-jiahao" @click.prevent="addNum"></div>
				<span class="multiple-r">倍</span>
			</div>
			<div class="yuan-type" @click.prevent="changeYuanType">
				<div id="yuan" class="yuan-type-but yuan-type-but-select f-16 t-a-c">元</div>
				<div id="jiao" class="yuan-type-but f-16 t-a-c">角</div>
				<div id="fen" class="yuan-type-but f-16 t-a-c">分</div>
			</div>
			<div class="add-select-num f-19 tianjia-haoma t-a-c" @click.prevent="addtz">添加号码</div>
			<div class="pc-select-num f-19 tianjia-haoma t-a-c" @click.prevent="betButNow('betOne')">一键投注</div>
			<p class="f-18 tongji t-a-c">总注数<span class="m-r-15">{{amountCount}}注</span>总金额<span>{{amountTotal}}</span>元</p>
			<div class="bet-operation sure-bet-bg">
				<div class="f-17 clear-list sure-bet-size" @click.prevent="clearAllList">清空列表</div>
				<div class="f-17 bet-add sure-bet-size" @click.prevent="gotozhuihao">我要追号</div>
				<div class="sure-betting c-p"  @click.prevent="betButNow('betList')"></div>
			</div>
		</div>
        <div  v-show="this.currentLottery == 'cai14'" class="add-num-lhc">
            <lhc-add-num></lhc-add-num>
        </div>
		<div class="select-num-list f-12" ref="selected_list" v-if="this.currentLottery != 'cai14'">
			<div>
				<div class="show-list-box t-a-c" v-for="(item, index) in betdata">
					<div class="list-num-box">{{item.typeName}}</div>
                    <div class="list-select-num">
                    <span>{{detailSlice(item.betnumbersNameChina)}}</span>
                        <el-tooltip class="item" effect="light" :content="item.betnumbersNameChina" placement="bottom">
                            <span class="m-l-3 show-list-details style-font-color" v-if="item.betnumbersNameChina.length > 20">详情</span>
                        </el-tooltip>
					</div>
					<div class="list-num-box">模式：{{item.unitName}}</div>
					<div class="list-num-box">{{item.count}}注 </div>
					<div class="list-num-box">{{item.multiple}}倍</div>
					<div class="list-num-box">¥{{item.totalMoney}}元</div>
					<div class="list-num-box"><img id="deleteImg" src="../../images/imgX.png" @click.stop="deleteOne(index)"></div>
				</div>
			</div>
		</div>
        <div class="select-num" v-if="this.currentLottery != 'cai14'">
            <select-number-box :yilouStatus="yilouStatus" :datas="numBarData" v-if="setIsInput"></select-number-box>
            <select-input class="input-size" v-if="!setIsInput" :datas="numBarData"></select-input>
        </div>
        <div class="liuhecai-size" v-else>
            <lhc-index class="lhc-show-box"></lhc-index>
        </div>
        <select-gameplay class="select-gameplay"></select-gameplay>
        <div class="liuhecai-openum-size" v-if="this.currentLottery == 'cai14'"></div>
        <show-openum class="show-openum-size"></show-openum>
        <el-dialog title="温馨提示" v-model="surebetPrompt" class="sure-betting-input">
            <el-form :model="alertinput">
                <el-form-item label="彩票名称：">
                    <span>{{currentLotteryName}}</span>
                </el-form-item>
                <el-form-item label="投注期号：">
                    <span>第{{alertinput.selectTitle}}期</span>
                </el-form-item>
                <el-form-item label="投注号码：">
                    <div class="bet-dialog-detail" ref="selected_detail_list">
                        <div>
                            <p class="bet-dialog-detail-p" v-for="item in alertinput.selectDetails">{{dialogSlice(item)}}</p>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="付款金额：">
                    <span><span class="red-color">{{alertinput.amountTotal}}</span>元</span>
                </el-form-item>
                <el-form-item label="付款账号：">
                    <span class="red-color">{{alertinput.userName}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="t-a-c my-dialog-but-color">
                <span class="sure-betting-sure" @click="judgeSureBet"></span>
                <span class="sure-betting-cancel" @click="surebetPrompt = false"></span>
            </div>
        </el-dialog>
        <el-dialog title="温馨提示" v-model="betOverPrompt" class="bet-over-input translate3d-zero">
                <div class="t-a-c">
                    <img src="../../images/Prompt.png">
                    <span class="bet-over-input-prompt">
                    <p class="f-14">{{alertinput.selectTitle}}期 投注已截止</p>
                    <p class="f-14">投注时请注意期号</p>
                    </span>
                </div><br>
                <p class="f-12 t-a-c">{{threetimer}}秒之后自动关闭窗口</p><br>
        </el-dialog>
        <el-dialog title="我要追号" v-model="zhuihao" class="my-zhuihao-size">
            <zhuihao-dialog></zhuihao-dialog>
            <div slot="footer" class="dialog-footer t-a-c">
            <div class="applyZhuihao" @click.stop="betZhuiHao"></div>
            </div>
        </el-dialog>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import { winHeight, errorMsg, succMsg, removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	import showTime from './show-time'
	import showOpenum from './show-openum'
	import selectGameplay from './select-gameplay'
	import gameRecord from './game-record'
	import selectNumberBox from './select-number-box'
    import example from './example'
	import './lottery-css.css'
	import jquery from 'jquery'
	import fullpage from 'fullpage.js'
	import mousewheel from 'jquery-mousewheel'
	import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
	import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
	import pei from './order-type-constants'
	import selectInput from './select-input'
	import cai from './data/lottery-data'
	import bet from './betting'
    import Decimal from 'decimal.js'
    import caiConstants from './cai-constants'
    import zhuihaoDialog from './zhuihao-dialog'
    import lhcIndex from './lhc-index'
    import lhcAddNum from './lhc-add-num'
    import leakConstants from './data/show-leak-constants'
    import lotteryLogo from './lottery-logo'
	export default {
		components : {
			showTime, showOpenum, selectGameplay, gameRecord, selectNumberBox, selectInput, example, zhuihaoDialog, lhcIndex, lhcAddNum, lotteryLogo
		},
		name : "lottery",
		mounted: function () {
            jquery(this.$refs.selected_list).mCustomScrollbar()
			this.$root.$on("betting", this.bettings)
			this.$root.$on("betOneNow", this.immediateBet)
            this.$root.$on("addBetList", this.addList)
            this.$root.$on("updateLotNew", this.updateLotNew)
            this.$root.$on("closeZhuihaodialog", this.closeZhuihaodialog)
			this.$root.$on("betLHC", this.betLHC)
            this.$root.$emit("switchToCai")
			this.getRebate()
            this.getCurrentNumNext()
            this.rebates = eval("localStorage.fandian" + this.currentLottery) -0 || this.maxs;
		},
		beforeDestroy(){
			this.$root.$off("betting", this.bettings)
			this.$root.$off("betOneNow", this.immediateBet)
            this.$root.$off("addBetList", this.addList)
            this.$root.$off("updateLotNew", this.updateLotNew)
            this.$root.$off("closeZhuihaodialog", this.closeZhuihaodialog)
			this.$root.$off("betLHC", this.betLHC)
            clearInterval(this.setClearTimer)
		},
		data() {
			return {
				betdata: [],
				rebates:3,
				minBonus:190,
				bonusChangeUnit:0.2,
				maxs:3,
				steps:0.1,
				setIsInput: Boolean,
				multiple : 1,
				count: 0,
                betnumbers: '',
				betnumbersChina: '',
				//球位
				tzbs: '',
				//保存圆角分的倍数（1、10、100）
				unit : 1,
				//显示‘元’、‘角’、‘分’
				unitName: '元',
				//元角分==>1、2、3
				model: 1,
				lhcMoney: 0,
				betmoney: 0,
				nowBetLotteryId: '',
                yilouStatus : 'leakDatas',
                showYilou : true,
                surebetPrompt: false,
                alertinput: {
                    selectTitle: '',
                    selectDetails: [],
                    userName: '',
                },
                isYijianBet: Boolean,
                betOverPrompt: false,
                threetimer: 3,
                setClearTimer: Number,
                zhuihao: false,
			}
		},
		computed : {
			bonus(){
				return this.rebates*10*this.bonusChangeUnit + this.minBonus
			},
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
			gamePlayMethod(){
				return this.$store.state.lottery.gamePlayMethod
			},
			playMethodType(){
				return this.$store.state.lottery.playMethodType
			},
        	//获取按钮数据
        	numBarData(){
        		var that = this

                if(!cai[this.currentLottery] || !cai[this.currentLottery].methodType){
                    return
                }
        		var typeArray = cai[this.currentLottery].methodType[this.gamePlayMethod];
        	    
        		if(!typeArray || !this.playMethodType){
        			return
        		}
			    var typeObj = typeArray.filter(function(elem){
			    	return elem.name == that.playMethodType.substring(0, elem.name.length)
			    })
        		if(typeObj && typeObj.length > 0){
        			let targetData = typeObj[0].selectPlate[this.playMethodType];
        			if(targetData == "singlePlate"){
        				this.setIsInput = false
        				return
        			}else{
        				this.setIsInput = true
        				return targetData;
        			}
        		}
        		return
        	},
        	money(){
        		if(this.currentLottery == 'cai14'){
        			return this.lhcMoney
        		} else {
        			var monery = new Decimal(this.count)
        			return monery.mul("2").div(this.unit)
        		}
        	},
        	amountCount(){
        		if(this.betdata.length < 1){
        			return 0
        		}
        		var nums = 0
        		for(var item in this.betdata){
        			nums = this.betdata[item].count + nums
        		}
        		return nums
        	},
        	amountTotal(){
        		var nums = 0
        		if(this.betdata.length < 1){
        			return nums.toFixed(2)
        		}
        		for(var item in this.betdata){
        			nums = Number(this.betdata[item].totalMoney) + nums
        		}
        		return nums.toFixed(2)
        	},
            currentLotteryName(){
                const curLottery = this.$store.state.lottery.currentLottery
                return caiConstants[curLottery]
            },
            lotteryRebates(){
            	var maxrebate = new Decimal(this.maxs)
            	return (maxrebate.sub(this.rebates)).toFixed(1)
            },
            showYilouLengre(){
                if(!this.playMethodType || !this.gamePlayMethod || !this.currentLottery){
                    return false
                }
                const type = leakConstants[this.currentLottery][this.gamePlayMethod]
                if(type && type.indexOf(this.playMethodType) > -1){
                    return true
                }
                return false
            }
        },
        watch : {
        	"currentLottery": function(value,old){
        		this.rebates = eval("localStorage.fandian" + this.currentLottery) -0 || this.maxs;
        		this.clearAllList()
        	},
        	"playMethodType": function(value,old){
        		this.getRebate()
        	},
        	"rebates": function(){
                eval("localStorage.fandian" + this.currentLottery + "=" + this.rebates);
        		var jiangjin_but = document.getElementById("jiangjinTop")
        		var fandian_but = document.getElementById("fandianTop")
        		removeClass(jiangjin_but, 'jiangjin-light')
        		removeClass(fandian_but, 'fandian-light')
        		if(this.rebates == this.maxs){
        			return addClass(jiangjin_but, "jiangjin-light")
        		}
        		if(this.rebates == 0){
        			return addClass(fandian_but, "fandian-light")
        		}
        	}
        },
        methods: {
        	...mapActions({
        		clearSelected: 'clearSelected',
        		clearBetting: 'clearBetting',
        		setImmediatelyBet: 'setImmediatelyBet',
                setBetList: 'setBetList',
                clearBetList : 'clearBetList',
        	}),
        	changeYuanType(e){
        		const target = e.target
        		if( hasClass(target, 'yuan-type-but') ){
        			var allArray = target.parentNode.children;
        			var liClear = Array.prototype.slice.call(allArray)
        			liClear.forEach( function(element, index) {
        				removeClass(element, 'yuan-type-but-select')
        			})
        			addClass(target, "yuan-type-but-select")
        			if (target.id == 'yuan') {
        				this.unit = 1
        				this.model = 1
        				this.unitName = '元'
        			}else if(target.id == 'jiao'){
        				this.unit = 10
        				this.model = 2
        				this.unitName = '角'
        			}else if(target.id == 'fen'){
        				this.unit = 100
        				this.model = 3
        				this.unitName = '分'
        			}
        		}
        	},

			//获得最高返点
			getRebate(){
				var lotteryType = pei[this.currentLottery][this.gamePlayMethod][this.playMethodType]
				console.log('彩种玩法编号',lotteryType)
				var classId = this.currentLottery.slice(3)
				var data = {
					typeId:lotteryType,
					classId:classId,
				}
				this.getCurrentNum(data)
			},
			async getCurrentNum(idList) {
				var data = await api.ajax('lottery/type/findBonus', idList)
				if(data && data.code == '0'){
					this.maxs = Number(data.data.maxPoint)
					this.minBonus = Number(data.data.minBonus)
					this.bonusChangeUnit = Number(data.data.bonusChangeUnit)
				} else {
					errorMsg(data.msg)
				}
			},
			reduceRebates(){
				if (this.rebates>0) {
					var fandian = new Decimal(this.rebates)
					this.rebates = Number(fandian.sub("0.1"))
				}
			},
			addRebates(){
				if (this.rebates<this.maxs) {
					var fandian = new Decimal(this.rebates)
					this.rebates = Number(fandian.add("0.1"))
				}
			},
			setJiangjinTop(){
				this.rebates = 0
			},
			setFandianTop(){
				this.rebates = this.maxs
			},
			//减少倍数
			reduceNum(){
				if(this.multiple < 2){
					return
				}
				var beishu = new Decimal(this.multiple)
				this.multiple = Number(beishu.sub("1"))
			},
			//增加倍数
			addNum(){
				if(this.multiple > 99){
					return
				}
				var beishu = new Decimal(this.multiple)
				this.multiple = Number(beishu.add("1"))
			},
			//计算彩票倍数
			bettings(){
				var selected = this.$store.state.lottery.selected
                //计算倍数
                if(this.gamePlayMethod && this.currentLottery && this.playMethodType && selected){
                   var rst = bet[this.currentLottery][this.gamePlayMethod][this.playMethodType](selected)
               }
               rst = rst || {}
               this.count = rst.count || 0
               console.log('rst: ',rst)
               if(rst.msg){
                    errorMsg(rst.msg)
                } else if(this.count > 0){
                    this.betnumbers = rst.numbers
                    this.betnumbersChina = rst.numbers
                    if(this.gamePlayMethod == 'big_little_odd_even'||this.gamePlayMethod == 'pk10_guess_daxiao'||this.gamePlayMethod == 'pk10_guess_danshuang'){
                        var transition = []
                        for(var index in rst.numbers){
                            transition.push(this.changeBetName(rst.numbers[index]))
                        }
                        this.betnumbersChina = transition.join("")
                    }
                    if(rst.tzbs){
                        this.tzbs = rst.tzbs
                    }
                }
            },
            //大小单双转换
            changeBetName(value){
                switch (value){ 
                case '9' : return '大'; 
                case '1' : return '小'; 
                case '3' : return '单'; 
                case '2' : return '双'; 
                case '0' : return '';
                default :  return value; 
                } 
            },
            //添加投注号码
            addtz(){
                //判断是按钮还是输入框
                if(this.playMethodType && this.playMethodType.indexOf('single') > -1){
                	this.setImmediatelyBet(false)
                	var that = this
                	this.$nextTick(function () {
                		that.$root.$emit("single_plate")
                	})
                } else {
                	this.betmoney = this.money
                	this.addList()
                }
                
                console.log('保存返点',this.rebates )
            jquery(this.$refs.selected_list).mCustomScrollbar()
            },

            addList(){//判断是按钮还是输入框
                if(this.playMethodType && this.playMethodType.indexOf('single') > -1){
            		var inputboxInf = this.$store.state.lottery.curBetting
            		this.betnumbers = inputboxInf.betnumbers
                    this.betnumbersChina = inputboxInf.betnumbersChina
            		this.count = inputboxInf.count || 0
            		this.tzbs = inputboxInf.tzbs
            		this.betmoney = this.money
                }
            	var value = {}
                //检查投注号码
                if(this.count == 0 ){
                	errorMsg("请先正确选择号码！")
                	return
                }
                //球位
                if(!this.tzbs){
                    var tzbs = "0"
                    var ballposi = this.$store.state.lottery.selected["ballposi"]
                    if(ballposi && ballposi.length > 0){
                        tzbs = ballposi.join('')
                    }
                    value.tzbs = tzbs
                }else{
                	value.tzbs = this.tzbs
                }
                //玩法中文（直选复式）
                value.typeName = this.$store.state.lottery.ZWmethodType
                value.betnumbersName = this.betnumbers
                value.betnumbersNameChina = this.betnumbersChina
                this.betmoney = this.betmoney.toFixed(2)
                //总金额 = 投注金额 * 倍数
				var beishu = new Decimal(this.multiple)
                value.totalMoney = beishu.mul(this.betmoney)
                value.totalMoney = value.totalMoney.toFixed(2)
                value.multiple = this.multiple
                value.unitName = this.unitName
                value.count = this.count
                value.gid = (this.currentLottery).slice(3)
                value.gmcid = pei[this.currentLottery][this.gamePlayMethod][this.playMethodType]
                value.model = this.model
                this.clearSelected()
                this.clearBetting()
                this.betdata.push(value)
                this.setBetList(this.betdata)
                console.log(this.betdata)
                var that = this
                this.$nextTick(function () {
                	that.$root.$emit("clear_number")
                	that.clearBetNumber()

                })
            },
            clearBetNumber(){
            	this.count = 0
            	this.betmoney = 0
            	this.multiple = 1
            	this.tzbs = ''
            	this.lhcMoney = 0
            	this.betnumbers = ''
            	if(this.currentLottery == 'cai14'){
            		this.clearSelected()
            	}
            },
            deleteOne(value){
            	this.betdata.splice(value, 1)
                this.setBetList(this.betdata)
            },
            //list投注
            async bettingSelected(){
                this.surebetPrompt = false
                //一键投注检测this.count
            	var saveList = {}
            	saveList.classId = (this.currentLottery).slice(3)
            	saveList.numId = this.nowBetLotteryId
                    saveList.amountTotal = Number(this.amountTotal)
                if(this.currentLottery == 'cai14'){
                    saveList.point = 0
                }else{
                    saveList.point = (Number(this.maxs-this.rebates)).toFixed(1)
                }
            	var strArr = []
            	for(var index in this.betdata){
            		var pushArr ={
            			gid: this.betdata[index].gid,
            			gmcid: this.betdata[index].gmcid,
            			contents: this.betdata[index].betnumbersName,
            			zs: this.betdata[index].count,
            			bs: this.betdata[index].multiple,
						//圆角分
						model: this.betdata[index].model,
						//金额
						amount: this.betdata[index].totalMoney,
						//球位
						tzbs: this.betdata[index].tzbs,
					}
					strArr.push(pushArr)
				}
				saveList.strJson = JSON.stringify(strArr)
				console.log(saveList)
				var data = await api.ajax('order/save', saveList)
				if(data && data.code == '0'){
					succMsg(data.msg)
					this.clearAllList()
					var that = this
					this.$nextTick(function () {
						that.$root.$emit("gameBetRecord")
                        if(that.currentLottery == 'cai14'){
                        that.$root.$emit("clearLhcSelect")
                        }
					})
				} else {
					errorMsg(data.msg)
				}
			},
			//一键投注
			immediateBet(){
				//判断是按钮还是输入框
				if(this.playMethodType && this.playMethodType.indexOf('single') > -1){
					var inputboxInf = this.$store.state.lottery.curBetting
					this.betnumbers = inputboxInf.betnumbers
                    this.betnumbersChina = inputboxInf.betnumbersChina
					this.count = inputboxInf.count || 0
					this.tzbs = inputboxInf.tzbs
				}
                if( this.count == 0 ){
                    return errorMsg("请先正确选择号码！")
                }
                this.isYijianBet = true;
                this.alertinput.selectDetails = []
                this.alertinput.userName = this.$store.state.user.username
                var beishu = new Decimal(this.multiple)
                this.alertinput.amountTotal = Number(beishu.mul(this.money)).toFixed(2);
                this.alertinput.selectDetails.push(this.$store.state.lottery.ZWmethodType +' '+ this.betnumbersChina);
                this.surebetPrompt = true;
                jquery(this.$refs.selected_detail_list).mCustomScrollbar()
                //一键投注检测this.count
            },

            async sureBetOne(){
                this.surebetPrompt = false;
				var saveList = {}
				saveList.classId = (this.currentLottery).slice(3)
				saveList.numId = this.nowBetLotteryId
				var beishu = new Decimal(this.multiple)
                saveList.amountTotal = Number(beishu.mul(this.money))
				// saveList.amountTotal = this.money * this.multiple
				saveList.point = (Number(this.maxs-this.rebates)).toFixed(1)
				var nowTzbs = ''
                if(!this.tzbs){
                    var tzbs = "0"
                    var ballposi = this.$store.state.lottery.selected["ballposi"]
                    if(ballposi && ballposi.length > 0){
                        tzbs = ballposi.join('')
                    }
                    nowTzbs = tzbs
                }else{
                	nowTzbs = this.tzbs
                }
				var strArr = [{
					gid: (this.currentLottery).slice(3),
					gmcid: pei[this.currentLottery][this.gamePlayMethod][this.playMethodType],
					contents: this.betnumbers,
					zs: this.count,
					bs: this.multiple,
					//圆角分
					model: this.model,
					//金额
                	amount: saveList.amountTotal.toFixed(2),
					//球位
					tzbs: nowTzbs,
				}]
				saveList.strJson = JSON.stringify(strArr)
				console.log(saveList)
				var data = await api.ajax('order/save', saveList)
				if(data && data.code == '0'){
					succMsg(data.msg)
					var that = this
					this.$nextTick(function () {
						that.$root.$emit("clear_number")
						this.clearBetNumber()
                		this.clearBetting()
                		this.clearSelected()
                		that.$root.$emit("gameBetRecord")
					})
				} else {
					errorMsg(data.msg)
				}
			},

			//获取当前可投期号
			async getCurrentNumNext(){
			 	var parameter = {}
			 	parameter.classId = this.currentLottery.slice(3)
			 	var data = await api.ajax('lottery/findCurrentCanBet', parameter)
			 	if(data && data.code == '0'){
			 		if(!data.data){
			 			return
			 		}
			 		this.nowBetLotteryId = data.data.id
                    console.log(this.nowBetLotteryId)
                    this.alertinput.selectTitle = data.data.numTitle
			 	} else {
			 		errorMsg(data.msg)
			 	}
             },
            //投注按钮
            betButNow(isbet) {
                this.getCurrentNumNext()
                if(isbet == 'betList'){
                    var ArrangDetail = []
                    if(this.betdata.length == 0){
                        return errorMsg("请先正确选择号码！")
                    }
                    for( var index in this.betdata){
                        ArrangDetail.push(
                            this.betdata[index].typeName +' '+ this.betdata[index].betnumbersNameChina
                        )
                    }
                    this.alertinput.userName = this.$store.state.user.username
                    this.alertinput.amountTotal = this.amountTotal;
                    this.alertinput.selectDetails = ArrangDetail;
                    this.isYijianBet = false;
                    this.surebetPrompt = true;
                    this.$nextTick(function () {
                        jquery(this.$refs.selected_detail_list).mCustomScrollbar()
                    })
				}else{
					//判断是按钮还是输入框
					if(this.playMethodType && this.playMethodType.indexOf('single') > -1){
						this.setImmediatelyBet(true)
						var that = this
						this.$nextTick(function () {
							that.$root.$emit("single_plate")
						})
					}else{
						this.immediateBet()
					}
				}
			},
            switchYilouLengre(event){
                var elem = event.target
                if(!elem){
                  return
                }
                var tag = elem.tagName.toLowerCase()
                if(tag !== "span"){
                  return
                }
                if(jquery(elem).hasClass('yilou-bg')){
                    return
                }
                var name = jquery(elem).attr("name")
                if(name == "yilou"){
                    this.showYilou = true
                    this.yilouStatus = "leakDatas"
                    jquery(".yilou-bg").removeClass('yilou-bg')
                    jquery(elem).addClass("yilou-bg")
                } else if(name == "lengre"){
                    this.showYilou = false
                    this.yilouStatus = "hot30"
                    jquery(".yilou-bg").removeClass('yilou-bg')
                    jquery(elem).addClass("yilou-bg")
                }
            },
            detailSlice(value){
            	if(value.length > 20){
            		return value.substring(0,20)+'...'
            	}else {
            		return value
            	}
            },
            dialogSlice(value){
                if(value.length > 45){
                    return value.substring(0,45)+'...'
                }else {
                    return value
                }
            },
            switchLengre(event){
                var elem = event.target
                if(!elem){
                  return
                }
                var tag = elem.tagName.toLowerCase()
                if(tag !== "span"){
                  return
                }
                if(jquery(elem).hasClass('yilou-bg')){
                    return
                }
                var name = jquery(elem).attr("name")
                this.yilouStatus = name
                jquery(".yilou-bg", event.currentTarget).removeClass('yilou-bg')
                jquery(elem).addClass("yilou-bg")
            },

            judgeSureBet(){
                //判断是否是一键投注
                if(this.isYijianBet){
                    this.sureBetOne()
                }else{
                    this.bettingSelected()
                }
            },
            //投注时间到
            updateLotNew(){
                this.surebetPrompt = false
                this.zhuihao = false
                if(this.$store.state.lottery.clearInterval){
                    this.betOverPrompt = false
                } else {
                    this.betOverPrompt = true
                }
                this.threetimer = 3
                clearInterval(this.setClearTimer)
                this.setClearTimer = setInterval(this.threeSecond, 1000)
            },
            threeSecond(){
                this.threetimer--;
                if(this.threetimer <= 0){
                    this.betOverPrompt = false
                    clearInterval(this.setClearTimer)
                    this.getCurrentNumNext()
                }
            },
            //清空列表
            clearAllList(){
                this.betdata = [];
                this.clearBetList()
            },
            //打开追号页面
            gotozhuihao(){
                if(this.betdata.length < 1){
                    return errorMsg("请选择正确的追号号码！")
                }
                if(this.betdata.length > 1){
                    return errorMsg("追号只能投单注！")
                }
                this.zhuihao=true
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("getCanZhuihao")
                })
            },
            //追号投注
            betZhuiHao(){
                var that = this
                this.$nextTick(function () {
                    that.$root.$emit("chaseImmediate")
                })
            },
            //关闭追号弹框
            closeZhuihaodialog(){
                this.zhuihao = false
            },
            //六合彩投注
            betLHC(){
                this.betdata = this.$store.state.lottery.lhcBetList
                this.betButNow('betList')
            },
		},
	}
</script>
<style scoped>
</style>
