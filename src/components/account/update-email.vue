<template>
	<div class="changeContent">
		<el-form :model="form" label-width="100px">
			<el-form-item  v-if="!userInfo.email" label="旧邮箱号：">
				<el-input type="password" class="width200" v-model="form.oldkey"></el-input>
			</el-form-item>
			<el-form-item  v-if="!userInfo.email" label="新邮箱号：">
				<el-input type="password" class="width200" v-model="form.key"></el-input>
			</el-form-item>
			<el-form-item  v-if="!userInfo.email" label="确认新号码：">
				<el-input type="password" class="width200" v-model="confirm"></el-input>
			</el-form-item>
			<el-form-item  v-else label="密保邮箱：">
				<el-input type="password" class="width200" v-model="userInfo.email"></el-input>
				<p>您已经设定了密码保护邮箱，不能更改，如果忘记，请联系客服!</p>
			</el-form-item>
			<el-form-item class="height38">
				<div class="changeBtn" @click.stop="onChange"></div>
				<div class="cancelBtn" @click.stop="cancel"></div>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
	import { mapActions } from 'vuex'
	export default {
		components : {
		},
		data(){
			return {
				form: {
					oldkey: '',
					key: '',
				},
				confirm: '',
				userInfo: {},
			}
		},
		mounted () {
			this.userInfo = this.$store.state.useraction.userInfo
		},
		computed : {

		},
		methods :{
			...mapActions({
				setFirstView : 'setFirstView',
			}),
			async onChange() {
				if (this.form.key != this.confirm ) {
					errorMsg('抱歉两次登录密码不一致！')
					return
				}
				var changeEmail = await api.ajax('user/updateEmail', this.form)
		        if(changeEmail && changeEmail.code == '0'){
		          	succMsg(changeEmail.msg)
		          	var that  = this;
					this.$nextTick(function(){
				  		that.$root.$emit("closeDialog-init")
					})
		        } else {
		          errorMsg(changeEmail.msg)
		        }
			},
			cancel() {
				var that  = this;
				this.$nextTick(function(){
			  		that.$root.$emit("closeDialog-init")
				})
			},
		},

		beforeRouteEnter (to, from, next) {
			next(vm => {
			})
		},

	}
</script>
<style scoped>
	.changeContent {
		font-size: 14px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #000000;
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .1s ease 0;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
	.width200 {
		width: 200px;
	}
	.changeBtn {
		width: 88px;
		height: 39px;
		display: inline-block;
		background-image: url('../../images/btnXiuGai01.png');
	}
	.changeBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnXiuGai02.png');
	}
	.cancelBtn {
		width: 88px;
		height: 39px;
		display: inline-block;
		background-image: url('../../images/btnQuXiao01.png');
	}
	.cancelBtn:hover {
		cursor: pointer;
		background-image: url('../../images/btnQuXiao02.png');
	}
</style>