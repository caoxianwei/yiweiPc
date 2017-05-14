<template>
  <div class="menu unselectable translate3d-zero">
    <ul @click.stop="showSec">
      <li class="firstList firstList-radius"><img class="left-icon-img" src="../../images/imgGongGaoXinXi.png"><a class="m-l-5">公告信息<span class="status-logo"></span></a>
        <ul class="secondList">
          <li name="email-1"><span class="point-logo"></span><span class="menu-desc-stl">重要通知</span><span class="status-logo-little"></span></li>
          <li name="email-2"><span class="point-logo"></span><span class="menu-desc-stl">派奖信息</span><span class="status-logo-little"></span></li>
          <li name="email-3"><span class="point-logo"></span><span class="menu-desc-stl">平台维护</span><span class="status-logo-little"></span></li>
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
    name : "email-nav",
    components : {
    },
    mounted () {
      this.initShow(true)
      unselectable(".unselectable")
    },
    data(){
      return {
        showOne : false
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
    },
    methods :{
      ...mapActions({
        setFirstView : 'setFirstView',
        setMsgTitleIndex : 'setMsgTitleIndex',
      }),
      showSec(event){
        var srcElem = event.target
        var target = $(srcElem)
        var li = target.closest('li')
        const name = li.attr("name")
        if(name){
          this.setFirstView(name)
          this.setMsgTitleIndex(0)
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