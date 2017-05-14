<template>
<div>
  <div class="gameTab">
    <ul>
      <li name="cai1" class="borderBot">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">百家乐</span>
        </div>
      </li>
     <li name="cai2" class="borderBot">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">二人牛牛</span>
        </div>
      </li>
      <li name="cai3" class="borderBot">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">百人牛牛</span>
        </div>
      </li>
     <li name="cai6" class="borderBot">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">炸金花</span>
        </div>
      </li>
      <li name="cai7" class="borderBot">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">斗地主</span>
        </div>
      </li>
      <li class="borderBot ">
        <div class="showListLogo" v-popover:popover6>
          <el-popover popper-class="pop-cus-class-tab" 
                            ref="popover6" 
                            placement="top" :offset="505" 
                            trigger="click" :visible-arrow="false">
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
                                    <tbody class="tbody">
                                        <tr>
                                          <td class="border-right0">重庆时时彩<img class="hot-logo" src="../../images/imgHot.png"></td>
                                          <td>新疆时时彩</td>
                                          <td>山东11选5</td>
                                          <td>北京快乐8</td>
                                          <td>江苏快三</td>
                                          <td>3D</td>
                                        </tr>
                                        <tr>
                                          <td class="border-right0">黑龙江时时彩</td>
                                          <td>乐利时时彩</td>
                                          <td>江西11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>安徽快三</td>
                                          <td>排列3/5</td>
                                        </tr>
                                        <tr>
                                          <td class="border-right0">上海时时彩</td>
                                          <td>吉利时时彩</td>
                                          <td>广东11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>江苏骰宝</td>
                                          <td>双色球</td>
                                        </tr>
                                        <tr>
                                          <td class="border-right0">天津时时彩</td>
                                          <td class="backNoimg"></td>
                                          <td>乐利11选5</td>
                                          <td class="backNoimg"></td>
                                          <td>吉利骰宝</td>
                                          <td>六合彩</td>
                                        </tr>
                                        <tr>
                                          <td class="border-right0">顺利秒秒彩</td>
                                          <td class="backNoimg"></td>
                                          <td>顺利11选5</td>
                                          <td class="backNoimg"></td>
                                          <td class="backNoimg"></td>
                                          <td class="backNoimg"></td>
                                        </tr>
                                    </tbody>
                                  </table>
                                  <div x-arrow class="lottery-arrow-tab"></div>
                              </div>
                          </el-popover>
        </div>
        <div class="settingLogo"></div>
        <div name="cai12" class="gameTitle" id="gameTitleSpe">
          <div class="gameLogo" id="gameLogoSpe"></div>
          <span class="gameName" id="gameNameSpe">港式五张</span>
        </div>
      </li>
      <li name="cai15" class="height177">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">两张牌</span>
        </div>
      </li>
      <li name="cai11" class=" height177">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">疯狂赛车</span>
        </div>
      </li>
      <li name="cai8" class=" height177">
        <div class="gameTitle">
          <div class="gameLogo-2"></div>
          <span class="gameName">百家乐</span>
        </div>
      </li>
      <li name="cai9" class=" height177">
        <div class="gameTitle">
          <div class="gameLogo-2"></div>
          <span class="gameName">百人牛牛</span>
        </div>
      </li>
      <li name="cai4" class=" height177">
        <div class="gameTitle">
          <div class="gameLogo-2"></div>
          <span class="gameName">二人牛牛</span>
        </div>
      </li>
      <li name="cai14" class="height177">
        <div class="gameTitle">
          <div class="gameLogo"></div>
          <span class="gameName">炸金花</span>
        </div>
      </li>
    </ul>
  </div>
</div>  
</template>
<script lang="babel">
  export default {
      name: "qpgame",
      data(){
          return {
              arrow: false,
          }
      },
      mounted: function () {
          
      },
      methods : {
        
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
      left: 20px;
    }
    .borderBot .gameLogo-2 {
      position: relative;
      top: 35px;
      left: 20px;
    }
    #gameLogoSpe {
      position: relative;
      top: 10px;
      left: 20px;
    }
    .height177 .gameLogo {
      position: relative;
      top: 10px;
      left: 20px;
    } 
    .height177 .gameLogo-2 {
      position: relative;
      top: 10px;
      left: 20px;
    } 
    .gameName {
      display: inline-block;
      font-size: 20px;
      font-family: SimHei, 黑体, STHeiti, 华文黑体;
      color: #aac5ff;
    }
    .borderBot .gameName {
      position: relative;
      top: 25px;
      left: 53px;
    }
    #gameNameSpe {
      position: relative;
      top: 0;
      left: 53px;
    }
    .height177 .gameName {
      position: relative;
      left: 53px;
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
      position: relative;
      left: 130px;
      top: 5px;
      background-image: url('../../images/btnGenDuo.png');
    }
    .showListLogo:hover {
      cursor: pointer;
      background-image: url('../../images/btnGenDuoClick.png');
    }
    .settingLogo {
      position: relative;
      left: 138px;
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
        height: 43px;
        line-height: 43px;
        font-size: 21px;
        color: #fff;
        text-align: center;
        border-right: solid 1px #a2b2e7;
        background-image: url('../../images/imgKuang.png');
        background-repeat: no-repeat;
        background-position: 12px 8px; 
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
</style>