<template>
  <div class="noticeModel">
    <ul>
      <li class="title">
        <div class="title-left" @click.prevent="changeNewsTitle">
          <span id="importantNews">{{titles[0]}}</span>
          <span id="paijiang" class="margin32">{{titles[1]}}</span>
          <span id="weihu">{{titles[2]}}</span>
        </div>
        <!-- <span class="floatRig addLogo">+</span> -->
      </li>
      <li class="bigNews" @click.prevent="openemailbox(0)">{{lengthSlice(toptitle.title)}}</li>
      <li class="noticeMes" v-for="(item, index) in newsList" @click.prevent="openemailbox(index+1)" v-if="newsList" :class="{ 'borderNone': index==(newsList.length-1)}">{{item.title}}<span class="floatRig timeColor">01-11</span></li>
    </ul>
  </div>    
</template>
<script>
  import api from '../../api'
  import { mapActions } from 'vuex'
  export default {
    name: "notice",
    data(){
      return {
        showNews: [],
        newsList: [],
        toptitle: {},
        titles:[],
        newsIndex: 0,
      }
    },
    mounted: function () {
      this.gameBetRecord()
    },
    watch : {
      "newsIndex": function(){
        this.getnews()
      }

    },
    methods : {
      ...mapActions({
        setFirstView : 'setFirstView',
        setDialogMsg : 'setDialogMsg',
        setMsgTitleIndex : 'setMsgTitleIndex',
      }),
      changeNewsTitle(e){
        const target = e.target
        var tag = target.tagName.toLowerCase()
        if(tag == "span"){
          if(target.id == 'importantNews'){
            this.newsIndex = 0
          }
          if(target.id == 'paijiang'){
            this.newsIndex = 1
          }
          if(target.id == 'weihu'){
            this.newsIndex = 2
          }
        }
      },
      async gameBetRecord(){
        var data = await api.ajax('notice/list', {})
        if(data && data.code == '0'){
          if(!data.data){
            return
          }
          this.showNews = data.data.datas
          this.titles = data.data.titles
          this.getnews()
        } else {
          errorMsg(data.msg)
        }
      },
      getnews(){
        var changeList = this.showNews[this.newsIndex].slice(0)
        this.toptitle = changeList[0]
        changeList.splice(0,1)
        this.newsList = changeList
      },
      openemailbox(value){
        this.setFirstView('email-'+(this.newsIndex+1))
        this.setDialogMsg(true)
        this.setMsgTitleIndex(value)
      },
      //过长截取
      lengthSlice(value){
        if(value){
          if(value.length > 13){
            return value.substring(0,13)+'...'
          }else {
            return value
          }
        }
      },
    },
  }
</script>
<style scoped>
  .noticeModel {
    width: 263px;
    height: 228px;
    float: right;
    position: relative;
    top: 31px;
    padding: 8px 18px;
  }
  .noticeModel li{
    cursor:pointer;
  }
  .title,.noticeMes {
    line-height: 29px;
  }
  .title,.bigNews,.noticeMes {
    border-bottom: 1px solid #e6e6e6;
  }
  .title,.noticeMes {
    height: 28px;
    font-size: 13px;
    font-family: SimSun, 宋体, STSong, 华文宋体;
  }
  .title-left {
    display: inline-block;
  }
  .title-left span:hover {
    cursor: pointer;
    color: #a99359;
  }
  .addLogo {
    font-size: 18px;
  }
  .bigNews {
    height: 48px;
    line-height: 48px;
    font-size: 19px;
    font-weight: bold;
    font-family: SimHei, 黑体, STHeiti, 华文黑体;
    color: #ae0404;
    text-align: center;
  }
  .timeColor {
   color: #999999;
 }
 .borderNone {
  border-bottom: none;
}
.floatRig {
  float: right;
}
.margin32 {
  margin: 0 32px;
}
</style>