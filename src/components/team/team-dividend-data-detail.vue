<template>
    <div class="contentBox">
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <table id="thetable" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <thead>
                        <tr class="top-border">
                            <th>代理用户名</th>
                            <th> 类型 </th>
                            <th>收入/支出</th>
                            <th>变化后余额</th>
                            <th>时间</th>
                        </tr>
                    </thead>
                    <tbody>
                       <tr v-for="item in data.list">
                           <td><div v-text="item.username"></div></td>
                           <td><div v-text="item.typeDesc"></div></td>
                           <td><div v-text="item.changeMoney"></div></td>
                           <td><div v-text="item.moneyA"></div></td>
                           <td><div v-text="item.addTime"></div></td>
                       </tr>
                   </tbody>
                </table>
            </div>
        </div>
        <div class="page clearfix">
            <div class="page_mid">
                <span class="pageTotal">每页{{form.pageSize}}条，共{{data.totalRow}}条</span>
                <a href="javascript:void(0)" class="first" @click.stop="searchData('first')">首页</a>
                <a href="javascript:void(0)" class="pre" @click.stop="searchData('pre')">上一页</a>
                <input type="text" name="" disabled="disabled" :value="curPage">
                <a href="javascript:void(0)" class="last" @click.stop="searchData('nxt')">下一页</a>
                <a href="javascript:void(0)" class="nxt" @click.stop="searchData('last')">尾页</a>
                <div class="skipPage">跳转到第
                <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                    <el-option v-for="item in data.totalPage" :key="item.name" :value="item">{{item}}</el-option>
                </el-select>
                页</div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { errorMsg } from '../../tools/command';
    export default {
        data(){
            return {
                show: true,
                form : {
                    pageNumber: 1,
                    pageSize : 10
                },
                data : {},
                currentPage : 1
            }
        },
        mounted (){
            this.searchData('first')
        },
        watch : {
            "currentPage" : function(val){
                if(val == this.data.pageNumber){
                    return
                } else {
                    this.searchData(val)
                }
            }
        },
        computed :{
            curPage(){
                this.currentPage = this.data.pageNumber
                return this.data.pageNumber + "/" + this.data.totalPage
            },
        },
        methods :{
            async searchData(param){
                if(param == 'first'){
                    param = 1
                } else if(param == 'pre'){
                    if(this.data.pageNumber > 1){
                        param = this.data.pageNumber - 1
                    } else {
                        param = 1
                    }
                } else if(param == 'nxt'){
                   if(this.data.pageNumber < this.data.totalPage){
                        param = this.data.pageNumber + 1
                   } else {
                        param = this.data.pageNumber
                   }
                } else if(param == 'last'){
                    param = this.data.totalPage
                }

                this.form.pageNumber = param
                this.form.pageSize = 10
                var data = await api.ajax('team/dividend/pageChangeLog', this.form)
                if(data && data.code == '0'){
                    this.data = data.data
                } else {
                    errorMsg(data.msg)
                }
            },
        }
    }
    
</script>
<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    input {
        outline: medium;
    }
    select {
        outline: none;
    }
    .contentBox {
        width: 700px;
        height: 418px;
        overflow: hidden;
    }
    .grey_box_top {
        padding-top: 1px;
    }
    #thetable {
        width: 700px;
    }
    
    #thetable td a:hover {
        color: #ec0000;
        cursor: pointer;
    }
    .page {
        font-size: 12px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
        padding: 8px 10px 0 10px;
    }
    .pageTotal {
        float: left;
        line-height: 22px;
        margin-right: 25px;
        margin-left: 20px;
    }
     .page_mid {
        width: 100%;
        margin-top: 20px;
        text-align: center;
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
    .skipPage {
        float: right;
        margin-right: 60px;
    }
    .top-border{
        border-top: solid 1px #e1e1eb;
    }
    .wid60 {
        width: 60px;
    }
</style>
