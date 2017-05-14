<template>
	<div>
		<div class="top-nav f-14" @click.prevent="changeGameRecord">
			<div id="gameRecord" class="top-but border-top">游戏记录</div>
			<div id="followRecord" class="top-but">追号记录</div>
			<div id="gameOpenRecord" class="top-but">开奖记录</div>
		</div>
		<table class="table-size t-a-c" v-if="judgeNews == '1'">
			<tr class="f-14">
				<td>玩法</td>
				<td>期号</td>
				<td>盈亏</td>
			</tr>
			<tr class="f-14 record-list" v-for="(item, index) in listData"  @click.prevent="openRecordDetail(item.id)">
				<td>
					<span :title="item.typeName">{{item.typeName}}</span>
				</td>
				<td>{{item.numTitle}}</td>
				<td class="red-color">{{item.bingoFlag=='0'||item.bingoFlag=='3'||item.bingoFlag=='4'?judgeType(item.bingoFlag):item.resultMoney}}</td>
			</tr>
		</table>
		<table class="table-size t-a-c" v-if="judgeNews == '2'">
			<tr class="f-14">
				<td>玩法</td>
				<td>进度</td>
				<td>状态</td>
				<td>盈亏</td>
			</tr>
			<tr class="f-14 record-list" v-for="(item, index) in listData" @click.prevent="openFllowDetail(item.id)">
				<td>
					<span :title="item.typeName">{{lengthSlice(item.typeName)}}</span>
				</td>
				<td>{{item.kjCount}}/{{item.actCount}}期</td>
				<td>{{judgeChase(item.state)}}</td>
				<td class="red-color">{{reshares(item.bingoMoney, item.kjMoney)}}</td>
			</tr>
		</table>
		<table class="table-size t-a-c" v-if="judgeNews == '3'">
			<tr class="f-14">
				<td class="qihao">期号</td>
				<td>开奖号码</td>
			</tr>
			<tr class="f-14" v-for="(item, index) in listData" >
				<td>{{item.numTitle}}</td>
				<td>{{item.openNum}}</td>
			</tr>
		</table>
		<span @mouseenter="animate" @mouseleave="leave" class="f-14 shuaxin" @click.prevent="gameBetRecord"><img src="../../images/imgShuaXin.png">刷新</span>
		<span class="f-14 more" @click.prevent="checkMore(judgeNews)">更多...</span>
	</div>
</template>
<script lang="babel">
	import { removeClass,toggleClass, addClass, errorMsg } from "../../tools/command"
	import jquery from 'jquery'
	import api from '../../api'
    import Decimal from 'decimal.js'
    import { mapActions } from 'vuex'
	export default {
		name : "game-record",
		// props: {
		// 	datas: Object,
		// },
		mounted: function () {
			this.gameBetRecord()
			this.$root.$on("gameBetRecord", this.gameBetRecord)
        },
        beforeDestroy(){
        	this.$root.$off("gameBetRecord", this.gameBetRecord)
        },
		data() {
			return {
				listData: [],
				judgeNews:'1',
			}
		},
		computed : {
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
		},
		watch : {
        	"currentLottery": function(value,old){
        		this.gameBetRecord()
        	},
		},
		methods: {
			...mapActions({
				setDiaView : 'setDiaView',
				setFirstView : 'setFirstView',
				setGamerecordView : 'setGamerecordView',
        		setLotteryRecordView : 'setLotteryRecordView',
				setTopDialogVisiable : 'setTopDialogVisiable',
				setLotteryOrderId : 'setLotteryOrderId',
        		setOpenRecordType : 'setOpenRecordType',
			}),
			judgeType(value){
				switch(value){
					case 0:
						return "未开奖";
					case 1:
						return "中奖";
					case 2:
						return "未中奖";
					case 3:
						return "中奖追停";
					case 4:
						return "撤单";
					default:
					  	return
				}
			},
			changeGameRecord(e){
				const target = e.target
				var allArray = target.parentNode.children;
				var liClear = Array.prototype.slice.call(allArray)
				liClear.forEach( function(element, index) {
					removeClass(element, 'border-top')
				})
				addClass(target, "border-top")
				switch(target.id){
					case 'gameRecord':
						this.judgeNews = '1'
						break;
					case 'followRecord':
						this.judgeNews = '2'
						break;
					default:
						this.judgeNews = '3'
						break;
				}
				this.gameBetRecord()
			},
			animate(event){
                var elem = event.target
                if(!elem){
                  return
                }
                var tag = elem.tagName.toLowerCase()
                if(tag == "span"){
                  jquery("img", elem).addClass('animated infinite bounce')
                }
            },
            leave(event){
                var elem = event.target
                if(!elem){
                  return
                }
                jquery("img", elem).removeClass('animated infinite bounce')
            },
            async gameBetRecord(){
            	var applyUrl = ''
            	var transmit = {}
            	if(this.judgeNews == '1'){
            		applyUrl = 'record/listLotteryBet'
            	}else if(this.judgeNews == '2'){
            		applyUrl = 'record/listLotteryFollow'
            	}else if(this.judgeNews == '3'){
            		applyUrl = 'lottery/num/listRecentOpen'
            	}
            	transmit.classId = this.$store.state.lottery.currentLottery.slice(3)
				var data = await api.ajax( applyUrl , transmit)
				if(data && data.code == '0'){
					if(!data.data){
						return
					}
					this.listData = data.data
				} else {
					errorMsg(data.msg)
				}
            },
            judgeChase(value){
				switch(value){
					case 0:
						return "进行";
					case 1:
						return "完成";
					case 2:
						return "撤销";
					default:
					  	return
				}
            },
            reshares(value1, value2){
            	if(value1 == undefined || value2 == undefined){
            		return
            	}
	            var minuend = new Decimal(value1)
	            var sum = minuend.sub(value2) //减
	            return Number(sum)
            },
            checkMore(value) {
            	this.setTopDialogVisiable(true)
            	this.setDiaView('account')
            	if (value == '1') {
            		var that = this;
	                this.$nextTick(function(){
	                    that.$root.$emit("changeActiveNameBet")
	                })
            		this.setFirstView('game-bet-record')
            		this.setGamerecordView('lottery-record')
            		this.setLotteryRecordView('lottery-bet-record')
            	} else if (value == '2') {
            		var that = this;
	                this.$nextTick(function(){
	                    that.$root.$emit("changeActiveNameFollow")
	                })
					this.setFirstView('game-bet-record')
        			this.setGamerecordView('lottery-record')
        			this.setLotteryRecordView('lottery-follow-record')
            	} else if (value == '3') {
            		var that = this;
	                this.$nextTick(function(){
	                    that.$root.$emit("changeActiveNameFollow")
	                })
            		this.setFirstView('game-bet-record')
            		this.setGamerecordView('lottery-record')
            		this.setLotteryRecordView('lottery-follow-record')
            	}
            },
            //打开详情页
            openRecordDetail(id){
        		this.setOpenRecordType(true)
            	this.setTopDialogVisiable(true)
            	this.setDiaView('account')
        		this.setFirstView('game-bet-record')
        		this.setGamerecordView('lottery-record')
        		this.setLotteryRecordView('lottery-bet-record')
        		this.setLotteryOrderId(id)
        		var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("changeActiveNameBet")
                })
            },
            openFllowDetail(id){
        		this.setOpenRecordType(true)
            	this.setTopDialogVisiable(true)
            	this.setDiaView('account')
				this.setFirstView('game-bet-record')
    			this.setGamerecordView('lottery-record')
    			this.setLotteryRecordView('lottery-follow-record')
        		this.setLotteryOrderId(id)
        		var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("changeActiveNameFollow")
                })
            },
            //过长截取
            lengthSlice(value){
            	if(value){
            	if(value.length > 8){
            		return value.substring(0,8)+'...'
            	}else {
            		return value
            	}
            	}
            	
            },
		},
	}
</script>
<style scoped>
	.top-nav{
		height: 35px;
		width: 100%;
	}
	.top-nav div{
		text-align: center;
		height: 31px;
		display: inline-block;
		line-height: 31px;
		cursor:pointer;
	}
	.top-nav div:hover{
		color: #3d5290;
	}
	.top-but{
		border-top: 4px solid transparent;
		width: 87px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		font-weight:bold;
		color: #7f7f7f;
	}
	.table-size{
		color: #424242;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		margin-top: 2px;
		width: 321px;
		border-collapse:collapse;
        table-layout: auto;
	}
	.table-size tr:hover{
		background-color: rgb(241, 241, 241);
	}
	td{
		height: 24px;
		line-height: 24px;
	}
	.qihao{
		width: 130px;
	}
	.touzhu{
		width: 65px;
	}
	.zhuangtai{
		width: 75px;
	}
	.shuaxin{
		color: #424242;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		cursor:pointer;
		line-height: 28px;
	    position: absolute;
	    bottom: 0px;
		left: 10px;
	}
	.shuaxin img{
		position: relative;
		top: 2px;
		margin-right: 5px;
	}
	.more{
		color: #424242;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		cursor:pointer;
		line-height: 28px;
	    position: absolute;
	    bottom: 0px;
	    right: 10px;
	}
	.record-list{
		cursor:pointer;
	}
</style>
