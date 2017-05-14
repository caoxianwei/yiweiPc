<template>
<div>
  <div class="gameTab lottery-tab">
    <ul>
      <li v-for="item in tl" @click.stop="goLottery" :name="'cai' + item" class="borderBot">
        <div class="gameTitle">
          <div class="gameLogo" :class="['cai'+item]"></div>
          <span class="gameName">{{caiName(item)}}</span>
        </div>
      </li>
      <li v-for="item in bl" @click.stop="goLottery" :name="'cai' + item" class="height177">
        <div class="gameTitle">
          <div class="gameLogo-2" :class="['cai'+item]"></div>
          <span class="gameName">{{caiName(item)}}</span>
        </div>
      </li>
    </ul>
  </div>
   <div class="showListLogo" v-popover:popover6>
          <el-popover popper-class="pop-cus-class-tab" 
                            ref="popover6" 
                            placement="top" :offset="498" 
                            trigger="hover" :visible-arrow="false">
                                <div class="tanBox1" >
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
                                              <th class="border-right0">低频</th>
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
                                          <td name="cai4" class="border-right0">福彩3D</td>
                                        </tr>
                                        <tr>
                                          <td name="cai2" class="border-right0">江西时时彩</td>
                                          <td name="cai15">三分彩</td>
                                          <td name="cai9">江西11选5</td>
                                          <td name="cai13">北京赛车PK10</td>
                                          <td>安徽快三</td>
                                          <td name="cai5" class="border-right0">排列3</td>
                                        </tr>
                                        <tr>
                                          <td name="cai3" class="border-right0">黑龙江时时彩</td>
                                          <td name="cai11">五分彩</td>
                                          <td name="cai8">广东11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>江苏骰宝</td>
                                          <td class="border-right0">双色球</td>
                                        </tr>
                                        <tr>
                                          <td name="cai7" class="border-right0">天津时时彩</td>
                                          <td class="backNoimg"></td>
                                          <td>乐利11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>吉利骰宝</td>
                                          <td name="cai14" class="border-right0">六合彩</td>
                                        </tr>
                                        <tr>
                                          <td name="cai6" class="border-right0">新疆时时彩</td>
                                          <td class="backNoimg"></td>
                                          <td>顺利11选5</td>
                                          <td class="backNoimg"></td>
                                          <td class="backNoimg"></td>
                                          <td class="backNoimg border-right0"></td>
                                        </tr>
                                    </tbody>
                                  </table>
                                  <div x-arrow class="lottery-arrow-tab"></div>
                              </div>
                          </el-popover>
        </div>
        <div class="settingLogo" @click.stop="showSettingLottery" v-popover:popover7>
             <el-popover popper-class="pop-cus-class-tab" 
                            ref="popover7" 
                            placement="top" :offset="528" v-model="showSetting" 
                            trigger="manual" :visible-arrow="false">
                                <div class="tanBox1" >
                                  <table class="setting-table" width="100%" border="0" cellspacing="0" cellpadding="0">
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
                                              <th class="border-right0">低频</th>
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
                                    <tbody class="tbody" ref="settingLottery" @click.stop="setCai">
                                        <tr>
                                          <td name="cai1" class="border-right0">重庆时时彩</td>
                                          <td name="cai12">分分彩</td>
                                          <td name="cai10">山东11选5</td>
                                          <td>北京快乐8</td>
                                          <td>江苏快三</td>
                                          <td name="cai4" class="border-right0">福彩3D</td>
                                        </tr>
                                        <tr>
                                          <td name="cai2" class="border-right0">江西时时彩</td>
                                          <td name="cai15">三分彩</td>
                                          <td name="cai9">江西11选5</td>
                                          <td name="cai13">北京赛车PK10</td>
                                          <td>安徽快三</td>
                                          <td name="cai5" class="border-right0">排列3</td>
                                        </tr>
                                        <tr>
                                          <td name="cai3" class="border-right0">黑龙江时时彩</td>
                                          <td name="cai11">五分彩</td>
                                          <td name="cai8">广东11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>江苏骰宝</td>
                                          <td class="border-right0">双色球</td>
                                        </tr>
                                        <tr>
                                          <td name="cai7" class="border-right0">天津时时彩</td>
                                          <td class="backNoimg"></td>
                                          <td>乐利11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>吉利骰宝</td>
                                          <td name="cai14" class="border-right0">六合彩</td>
                                        </tr>
                                        <tr>
                                          <td name="cai6" class="border-right0 b-b-a2b2e7">新疆时时彩</td>
                                          <td class="backNoimg b-b-a2b2e7"></td>
                                          <td class="b-b-a2b2e7">顺利11选5</td>
                                          <td class="backNoimg b-b-a2b2e7"></td>
                                          <td class="backNoimg b-b-a2b2e7"></td>
                                          <td class="backNoimg b-b-a2b2e7 border-right0"></td>
                                        </tr>
                                        <tr>
                                          <td colspan="3" class="backNoimg b-r-none t-r">
                                              <span class="setting-btn t-c b-c-setting" @click.stop="settingConfirm">确定</span>
                                          </td>
                                          <td colspan="3" class="backNoimg t-l border-right0">
                                              <span class="setting-btn t-c b-c-setting" @click.stop="settingCancel">取消</span>
                                          </td>
                                        </tr>
                                    </tbody>
                                  </table>
                                  <div x-arrow class="lottery-arrow-tab"></div>
                              </div>
                          </el-popover>
        </div>
</div>  
</template>
<script lang="babel">
  import $ from 'jquery'
  import { mapActions } from 'vuex'
  import lotteryShow from './lottery-show'
  import cai from '../lottery/cai-constants'
  import { errorMsg, succMsg} from "../../tools/command"
  import api from '../../api'
  export default {
      name: "lottery",
      data(){
          return {
            cai1 : 'cai1',
            cai2 : 'cai2',
            cai3 : 'cai3',
            cai4 : 'cai4',
            cai5 : 'cai5',
            cai6 : 'cai6',
            cai7 : 'cai7',
            cai8 : 'cai8',
            cai9 : 'cai9',
            cai10 : 'cai10',
            cai11 : 'cai11',
            cai12 : 'cai12',
            cai13 : 'cai13',
            cai14 : 'cai14',
            cai15 : 'cai15',
            tl : [],
            bl : [],
            lotteryShow : {},
            showSetting : false,
            curSel : '',
          }
      },
      mounted: function () {
          this.getTheme()
      },
      computed : {
      },
      methods : {
        ...mapActions({
          setCurrentLottery : 'setCurrentLottery',
        }),
        goLottery(event){
            var elem = event.target
            const li = $(elem).closest('*[name]')
            if(!li){
              return
            }
            const name = li.attr("name")
            if(!elem){
              return
            }
            if(this.showSetting) {
                if(this.curSel){
                    $("."+this.curSel,'.lottery-tab').removeClass(this.curSel + '-selected')
                }
                $("."+name,'.lottery-tab').addClass(name + '-selected')
                this.curSel = name
            } else {
                this.$router.push({name : "lottery", params: { id: name }})
            }
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
        setCai(event){
            var elem = event.target
            if(!elem){
              return
            }
            const name = elem.getAttribute("name")
            if(!name){
              return
            }
            const cai = Number(name.substr(3))
            if(this.tl.indexOf(cai) > -1 || this.bl.indexOf(cai) > -1) {
                return
            }
            $("."+this.curSel,'.lottery-tab').removeClass(this.curSel + '-selected')

            var next = $("li[name='"+this.curSel+"']",'.lottery-tab').next("li")
            if(next.length == 0){
                next = $("ul li:first-child",'.lottery-tab')
            }
           
            const curCai = Number(this.curSel.substr(3))
            if(this.tl.indexOf(curCai) > -1){
                const ind = this.tl.indexOf(curCai)
                this.tl.splice(ind, 1, cai)
            } else if(this.bl.indexOf(curCai) > -1){
                const ind = this.bl.indexOf(curCai)
                this.bl.splice(ind, 1, cai)
            }

            this.curSel = next.attr("name")
            $("."+this.curSel,'.lottery-tab').addClass(this.curSel + '-selected')
            this.setSelected()

        },
        caiName(val){
            return cai['cai'+val]
        },
        setSelected(){
            $('.setting-td-selected').removeClass('setting-td-selected')
            const lotteryShow = this.$refs.settingLottery
            if(!lotteryShow){
                return
            }
            var ctx = $(lotteryShow)
            this.tl.forEach((element, index) => {
                const sel = "td[name='cai"+element+"']"
                $(sel, ctx).addClass('setting-td-selected')
            })
            this.bl.forEach( (element, index) => {
                const sel = "td[name='cai"+element+"']"
                $(sel, ctx).addClass('setting-td-selected')
            })
        },
        showSettingLottery(){
            this.showSetting = true
            const name = $("ul li:first",'.lottery-tab').attr("name")
            this.curSel = name
            $("."+name,'.lottery-tab').addClass(name + '-selected')
            this.setSelected()
        },
        settingConfirm(){
            $("."+this.curSel,'.lottery-tab').removeClass(this.curSel + '-selected')
            this.showSetting = false
            var s = {}
            s.tl = this.tl
            s.bl = this.bl
            this.lotteryShow = s
            this.saveSetting()
        },
        settingCancel(){
            $("."+this.curSel,'.lottery-tab').removeClass(this.curSel + '-selected')
            this.showSetting = false
            this.tl.splice(0, 6, ...this.lotteryShow['tl'])
            this.bl.splice(0, 6, ...this.lotteryShow['bl'])
            this.setSelected()
        },
        async saveSetting(){
            var theme = {}
            theme.skin = this.$store.state.user.skin
            theme.tl = this.tl
            theme.bl = this.bl
            var para = {}
            para.theme = JSON.stringify(theme)
            const data = await api.ajax('user/updateTheme', para)
            if (data.code != '0') {
                errorMsg(data.msg)
            }
        },
        async getTheme() {
            const data = await api.ajax('user/getTheme', {})
            if (data && data.code == '0') {
                const theme = JSON.parse(data.data || null )
                if (theme) {
                    if (theme.tl && theme.tl.length > 0) {
                        this.tl.push(...theme.tl)
                        this.bl.push(...theme.bl)
                        var s = {}
                        s.tl = theme.tl
                        s.bl = theme.bl
                        this.lotteryShow = s
                    } else {
                        this.tl.push(...lotteryShow['tl'])
                        this.bl.push(...lotteryShow['bl'])
                        this.lotteryShow = lotteryShow
                    }
                } else {
                    this.tl.push(...lotteryShow['tl'])
                    this.bl.push(...lotteryShow['bl'])
                    this.lotteryShow = lotteryShow
                }
            } 
        },
      },
      watch : {
         
      }
  }
</script>
<style scoped>
    .gameTab {
      width: 1201px;
      height: 372px;
      position: absolute;
      top: 1px;
      margin-left: 7px;
      z-index: 50;
    }
    .gameTab li {
      float: left;
      width: 199px;
      display: inline-block;
    }
    .gameTitle {
      width: 199px;
      height: 194px;
      display: inline-block;
    }
    .height177 .gameTitle {
      width: 199px;
      height: 178px;
      display: inline-block;
    }
    #gameTitleSpe {
      height: 168px;
    }
    .height177 {
      height: 177px;
    }
    .borderBot {
      height: 193px;
    }
    .gameLogo,.gameLogo-2 {
      width: 167px;
      height: 135px;
      display: inline-block;
    }
    .borderBot .gameLogo {
      position: relative;
      top: 35px;
      left: 25px;
    }
    .borderBot .gameLogo-2 {
      position: relative;
      top: 35px;
      left: 25px;
    }
    #gameLogoSpe {
      position: relative;
      top: 10px;
      left: 25px;
    }
    .height177 .gameLogo {
      position: relative;
      top: 10px;
      left: 25px;
    } 
    .height177 .gameLogo-2 {
      position: relative;
      top: 10px;
      left: 25px;
    } 
    .gameName {
      display: inline-block;
      font-size: 20px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      color: #aac5ff;
      width: 130px;
      text-align: center;
    }
    .borderBot .gameName {
      position: relative;
      top: 25px;
      left: 45px;
    }
    #gameNameSpe {
      position: relative;
      top: 0;
      left: 45px;
    }
    .height177 .gameName {
      position: relative;
      left: 45px;
    }
    .gameTitle:hover {
      cursor: pointer;
    }
    .gameTitle:hover .gameName {
      color: #ffea00;
    }
    .showListLogo,.settingLogo {
      width: 21px;
      height: 22px;
      display: inline-block;
    }
    .showListLogo {
      z-index: 10000;
      position: relative;
      left: 1130px;
      top: 5px;
      background-image: url('../../images/btnGenDuo.png');
    }
    .showListLogo:hover {
      cursor: pointer;
      background-image: url('../../images/btnGenDuoClick.png');
    }
    .settingLogo {
      z-index: 10000;
      position: relative;
      left: 1135px;
      top: 5px;
      background-image: url('../../images/btnSheZhi.png');
    }
    .settingLogo:hover {
      cursor: pointer;
      background-image: url('../../images/btnSheZhiClick.png');
    }
    .tanBox1 {
      width: 1130px;
      height: 300px;
    }
    #theTable {
      height: 300px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      border-bottom: solid 1px #fff;
      border-right: 1px solid #fff;
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
    .border-right0 {
      border-right: 0 !important;
    }
    #theTable .backNoimg {
      background-image: none;
    }
    #theTable .backNoimg:hover {
      background-image: none;
    }

    .setting-table {
      height: 300px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      border-bottom: solid 1px #fff;
      border-right: 1px solid #fff;
    }
    .setting-table  thead tr {
      margin-top: 5px;
    }
    .setting-table th {
        height: 44px;
        line-height: 44px;
        padding-left: 21px;
        font-size: 21px;
        color: #fff;
        text-align: left;
        border-right: solid 1px #a2b2e7;
        border-bottom: solid 1px #a2b2e7;
    }
    .setting-table td  {
        font-size: 19px;
        color: #fff;
        text-align: center;
        border-right: solid 1px #a2b2e7;
        background-image: url('../../images/imgKuang.png');
        background-repeat: no-repeat;
        background-position: 12px 4px; 
        vertical-align: middle;
    }
    .setting-table td .hot-logo {
      position: absolute;
      top: 68px;
      left: 162px;
    }
    .setting-table td:hover {
      color: #ffea00;
      cursor: pointer;
      background-image: url('../../images/imgKuangxuanzhong.png');
    }
    .setting-td-selected {
        color: #ffea00 !important;
        cursor: pointer;
        background-image: url('../../images/imgKuangxuanzhong.png') !important;
    }
    .
    .setting-table .border-right0 {
      border-right: 0; 
    }
    .setting-table .backNoimg {
      background-image: none;
    }
    .setting-table .backNoimg:hover {
      background-image: none;
    }
    .b-b-a2b2e7 {
        border-bottom: solid 1px #a2b2e7 !important;
    }

    .setting-btn  {
        display: inline-block;
        width: 100px;
        border-radius: 5px;
        margin-right: 10px;
        height: 27px;
        line-height: 27px;
    }
    .b-r-none {
        border-right: none !important;
    }

    .t-l {
        text-align: left !important;
    }

    .t-r {
        text-align: right !important;
    }

    .t-c {
        text-align: center;
    }

    ul {
      margin-left: 5px;
    }
</style>