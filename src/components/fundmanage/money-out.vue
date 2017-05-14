<template>
    <div class="dialogContent">
        <el-form :model="form" class="form" label-width="210px">
            <el-form-item label="我的余额：">
               <div ><span class="txtGreen-big">{{form.balance}}</span>元</div> 
            </el-form-item>
            <el-form-item label="提款帐号：">
                <el-select class="width220" v-model="form.bankName" placeholder="请选择银行">
                    <el-option v-for="item in options" :key="item.id" :label="item.bankName + ' 尾号 ' + item.account" :value="item.id" ></el-option>
                </el-select>
                <span v-text="tipsShowBank" class="colorRed"></span>
            </el-form-item>
            <el-form-item label="提款金额：">
                <el-input class="width220" v-model="form.amount"></el-input><span v-text="tipsShowMoney" class="colorRed"></span>
                <div class="notice"><span class="colorRed">*</span>必填 (单笔取款金额范围, 最低: 100, 最高: 500000)</div>
            </el-form-item>
            <el-form-item label="提款密码：">
                <el-input type="password" class="width220" v-model="form.fundPwd"></el-input><span v-text="tipsShowPwd" class="colorRed"></span>
                <div class="notice"><span class="colorRed">*</span>必填</div>
            </el-form-item>
            <el-form-item class="height38">
                <el-button class="btn-red"  @click.stop="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>
        <div class="tips">
            <p class="tipsTitle">取款说明：</p>
            <p>1. 提款时间：上午10:00-凌晨2:00（时间变更请关注系统公告)。</p>
            <p>2. 提款次数：10:00-2:00这个期间将有5次提现次数。</p>
            <p>3. 提款要求：由于受风控影响，杜绝洗钱活动，平台要求会员消费满充值的百分之二十才能申请提现。</p>
            <p>4. 提款到账时间：平台将进入全自动出款模式，资金将会秒出，高峰期将会在五分钟内到账，如未到账请及时联系客服咨询。</p>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import bankConstants from '../account/bank-constants'
    import { errorMsg,succMsg } from '../../tools/command';
    export default {
        data() {
            return {
                form: {
                    balance: '',
                    bankName: '',
                    amount: '',
                    fundPwd: '',
                },
                paramer: {},
                options:[],
                cardList: {},
                tipsShowBank: '',
                tipsShowMoney: '',
                tipsShowPwd: '',
            }
        },
        mounted() {
            this.getCardListData()
            this.form.balance = this.$store.state.useraction.refreshMoney.balance
        },
        methods: {
            async getCardListData() {
                var getCardListData = await api.ajax('bank/listCards', this.form)
                if(getCardListData && getCardListData.code == '0'){
                  this.cardList = getCardListData.data
                  for (var i = 0; i < this.cardList.length; i++) {
                      this.options.push(this.cardList[i])
                  }
                } else {
                  errorMsg(getCardListData.msg)
                }
            }, 
            async onSubmit() {
                console.log(this.form.bankName)
                if (!this.form.bankName) {
                    this.tipsShowBank = "抱歉，请选择一张银行卡！"
                    return
                } else {
                    this.tipsShowBank = ""
                    this.tipsShowMoney = ""
                    if (!this.form.amount) {
                        this.tipsShowMoney = "抱歉，请输入正确的金额！"
                        return
                    } else if (!this.form.amount.match(/^\d{0,6}$/)) {
                        this.tipsShowMoney = "抱歉，输入金额的格式不正确，请重新输入！"
                        return
                    } else if (this.form.amount < 100 || this.form.amount > 500000) {
                        this.tipsShowMoney = "抱歉，输入金额超出取款范围！"
                        return
                    } else {
                        this.tipsShowMoney = ""
                        if (!this.form.fundPwd || !this.form.fundPwd.match(/^([a-z0-9]+[-a-z0-9]*[a-z0-9]+)$/)) {
                            this.tipsShowPwd = "抱歉，请输入正确的提款密码！"
                            return
                        } else {
                            this.tipsShowPwd = ""
                            this.paramer.fundPwd = this.form.fundPwd
                            this.paramer.amount = this.form.amount
                            this.paramer.cardId = this.form.bankName
                            var data = await api.ajax('user/money/withdraw', this.paramer)
                            if(data && data.code == '0'){
                              succMsg(data.msg)
                            } else {
                              errorMsg(data.msg)
                            }
                        }
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
    .width220 {
        width: 220px;
    }
    .colorRed {
        color: #ec0000;
        margin: 0 10px;
    }
    .btn-red {
        width: 82px;
        font-weight: bold;
        background-color: #ec0000;
        color: #fff;
        border-radius: 10px;
        border: none;
    }
    .tips {
        width: 937px;
        height: 158px;
        padding: 17px; 
        border: solid 1px #f6d6aa;
        border-radius: 5px; 
        background-color: #fcf6ec;
        position: relative;
        top: 50px;
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
</style>