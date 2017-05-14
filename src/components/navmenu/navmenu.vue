<template>
  <div class="menu unselectable translate3d-zero">
    <ul @click.stop="showSec">
      <li class="firstList firstList-radius"><img class="left-icon-img" src="../../images/imgZhangHuGuanLiXiao.png"><a class="m-l-5">账户信息<span class="status-logo"></span></a>
        <ul class="secondList">
          <li name="useraccount"><span class="point-logo"></span><span class="menu-desc-stl">账户信息</span><span class="status-logo-little"></span></li>
          <li name="safecenter"><span class="point-logo"></span><span class="menu-desc-stl">安全中心</span><span class="status-logo-little"></span></li>
          <li name="bankcard"><span class="point-logo"></span><span class="menu-desc-stl">银行管理</span><span class="status-logo-little"></span></li>
        </ul>
      </li>
      <li class="firstList"><img class="left-icon-img" src="../../images/imgYouXiJiLu.png"><a class="m-l-5">游戏记录<span class="status-logo"></span></a>
        <ul class="secondList">
          <li name="game-bet-record"><span class="point-logo"></span><span class="menu-desc-stl">游戏投注记录</span><span class="status-logo-little"></span></li>
          <li name="account-flow-record"><span class="point-logo"></span><span class="menu-desc-stl">账户流水记录</span><span class="status-logo-little"></span></li>
          <li name="Personal-profitLoss-record"><span class="point-logo"></span><span class="menu-desc-stl">个人盈亏记录</span><span class="status-logo-little"></span></li>
        </ul>
      </li>
      <li class="firstList"><img class="left-icon-img" src="../../images/imgTuanDuiGuanLi.png"><a class="m-l-5">团队管理<span class="status-logo"></span></a>
        <ul class="secondList">
          <li name="add-member"><span class="point-logo"></span><span class="menu-desc-stl">添加会员</span><span class="status-logo-little"></span></li>
          <li name="member-list"><span class="point-logo"></span><span class="menu-desc-stl">会员列表</span><span class="status-logo-little"></span></li>
          <li name="team-bet"><span class="point-logo"></span><span class="menu-desc-stl">团队投注</span><span class="status-logo-little"></span></li>
          <li name="team-change"><span class="point-logo"></span><span class="menu-desc-stl">团队变帐</span><span class="status-logo-little"></span></li>
          <li name="team-report"><span class="point-logo"></span><span class="menu-desc-stl">团队报表</span><span class="status-logo-little"></span></li>
          <li name="team-data"><span class="point-logo"></span><span class="menu-desc-stl">团队数据</span><span class="status-logo-little"></span></li>
          <li v-show="showTeamDividend" name="team-dividend"><span class="point-logo"></span><span class="menu-desc-stl">团队月分红</span><span class="status-logo-little"></span></li>
        </ul>
      </li>
      <li class="firstList"><img class="left-icon-img" src="../../images/imgZiJinGuanLi.png"><a class="m-l-5">资金管理<span class="status-logo"></span></a>
        <ul class="secondList">
          <li name="money-in"><span class="point-logo"></span><span class="menu-desc-stl">平台充值</span><span class="status-logo-little"></span></li>
          <li name="money-out"><span class="point-logo"></span><span class="menu-desc-stl">平台取款</span><span class="status-logo-little"></span></li>
          <li name="transfer"><span class="point-logo"></span><span class="menu-desc-stl">额度转账</span><span class="status-logo-little"></span></li>
          <li name="in-record"><span class="point-logo"></span><span class="menu-desc-stl">平台充值记录</span><span class="status-logo-little"></span></li>
          <li name="out-record"><span class="point-logo"></span><span class="menu-desc-stl">平台取款记录</span><span class="status-logo-little"></span></li>
          <li name="transfer-record"><span class="point-logo"></span><span class="menu-desc-stl">额度转账记录</span><span class="status-logo-little"></span></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script lang="babel">
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  import { unselectable } from "../../tools/command"
  export default {
    name : "navmenu",
    components : {
    },
    data(){
      return {
        showOne : false
      }
    },
    mounted () {
      this.initShow(true)
      unselectable(".unselectable")
    },
    methods :{
      ...mapActions({
        setFirstView : 'setFirstView',
        setBankcardView : 'setBankcardView',
        setTeamReportPerson : 'setTeamReportPerson',
      }),
      showSec(event){
        var srcElem = event.target
        var target = $(srcElem)
        var li = target.closest('li')
        const name = li.attr("name")
        if(name){
          if(name == 'bankcard'){
            this.setBankcardView('cardlist')
          }
          if(name == "team-change"){
            this.setTeamReportPerson("")
          }
          this.setFirstView(name)
        } else {
          $("ul", li).toggle()
          $(".status-logo", li).toggleClass("status-logo-selected")
          if(this.showOne){
              li.siblings().children('ul').hide()
              $(".status-logo-selected", li.siblings()).removeClass('status-logo-selected')
          }
        }
      },
      initShow(flag){
        const firstView = this.$store.state.useraction.firstView
        if(!firstView){
          return
        }
        const selector = "li[name="+firstView+"]"
        const cli = $(selector)
        $(".second-content-change").removeClass('second-content-change')
        cli.addClass("second-content-change")
        $(".point-logo-change").removeClass("point-logo-change")
        $("span.point-logo",cli).addClass("point-logo-change")
        $(".status-logo-little-change").removeClass('status-logo-little-change')
        $("span.status-logo-little",cli).addClass("status-logo-little-change")

        cli.closest('ul').show()
        const pli = cli.closest('ul').closest('li')
        if(flag && !this.showOne){
          pli.siblings().children('ul').show()
          $(".status-logo").toggleClass("status-logo-selected")
        }
        $(".status-logo", pli).addClass("status-logo-selected")
      }
    },
    computed : {
      firstView(){
        return this.$store.state.useraction.firstView
      },
      showTeamDividend(){
        const agentLevel = this.$store.state.useraction.userInfo.agentLevel
        if(agentLevel){
          return true
        } 
        return false
      }
    },
    watch : {
      "firstView" : function(){
         this.initShow()
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
  li:hover {
    cursor: pointer;
  }
  .menu {
    width: 160px;
    height: 731px;
    border-radius: 2px !important;
    border-bottom-right-radius: 0 !important; 
    display: inline-block;
    background-image: url("../../images/imgZuoBianCaiDanDi.png");
  }
  .firstList {
    width: 158px;
    line-height: 37px;
    text-align: center;
    background-image: url('../../images/imgZuoBianChengSeDi.png');
    background-repeat: no-repeat;
    font-size: 16px;
    color: #fff;
    position: relative;
    left: 2px;
    font-family: SimSun, 宋体, STSong, 华文宋体;
  }

  .firstList-radius {
    border-top-left-radius: 10px !important;
  }

  .status-logo {
    display: inline-block;
    float: right;
    position: relative;
    top: 10px;
    right: 17px;
    width: 19px;
    height: 17px;
    background-image: url("../../images/imgJianTou.png");
    background-repeat: no-repeat;
    background-position: right center;
  }  

  .status-logo-selected {
    top: 6px;
    right: 12px;
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);   
    -moz-transform:rotate(90deg);  
    -webkit-transform:rotate(90deg);
    -o-transform:rotate(90deg); 
  }
  .status-logo-little {
    display: inline-block;
    float: right;
    position: relative;
    top: 7px;
    right: 15px;
    width: 7px;
    height: 14px;
  }
  .status-logo-little-change {
    background-image: url("../../images/imgJianTou02.png");
  }
  .secondList {
    display: none;
  }
  .secondList li {
    width: 158px;
    height: 29px;
    line-height: 29px;
    text-align: center;
    color: #4b4f5b;
    font-size: 14px;
    font-family: SimSun, 宋体, STSong, 华文宋体;
  }
  .second-content-change{
    color: #ffa11c !important;
    background-image: url('../../images/imgZuoBianXuanZhongDi.png');
  }
  .point-logo {
    display: inline-block;
    width: 6px;
    height: 29px;
    line-height: 29px;
    float: left;
    margin-left: 20px;
    background-image: url('../../images/imgHuiSeDian.png');
    background-repeat: no-repeat;
    background-position: left center;
  }
  .point-logo-change {
    background-image: url('../../images/imgChengSeYuanDian.png');
  }
  .left-icon-img {
    float: left;
    margin-top: 10px;
    margin-left: 15px;
    margin-right: -30px;
  }
  .menu-desc-stl {
    display: inline-block;
    float: left;
    margin-left: 15px;
  }
</style>