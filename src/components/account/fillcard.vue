<template>
	<div class="fillContent translate3d-zero">
		<div class="stepTips">
			<span>1.填写银行卡信息</span>
			<img src="../../images/imgChangJianTou.png">
			<span>2.绑定成功</span>
		</div>
		<el-form :model="form" label-width="152px">
			<el-form-item label="开户银行：">
				<el-select class="width196" v-model="form.bankName" placeholder="请选择银行">
					<el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.value" ></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="支行名称：">
				<el-input class="width196" v-model="form.bankAddress"></el-input>
				<div class="notice">填写支行名称出现问题，<span class="colorRed">请点击这里</span>参考</div>
			</el-form-item>
			<el-form-item label="开户人：">
				<el-input class="width196" v-model="form.kaihuName"></el-input>
			</el-form-item>
			<el-form-item label="银行卡号：">
				<el-input class="width196" v-model="form.cardNumber" onkeyup="filterCardNumber(form.cardNumber)"  onafterpaste="filterCardNumber(form.cardNumber)"></el-input>
			</el-form-item>
			<el-form-item label="确认银行卡号：">
				<el-input class="width196" v-model="confirmCard"></el-input>
			</el-form-item>
			<el-form-item label="安全密码：">
				<el-input class="width196" type="password" v-model="form.fundPwd"></el-input>
			</el-form-item>
			<el-form-item class="height38">
			    <div class="submitBtn" @click.stop="onSubmit"></div>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import bankConstants from './bank-constants'
	import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	export default {
		mounted() {
			for (var i = 0; i < bankConstants.banklist.length; i++) {
				console.log(bankConstants.banklist[i])
				this.options.push(bankConstants.banklist[i])
			}
		},
		data(){
			return {
				form: {
					bankName: '',
					bankAddress: '',
					kaihuName: '',
					cardNumber: '',
					fundPwd: '',
				},
				paramer: {},
				options: [],
				confirmCard: '',
			}
		},
		computed: {
			options() {
				return
			}
		},
		watch : {
			
		},
		methods: {
			...mapActions({
				setBankcardView : 'setBankcardView'
			}),
			async onSubmit() {
				if (this.form.cardNumber != this.confirmCard) {
					errorMsg('抱歉，两次银行卡号不一致！')
					return
				}
				this.paramer.bankName = this.form.bankName
                this.paramer.kaihuName = this.form.kaihuName
                this.paramer.account = this.form.cardNumber
                this.paramer.address = this.form.bankAddress
                this.paramer.fundPwd = this.form.fundPwd
				var submitData = await api.ajax('bank/addCard', this.paramer)
		        if(submitData && submitData.code == '0'){
		          succMsg(submitData.msg)
		          this.setBankcardView('cardlist')
		        } else {
		          errorMsg(submitData.msg)
		        }
			}, 
			filterCardNumber(val) {
				return val.replace(/\D/g,'')
			},
		},
	}
</script>
<style scoped>
	.fillContent {
		width: 420px;
		height: 520px;
		position: relative;
		top: 46px;
		left: 193px;
		display: inline-block;
	}
	.stepTips {
		font-size: 16px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #40af25;
		font-weight: bold;
		margin-bottom: 32px;
	}
	.stepTips img {
		position: relative;
		top: 5px;
	}
	.width91 {
		width: 91px;
	}
	.width196 {
		width: 196px;
	}
	.notice {
		font-size: 12px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #737888;
	}
	.colorRed {
	    color: #ff4200;
	}
	.height38 {
		height: 38px;
		margin: 0;
	}
	.submitBtn {
		width: 119px;
		height: 38px;
		display: inline-block;
		position: relative;
		left: 30px;
		background-image: url('../../images/btnTiJiao01.png');
	}
	.submitBtn:hover {
		background-image: url('../../images/btnTiJiao02.png');
	}
</style>