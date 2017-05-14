<template>
    <div class="exchangebox">
        <div class="grey_box_top">
            <ul class="form">
                <li>
                    <span class="formTit">代理帐号：</span><span class="f-16">{{username}}</span>
                </li>
                <li>
                    <span class="formTit">分红余额：</span><span class="txtGreen_big">{{fenHongSum.balance}}元</span>
                </li>
                <li>
                    <span class="formTit">转入彩票：</span><input type="text" v-model="value1" class="input_txt"></span>元
                </li>
                <li>
                    <span class="formTit">取款密码：</span><input type="password" v-model="value2" class="input_txt"></span>
                </li>
                <li>
                    <span class="formTit"></span><el-button type="text" class="btnRed4" @click.stop="transferMoney">转账</el-button><span class="notice"></span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { errorMsg,succMsg } from '../../tools/command';
    export default {
        data () {
            return {
                username: '',
                fenHongSum: {},
                form: {
                    fundPwd: '',
                    amount: '',
                },
                value1: '',
                value2: '',
            }
        },
        mounted() {
            this.username = this.$store.state.user.username;
            this.getData()
        },
        methods : {
            getData () {
                api.ajax('team/dividend/findCurrentMonth',this.form).then(data =>{
                    this.fenHongSum = data.data
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
            transferMoney () {
                if (!this.value1) {
                    errorMsg("请输入分红转余额金额！")
                } else {
                    if (!this.value1.match(/^\+?[1-9][0-9]*$/)){
                        errorMsg("分红转余额金额只能为大于0的整数！")
                    }else {
                        if (!this.value2) {
                            errorMsg("抱歉，请输入取款密码！")
                        } else{
                            if (this.value1 > this.fenHongSum.balance) {
                                errorMsg("转的金额超过了分红帐号余额！")
                            } else{
                                this.form.amount = this.value1
                                this.form.fundPwd = this.value2
                                api.ajax('team/dividend/transfer',this.form).then(data =>{
                                    succMsg(data.msg)
                                    this.getData()
                                },error =>{
                                    errorMsg("数据请求失败")
                                })
                            }
                        }
                    }
                }
            },
        }
    }
</script>
<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .exchangebox {
        width: 700px;
        font-size: 14px;
        background: transparent;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-weight: normal;
        color: #000;
    }
    .grey_box_top {
        height: 422px;
        background-color: #eee;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .form {
        padding-top: 70px;
    }
    .form li {
        height: 25px;
        line-height: 25px;
        padding-bottom: 15px;
    }
    .form li span.formTit {
        width: 300px;
        text-align: right;
        display: inline-block;
        margin-right: 10px;
    }
    .input_txt {
        height: 24px;
        border-radius: 4px;
        outline: none;
        box-shadow: none;
        padding-left: 10px;
        border: 1px solid #bfcbd9;
    }
    .form .input_txt {
        margin: 0;
    }
    .txtGreen_big {
        color: #3dcb00;
        font-size: 24px;
        font-weight: bold;
    }
    .btnRed4 {
        border-radius: 12px;
        width: 82px;
        background: #ec0000;
        color: #fff;
        font-weight: bold;
        margin-right: 10px;
    }
    .btnRed4:hover {
        background: #fc0000;
    }
    .notice {
        color: #f00;
    }
</style>