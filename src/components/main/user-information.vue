<template>
    <div class="userAccount">
        <div class="account-top">
          <p class="ID">{{userInfo.username}}，欢迎您</p>
          <p @mouseenter="animateMoney" @mouseleave="leaveMoney" class="money c-p">余额：{{balance}}<img class="refresh-logo" @click.prevent="refreshMoney" src="../../images/imgYuEShuaXin.png"></p>
        </div>
        <div class="account-content">
          <div class="content-top">
            <span class="safeStar">安全星级:{{securityLevel}}星</span>
            <span class="riseStar">提升</span>
            <div class="stars">
              <img v-if="first" src="../../images/imgXing-Er.png">
              <img v-if="firstStar" src="../../images/imgXing-Yi.png">
              <img v-if="second" src="../../images/imgXing-Er.png">
              <img v-if="secondStar" src="../../images/imgXing-Yi.png">
              <img v-if="third" src="../../images/imgXing-Er.png">
              <img v-if="thirdStar" src="../../images/imgXing-Yi.png">
              <img v-if="fourth" src="../../images/imgXing-Er.png">
              <img v-if="fourthStar" src="../../images/imgXing-Yi.png">
              <img v-if="fifth" src="../../images/imgXing-Er.png">
              <img v-if="fifthStar" src="../../images/imgXing-Yi.png">
            </div>
          </div>
          <div class="content-middle">
            <p class="">上次登录&nbsp;{{userInfo.lastLoginTime}}</p>
            <p class="">广东省深圳市宝安区&nbsp;电信</p>
          </div>
          <div class="content-bottom">
            <el-button type="text" class="btnMoneyIn" @click.stop="moneyIn">充值</el-button>
          </div>
        </div>
        <div class="account-bottom">
          <div class="bottom-up">
            <a @mouseenter="animateMoney" @mouseleave="leaveMoney" @click.stop="moneyOut"><img src="../../images/imgTiXian.png"><span class="m-l-3">提现</span></a>
            <a @mouseenter="animateMoney" @mouseleave="leaveMoney" @click.stop="transfer" class="floatRig"><img src="../../images/imgTiXian.png"><span class="m-l-3">转账</span></a>
          </div>
          <div class="bottom-down">
            <a href="">如何充值</a>
            <a href="" class="floatRig">提现须知</a>
          </div>
        </div>
    </div>    
</template>
<script>
    import api from '../../api'
    import { mapActions } from 'vuex'
    import $ from 'jquery'
    import { errorMsg, succMsg} from "../../tools/command"
    export default {
        name: "userAccount",
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
              freshLogo: false,
              balanceInfo: {},
              form: {},
            }
        },
        mounted: function () {
          this.refreshMoney()
        },
        computed: {
          userInfo () {
            return this.$store.state.useraction.userInfo
          },
          securityLevel () {
            return this.$store.state.useraction.userInfo.securityLevel
          },
          balance () {
              return this.$store.state.useraction.refreshMoney.balance
          },
        },
        methods : {
            ...mapActions({
              setRefreshMoney : 'setRefreshMoney',
              setDiaView : 'setDiaView',
              setFirstView : 'setFirstView',
              setTopDialogVisiable : 'setTopDialogVisiable',
            }),
            async refreshMoney() {
              var balanceData = await api.ajax('refresh', this.form)
              if(balanceData && balanceData.code == '0'){
                this.balanceInfo = balanceData.data
                this.setRefreshMoney(this.balanceInfo)
                if(balanceData.code != '0'){
                   return
                }
              } else {
                errorMsg(balanceData.msg)
              }
            },
            fresh() {
              if (this.freshLogo == false) {
                this.freshLogo = true
                this.refreshMoney()
              }else {
                this.freshLogo = false
              }
            },
            animateMoney(event){
              var elem = event.target
              if(!elem){
                return
              }
              $("img:first", elem).addClass('animated infinite bounce')
            },
            leaveMoney(event){
              var elem = event.target
              if(!elem){
                return
              }
              $("img", elem).removeClass('animated infinite bounce')
            },
            moneyIn() {
              this.setTopDialogVisiable(true)
              this.setDiaView('account')
              this.setFirstView('money-in')
            }, 
            moneyOut() {
              this.setTopDialogVisiable(true)
              this.setDiaView('account')
              this.setFirstView('money-out')
            },  
            transfer() {
              this.setTopDialogVisiable(true)
              this.setDiaView('account')
              this.setFirstView('transfer')
            },     
        },
        watch : {
          securityLevel(val){
            if (val ==0) {
              return
            } else if (val ==1) {
              this.first = false
              this.firstStar = true
            } else if (val ==2) {
              this.first = false
              this.firstStar = true
              this.second = false
              this.secondStar = true
            } else if (val ==3) {
              this.first = false
              this.firstStar = true
              this.second = false
              this.secondStar = true
              this.third = false
              this.thirdStar = true
            } else if (val ==4) {
              this.first = false
              this.firstStar = true
              this.second = false
              this.secondStar = true
              this.third = false
              this.thirdStar = true
              this.fourth = false
              this.fourthStar = true
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
            }
          },
        },
    }
</script>
<style scoped>
    .userAccount {
      width: 300px;
      height: 354px;
      float: left;
    }
    .account-top {
      position: relative;
      top: 22px;
      left: 0px;
      width: 200px;
      margin-left: 100px;
      overflow: hidden;
    }
    .account-top p {
      margin: 5px 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 200px;
      overflow: hidden;
    }
    .ID {
      font-size: 18px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      font-weight: bold;
    }
    .money {
      line-height: 26px;
      font-size: 16px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      color: #ffea00;
    }
    .fresh {
      float: right;
      margin-right: 10px;
      color: #16d3f5;
    }
    .fresh:hover {
      color: #16d3f5;
      background-color: transparent !important;
    }
    .account-content {
      height: 163px;
      position: relative;
      top: 31px;
      padding: 11px 16px 7px 11px;
    }
    .content-top {
      height: 70px;
      padding: 0 10px;
    }
    .safeStar,.riseStar {
      font-size: 14px;
      font-family: SimSun, 宋体, STSong, 华文宋体;
      font-weight: bold;
      color: #fff;
    }
    .riseStar {
      float: right;
      color: #16d3f5;
    }
    .stars {
      text-align: center;
      top: 15px;
      position: relative;
    }
    .stars img {
      display: inline-block;
    }
    .content-middle {
      height: 40px;
      font-family: SimSun, 宋体, STSong, 华文宋体;
      font-size: 13px;
      color: #c9cddf;
      line-height: 20px;
      padding-top: 3px;
    }
    .content-middle p {
      padding: 0 0 0 5px;
    }
    .content-bottom {
      height: 47px;
      text-align: center;
      margin-top: 10px;
    }
    .btnMoneyIn {
      width: 193px;
      color: #fff;
      border-radius: 18px;
      font-size: 17px;
      font-weight: bold;
    }
    .account-bottom {
      height: 71px;
      position: relative;
      top: 31px;
    }
    .bottom-up {
      padding: 0 55px;
      font-size: 18px;
      line-height: 34px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      cursor: pointer;
    }
    .bottom-up a {
      color: #fff;
    }
    .floatRig {
      float: right;
    }
    .bottom-down {
      padding: 10px 60px 10px 60px;
      font-size: 12px;
      font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    .bottom-down a {
      color: #8291cb;
    }
    .tixian-bg {
       background-image: url("../../images/imgTiXian.png");
       background-repeat: no-repeat;
       background-position: 0 43%;
       display: inline-block;
       width: 50px;
       padding-left: 22px;
    }
    .zhuanzhang-bg {
       background-image: url("../../images/imgZhuanZhang.png");
       background-repeat: no-repeat;
       background-position: 0 45%;
       display: inline-block;
       width: 40px;
       padding-left: 22px;
    }
    .refresh-logo {
      position: relative;
      top: 5px;
    }
</style>