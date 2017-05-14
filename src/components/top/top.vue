<template>
	<div>
		<div class="top">
			<div class="top-content">
				<div class="top-left">
					<img src="../../images/imgFenGeXian-Shu.png">
					<div class="top-left-content">您好，{{userInfo.username}}</div>
				</div>
				<div class="top-left">
					<img src="../../images/imgFenGeXian-Shu.png">
					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content coloryellow">余额：{{balance}}<img class="topHeader-logo" @click.prevent="refreshMoney" src="../../images/imgYuEShuaXin.png"></div>
				</div>
				<div class="top-left">
					<img src="../../images/imgFenGeXian-Shu.png">
					<div class="top-left-content">额度币：{{coin}}</div>
					<img src="../../images/imgFenGeXian-Shu.png">
				</div>
        <div @click.stop="openDialog">
  				<div class="top-right7">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" @click.stop="logout" class="top-left-content"><img class="topHeader-logo" src="../../images/imgAnQuanTuiChu.png">安全退出</div>
  					<img src="../../images/imgFenGeXian-Shu.png">
  				</div>
  				<div class="top-right6">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content"><img class="topHeader-logo" src="../../images/imgBangZhu.png">帮助</div>
  				</div>
  				<div class="top-right5">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content"><img class="topHeader-logo" src="../../images/imgYouJiang.png">邮件</div>
  				</div>
  				<div class="top-right4">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content"><img class="topHeader-logo" src="../../images/imgGongGaoXinXi.png">公告信息<img class="redPoint" src="../../images/imgHongDian.png"></div>
  				</div>
  				<div class="top-right3">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content"><img class="topHeader-logo" src="../../images/imgZhangHuXinXi.png">账户管理</div>
  				</div>
  				<div class="top-right2">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content"><img class="topHeader-logo" src="../../images/imgQuKuan.png">取款</div>
  				</div>
  				<div class="top-right1">
  					<img src="../../images/imgFenGeXian-Shu.png">
  					<div @mouseenter="animateTop" @mouseleave="leaveTop" class="top-left-content coloryellow"><img class="topHeader-logo" src="../../images/imgChongZhi.png">充值</div>
  				</div>
        </div>
			</div>
			<div class="top-nav">
				<div class="nav-left"><img src="../../images/imgTopLOGO.png"></div>
				<div class="nav-right">
					<ul>
						<li class="nav-li li1 margin-0 fp-title-selected">
							<div @click="firstPage">首页</div>
						</li>
						<li class="nav-li li2" v-popover:popover1>
							<div class="nav-li-title" name="caipiao">彩票游戏<span class="status-logo"></span></div>
							<el-popover popper-class="pop-cus-class"
	                          ref="popover1"
	                          placement="bottom" :offset="100" v-model="showCai"
	                          trigger="hover" :visible-arrow="false">
                                
                                <div class="tanBox1">
                                  <div class="lottery-arrow" x-arrow></div>
	                                <table id="theTable" width="100%" border="0" cellspacing="0" cellpadding="0">
	                                	<colgroup>
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                      	</colgroup> 
                                      	<thead>
		                                	<tr>
	                                          	<th colspan="2">时时彩</th>
	                                          	<th>11选5</th>
	                                          	<th>快乐彩</th>
	                                          	<th>快三</th>
	                                          	<th>低频</th>
	                                      	</tr>
		                                </thead>
		                                <colgroup>
		                                    <col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
                                          	<col width="200">
		                                 </colgroup>
		                                <tbody class="tbody" @click.stop="selectCai">
		                                    <tr>
		                                    	<td name="cai1" class="border-right0">重庆时时彩<img class="hot-logo" src="../../images/imgHot.png"></td>
		                                    	<td name="cai12">分分彩</td>
		                                    	<td name="cai10">山东11选5</td>
		                                    	<td>北京快乐8</td>
		                                    	<td>江苏快三</td>
		                                    	<td name="cai4">福彩3D</td>
		                                    </tr>
		                                    <tr>
		                                    	<td name="cai2" class="border-right0">江西时时彩</td>
		                                    	<td name="cai15">三分彩</td>
		                                    	<td name="cai9">江西11选5</td>
		                                    	<td name="cai13">北京赛车PK10</td>
		                                    	<td>安徽快三</td>
		                                    	<td name="cai5">排列3</td>
		                                    </tr>
		                                    <tr>
		                                    	<td name="cai3" class="border-right0">黑龙江时时彩</td>
		                                    	<td name="cai11">五分彩</td>
		                                    	<td name="cai8">广东11选5</td>
		                                    	<td class="backNoimg"></td>
		                                    	<td>江苏骰宝</td>
		                                    	<td>双色球</td>
		                                    </tr>
		                                    <tr>
		                                    	<td name="cai7" class="border-right0">天津时时彩</td>
		                                    	<td class="backNoimg"></td>
		                                    	<td>乐利11选5</td>
		                                    	<td class="backNoimg"></td>
		                                    	<td>吉利骰宝</td>
		                                    	<td name="cai14">六合彩</td>
		                                    </tr>
		                                    <tr>
		                                    	<td name="cai6" class="border-right0">新疆时时彩</td>
		                                    	<td class="backNoimg"></td>
		                                    	<td>顺利11选5</td>
		                                    	<td class="backNoimg"></td>
		                                    	<td class="backNoimg"></td>
		                                    	<td class="backNoimg"></td>
		                                    </tr>
		                                </tbody>
	                                </table>
	                            </div>
	                        </el-popover>
						</li>
						<li class="nav-li li3">
							<div class="nav-li-title">棋牌游戏<span class="status-logo"></span></div>
						</li>
						<li class="nav-li li4">
							<div class="nav-li-title">电子游艺<span class="status-logo"></span></div>
						</li>
						<li class="nav-li li5">
							<div class="nav-li-title">真人娱乐</div>
						</li>
						<li class="nav-li li6">
							<div class="nav-li-title">优惠活动</div>
						</li>
						<li class="nav-li li7" @click.stop="customService">
							<div class="nav-li-title">客服中心</div>
						</li>
						<li class="nav-li li8" v-popover:popover4>
							<div class="nav-li-title" id="xiazai">下载中心<span class="status-logo"></span></div>
							<el-popover popper-class="pop-cus-class-downLoad"
	                          ref="popover4" v-model="showDownload" 
	                          placement="bottom" :offset="-263"  
	                          trigger="hover" :visible-arrow="false">
	                            <div class="tanBox4" @click.stop="selectDownload">
                                  <div class="lottery-arrow-downLoad" x-arrow></div>
	                                <div name="PC" class="tanBox4-logo PClogo"></div>
	                                <div name="PT" class="tanBox4-logo PTlogo"></div>
	                                <div name="IOS" class="tanBox4-logo IOSlogo"></div>
	                                <div name="ANDROID" class="tanBox4-logo ANDROIDlogo border-right0"></div>
	                            </div>
	                        </el-popover>
						</li>
					</ul>
				</div>
			</div>
		</div>
    <div>
      <el-dialog custom-class="dialog-cus-cls" size="large" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle">
        <div slot="title" class="dialogTitle"><span class="dialogLogo"></span>{{title}}</div>
         <component :is="dialogView"></component>
      </el-dialog>
    </div>
    <div>
      <el-dialog custom-class="dialog-cus-cls" size="large" :title="title" v-model="dialogMsg" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle">
        <div slot="title" class="dialogTitle"><span class="dialogLogo news"></span>消息公告</div>
         <noticemsg v-if="dialogMsg"></noticemsg>
      </el-dialog>
    </div>
    <div>
      <el-dialog custom-class="dialog-cus-cls" size="large" :title="title" v-model="dialogEmail" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle">
        <div slot="title" class="dialogTitle"><span class="dialogLogo"></span>{{title}}</div>
          <email></email>
      </el-dialog>
    </div>
	</div>
</template>
<script lang="babel">
  import api from '../../api'
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
  import account from '../account/account'
  import navConstants from './nav-constants'
  import email from '../email/email'
  import noticemsg from '../notice/noticemsg'
	export default {
		name : "top",
    mounted() {
      this.getData();
      this.refreshMoney();
      this.$root.$on("switchToCai", this.switchToCai)
    },
    beforeDestroy(){
      this.$root.$off("switchToCai", this.switchToCai)
    },
    components : {
      account, email, noticemsg
    },
		data() {
			return{
        userInfo: {},
        balanceInfo: {},
        closeOnClickModal : false,
        closeOnPressEscape : false,
        title: '',
        userMsg: {},
        countUnread: -1,
				form: {
          pageNumber: 1,
          pageSize: 10,
        },
        totalRow: '0',
        pageSize: '0',
        arrow: false,
        arrowDown: false,
        showCai : false,
        showDownload : false
			}
		},
    computed: {
      dialogTableVisible(){
        return this.$store.state.useraction.topDialogVisiable
      },
      dialogEmail(){
        return this.$store.state.useraction.topDialogEmail
      },
      dialogMsg(){
        return this.$store.state.useraction.dialogMsg
      },
      balance () {
          return this.$store.state.useraction.refreshMoney.balance
      },
      coin () {
         return this.$store.state.useraction.refreshMoney.coin
      },
      dialogView () {
        var dialogs = this.$store.state.useraction.diaView;
        if (dialogs == 'account') {
          return "account"
        } else if (dialogs == 'fund-manage') {
          return "fundManage"
        }
      },
      firstView(){
        return this.$store.state.useraction.firstView
      }
    },
    watch : {
      'firstView' : function(val){
        if(val){
            const cl = navConstants[val]
            console.log("firstView",cl)
            if(cl){
                $(".dialogLogo").removeClass('account record team fund')
                $(".dialogLogo").addClass(cl)
                if(cl == "account"){
                    this.title = "账户信息"
                } else if(cl == "record"){
                    this.title = "游戏记录"
                } else if(cl == "team"){
                    this.title = "团队管理"
                } else if(cl == "fund"){
                    this.title = "资金管理"
                } 
            }
        }
      }
    },
	methods: {
      ...mapActions({
        setUserInfo : 'setUserInfo',
        setRefreshMoney : 'setRefreshMoney',
        setDiaView : 'setDiaView',
        setFirstView : 'setFirstView',
        setBankcardView : 'setBankcardView',
        setCurrentLottery : 'setCurrentLottery',
        updateUsername: 'updateUsername',
        updateLoginStatus : 'updateLoginStatus',
        setClearInterval : 'setClearInterval',
        setTopDialogVisiable : 'setTopDialogVisiable',
        setDialogEmail : 'setDialogEmail',
        setDialogMsg : 'setDialogMsg',
      }),
      firstPage() {
          $(".fp-title-selected").removeClass("fp-title-selected")
          $(".li1").addClass("fp-title-selected")
          $(".li1 > div").removeClass("nav-li-title")
          $(".li2 > div").addClass("nav-li-title")
          $(".fp-title-selected-div").removeClass("fp-title-selected-div")
          this.$router.push({name : "main"})
      },
      async getData (){
        var userInfoData = await api.ajax('user/findInfo', this.form)
        if(userInfoData && userInfoData.code == '0'){
          this.userInfo = userInfoData.data
          this.setUserInfo(this.userInfo)
          this.updateUsername(this.userInfo.username)
        } else {
          errorMsg(userInfoData.msg)
        }
      },
			async refreshMoney () {
        var balanceData = await api.ajax('refresh', this.form)
        if(balanceData && balanceData.code == '0'){
          this.balanceInfo = balanceData.data
          this.setRefreshMoney(this.balanceInfo)
          if(balanceData.code != '0'){
             return
          }
          this.countUnread = balanceData.data.newMsgCount
          var msgListData = await api.ajax('msg/pageList', this.form)
          if(msgListData && msgListData.code == '0'){
            this.userMsg = msgListData.data;
            this.totalRow = msgListData.data.totalRow;
            this.pageSize = msgListData.data.pageSize;
          } else {
            errorMsg(msgListData.msg)
          }
        } else {
          errorMsg(balanceData.msg)
        }
      },
      openDialog(event){
        var srcElem = event.target
        var clsName = ''
        if(srcElem.tagName.toLowerCase() === 'img'){
           clsName = srcElem.parentElement.parentElement.className
        } else if(srcElem.className.toLowerCase() === 'top-left-content'||srcElem.className.toLowerCase() === 'top-left-content coloryellow'){
           clsName = srcElem.parentElement.className
        }
        var hash = location.hash
        switch (clsName.toLowerCase()) {
          case "top-right1":
            this.setTopDialogVisiable(true)
            this.title = "资金管理"
            if(hash && hash.indexOf("main/account") > -1){
              let path = hash.slice(hash.lastIndexOf("/")+1)
              this.$router.push({name : path})
            }else {
              this.setDiaView('account')
              this.setFirstView('money-in')
            }
            break
          case "top-right2":
             this.setTopDialogVisiable(true)
             this.title = "资金管理"
             if(hash && hash.indexOf("main/account") > -1){
                let path = hash.slice(hash.lastIndexOf("/")+1)
                this.$router.push({name : path})
             }else {
                this.setDiaView('account')
                this.setFirstView('money-out')
             }
             break
          case "top-right3":
             this.setTopDialogVisiable(true)
             this.title = "账户管理"
             if(hash && hash.indexOf("main/account") > -1){
                let path = hash.slice(hash.lastIndexOf("/")+1)
                this.$router.push({name : path})
             }else {
                this.setDiaView('account')
                this.setFirstView('useraccount')
             }
            break
          case "top-right4":
            this.setDialogMsg(true)
            this.title = "公告信息"
            this.setFirstView('email-1')
            break
          case "top-right5":
            this.setDialogEmail(true)
            this.title = "邮件"
            // if(hash && hash.indexOf("main/account") > -1){
            //   let path = hash.slice(hash.lastIndexOf("/")+1)
            //   this.$router.push({name : path})
            // }else {
            //   this.setDiaView('account')
            // }
            console.log(clsName.toLowerCase())
            break
          case "top-right6":
            console.log(clsName.toLowerCase())
            break
          case "top-right7":
           console.log(clsName.toLowerCase())
            break
          default:
            console.log(clsName.toLowerCase())
            break
        }
    },
    openHandle(){
        console.log('openHandle')
        this.setClearInterval(true)
    },
    closeHandle(){
      this.setDialogEmail(false)
      this.setTopDialogVisiable(false)
      this.setClearInterval(false)
      this.refreshMoney()
      this.setDialogMsg(false)
    },
      animateTop(event){
        var elem = event.target
        if(!elem){
          return
        }
        var tag = elem.tagName.toLowerCase()
        if(tag == "div"){
          $("img:first", elem).addClass('animated infinite bounce')
        }
      },
      leaveTop(event){
        var elem = event.target
        if(!elem){
          return
        }
        $("img", elem).removeClass('animated infinite bounce')
      },
      selectCai(event){
        var elem = event.target
        if(!elem){
          return
        }
        const name = elem.getAttribute("name")
        if(!name){
          return
        }
        this.showCai = false
        this.$router.push({name : "lottery", params: { id: name }})
      },
      switchToCai(){
        $(".fp-title-selected > div").addClass('nav-li-title')
        $(".fp-title-selected").removeClass('fp-title-selected')
        $(".li2 > div").removeClass("nav-li-title")
        $(".li2").removeClass('fp-title-selected').addClass("fp-title-selected")
        $(".li2 span").addClass("fp-title-selected-div")
      },
      selectDownload(event){
        var elem = event.target
        if(!elem){
          return
        }
        const name = elem.getAttribute("name")
        if(!name){
          return
        }
        this.showDownload = false
      },
      async logout(){
        const data = api.ajax('logout',this.form)
        this.updateLoginStatus(false)
        this.$router.push({name : "login"})
      },
      customService(){
        window.open("http://Route.yinhu3399.me:17369/Route.aspx?ModID=1","_blank")
      }      
		}
	}
</script>
<style scoped>
	.fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .top {
    	width: 100%;
    	height: 38px;
    }
    .top-content {
    	width: 1210px;
    	height: 38px;
        line-height: 38px;
        font-size: 13px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #fff;
    	margin: 0px auto;
    	position: relative;
    }
    .top-content span{
    	margin : 0 10px;
    }
    .top-left {
    	display: inline-block;
    	float: left;
    	height: 38px;
    	line-height: 38px;
    }
    .top-right1,.top-right2,.top-right3,.top-right4,.top-right5,.top-right6,.top-right7 {
    	display: inline-block;
    	float: right;
    	height: 38px;
    	line-height: 38px;
    }
    .top-left-content {
    	display: inline-block;
    	height: 38px;
    	line-height: 38px;
    	vertical-align: text-bottom;
    	margin: 0 10px;
    	position: relative;
    }
    .top-left-content:hover {
      cursor: pointer;
    }
    .topHeader-logo {
    	position: relative;
    	top: 6px;
    }
    .redPoint {
    	position: relative;
    	top: -11px;
    	right: 1px;
    }
    .coloryellow {
    	color: #ffea00;
    }
    .top-nav {
    	width: 1210px;
    	height: 85px;
    	margin: 0 auto;
      
    }
    .nav-left {
    	display: inline-block;
    	width: 354px;
    	height: 85px;
    }
    .nav-left img {
    	margin : 15px 0 11px 23px;
    }
    .nav-right {
    	width: 856px;
    	height: 85px;
    	line-height: 85px;
    	float: right;
    	font-family: SimHei, 黑体, STHeiti, 华文黑体;
    	font-size: 19px;
    	color: #fff;
    }
    .nav-li {
    	float: left;
    	margin-left: 33px;
    	position: relative;
      cursor: pointer;
      height: 82px;
    }
    .margin-0 {
    	margin: 0;
    }
    .nav-li-title {
    	height: 58px;
    }
    .nav-li-title:hover {
    	color: #ffea00;
    	cursor: pointer;
      border-bottom: 1px solid #ffea00;
    }
    .borderBot {
      border-bottom: 1px solid #ffea00;
    }
    .nav-li-title:hover .status-logo{
    	transition: all 0.5s ease-in;
    	background-image: url("../../images/imgBiaoQian-XuanZhongZhuangTai.png");
    }
    .status-logo {
    	display: inline-block;
    	width: 12px;
    	height: 12px;
    	background-image: url("../../images/imgBiaoQian-PuTongZhuangTai.png");
    }
    .tanBox1 {
    	width: 1130px;
    	height: 300px;
    }
    #theTable {
    	height: 302px;
    	font-family: SimHei, 黑体, STHeiti, 华文黑体;
    	border-bottom: solid 1px #fff;
    }
    #theTable  thead tr {
    	margin-top: 5px;
    }
    #theTable th {
      	height: 58px;
      	line-height: 58px;
      	padding-left: 21px;
      	font-size: 21px;
     	color: #fff;
      	text-align: left;
      	border-right: solid 1px #a2b2e7;
      	border-bottom: solid 1px #a2b2e7;
    }
    #theTable td  {
      	font-size: 21px;
      	color: #fff;
      	text-align: center;
      	border-right: solid 1px #a2b2e7;
      	background-image: url('../../images/imgKuang.png');
      	background-repeat: no-repeat;
      	background-position: 12px 7px;
        vertical-align: middle;
    }
    #theTable td .hot-logo {
    	position: absolute;
    	top: 68px;
    	left: 162px;
    }
    #theTable td:hover {
    	color: #ffea00;
    	cursor: pointer;
    	background-image: url('../../images/imgKuangxuanzhong.png');
    }
    #theTable .border-right0 {
    	border-right: 0; 
    }
    #theTable .backNoimg {
    	background-image: none;
    }
    #theTable .backNoimg:hover {
    	background-image: none;
    }
    .tanBox4 {
    	width: 623px;
    	height: 138px;
    }
    .tanBox4-logo {
    	width: 154px;
    	height: 133px;
    	float: left;
    	margin-top: 3px;
    	border-right: solid 1px #fff;
    }
    .PClogo,.PTlogo,.IOSlogo,.ANDROIDlogo{
    	background-repeat: no-repeat;
    	background-position: 34px;
    }
    .PClogo,.PTlogo,.IOSlogo,.ANDROIDlogo:hover{
    	cursor: pointer;
    }
    .PClogo {
    	background-image: url('../../images/btnPcDuanXiaZai.png');
    }
    .PClogo:hover {
    	background-image: url('../../images/btnPcDuanXiaZaiClick.png');
    }
    .PTlogo {
    	background-image: url('../../images/btnPtDuanXiaZai.png');
    }
    .PTlogo:hover {
    	background-image: url('../../images/btnPtDuanXiaZaiClick.png');
    }
    .IOSlogo {
    	background-image: url('../../images/btnIosShouJiDuan.png');
    }
    .IOSlogo:hover {
    	background-image: url('../../images/btnIosShouJiDuanClick.png');
    }
    .ANDROIDlogo {
    	background-image: url('../../images/btnAndroid.png');
    }
    .ANDROIDlogo:hover {
    	background-image: url('../../images/btnAndroidClick.png');
    }
    .border-right0 {
    	border-right: none;
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
    .dialogLogo {
        display: inline-block;
        float: left;
    }
    .account {
        background-image: url('../../images/imgZhangHuGuanLiDa.png');
        background-repeat: no-repeat;
        width: 21px;
        height: 21px;
    }
    .record {
        background-image: url('../../images/imgYouXiJiLu.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 25px;
        height: 20px;
        margin-top: 1px;
    }
    .team {
        background-image: url('../../images/imgTuanDuiGuanLi.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 29px;
        height: 20px;
        margin-top: 1px;
    }
    .fund {
        background-image: url('../../images/imgZiJinGuanLi.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 25px;
        height: 20px;
        margin-top: 1px;
    }
    .email {
        background-image: url('../../images/imgAnQuanYouXiang.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 25px;
        height: 20px;
        margin-top: 1px;
    }
    .news {
        background-image: url('../../images/imgGongGaoXinXi.png');
        background-repeat: no-repeat;
        background-size: contain;
        width: 25px;
        height: 20px;
        margin-top: 1px;
    }
    .fp-title-selected {
      color: #ffea00;
      border-bottom: 5px solid #ffea00;
    }
    .fp-title-selected-div {
      background-image: url("../../images/imgBiaoQian-XuanZhongZhuangTai.png");
    }
    
    .li1 {
       height: 79px;
    }
</style>
