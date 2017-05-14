<template>
<div>
	<div class="content-tips">
		<div class="tips">
			<div class="tips-left">
				<ul>
					<li>
						<span class="formTit marginLeft14">订单号：</span>{{orderData.id}}
					</li>
					<li>
						<span class="formTit">投注金额：</span>{{orderData.amount}}
					</li>
				</ul>
			</div>
			<div class="tips-middle">
				<ul>
					<li style="white-space: nowrap">
						<span class="formTit">开奖号码：</span>{{orderData.openNum}}
					</li>
					<li>
						<span class="formTit">中奖金额：</span>{{orderData.bingoMoney}}
					</li>
				</ul>
			</div>
			<div class="tips-right">
				<ul>
					<li>
						<span class="formTit"></span>
					</li>
					<li>
						<span class="formTit" style="margin: 0">盈亏金额：</span>{{orderData.resultMoney}}
					</li>
				</ul>
			</div>
			<img v-if="orderData.bingoFlag ==0" src="../../images/imgWeiKaiJiang.png">
			<img v-if="orderData.bingoFlag ==1" src="../../images/imgYiZhongJiang.png">
			<img v-if="orderData.bingoFlag ==2" src="../../images/imgWeiZhongJiang.png">
			<img v-if="orderData.bingoFlag ==3" src="../../images/imgZhongJiangZhuiTing.png">
			<img v-if="orderData.bingoFlag ==4"  src="../../images/imgYiCheDan.png">
		</div>
	</div>
	<div class="orderContent">
		
		<div class="orderData-content">
			<div class="content-left">
				<ul>
					<li>
						<span class="formTit">彩票名称：</span>{{orderData.className}}
					</li>
					<li>
						<span class="formTit">投注期号：</span>{{orderData.numTitle}}
					</li>
					<li>
						<span class="formTit">投注数量：</span>{{orderData.orderCount}}
					</li>
					<li>
						<span class="formTit">投注倍数：</span>{{orderData.multiple}}
					</li>
					<li>
						<span class="formTit">元角模式：</span>
						<span class="singleMoney" v-if="orderData.singleMoney == 1 || orderData.singleMoney == 2">元</span>
						<span class="singleMoney" v-if="orderData.singleMoney == 0.1 || orderData.singleMoney == 0.2">角</span>
						<span class="singleMoney" v-if="orderData.singleMoney == 0.01 || orderData.singleMoney == 0.02">分</span>
					</li>
				</ul>
			</div>
			<div class="content-right">
				<ul>
					<li>
						<span class="formTit">玩法名称：</span>{{orderData.typeName}}
					</li>
					<li>
						<span class="formTit">下单时间：</span>{{orderData.addTime}}
					</li>
					<li>
						<span class="formTit">返点金额：</span>{{orderData.pointMoney}}
					</li>
					<li>
						<span class="formTit">中奖倍数：</span>{{orderData.bingoCount}}
					</li>
					<li>
						<span class="formTit">单注奖金：</span>{{orderData.bonus}}
					</li>
				</ul>
			</div>
			<div class="lotteryNum">
				<span class="formTit top60">投注号码：</span>
				<textarea disabled v-if="orderData.typeName =='前二大小单双'" v-text="filter(orderData.orderValue)"></textarea>
				<textarea disabled v-if="orderData.typeName =='后二大小单双'" v-text="filter(orderData.orderValue)"></textarea>
				<textarea disabled v-if="orderData.typeName =='特码大小单双'" v-text="filter(orderData.orderValue)"></textarea>
				<textarea disabled v-if="orderData.typeName !='前二大小单双' && orderData.typeName !='特码大小单双' && orderData.typeName !='后二大小单双'" v-text="orderData.orderValue"></textarea>
			</div>
			<div class="cancelOrderBtn" @click.stop="cancelOrder"></div>
			<div class="closeBtn" @click.stop="close"></div>
		</div>
	</div>
</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { winHeight, exchange, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	import { mapActions } from 'vuex'
	export default {
		name: 'orderDetail',
		mounted() {
			this.getOrderData()
			this.$root.$on("order-detail-init",this.getOrderData)
		},
		beforeDestroy() {
			this.$root.$off("order-detail-init",this.getOrderData)
		},
		data() {
			return {
				form: {},
				orderData: {},
				unclick: true,
			}
		},
		methods: {
			...mapActions({
				setFirstView : 'setFirstView',
			}),
			async getOrderData(){
				this.form.orderId = this.$store.state.useraction.lotteryOrderId;
                var orderData = await api.ajax('order/findDetail', this.form)
                if(orderData && orderData.code == '0'){
                    this.orderData = orderData.data
                } else {
                    errorMsg(orderData.msg)
                }
            },
            async cancelOrder() {
            	if (this.orderData.bingoFlag ==0) {
            		this.form.orderId = this.orderData.id;
                	var cancelOrderData = await api.ajax('order/cancel', this.form)
                	if(cancelOrderData && cancelOrderData.code == '0'){
                    	succMsg(cancelOrderData.msg)
                	} else {
                    	errorMsg(cancelOrderData.msg)
                	}
            	} else {
            		return
            	}
            	
            },
            filter (val) {
                return exchange(val)
            },
			close() {
				var that  = this;
				this.$nextTick(function(){
			  		that.$root.$emit("closeLotteryDialog-init")
				})
			},
		},
	}
</script>
<style scoped>
	.tips {
		width: 539px;
		height: 51px;
		display: inline-block;
    	position: relative;
    	top: 8px;
    	left: 22px;
    	padding: 10px 12px;
	}
	.tips .formTit {
		margin-right: 0; 
	}
	.marginLeft14 {
		margin-left: 14px; 
	}
	.tips-left  {
		display: inline-block;
		width: 150px;
	}
	.tips-left li {
		height: 26px;
		line-height: 26px;
	}
	.tips-middle  {
		display: inline-block;
		width: 170px;
	}
	.tips-middle li {
		height: 26px;
		line-height: 26px;
	}
	.tips-right  {
		display: inline-block;
		width: 150px;
	}
	.tips-right li {
		height: 26px;
		line-height: 26px;
	}
	.tips img {
		height: 46px;
		position: relative;
		top: 2px;
	}
	.orderContent {
		background-color: #f6f9fd;
    	border-bottom-left-radius: 5px;
    	border-bottom-right-radius: 5px;
    	border: solid 1px #676770;
    	border-top: none;
	}
	.content-tips {
		width: 602px;
		height: 98px;
		background-image: url('../../images/imgCaiPiaoDingDanDi.png');
	}
	.orderData-content {
		height: 315px;
		padding: 8px 27px 10px 31px;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #212123;
		background-color: #f7f9fe;
		border-bottom-right-radius: 5px !important;
		border-bottom-left-radius: 5px !important;
	}
	.formTit {
		margin-right: 23px; 
		color: #65646a;
	}
	.content-left {
		display: inline-block;
		width: 233px;
	}
	.content-left li {
		height: 26px;
		line-height: 26px;
	}
	.singleMoney {
		position: relative;
		right: 6px;
	}
	.content-right  {
		display: inline-block;
		width: 282px;
	}
	.content-right li {
		height: 26px;
		line-height: 26px;
	}
	.top60 {
		position: relative;
		top: 60px;
	}
	.lotteryNum textarea {
		width: 445px;
		height: 112px;
		border-color: #e1e1eb;
		resize: none;
		outline: none;
		position: relative;
		left: 90px;
		background-color: #fff;
	}
	.cancelOrderBtn {
		width: 97px;
		height: 38px;
		display: inline-block;
		position: relative;
		top: 11px;
		left: 151px;
		background-image: url('../../images/btnCheDan01.png');
	}
	.cancelOrderBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnCheDan02.png');
	}
	.closeBtn {
		width: 97px;
		height: 38px;
		display: inline-block;
		position: relative;
		top: 11px;
		left: 187px;
		background-image: url('../../images/btnGuanBi01.png');
	}
	.closeBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnGuanBi02.png');
	}
</style>