<template>
  <div class="noticeback">
    <div class="left-nav">
      <div>
        <div class="message-title" v-for="(item, num) in showNews" :class="{'message-title-odd':num%2===0}">
          <span :class="{ 'hight-light-msg': num == activeNames }" class="title-msg-but" @click.stop="showMsg(num)">{{item.title}}</span>
        </div>
      </div>
      <div class="page">
        <div class="page_mid">
          <a href="javascript:void(0)" class="first" @click.stop="searchRecord('first')">首页</a>
          <a href="javascript:void(0)" class="pre" @click.stop="searchRecord('pre')">上一页</a>
          <input type="text" name="" disabled="disabled" :value="curPage">
          <a href="javascript:void(0)" class="last" @click.stop="searchRecord('nxt')">下一页</a>
          <a href="javascript:void(0)" class="nxt" @click.stop="searchRecord('last')">尾页</a>
        </div>
      </div>
    </div>
    <div class="show-msg-box" ref="news_detail">
      <h2 class="t-a-c">{{showMagTitle}}</h2>
      <p>{{showMagContent}}</p>
    </div>
  </div>    
</template>
<script>
  import api from '../../api'
  import { mapActions } from 'vuex'
  import jquery from 'jquery'
  import fullpage from 'fullpage.js'
  import mousewheel from 'jquery-mousewheel'
  import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
  import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
  export default {
    name: "noticenew",
    mounted: function () {
        jquery(this.$refs.news_detail).mCustomScrollbar()
        var first = this.$store.state.useraction.firstView;
        if (first == 'email-1') {
            this.form.codeId = 1
        }else if ( first == 'email-2' ) {
            this.form.codeId = 2
        }else if ( first == 'email-3' ) {
            this.form.codeId = 3
        }
        this.gameBetRecord()
    },
    data(){
      return {
        showNews: [],
        activeNames: 0,
        currentPage: '',
        totalPage: '',
        showMagContent: '',
        showMagTitle: '',
        form: {
          pageSize:20,
          pageNumber:1,
          codeId: '1',
        },
      }
    },
    computed :{
      firstView(){
          return this.$store.state.useraction.firstView;
      },
      doubelIndex(){
          return this.$store.state.useraction.msgtitleindex;
      },
      curPage(){
          return this.form.pageNumber + "/" + this.totalPage
      },
    },
    watch : {
      "firstView":function(){
          var first = this.firstView;
          if (first == 'email-1') {
              this.form.codeId = 1
          }else if ( first == 'email-2' ) {
              this.form.codeId = 2
          }else if ( first == 'email-3' ) {
              this.form.codeId = 3
          }
          this.gameBetRecord()
      },
    },
    methods : {
      ...mapActions({
        setMsgTitleIndex : 'setMsgTitleIndex',
      }),
      //指定信息高亮
      oneHightLight(){
        this.activeNames = this.doubelIndex || 0
        // debugger
        if(this.doubelIndex >= this.showNews.length){
          this.activeNames = 0
          this.setMsgTitleIndex(0)
        }
        this.showMagContent = this.showNews[this.activeNames].content
        this.showMagTitle = this.showNews[this.activeNames].title
      },
      //请求数据
      async gameBetRecord(){
        var data = await api.ajax('notice/pageNoticeList', this.form)
        if(data && data.code == '0'){
          if(!data.data){
            return
          }
          this.totalPage = data.data.totalPage
          this.showNews = data.data.list
          this.oneHightLight()
        } else {
          errorMsg(data.msg)
        }
      },
      //分页
      searchRecord(param){
        if(param == 'first'){
            param = 1
        } else if(param == 'pre'){
            if(this.form.pageNumber > 1){
                param = this.form.pageNumber - 1
            } else {
                param = 1
            }
        } else if(param == 'nxt'){
           if(this.form.pageNumber < this.totalPage){
                param = this.form.pageNumber + 1
           } else {
                param = this.form.pageNumber
           }
        } else if(param == 'last'){
            param = this.totalPage
        }
        this.form.pageNumber = param
        this.form.pageSize = 20
        this.gameBetRecord()
      },
      //点击切换标题
      showMsg(value){
        this.activeNames = value
        this.setMsgTitleIndex(value)
        this.showMagContent = this.showNews[value].content
        this.showMagTitle = this.showNews[value].title
      },
    },
  }
</script>
<style scoped>
  .noticeback{
    height: 680px;
    width: 100%;
    margin: 50px auto 0px;
    color: #4b4f5b;
    font-size: 14px;
    font-family: SimSun, 宋体, STSong, 华文宋体;
  }
  .left-nav{
    width: 300px;
    height: 100%;
    float: left;
    position: relative;
  }
  .page_mid {
    width: 100%;
    position: absolute;
    text-align: center;
    bottom: 25px;
    left: 0px;
  }
  .page{
    font-size: 12px;
    font-family: SimSun, 宋体, STSong, 华文宋体;
    color: #4b4f5b;
    padding: 8px 10px 0 10px;
  }
  .page .page_mid a {
      width: 22px;
      height: 22px;
      line-height: 22px;
      margin: 0 4px;
      display: inline-block;
      vertical-align: top;
      font-size: 0;
      background: url(../../images/page.png) 0 0 no-repeat;
  }
  .page .page_mid a.first {
      background-position: 0 0;
  }
  .page .page_mid a.first:hover {
      background-position: 0 -22px;
  }
  .page .page_mid a.pre {
      background-position: -22px 0;
  }
  .page .page_mid a.pre:hover {
      background-position: -22px -22px;
  }
  .page .page_mid a.last {
      background-position: -44px 0;
  }
  .page .page_mid a.last:hover {
      background-position: -44px -22px;
  }
  .page .page_mid a.nxt {
      background-position: -66px 0;
  }
  .page .page_mid a.nxt:hover {
      background-position: -66px -22px;
  }
  .page .page_mid input {
      width: 70px;
      height: 20px;
      line-height: 20px;
      margin: 0 4px;
      text-align: center;
      border: solid 1px #ccc;
      background: #fff;
  }
  .message-title{
    height: 30px;
    padding-left: 40px;
    line-height: 30px;
    overflow: hidden;
    background-color: #f7f7f7;
  }
  .message-title-odd{
    background-color: #eee;
   }
  .title-msg-but{
    cursor:pointer;
    padding: 7px;
  }
  .title-msg-but:hover{
    color: #ffa11c;
  }
  .hight-light-msg{
    color: #ffa11c!important;
  }
  .show-msg-box{
    width: 620px;
    float: left;
    height: 570px;
    background-color: white;
    border-radius: 10px;
    padding-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .show-msg-box p{
    text-indent: 40px;
    line-height: 30px;
    font-size: 16px;
    word-break: break-all;
  }
</style>