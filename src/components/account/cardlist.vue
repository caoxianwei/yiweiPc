<template>
	<div class="cardList">
		<ul>
			<li v-for="item in cardList">
				<div class="cardTitle">
					<img class="bankLogo" v-if="item.bankName == '中国工商银行'" src="../../images/banklogo/imgGongShang.png">
					<img class="bankLogo" v-if="item.bankName == '招商银行'" src="../../images/banklogo/imgZhaoShang.png">
					<img class="bankLogo" v-if="item.bankName == '中国银行'" src="../../images/banklogo/imgZhongGuo.png">
					<img class="bankLogo" v-if="item.bankName == '北京银行'" src="../../images/banklogo/imgBeiJing.png">
					<img class="bankLogo" v-if="item.bankName == '中国光大银行'" src="../../images/banklogo/imgGuangDa.png">
					<img class="bankLogo" v-if="item.bankName == '广东发展银行'" src="../../images/banklogo/imgGuangFa.png">
					<img class="bankLogo" v-if="item.bankName == '华夏银行'" src="../../images/banklogo/imgHuaXia.png">
					<img class="bankLogo" v-if="item.bankName == '中国建设银行'" src="../../images/banklogo/imgHuaXia.png">
					<img class="bankLogo" v-if="item.bankName == '交通银行'" src="../../images/banklogo/imgGuangDa.png">
					<img class="bankLogo" v-if="item.bankName == '中国民生银行'" src="../../images/banklogo/imgGongShang.png">
					<img class="bankLogo" v-if="item.bankName == '农村信用合作社'" src="../../images/banklogo/imgNongCunXinYong.png">
					<img class="bankLogo" v-if="item.bankName == '中国农业银行'" src="../../images/banklogo/imgNongYe.png">
					<img class="bankLogo" v-if="item.bankName == '平安银行'" src="../../images/banklogo/imgPinAn.png">
					<img class="bankLogo" v-if="item.bankName == '上海浦东发展银行'" src="../../images/banklogo/imgPuFa.png">
					<img class="bankLogo" v-if="item.bankName == '上海农村商业银行'" src="../../images/banklogo/imgShangHaiNongCunShangYe.png">
					<img class="bankLogo" v-if="item.bankName == '深圳发展银行'" src="../../images/banklogo/imgShenZhenFaZhan.png">
					<img class="bankLogo" v-if="item.bankName == '兴业银行'" src="../../images/banklogo/imgXingYe.png">
					<img class="bankLogo" v-if="item.bankName == '中国邮政储蓄银行'" src="../../images/banklogo/imgYouZheng.png">
					<img class="bankLogo" v-if="item.bankName == '中信银行'" src="../../images/banklogo/imgZhongXing.png">
					<span class="bankName">{{item.bankName}}</span>
					<img class="bankType" src="../../images/imgChuXuKa.png">
				</div>
				<div class="cardContent">
					<span class="cardNumber">{{filterNumber(item.account)}}</span>
					<span class="manage">管理</span>
					<span class="cardOwner">{{item.kaihuName}}</span>
				</div>
				<div class="addTime">添加时间：{{item.addTime}}</div>
			</li>
			<div class="addcardBtn" @click.stop="addCard">
				<img src="../../images/imgTianJia.png">
				<span>添加银行卡</span>
			</div>
		</ul>
		<div class="listInfo">
			<div class="infoName">
				<img class="infoNameLogo" src="../../images/imgNiMingYongHu.png">
				<span>匿名用户</span>
				<span class="unknownName">{{unknownName}}</span>
			</div>
			<div class="infoCard">
				<img class="cardLogo" src="../../images/imgZongYinHangKa.png">
				<span class="">总银行卡</span>
				<span class="addBtn" @click.stop="addCard"></span>
				<span class="infoCardNumber">{{cards}}张</span>
				
			</div>
			<div class="infoTips">注：最多可添加<span class="colorRed">6</span>张银行卡</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import bankConstants from './bank-constants'
	import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	export default {
		mounted() {
			
			this.getCardListData()
		},
		data(){
			return {
				form: {},
				cardList: [],
				unknownName: '',
				cards : '',
			}
		},
		computed: {
			
		},
		watch : {
			
		},
		methods: {
			...mapActions({
				setBankcardView : 'setBankcardView',
			}),
			async getCardListData() {
				var getCardListData = await api.ajax('bank/listCards', this.form)
		        if(getCardListData && getCardListData.code == '0'){
		          this.cardList = getCardListData.data
		          this.cards = getCardListData.data.length
				  if(getCardListData.data.length>0){
					 this.unknownName = getCardListData.data[0].kaihuName
				  }
		        } else {
		          errorMsg(getCardListData.msg)
		        }
			}, 
			addCard() {
				this.setBankcardView('fillcard')
			},
			filterNumber(val) {
				return '**** **** **** ' + val
			}
		},
	}
</script>
<style scoped>
	.cardList {
		width: 731px;
		height: 448px;
		position: relative;
		top: 46px;
		left: 127px;
		display: inline-block;
	}
	.cardList ul {
		width: 731px;
		height: 306px;
	}
	.cardList li {
		width: 230px;
		height: 146px;
		display: inline-block;
		float: left;
		background-color: #fff;
    	margin: 0 4px 10px 4px;
    	border: solid 1px #bdbdcb;
    	border-radius: 5px;
	}
	.cardTitle {
		width: 228px;
		height: 37px;
		border-bottom: solid 1px #cfd2d4;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
	}
	.bankLogo {
		position: relative;
		top: 7px;
		left: 7px;
	}
	.bankName {
		margin-left: 6px;
	}
	.bankType {
		float: right;
		position: relative;
		top: 9px;
		right: 6px;
	}
	.cardContent {
		width: 228px;
		height: 74px;
		position: relative;
		border-bottom: solid 1px #cfd2d4;
		font-size: 12px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
	}
	.cardNumber {
		position: relative;
		top: 22px;
		left: 8px;
	}
	.manage {
		float: right;
		position: relative;
		top: 21px;
		right: 12px;
		color: #2563af;
	}
	.cardOwner {
		position: absolute;
		top: 52px;
		left: 16px;
	}
	.addTime {
		width: 212px;
		height: 33px;
		line-height: 33px;
		padding-left: 16px;
		font-size: 12px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #808594;
	}
	.addcardBtn {
		width: 234px;
		height: 150px;
		display: inline-block;
		text-align: center;
		background-image: url('../../images/imgYinHangKaDi02.png');
		margin: 0 4px 10px 4px;
		position: relative;
	}
	.addcardBtn:hover {
		cursor: pointer;
	}
	.addcardBtn img {
		position: absolute;
		left: 100px;
		top: 46px;
	}
	.addcardBtn span {
		position: absolute;
		left: 82px;
		top: 94px;
	}
	.listInfo {
		width: 232px;
		height: 109px;
		display: inline-block;
		float: right;
		background-color: #fff;
		position: relative;
		top: 7px;
		right: 14px;
		border: solid 1px #bdbdcb;
    	border-radius: 5px;
	}
	.infoName {
		width: 208px;
		height: 33px;
		padding: 0 10px; 
		line-height: 33px;
		border-bottom: solid 1px #cfd2d4;
	}
	.infoNameLogo {
		position: relative;
		top: 4px;
		margin-right: 2px;
	}
	.unknownName {
		float: right;
		margin-right: 35px;
	}
	.infoCard {
		width: 214px;
		height: 36px;
		padding: 0 7px; 
		line-height: 36px;
		border-bottom: solid 1px #cfd2d4;
	}
	.cardLogo {
		position: relative;
		top: 2px;
	}
	.infoCardNumber {
		float: right;
		margin-right: 11px;
	}
	.addBtn {
		display: inline-block;
		float: right;
		width: 41px;
		height: 23px;
		position: relative;
		top: 7px;
		background-image: url('../../images/btnTianJia01.png');
	}
	.addBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnTianJia02.png');
	}
	.infoTips {
		height: 36px;
		line-height: 36px;
		margin-left: 38px;
	}
	.colorRed {
		color: #ff4200;
	}
</style>