<template>
	<div class="changeContent">
		<el-form :model="form" label-width="100px">
			<el-form-item label="旧QQ号：">
				<el-input type="password" class="width200" v-model="form.oldkey"></el-input>
			</el-form-item>
			<el-form-item label="新QQ号：">
				<el-input type="password" class="width200" v-model="form.key"></el-input>
			</el-form-item>
			<el-form-item label="确认新号码：">
				<el-input type="password" class="width200" v-model="confirm"></el-input>
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
			}
		},
		mounted () {

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
				var changeQQ = await api.ajax('user/updateQQ', this.form)
		        if(changeQQ && changeQQ.code == '0'){
		          	succMsg(changeQQ.msg)
		          	var that  = this;
					this.$nextTick(function(){
				  		that.$root.$emit("closeDialog-init")
					})
		        } else {
		          errorMsg(changeQQ.msg)
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