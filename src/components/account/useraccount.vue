<template>
	<div class="dialogContent">
		<div class="topData">
			<img class="userImage" src="../../images/imgTouXiang.png">
			<div class="userData">
				<div class="userData-top">
					<span class="userName">您好：{{userInfo.username}}（<span class="colorGreen">代理</span>）</span>
					<span>返点：<span class="colorGreen">{{userInfo.point}}%</span>（1960）</span>
					<span class="lastLoginTime">上次登录时间：{{userInfo.lastLoginTime}}</span>
				</div>
				<div class="userData-bottom">
					<span class="userData-bottom-title">安全资料信息：</span>
					<img v-if="first" src="../../images/imgXingXing02.png">
					<img v-if="firstStar" src="../../images/imgXingXing01.png">
					<img v-if="second" src="../../images/imgXingXing02.png">
					<img v-if="secondStar" src="../../images/imgXingXing01.png">
					<img v-if="third" src="../../images/imgXingXing02.png">
					<img v-if="thirdStar" src="../../images/imgXingXing01.png">
					<img v-if="fourth" src="../../images/imgXingXing02.png">
					<img v-if="fourthStar" src="../../images/imgXingXing01.png">
					<img v-if="fifth" src="../../images/imgXingXing02.png">
					<img v-if="fifthStar" src="../../images/imgXingXing01.png">
					<span class="userData-bottom-level">（<span v-if="securityLevel <= 1" class="colorRed">低</span><span v-if="securityLevel <= 3&& securityLevel >1" class="colorRed">中</span><span v-if="securityLevel >= 4" class="colorRed">高</span>）</span>
					<div class="edit" @click.stop="editInfo"></div>
				</div>
			</div>
		</div>
		<div class="middleData">
			<div class="middleData-left">
				<ul>
					<li>
						<span class="formTit">上级联系QQ：</span><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=93619871&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:93619871:51" alt="点击这里给我发消息" title="点击这里给我发消息"/></a>
					</li>
					<li>
						<span class="formTit">资金密码：</span><span v-if="userInfo.fundPwd == '-1'" @click.stop="setLoginPwd" class="colorRed">未设置</span><span v-if="userInfo.fundPwd == '1'" class="colorGreen">已设置</span>
					</li>
					<li>
						<span class="formTit">联系QQ：</span><span v-if="userInfo.qq == ''" @click.stop="setLoginPwd" class="colorRed">未设置</span><span v-else v-text="userInfo.qq"></span>
					</li>
					<li>
						<span class="formTit">安全邮箱：</span><span v-if="userInfo.email == ''" @click.stop="setLoginPwd" class="colorRed">未设置</span><span v-else class="colorGreen">已设置</span>
					</li>
					<li>
						<span class="formTit">手机号码：</span><span v-if="userInfo.mobile == ''" @click.stop="setLoginPwd" class="colorRed">未设置</span><span v-else v-text="userInfo.mobile"></span>
					</li>
					<li>
						<span class="formTit">帐号注册时间：</span><span>{{userInfo.addTime}}</span>
					</li>
				</ul>
			</div>
			<div class="middleData-right">
				<ul>
					<li>
						<span class="formTit-left"><img src="../../images/imgZhuZhangHuJinE.png">主账户金额</span>
						<div class="formTit-middle colorGreen"><span class="f-18">{{balanceBefore}}</span>.{{balanceAfter}}</div>
						<span class="moneyIn" @click.stop="toMoneyIn"></span>
					</li>
					<li>
						<span class="formTit-left"><img src="../../images/imgEDuBiJinE.png">额度币金额</span>
						<div class="formTit-middle"><span class="f-18">{{gameMoneyBefore}}</span>.{{gameMoneyAfter}}</div>
						<span class="transfer" @click.stop="toTransfer"></span>
					</li>
					<li>
						<span class="formTit-left"><img src="../../images/imgKeTiXianJinE.png">可提现余额</span>
						<div class="formTit-middle colorRed"><span class="f-18">{{drawBalanceBefore}}</span>.{{drawBalanceAfter}}</div>
						<span class="moneyOut" @click.stop="toMoneyOut"></span>
					</li>
				</ul>
			</div>
		</div>
		<div class="personData">
			<div class="personData-top">
				<div><img src="../../images/imgBenYueGeRenShuJu.png">本月个人数据：</div>
			</div>
			<ul class="form1">
				<li>本月累计充值</li>
				<li>本月累计提现</li>
				<li>本月个人盈亏</li>
			</ul>
			<ul class="form2">
				<li>{{summaryData.cz}}</li>
				<li>{{summaryData.qk}}</li>
				<li class="colorRed">{{summaryData.tzyk}}</li>
			</ul>
		</div>
		<div class="teamData">
			<div class="teamData-top">
				<div><img src="../../images/imgTuanDuiXinXi.png">团队信息：</div>
			</div>
			<ul class="form3">
				<li></li>
				<li>团队成员</li>
				<li>在线人数</li>
				<li>今天注册</li>
				<li>新充值</li>
				<li>团队充值</li>
				<li>团队取款</li>
				<li>团队盈亏</li>
				<li>团队总额</li>
			</ul>
			<ul class="form4">
				<li></li>
				<li>{{summaryData.teamCount}}</li>
				<li>{{summaryData.onlineUserNum}}</li>
				<li>{{summaryData.regNum}}</li>
				<li>{{summaryData.regCzNum}}</li>
				<li>{{summaryData.payMoney}}</li>
				<li>{{summaryData.takeMoney}}</li>
				<li class="colorGreen">{{summaryData.teamResult}}</li>
				<li>{{summaryData.teamBalance}}</li>
			</ul>
		</div>
		<div class="loginData">
			<div class="loginData-top">
				<div><img src="../../images/imgDengRuXingXi.png">登入信息：</div>
			</div>
			<div class="loginData-content">
				<div class="content-left">
					<ul>
						<li>
							<span class="formTit">最近登录时间：</span>{{userInfo.currentTime}}
						</li>
						<li>
							<span class="formTit">最近登录IP：</span><span class="colorGreen">{{userInfo.currentIp}}</span>
						</li>
						<li>
							<span class="formTit">最近登录地址：</span>{{userInfo.currentAddress}}
						</li>
					</ul>
				</div>
				<div class="content-right">
					<ul>
						<li>
							<span class="formTit">上次登录时间：</span>{{userInfo.lastLoginTime}}
						</li>
						<li>
							<span class="formTit">上次登录IP：</span>{{userInfo.lastLoginIp}}
						</li>
						<li>
							<span class="formTit">上次登录地址：</span>{{userInfo.lastLoginAddress}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	import { mapActions } from 'vuex'
	export default {
		mounted(){
			this.getSummaryData()
			this.userInfo = this.$store.state.useraction.userInfo
			this.securityLevel = this.$store.state.useraction.userInfo.securityLevel 
		},
		data(){
			return {
				first: true,
				firstStar: false,
				second: true,
				secondStar: false,
				third: true,
				thirdStar: false,
				fourth: true,
				fourthStar: false,
				fifth: true,
				fifthStar: false,
				securityLevel: '0,',
				summaryData: {},
				form: {},
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.useraction.userInfo
			},
			balanceBefore() {
				if (this.$store.state.useraction.userInfo.balance !=0) {
					var balance = '' + this.$store.state.useraction.userInfo.balance
					return balance.slice(0,-3)
				} else {
					return 0
				}
			},
			balanceAfter() {
				if (this.$store.state.useraction.userInfo.balance !=0) {
					var balance = '' + this.$store.state.useraction.userInfo.balance
					return balance.slice(-2)
				} else {
					return 0
				}
			},
			gameMoneyBefore() {
				if (this.$store.state.useraction.userInfo.gameMoney !=0) {
					var gameMoney = '' + this.$store.state.useraction.userInfo.gameMoney
					return gameMoney.slice(0,-3)
				} else {
					return 0
				}
			},
			gameMoneyAfter() {
				if (this.$store.state.useraction.userInfo.gameMoney !=0) {
					var gameMoney = '' + this.$store.state.useraction.userInfo.gameMoney
					return gameMoney.slice(-2)
				} else {
					return 0
				}
			},
			drawBalanceBefore() {
				if (this.summaryData.withdrawBalance !=0) {
					var withdrawBalance = '' + this.summaryData.withdrawBalance
					return withdrawBalance.slice(0,-3)
				} else {
					return 0
				}
			},
			drawBalanceAfter() {
				if (this.summaryData.withdrawBalance !=0) {
					var withdrawBalance = '' + this.summaryData.withdrawBalance
					return withdrawBalance.slice(-2)
				} else {
					return 0
				}
			},
		},
		watch : {
			securityLevel(val){
	            if (val ==0) {
	              return
	            } else if (val ==1) {
	              this.first = false
	              this.firstStar = true
	              return
	            } else if (val ==2) {
	              this.first = false
	              this.firstStar = true
	              this.second = false
	              this.secondStar = true
	              return
	            } else if (val ==3) {
	              this.first = false
	              this.firstStar = true
	              this.second = false
	              this.secondStar = true
	              this.third = false
	              this.thirdStar = true
	              return
	            } else if (val ==4) {
	              this.first = false
	              this.firstStar = true
	              this.second = false
	              this.secondStar = true
	              this.third = false
	              this.thirdStar = true
	              this.fourth = false
	              this.fourthStar = true
	              return
	            } else if (val ==5) {
	              this.first = false
	              this.firstStar = true
	              this.second = false
	              this.secondStar = true
	              this.third = false
	              this.thirdStar = true
	              this.fourth = false
	              this.fourthStar = true
	              this.fifth = false
	              this.fifthStar = true
	              return
	            }
	        },
		},
		methods: {
			...mapActions({
				setFirstView : 'setFirstView',
				setUserdataView : 'setUserdataView',
				setChangeInfoView : 'setChangeInfoView',
			}),
			async getSummaryData() {
				var summaryData = await api.ajax('report/findSummary', this.form)
		        if(summaryData && summaryData.code == '0'){
		          this.summaryData = summaryData.data
		        } else {
		          errorMsg(summaryData.msg)
		        }
			},
			editInfo() {
				this.setFirstView('safecenter')
			},
			toMoneyIn() {
				this.setFirstView('money-in')
			},
			toMoneyOut() {
				this.setFirstView('money-out')
			},
			toTransfer() {
				this.setFirstView('transfer')
			},
			setLoginPwd() {
				var that  = this;
				this.$nextTick(function(){
			  		that.setFirstView('safecenter')
			  		that.$root.$emit("setLoginPwd-init")
			  		that.setUserdataView('userdata-dialog')
        			that.setChangeInfoView('login-password')
				})
			},
		},
	}
</script>
<style scoped>
	.topData {
		width: 1000px;
		height: 116px;
		background-color: #e7e9ed;
		border-top-right-radius: 10px !important;
	}
	.userImage {
		height: 72px;
		display: inline-block;
		width: 70px;
		position: relative;
		left: 34px;
		top: 21px;
	}
	.userData {
		display: inline-block;
		float: right;
		width: 857px;
		height: 116px;
		font-size: 14px;
		color: #4b4f5b;
		font-family: SimSun, 宋体, STSong, 华文宋体;
	}
	.userData-top {
		height: 60px;
    	line-height: 70px;
	}
	.userName {
		margin-right: 81px;
	}
	.lastLoginTime {
		float: right;
		margin-right: 57px;
	}
	.userData-bottom {
		height: 56px;
		line-height: 56px;
	}
    .userData-bottom img {
      	height: 14px;
      	width: 14px;
    }
	.edit {
		display: inline-block;
		width: 46px;
		height: 23px;
		position: relative;
		top: 6px;
    	background-image: url('../../images/btnBianJi01.png');
	}
	.edit:hover {
		cursor: pointer;
    	background-image: url('../../images/btnBianJi.png');
	}
	.middleData {
		width: 1000px;
		height: 225px;
		background-color: #e7e9ed;
		border-top: solid 1px #c7cad2;
		border-bottom: solid 1px #c7cad2;
	}
	.middleData-left {
		width: 431px;
		height: 207px;
		font-size: 14px;
		color: #4b4f5b;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		padding-left: 28px;
		position: relative;
	    top: 9px;
	    border-right: solid 1px #c7cad2;
	    display: inline-block;
	}
	.middleData-left li {
		height: 34px;
		line-height: 34px;
	}
	.middleData-left li img {
		position: relative;
    	top: 8px;
	}
	.middleData-left li .colorRed:hover {
		cursor: pointer;
	}
	.formTit {
		display: inline-block;
		width: 100px;
		margin-right: 27px;
		text-align: right;
	}
	.middleData-right {
		width: 466px;
		height: 207px;
		font-size: 14px;
		color: #4b4f5b;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		padding-left: 74px;
		float: right;
		position: relative;
	    top: 9px;
	    display: inline-block;
	}
	.middleData-right li {
		height: 70px;
		line-height: 70px;
	}
	.formTit-left {
		display: inline-block;
		width: 100px;
		margin-right: 80px;
		text-align: right;
	}
	.formTit-left img {
		position: relative;
    	top: 3px;
    	right: 10px;
	}
	.formTit-middle {
		display: inline-block;
		width: 100px;
		text-align: center;
	}
	.f-18 {
		font-size: 18px;
	}
	.moneyIn {
		display: inline-block;
		height: 32px;
		width: 86px;
		position: relative;
		top: 10px;
		left: 53px;
		background-image: url('../../images/btnWoYaoChongZhi01.png');
	}
	.moneyIn:hover {
		cursor: pointer;
		background-image: url('../../images/btnWoYaoChongZhi02.png');
	}
	.transfer {
		display: inline-block;
		height: 32px;
		width: 86px;
		position: relative;
		top: 10px;
		left: 53px;
		background-image: url('../../images/btnWoYaoZhuanZhang01.png');
	}
	.transfer:hover {
		cursor: pointer;
		background-image: url('../../images/btnWoYaoZhuanZhang02.png');
	}
	.moneyOut {
		display: inline-block;
		height: 32px;
		width: 86px;
		position: relative;
		top: 10px;
		left: 53px;
		background-image: url('../../images/btnWoYaoTiXian01.png');
	}
	.moneyOut:hover {
		cursor: pointer;
		background-image: url('../../images/btnWoYaoTiXian02.png');
	}
	.formTit-right img {
		position: relative;
    	top: 10px;
	}
	.personData {
		width: 1000px;
		height: 109px;
	}
	.personData-top,.teamData-top,.loginData-top {
		background-color: #e7e9ed;
	}
	.personData-top {
		height: 43px;
	}
	.personData-top div {
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		font-weight: bold;
		color: #656a76;
		position: relative;
		top: 12px;
		left: 7px;
	}
	.personData-top div img {
		margin-right: 8px;
		position: relative;
		top: 2px;
	}
	.form1,.form3 {
		height: 34px;
		line-height: 34px;
		background-color: #edf0f6;
		text-align: center;
	}
	.personData li {
		display: inline-block;
		width: 333px;
		float: left;
	}
	.teamData li {
		height: 32px;
		display: inline-block;
		width: 111px;
		float: left;
	}
	.form2,.form4 {
		height: 32px;
		line-height: 32px;
		background-color: #f7f9fe;
		text-align: center;
	}
	.teamData {
		width: 1000px;
		height: 110px;
	}
	.teamData-top {
		height: 44px;
	}
	.teamData-top div {
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		font-weight: bold;
		color: #656a76;
		position: relative;
		top: 12px;
		left: 7px;
	}
	.teamData-top div img {
		margin-right: 8px;
		position: relative;
		top: 2px;
	}
	.loginData {
		width: 1000px;
		height: 167px;
	}
	.loginData-top {
		height: 31px;
	}
	.loginData-top div {
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		font-weight: bold;
		color: #656a76;
		position: relative;
		top: 5px;
		left: 7px;
	}
	.loginData-top div img {
		margin-right: 8px;
		position: relative;
		top: 2px;
	}
	.loginData-content {
		height: 77px;
		padding: 30px 142px;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #4b4f5b;
		background-color: #f7f9fe;
		border-bottom-right-radius: 10px !important;
	}
	.content-left {
		display: inline-block;
		width: 392px;
		height: 77px;
		display: inline-block;
	}
	.content-left li {
		height: 26px;
		line-height: 26px;
	}
	.content-right  {
		display: inline-block;
		width: 282px;
		height: 77px;
		display: inline-block;
	}
	.content-right li {
		height: 26px;
		line-height: 26px;
	}
	.colorGreen {
		color: #40af25;
	}
	.colorRed {
		color: #ff4200;
	}
</style>