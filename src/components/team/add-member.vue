<template>
	<div class="dialogContent">
		<ul class="form">
			<li>
				<span class="formTit">登录帐号:</span>
				<input type="text" name="txtUsername" v-model="username"  class="input_txt width150">
				<span class="notice">{{txtUsername}}</span>
			</li>
			<li style="position:relative">
				<span class="formTit nextPoint">下级返点:</span>
				<div class="dialog-slider">
					<el-slider v-model="value1" :max="cpont" :step="0.1" show-input></el-slider>
				</div>
				<span class="tip">2.5以上返点，需会员列表内提交申请</span>
			</li>
			<li>
				<div class="btn">
					<div class="noticeBtn" @click.stop="submit"></div>
					<span class="notice">{{notice}}</span>
				</div>
			</li>
		</ul>
		<div class="form_mid_tit">
			<h3>自动注册设置</h3>您的返点级别:{{point}}
		</div>
		<ul class="form" style="padding-top:0">
			<li style="position:relative">
				<span class="formTit nextPoint">下级返点:</span>
				<div class="dialog-slider">
					<el-slider v-model="value2" :max="cpont" :step="0.1" show-input></el-slider>
				</div>
				<span class="tip">2.5以上返点，需会员列表内提交申请</span>
			</li>
			<li class="register" style="margin-top:10px">
				<span class="formTit">自动注册地址1:</span>
				<input type="text" name="regUrl1" id="regUrl1" class="input_txt width710" v-model="registerUrl">
				<div class="copyBtn" @click.stop="copy"></div>
			</li>
			<li class="register">
				<span class="formTit">自动注册地址2:</span>
				<input type="text" name="regUrl2" id="regUrl2" class="input_txt width710" v-model="registerUrl">
				<div class="copyBtn" @click.stop="copy"></div>
			</li>
			<li class="register">
				<span class="formTit">自动注册地址3:</span>
				<input type="text" name="regUrl3" id="regUrl3" class="input_txt width710" v-model="registerUrl">
				<div class="copyBtn" @click.stop="copy"></div>
			</li>
			<li class="register">
				<span class="formTit">自动注册地址4:</span>
				<input type="text" name="regUrl4" id="regUrl4" class="input_txt width710" v-model="registerUrl">
				<div class="copyBtn" @click.stop="copy"></div>
			</li>
			<li>
				<div class="btn">
					<div class="setLinkBtn" @click.stop="setlink"></div>
					<span class="notice"></span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import { errorMsg,succMsg } from '../../tools/command';
	export default {
		data () {
			return {
				point: '',
				notice : '',
				username : '',
				txtUsername: '由0-9,a-z,A-Z组成的6-16个字符,新增用户默认密码a123456',
				value1 : 0,
				value2 : 0,
				registerUrl : '',
				form: {},
			}
		},
		mounted :function(){
			this.point = this.$store.state.useraction.userInfo.point
		},
		computed : {
			cpont(){
				var point = this.$store.state.useraction.userInfo.point
				if(point > 2.5){
					return 2.5
				}
				return point - 0.1
			}
		},
		methods :{
			...mapActions({
				setCode : 'setCode'
			}),
			addMember () {
				this.form.username = this.username;
				this.form.point = this.value1;
				api.ajax('team/member/add',this.form).then(data =>{
                    succMsg(data.msg)
                    this.notice = data.msg;
                },error =>{
                    errorMsg("数据请求失败")
                })
			},
			submit (event) {
				if (!this.username) {
					this.txtUsername = "抱歉，请输入正确的用户名!"
				} else{ 
					if (!this.username.match(/^[0-9a-zA-Z]+$/)) {
						this.txtUsername = "抱歉，用户名由字母和数字的组合!"
					} else{ 
						if (!this.username.match(/^.{6,20}$/)) {
		        			this.txtUsername = "抱歉，用户名的长度为6-20个字符组合"
		        		} else {
		        			this.addMember();
		        			this.username = "";
		        			this.txtUsername = "由0-9,a-z,A-Z组成的6-16个字符,新增用户默认密码a123456"
		        		}
		        	}
		        }
			},
			setlink () {
				this.form.point = this.value2;
				api.ajax('team/member/regUrl',this.form).then(data =>{
                    this.registerUrl = data.data;
                    this.setCode(this.registerUrl.split('?')[1])
                },error =>{
                    errorMsg("数据请求失败")
                })
			},
			copy () {
				if (this.registerUrl) {
					succMsg("复制成功")
				}
				
			},
		}
	}
</script>
<style scoped>
    .form {
    	padding: 50px 0 0 0;
    	margin: 0;
    }
    .form li {
	    height: 25px;
	    line-height: 25px;
	    padding-bottom: 20px;
	}
	.form li span.formTit {
	    width: 110px;
	    text-align: right;
	    display: inline-block;
	    margin-right:0 10px;
	}
	.form_mid_tit {
	    padding: 5px 0 20px 48px;
	    color: #888;
	}
	.form_mid_tit h3 {
	    padding-right: 5px;
	    margin: 5px 0;
	    display: inline-block;
	    font-size: 18px;
	    color: #000;
	    font-weight: normal;
	    font-family: "Microsoft YaHei";
	}
	.dialog-slider {
		width: 419px; 
		display: inline-block;
		margin-left: 135px;
	}
	.nextPoint {
		position: absolute; 
		top: 10px; 
		left: 0;
	}
	.tip {
		color:#888;
		font-size:12px;
		position: absolute;
		margin: 7px 0 10px 10px;
	}
	.input_txt {
	    height: 23px;
	    line-height: 23px;
	    padding: 0 3px;
	    border: solid 1px #ccc;
	    background: #fff;
	    margin-right: 5px;
	}
	.width150 {
		width: 150px;
	}
	.width710 {
	    width: 710px;
	}
	.btn {
		margin: 10px 0 0 125px;
	}
	.noticeBtn {
		width: 94px;
		height: 40px;
		display: inline-block;
		background-image: url('../../images/btnTiJiao05.png');
	}
	.noticeBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnTiJiao06.png');
	}
	.register {
		padding-left: 35px;
	}
	.setLinkBtn {
		width: 200px;
		height: 48px;
		display: inline-block;
		background-image: url('../../images/btnShengChengLianJie01.png');
	}
	.setLinkBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnShengChengLianJie02.png');
	}
	.copyBtn {
		width: 48px;
		height: 28px;
		display: inline-block;
		position: relative;
		top: 9px;
		background-image: url('../../images/btnFuZhi01.png');
	}
	.copyBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnFuZhi02.png');
	}
	.notice {
		color: #ff4200; 
		font-size: 12px; 
		margin-left: 5px;
	}
</style>