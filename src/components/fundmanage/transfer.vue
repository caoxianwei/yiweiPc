<template>
    <div class="dialogContent">
        <el-form :model="form" class="form" label-width="210px">
            <el-form-item label="余额：">
               <div ><span class="txtGreen-big">{{balanceData.balance}}</span>元</div> 
            </el-form-item>
            <el-form-item label="棋牌余额：">
                <div ><span class="txtGrey">{{balanceData.coin}}</span>元<a class="txtRed" @click.stop="refresh"><img class="v_mid" src="../../images/frash.png">刷新</a></div> 
               
            </el-form-item>
            <el-form-item label="转入方式：">
                <el-radio v-model="radio1" label="1">转入棋牌账户</el-radio>
                <el-radio v-model="radio1" label="2">棋牌账户转出</el-radio>
            </el-form-item>
            <el-form-item label="金额：">
                <dl class="clearfix">
                    <dd><a class="hover"  @click.stop="inMoney">50元</a></dd>
                    <dd><a class="" @click.stop="inMoney"  >100元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >300元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >500元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >1000元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >3000元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >5000元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >10000元</a></dd>
                    <dd><a class="" @click.stop="inMoney" >转一半</a></dd>
                    <dd><a class="" @click.stop="inMoney" >全部转</a></dd>
                    <span style="margin-left:20px">其它:<el-input type="text" v-model="changeMoney" class="input_txt wid70 select ie9-select" name=""></el-input>元</span>
                </dl>
            </el-form-item>
            <el-form-item label="资金密码：">
                <el-input type="password" class="width196" v-model="form.outPassword"></el-input>
            </el-form-item>
            <el-form-item class="height38">
                <el-button class="btn-red"  @click.stop="exchangeMoney">额度转账</el-button><span v-text="tipsShow" class="colorRed"></span>
            </el-form-item>
        </el-form>
        <div class="tips">
            <p class="tipsTitle">额度转账使用需知：</p>
            <p>1. 请确保您是转出还是入，请勿选择错误，如遇到由于个人操作失误引起的纠纷，平台概不负责。</p>
            <p>2. 由于平台与真人平台之间网络延迟，可能会遇害到短暂无法上下分的情况，请耐心等待或联系客服。</p>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { errorMsg,succMsg } from '../../tools/command';
    export default {
        data() {
            return {
                form: {  
                    bankName: '',
                    outPassword: '',
                },
                paramer: {
                },
                options:[],
                radio1: '',
                changeMoney: '',
                balanceData: {},
                tipsShow: '',
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            async getData() {
                var balanceData = await api.ajax('refresh', this.paramer)
                if(balanceData && balanceData.code == '0'){
                    this.balanceData = balanceData.data
                } else {
                    errorMsg(balanceData.msg)
                }
            },
            refresh() {
                this.getData()
            },
            inMoney (event) {
                this.changeMoney = event.target.innerText.slice(0,-1);
                if (this.changeMoney == '全部' ) {
                    this.changeMoney = this.balanceData.balance;
                } else if (this.changeMoney == '转一') {
                    this.changeMoney = this.balanceData.balance/2;
                }
                let srcElement = event.target;
                if (srcElement.className =="") {
                    for (var i = 1; i < document.getElementsByTagName('a').length; i++) {
                        document.getElementsByTagName('a')[i].className = document.getElementsByTagName('a')[i].className.replace('hover','')
                    }
                    srcElement.className = srcElement.className + 'hover'
                } else if(srcElement.className =="hover"){
                    srcElement.className = srcElement.className.replace('hover','')
                    this.changeMoney = ''
                }
            },
            async exchangeMoney () {
                if (this.radio1 =='1') {
                    this.paramer.fundPwd = this.form.outPassword;
                    this.paramer.amount = this.changeMoney;
                    var data = await api.ajax('user/money/transferToCoin', this.paramer)
                    if(data && data.code == '0'){
                        succMsg(data.msg);
                        this.getData()
                    } else {
                        errorMsg(data.msg)
                    }
                } else {
                    this.paramer.fundPwd = this.form.outPassword;
                    this.paramer.amount = this.changeMoney;
                    var data = await api.ajax('user/money/transferToBalance', this.paramer)
                    if(data && data.code == '0'){
                        succMsg(data.msg);
                        this.getData()
                    } else {
                        errorMsg(data.msg)
                    }
                }
            },
        },
    }
</script>
<style scoped>
    .form {
        padding-top: 50px;
    }
    .txtGreen-big {
        color: #3dcb00;
        font-size: 30px;
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
        margin-right: 10px;
    }
    .txtGrey {
        color: #888;
    }
    .width196 {
        width: 196px;
    }
    .wid70 {
        width: 70px;
    }
    .colorRed {
        color: #ec0000;
        margin: 0 10px;
    }
    .btn-red {
        width: 114px;
        font-weight: bold;
        background-color: #ec0000;
        color: #fff;
        border-radius: 10px;
        border: none;
    }
    .tips {
        width: 937px;
        height: 125px;
        padding: 17px; 
        border: solid 1px #f6d6aa;
        border-radius: 5px; 
        background-color: #fcf6ec;
        position: relative;
        top: 45px;
        left: 12px;
        display: inline-block;
        color: #ff811c;
        font-size: 14px;
    }
    .tipsTitle {
        font-weight: bold;
    }
    .tips p {
        margin-top: 10px;
    }
    .txtRed {
        color: #f00;
        margin-left: 10px;
    }
    .txtRed:hover {
        text-decoration: underline;
    }
    .v_mid {
        vertical-align: middle;
        margin: 0 5px;
    }
    dl {
        float: left;
        width: 320px;
        height: 138px;
        overflow: hidden;
        position: relative;
        margin-left: 5px;
        font-size: 16px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    dl dd {
        float: left;
        width: 80px;
        height: 40px;
        position: relative;
    }
    dl dd a {
        width: 68px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        color: #000;
        display: inline-block;
        border: solid 3px #ec0000;
        background-color: #fff;
        text-decoration: none;
    }
    dl dd a.hover,dl dd a:hover {
        color: #ec0000;
        background: url(../../images/selected.gif) right bottom no-repeat #fff;
    }
    i {
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .colorRed {
        color: #ec0000;
        margin: 0 10px;
    }
</style>