<template>
	<div class="dialogContent">
		<div class="tips">
			<div class="tipsTitle">提示：</div>
			<p>1. 您最多可以绑定 6 张银行卡用于提现，并且可以随时更换，但所有卡都必须属于同一持卡人名下。</p>
			<p>2. 银行卡添加成功后，平台任何区都不会出现您的完整银行卡号、开户姓名等信息。</p>
			<p>3. 添加或修改银行卡后需要 1 个小时才能取款。</p>
		</div>
		<component :is="bankcardView"></component>
	</div>
</template>
<script lang="babel">
	const cardlist = resolve => {
		require.ensure(['./cardlist'], () => {
			resolve(require('./cardlist'))
		}, 'accountAdmin')
	}
	const fillcard = resolve => {
		require.ensure(['./fillcard'], () => {
			resolve(require('./fillcard'))
		}, 'accountAdmin')
	}
	 import { mapActions } from 'vuex'
	export default {
		components :{
			cardlist,
			fillcard,
		},
		mounted() {
			this.setBankcardView('cardlist')
		},
		data(){
			return {
				
			}
		},
		computed: {
			bankcardView () {
				var bankcard = this.$store.state.useraction.bankcardView;
				if (bankcard == 'cardlist') {
					return "cardlist"
				} else if (bankcard == 'fillcard') {
					return "fillcard"
				}
			},
		},
		watch : {
			
		},
		methods: {
			...mapActions({
			  setBankcardView : 'setBankcardView',
			}),
		},
	}
</script>
<style scoped>
	.tips {
		width: 937px;
		height: 108px;
		padding: 9px 17px; 
		border: solid 1px #f6d6aa;
		border-radius: 5px; 
		background-color: #fcf6ec;
		position: relative;
		top: 18px;
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