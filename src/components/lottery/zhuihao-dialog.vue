 <template>
 	<div class="dialog-size translate3d-zero">
 		<div class="zhuihao-describe">
 			<div class="select-stop-zhuihao" :class="{ 'selected-box-check': isAutoStop }" @click.stop="isAutoStop=!isAutoStop"></div>
 			<span class="big-red-font f-16">中奖后停止追号</span> 
 			<span class="little-gray-font f-12">（最多追号100期,您本次追号的单倍注数为： <span class="big-red-font
big-red-font">{{zhushu}}</span> 注）</span>
 			<el-button v-if="!isDouble" class="my-fanbei" type="text" size="mini" @click.stop="doubleBet">翻倍追号</el-button>
 			<el-button v-else class="my-fanbei" type="text" size="mini" @click.stop="firstBet">同倍追号</el-button>
 		</div>
 		<div ref="zhuiTable" class="zhuihao-table">
 		<table class=" t-a-c">
 			<tbody ref="chaseNumberBar">
 				<tr>
 					<td class="xuhao">序号</td>
 					<td class="zhuihaoqi">
 						追号期数
 						<input class="top-tongji t-a-c" :value="qishu" @keyup.stop="zuijiaQishu">
 					</td>
 					<td class="zhuihaoqi multiple-tongji">
	 					<div class="f-l sta-multiple">
	 						倍数
							<input class="top-tongji t-a-c" :value="multiple" @keyup.stop="zuijiaBeishu">
	 						倍
 						</div>
 					</td>
 					<td>投入合计{{allMoney}}{{danwei}}</td>
 				</tr>
 				<tr v-for="(item, index) in chaseNumber">
 					<td>{{Number(index)+1}}</td>
 					<td>
						<span class="select-stop-zhuihao" :class="{ 'selected-box-check': item.checked }" @click.stop="addSelect(index)"></span>{{item.titleCode}}
 					</td>
 					<td>
 						<div class="f-l input-box">
	 						<div class="low-multiple f-l" @click.stop="mlDwon(index)"></div>
							<input :id="'ml' + item.id" class="zhuibeishu-input f-l t-a-c" @keyup.stop="setItemMultiple(index, item.id)" :value="item.multiple">
	 						<div class="add-multiple f-l" @click.stop="mlUp(index)"></div>
 						</div>
 					</td>
 					<td>
 						<img src="../../images/imgHuobi.png">
						<input :id="'my' + item.id" disabled="disabled" class="zhuibeishu-input width82 t-a-c" :value="item.money">
 						<span>{{danwei}}</span>
 					</td>
 				</tr>
 			</tbody>
 		</table>
 		</div>
 	</div>
 </template>
 <script lang="babel">
 	import api from '../../api'
    import { errorMsg, succMsg, removeClass,toggleClass, addClass, hasClass } from "../../tools/command"
	import { mapActions } from 'vuex'
	import jquery from 'jquery'
	import fullpage from 'fullpage.js'
	import mousewheel from 'jquery-mousewheel'
	import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
	import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
	import lotteryType from './order-type-constants'
 	export default {
 		name : "zhuihao-dialog",
		// props: {
		// 	datas: Object,
		// },
		mounted: function () {
			jquery(this.$refs.zhuiTable).mCustomScrollbar()
			this.$root.$on("getCanZhuihao", this.getCanZhuihao)
			this.$root.$on("chaseImmediate", this.chaseImmediate)
		},
		beforeDestroy(){
			this.$root.$off("getCanZhuihao", this.getCanZhuihao)
			this.$root.$off("chaseImmediate", this.chaseImmediate)
		},
		data() {
			return {
				chaseNumber: [],
				qishu: '',
				multiple : 1,
				allMoney : 0,
				baseMoney : 0,
				isAutoStop: true,
				curAct : '',
				isDouble: false,
			}
		},
		computed : {
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
			gamePlayMethod(){
				return this.$store.state.lottery.gamePlayMethod
			},
			playMethodType(){
				return this.$store.state.lottery.playMethodType
			},
			zhushu(){
				if(this.$store.state.lottery.betList.length > 0){
				   // this.$forceUpdate()
				   this.getCanZhuihao()
				   this.allMoney = 2 * this.$store.state.lottery.betList[0].count
			       this.baseMoney =  2 * this.$store.state.lottery.betList[0].count
			       this.multiple = 1
				   this.qishu = 1
				   this.isAutoStop = true
				   return this.$store.state.lottery.betList[0].multiple
				}
				return 0
			},
			danwei(){
				if(this.$store.state.lottery.betList.length > 0){
					return this.$store.state.lottery.betList[0].unitName
				}
				return 0
			},
		},
        watch : {
        },
		methods: {
        	...mapActions({
        		setNowLotteryId: 'setNowLotteryId',
        	}),
        	//归位
        	goHoming(){
			   this.allMoney = 2 * this.$store.state.lottery.betList[0].count
		       this.baseMoney =  2 * this.$store.state.lottery.betList[0].count
		       this.multiple = 1
			   this.qishu = 1
			   this.isAutoStop = true
        	},
        	//获取id
	        async chaseImmediate(){
	            var that = this
	            var para = {}
	            para.classId = this.currentLottery.slice(3)
	        	var data = await api.ajax('lottery/findCurrentInfo', para)
                if(data && data.code == '0'){
                    that.curAct = data.data.numId
                    that.submitChase()
                } else {
                    errorMsg(data.msg)
                }
	        },
	        getNumIds(){
	        	var rst = ''
	        	this.chaseNumber.forEach( function(element, index) {
	        		if(element.checked){
	        			rst = rst + element.id + ','
	        		}
	        	})
	        	return rst
	        },
	        getMultiples(){
	        	var rst = ''
	        	this.chaseNumber.forEach( function(element, index) {
	        		if(element.checked){
	        			rst = rst + element.multiple + ','
	        		}
	        	})
	        	return rst
	        },
	        //提交
	        async submitChase(){
	        	var actIds = this.getNumIds()
	        	if(!actIds){
	        		errorMsg("您还没有选择要追的期号，不能进行追号操作！")
	        		return
	        	}
	        	var betObj = this.$store.state.lottery.betList[0]
	        	var parameter = {}
	        	parameter.classId = this.currentLottery.slice(3)
	        	parameter.actCount = this.qishu
	        	parameter.orderCount = betObj.count
	        	parameter.singleMoney = betObj.model
	        	parameter.sumMoney = this.allMoney
	        	parameter.point = 0.0

	        	var isBingoStop = this.isAutoStop ? 1 : 0
	        	parameter.isBingoStop = isBingoStop
	        	parameter.numIds = actIds.slice(0, -1)
	        	parameter.multiples = this.getMultiples().slice(0, -1)

	        	var para = []
	        	var that = this
	            this.$store.state.lottery.betList.forEach(function(value, index) {
	                var item = {}
	                item.gid = value.gid
	                item.gmcid = lotteryType[that.currentLottery][that.gamePlayMethod][that.playMethodType]
	                item.contents = value.betnumbersName
	                item.lid = that.curAct
	                item.zs = value.count
	                item.bs = value.multiple
	                item.model = value.model
	                item.amount = value.totalMoney
	                item.tzbs = value.tzbs
	                para.push(item)
	            })
	        	parameter.strJson = JSON.stringify(para)
	        	var data = await api.ajax('order/saveFollow', parameter)
                    if(data && data.code == '0'){
                        succMsg(data.msg)
                        that.closeChase()
                    } else {
                        errorMsg(data.msg)
                    }
	        },
	        //关闭追号弹窗
	        closeChase(){
	        	var that = this
	        	this.$nextTick(function () {
	                that.$root.$emit("closeZhuihaodialog")
	            })
	        },
        	//勾选彩票期数
	        addSelect(index){
	        	var obj = this.chaseNumber[index]
				 obj.checked = !obj.checked
				 if(obj.checked){
				 	obj.multiple = this.multiple
				 	obj.money = obj.multiple * this.baseMoney
				 } else {
				 	obj.multiple = 0
				 	obj.money = 0
				 }
				 this.calcAllMoney()
	        },
        	//获取单号
        	async getCanZhuihao () {
        		this.goHoming()
	        	var parameter = {}
	        	parameter.classId = this.currentLottery.slice(3)
        		var that = this
	        	var data = await api.ajax('lottery/listCanBet', parameter)
				if(data && data.code == '0'){
					this.chaseNumber.splice(0, this.chaseNumber.length, ...data.data)
					this.chaseNumber.forEach( function(element, index) {
						if(index == 0){
							element.checked = true
							element.multiple = 1
							element.money = that.allMoney * element.multiple
						} else {
							element.checked = false
							element.multiple = 0
							element.money = 0
						}
					})
				} else {
					errorMsg(data.msg)
				}
	        },
	        //输入追号期数
	        zuijiaQishu(event){
	        	var obj = event.target
	        	var objValue = obj.value
	        	var re = /\D+/g
				objValue = objValue.replace(re, '')
	        	if(!objValue){
	        		objValue = 1
	        	}
	        	if(objValue > 100){
	        		objValue = 100
	        	}
	        	this.qishu = objValue
	        	this.clearData()
	        	var that = this
	        	this.chaseNumber.forEach(function(element, index) {
	        		if(index <= objValue -1 ){
		        		element.checked = true
		        		element.multiple = that.multiple
					 	element.money = element.multiple * that.baseMoney
	        		}
	        	})
	        	this.calcAllMoney()
	        },

	        calcAllMoney(){
	           var that = this
	           var count = 0
	           var qishu = 0
	           this.chaseNumber.forEach( function(element, index) {
	           	    if(element.checked){
	           	    	count += element.multiple * that.baseMoney
	           	    	qishu ++
	           	    }
	           })
	           this.allMoney = count
	           this.qishu = qishu
	        },
	        //清空期号选择
	        clearData(){
	        	this.chaseNumber.forEach( function(element, index) {
	        		element.checked = false
	        		element.multiple = 0
				 	element.money = 0
	        	})
	        },
	        //输入该期号的追号倍数
	        setItemMultiple(index, id){
	        	var obj = this.chaseNumber[index]
	        	if(obj.checked){
		        	var cn = this.$refs.chaseNumberBar.querySelector("#ml"+id)
					var cnValue = cn.value
					var re = /\D+/g
					cnValue = cnValue.replace(re, '')
					if(!cnValue){
						cnValue = 1
					}
					cn.value = cnValue
					obj.multiple = cnValue
				 	obj.money = obj.multiple * this.baseMoney
				 	this.calcAllMoney()
	        	} else {
	        		obj.multiple = 0
				 	obj.money = 0
	        	}
	        },
	        //减少追号倍数
	        mlDwon(index){
	        	var obj = this.chaseNumber[index]
	        	if(obj.checked){
	        		if(obj.multiple > 1){
	        			obj.multiple = obj.multiple - 1
	        			obj.money = obj.multiple * this.baseMoney
	        			this.chaseNumber.splice(index, 1, obj)
	        			this.calcAllMoney()
	        		}
	        	}
	        },
        	//增加追号倍数
	        mlUp(index){
	        	var obj = this.chaseNumber[index]
	        	if(obj.checked){
	    			if(obj.multiple < 999999){
	    			   obj.multiple = obj.multiple - 1 + 2
	    			}
	    			obj.money = obj.multiple * this.baseMoney
	    			this.chaseNumber.splice(index, 1, obj)
	    			this.calcAllMoney()
	        	}
	        },
	        //输入追号倍数
	        zuijiaBeishu(event){
	        	var obj = event.target
	        	var objValue = obj.value
	        	var re = /\D+/g
				objValue = objValue.replace(re, '')
	        	if(!objValue){
	        		objValue = 1
	        	}
	        	this.multiple = objValue
	        	var that = this
	        	this.chaseNumber.forEach(function(element, index) {
	        		if(element.checked){
		        		element.multiple = that.multiple
					 	element.money = element.multiple * that.baseMoney
	        		}
	        	})
	        	this.calcAllMoney()
	        },
	        //翻倍追号
	        doubleBet(){
	        	this.isDouble = true
	        	var objValue = 10
	        	this.qishu = objValue
	        	this.clearData()
	        	var that = this
	        	this.chaseNumber.forEach(function(element, index) {
	        		if(index <= objValue -1 ){
		        		element.checked = true
		        		element.multiple = that.multiple*Math.pow(2,index)
					 	element.money = element.multiple * that.baseMoney
	        		}
	        	})
	        	this.calcAllMoney()
	        },
	        firstBet(){
	        	this.isDouble = false
	        	var objValue = 10
	        	this.qishu = objValue
	        	this.clearData()
	        	var that = this
	        	this.chaseNumber.forEach(function(element, index) {
	        		if(index <= objValue -1 ){
		        		element.checked = true
		        		element.multiple = that.multiple
					 	element.money = element.multiple * that.baseMoney
	        		}
	        	})
	        	this.calcAllMoney()
	        },
        },
    }
</script>
<style scoped>
.dialog-size{
	height: 458px;
	width: 543px;
	font-family: SimSun, 宋体, STSong, 华文宋体;
}
.zhuihao-describe{
	height: 45px;
	line-height: 45px;
	padding-left: 10px;
}
.select-stop-zhuihao{
	cursor:pointer;
	display: inline-block;
	height: 20px;
	width: 20px;
	background-image: url(../../images/btnDagou.png);
	background-repeat: no-repeat;
	position: relative;
    top: 5px;
    margin-right: 10px;
}
.selected-box-check{
	background-image: url(../../images/btnDagou_dianji.png)!important;
}
.big-red-font{
	color: #ff0000;
}
.little-gray-font{
	color: #a0a1a4;
}
.zhuihao-table{
	height: 400px;
	width: 540px;
	border: 1px solid #d9dadf;
}
.zhuihao-table table{
	border-collapse: collapse;
	width: 523px;
}
.zhuihao-table td{
	border: 1px solid #d9dadf;
	height: 34px;
	line-height: 34px;
}
.xuhao{
	width: 42px;
}
.zhuihaoqi{
	width: 160px;
}
.zhuibeishu-input{
	width: 48px;
	height: 25px;
	margin: 0 5px;
	border: 1px solid #c7c9cb;
	position: relative;
    bottom: 2px;
    border-radius: 3px;
    background-color: #ffffff;
}
.width82{
	width: 82px!important;
	bottom: 0px!important;
}
.top-fivepx{
	position: relative;
    top: 5px;
}
.top-tongji{
	display: inline-block;
	height: 25px;
	width: 48px;
	border: 1px solid #c7c9cb;
	line-height: 25px;
	border-radius: 5px;
	background-color: #ffffff;
}
.multiple-tongji{
	margin-left: -2px;
}
.low-multiple{
	cursor:pointer;
	display: inline-block;
	background-image: url(../../images/btnJian01.png);
	background-repeat: no-repeat;
	height: 26px;
	width: 26px;
}
.low-multiple:hover{
	background-image: url(../../images/btnJian02.png)!important;
}
.add-multiple{
	cursor:pointer;
	display: inline-block;
	background-image: url(../../images/btnJia01.png);
	background-repeat: no-repeat;
	height: 26px;
	width: 26px;
}
.add-multiple:hover{
	background-image: url(../../images/btnJia02.png)!important;
}
.input-box{
	margin-left: 23px;
	position: relative;
    top: 2px;
}
.sta-multiple{
	margin-left: 20px;
	position: relative;
    top: 2px;
}
.f-l{
	float: left;
}
.my-fanbei{
	margin-left: 15px;
}
</style>
