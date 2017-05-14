<template>
	<div class="dialogContent">
	 	<div class="header">
	 		<div class="header-left">
	 			<div class="left-title">
	 				账户安全中心
	 			</div>
	 			<div class="left-main">
	 				<div class="main-top">
	 					<img src="../../images/imgTouXiang.png">
	 				</div>
	 				<p>安全级别</p>
	 				<p class="main-star">
	 					<img v-if="first" src="../../images/imgXingXing04.png">
						<img v-if="firstStar" src="../../images/imgXingXing03.png">
						<img v-if="second" src="../../images/imgXingXing04.png">
						<img v-if="secondStar" src="../../images/imgXingXing03.png">
						<img v-if="third" src="../../images/imgXingXing04.png">
						<img v-if="thirdStar" src="../../images/imgXingXing03.png">
						<img v-if="fourth" src="../../images/imgXingXing04.png">
						<img v-if="fourthStar" src="../../images/imgXingXing03.png">
						<img v-if="fifth" src="../../images/imgXingXing04.png">
						<img v-if="fifthStar" src="../../images/imgXingXing03.png">
	 				</p>
	 				<p>
	 					<span v-if="oneHundred" class="safePoint-oneHundred"></span><span class="safePoint-left"></span><span class="safePoint-right"></span><img src="../../images/imgPingFen.png">
	 				</p>
	 			</div>
	 		</div>
	 		<div class="header-right translate3d-zero">
	 			<div class="right-title">
	 				<span class="marginLeft-51">登入时间</span>
	 				<span class="marginLeft-93">登入IP</span>
	 				<span class="marginLeft-90">登入地址</span>
	 				<span class="marginRight-42">状态</span>
	 			</div>
	 			<div class="IPList" ref="IPAddressList">
	 				<div style="width:550px">
		 				<ul v-for="item in loginLogData">
		 					<li>
			 					<div class="loginTime">{{item.addTime}}</div>
				 				<div class="loginIp">{{item.loginIp}}</div>
				 				<div class="loginIpAddress">{{item.loginAddress}}</div>
				 				<div class="status">
				 					<span v-if="item.isSuccess == true">成功</span>
				 					<span v-if="item.isSuccess == false">失败</span>
				 				</div>
			 				</li>
		 				</ul>
	 				</div>
	 			</div>
	 		</div>
	 	</div>
	 	<div class="safeContent">
	 		<ul>
	 			<li class="borderTopRadius-5">
	 				<img src="../../images/imgDengLuMiMa.png">
	 				<span class="formTitle">登入密码：</span>	
	 				<span class="explain">登录平台时需要输入的密码</span>
	 				<div class="btn"><span @click.stop="updateLoginPwd">重置</span></div>
	 				<span class="detail colorGreen">已设置</span>
	 			</li>
	 			<li>
	 				<img src="../../images/imgZiJinMiMa.png">
	 				<span class="formTitle">资金密码：</span>	
	 				<span class="explain">在账户资金发生变动时，需要输入的密码</span>
	 				<div class="btn"><span @click.stop="updateFundPwd">重置</span></div>
	 				<span v-if="userInfo.fundPwd == '-1'" class="detail colorRed">未设置</span>
	 				<span v-if="userInfo.fundPwd == '1'" class="detail colorGreen">已设置</span>
	 			</li>
	 			<li>
	 				<img src="../../images/imgLianXiQq.png">
	 				<span class="formTitle">联系QQ：</span>	
	 				<span class="explain">用于上下级联系交流使用</span>
	 				<div class="btn"><span @click.stop="updateQQ">修改</span></div>
	 				<span v-if="!userInfo.qq" class="detail colorRed">未设置</span>
	 				<span v-else class="detail">{{userInfo.qq}}</span>
	 			</li>
	 			<li>
	 				<img src="../../images/imgAnQuanYouXiang.png">
	 				<span class="formTitle">安全邮箱：</span>	
	 				<div class="explain">密码找回安全设置<span class="colorRed">（请勿乱填）</span></div>
	 				<div class="btn"><span @click.stop="updateEmail">修改</span></div>
	 				<span v-if="!userInfo.email" class="detail colorRed">未设置</span>
	 				<span v-else class="detail">{{filterEmail(userInfo.email)}}</span>
	 			</li>
	 			<li>
	 				<img src="../../images/imgShouJiHaoMa.png">
	 				<span class="formTitle">手机号码：</span>	
	 				<span class="explain left-69">用于帐号安全验证</span>
	 				<div class="btn"><span @click.stop="updateMobile">修改</span></div>
	 				<span v-if="!userInfo.mobile" class="detail colorRed">未设置</span>
	 				<span v-else class="detail">{{filterMobile(userInfo.mobile)}}</span>
	 			</li>
	 			<li class="borderBotRadius-5">
	 				<img src="../../images/imgYingHangKa.png">
	 				<span class="formTitle">银行卡：</span>	
	 				<span class="explain">用于账户提现取款收款帐号</span>
	 				<div class="btn"><span @click.stop="addCard">添加</span>|<span @click.stop="addCard">管理</span></div>
	 				<div class="detail colorGrey">已绑定<span class="colorGreen margin-2">{{cards}}</span>张银行卡</div>
	 			</li>
	 		</ul>
	 	</div>
	 	<el-dialog custom-class="dialog-cus-cls-1" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="false">
         	<component :is="userdataView" ></component>
      	</el-dialog>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import jquery from 'jquery'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    import { mapActions } from 'vuex'
    import loginPassword from "./login-password.vue"
    import moneyPassword from "./money-password.vue"
    import updateQQ from "./update-qq.vue"
    import updateEmail from "./update-email.vue"
    import updateMobile from "./update-mobile.vue"
    import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	export default {
		components : {
			loginPassword,
			moneyPassword,
			updateQQ,
			updateEmail,
			updateMobile,
		},
		mounted() {
			this.getLoginLogData()
			jquery(this.$refs.IPAddressList).mCustomScrollbar()
			this.$root.$on("closeDialog-init",this.closeHandle)
			this.userInfo = this.$store.state.useraction.userInfo
			this.securityLevel = this.$store.state.useraction.userInfo.securityLevel
		},
		beforeDestroy() {
			this.$root.$off("closeDialog-init",this.closeHandle)
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
				oneHundred: false,
				securityLevel: '',
				userInfo: {},
				loginLogData: [],
				form: {},
				cards: '',
				title: '',
				dialogTableVisible: false,
        		closeOnClickModal : false,
        		closeOnPressEscape : false,
			}
		},
		computed: {
			userdataView () {
				var userdata = this.$store.state.useraction.userdataView;
				if (userdata == 'login-password') {
				  return "loginPassword"
				} else if (userdata == 'money-password') {
				  return "moneyPassword"
				} else if (userdata == 'update-qq') {
				  return "updateQQ"
				} else if (userdata == 'update-email') {
				  return "updateEmail"
				} else if (userdata == 'update-mobile') {
				  return "updateMobile"
				}
			},
		},
		watch : {
			securityLevel(val){
				console.log(val)
	            if (val ==0) {
	            	jquery('.safePoint-left').addClass("safePoint-zero")
	              	return
	            } else if (val ==1) {
					this.first = false
					this.firstStar = true
					jquery('.safePoint-left').addClass("safePoint-twenty")
					return
	            } else if (val ==2) {
					this.first = false
					this.firstStar = true
					this.second = false
					this.secondStar = true
					jquery('.safePoint-left').addClass("safePoint-fourty")
					return
	            } else if (val ==3) {
					this.first = false
					this.firstStar = true
					this.second = false
					this.secondStar = true
					this.third = false
					this.thirdStar = true
					jquery('.safePoint-left').addClass("safePoint-sixty")
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
					jquery('.safePoint-left').addClass("safePoint-eighty")
					console.log(123)
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
					this.oneHundred = true
					jquery('.safePoint-left').addClass("safePoint-right")
					return
	            }
	        },
		},
		methods: {
			...mapActions({
				setFirstView : 'setFirstView',
		        setUserdataView : 'setUserdataView',
		        setBankcardView : 'setBankcardView',
		    }),
		    async getLoginLogData() {
				var loginLogData = await api.ajax('user/listLoginLog', this.form)
		        if(loginLogData && loginLogData.code == '0'){
		          this.loginLogData = loginLogData.data
		        } else {
		          errorMsg(loginLogData.msg)
		        }
		        var getCardListData = await api.ajax('bank/listCards', this.form)
		        if(getCardListData && getCardListData.code == '0'){
		          this.cards = getCardListData.data.length
		        } else {
		          errorMsg(getCardListData.msg)
		        }
			},
			filterEmail(val) {
				var valBefore = ''
	        	valBefore = val.slice(0,val.indexOf('@'));
	        	var newVal = ''
	        	for (var i = 1; i < valBefore.length-1; i++) {
	        		newVal += '*'
	        	}
	        	return valBefore[0] + newVal + valBefore.slice(-1) + val.slice(val.indexOf('@'))
	        },
			filterMobile(val) {
				var newVal = ''
				var valMiddle = val.slice(3,7);
	        	for (var i = 0; i < valMiddle.length; i++) {
	        		newVal += '*'
	        	}
	        	return val.slice(0,3) + newVal + val.slice(7,11)
	        },
	        updateLoginPwd(){
	        	this.dialogTableVisible = true
	        	this.title = '修改登录密码'
        		this.setUserdataView('login-password')
		    },
		    updateFundPwd(){
	        	this.dialogTableVisible = true
	        	this.title = '修改资金密码'
        		this.setUserdataView('money-password')
		    },
		    updateQQ(){
	        	this.dialogTableVisible = true
	        	this.title = '修改QQ号'
        		this.setUserdataView('update-qq')
		    },
		    updateEmail(){
	        	this.dialogTableVisible = true
	        	this.title = '修改邮箱'
        		this.setUserdataView('update-email')
		    },
		    updateMobile(){
	        	this.dialogTableVisible = true
	        	this.title = '修改手机号码'
        		this.setUserdataView('update-mobile')
		    },
		    openHandle(){
		        console.log('openHandle')
		    },
		    closeHandle(){
		      	this.dialogTableVisible = false
		    },
		    addCard() {
		    	this.setFirstView('bankcard')
		    	this.setBankcardView('cardlist')
		    },
		},
	}
</script>
<style scoped>
	.header-left {
		width: 394px;
		height: 268px;
		display: inline-block;
		position: relative;
		left: 8px;
		top: 9px;
		border-radius: 5px;
		border: solid 1px #bdbdcb;
	}
	.left-title {
		height: 44px;
		line-height: 44px;
		font-size: 20px;
		font-family: SimHei, 黑体, STHeiti, 华文黑体;
		color: #4b4f5b;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		text-align: center;
		background-color: #ededf8;
	}
	.left-main {
		height: 224px;
		font-size: 20px;
		font-family: SimHei, 黑体, STHeiti, 华文黑体;
		color: #4b4f5b;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		text-align: center;
		background-color: #fff;
	}
	.main-top {
		height: 115px;
	}
	.main-top img {
		position: relative;
		top: 8px;
	}
	.main-star {
		height: 52px;
	}
	.main-star img {
		position: relative;
		top: 8px;
	}
	.safePoint-oneHundred,.safePoint-left,.safePoint-right {
		width: 25px;
		height: 24px;
		display: inline-block;
		background-image: url('../../images/imgFenShuShuZi.png');
	}
	.safePoint-zero {
		background-position: 250px;
	}
	.safePoint-twenty {
		background-position: 200px;
	}
	.safePoint-fourty {
		background-position: 150px;
	}
	.safePoint-sixty {
		background-position: 100px;
	}
	.safePoint-eighty {
		background-position: 50px;
	}
	.safePoint-oneHundred {
		background-position: 225px;
	}
	.safePoint-right {
		background-position: 0;
	}
	.header-right {
		width: 574px;
		height: 268px;
		float: right;
		display: inline-block;
		position: relative;
		top: 9px;
		right: 10px;
		border-radius: 5px;
		border: solid 1px #bdbdcb;
	}
	.right-title {
		width: 574px;
		height: 44px;
		line-height: 44px;
		background-color: #edf0f6;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		font-weight: bold;
		color: #6d717e;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.marginLeft-51 {
		margin-left: 51px;
	}
	.marginLeft-93 {
		margin-left: 93px;
	}
	.marginLeft-90 {
		margin-left: 90px;
	}
	.marginRight-42 {
		float: right;
		margin-right: 42px;
	}
	.loginTime {
		width: 140px;
		height: 32px;
		display: inline-block;
		line-height: 32px;
		padding: 0 17px;
	}
	.loginIp {
		width: 125px;
		height: 32px;
		display: inline-block;
		line-height: 32px;
	}
	.loginIpAddress {
		width: 120px;
		height: 32px;
		display: inline-block;
		line-height: 32px;
		padding: 0 17px;
	}
	.status {
		width: 30px;
		height: 32px;
		display: inline-block;
		line-height: 32px;
		float: right;
		padding: 0 17px;
	}
	.IPList {
		width: 574px;
		height: 224px;
		background-color: #fff;
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.IPList .loginIp {
		white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: bottom;
	}
	.IPList li {
		height: 32px;
		line-height: 32px;
	}
	.IPList li:hover {
		background-color: #f4f4f8;
	}
	.safeContent {
		width: 983px;
		height: 430px;
		border-radius: 5px; 
		display: inline-block;
		border: solid 1px #bdbdcb;
		position: relative;
    	top: 17px;
    	left: 8px;
	}
	.safeContent li {
		height: 71px;
		line-height: 71px;
		border-bottom: solid 1px #bdbdcb;
		background-color: #fff;
	}
	.safeContent li img {
		position: relative;
		left: 14px;
		top: 5px;
	}
	.safeContent li .formTitle {
		display: inline-block;
		width: 75px; 
		margin-left: 25px;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		font-weight: bold;
		color: #6d717e;
	}
	.safeContent li .explain {
		display: inline-block;
		width: 216px;
		position: relative;
    	left: 65px;
		font-size: 12px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #7d8290;
	}
	.safeContent li .detail {
		display: inline-block;
		width: 140px;
		float: right;
		margin-right: 103px;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		text-align: right;
	}
	.safeContent li .btn {
		display: inline-block;
		width: 64px;
		float: right;
		margin-right: 45px;
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #2556af;
		text-align: center;
	}
	.safeContent li .btn span {
		cursor: pointer;
	}
	.borderTopRadius-5 {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.borderBotRadius-5 {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.left-69 {
		left: 69px !important;
	}
	.margin-2 {
		margin: 0 2px;
	}
	.colorGreen {
		color: #40af25;
	}
	.colorRed {
		color: #ff4200;
	}
	.colorGrey {
		color: #4b4f5b;
	}
	.dialogTitle {
      display: inline-block;
      width: 126px;
      height: 21px;
      line-height: 21px;
      color: #fff;
      font-size: 23px;
      font-family: SimHei, "黑体", STHeiti, "华文黑体";
    }
</style>
