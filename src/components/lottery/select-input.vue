<template>
	<div class="container">
		<p class="f-14" ref="selBarSingle" v-if="ballPosition" @click.prevent="selectCheckBox">选择球位：
			<span name="1" class="checkBox"></span> 万位
			<span name="2" class="checkBox"></span> 千位
			<span name="3" class="checkBox"></span> 百位
			<span name="4" class="checkBox"></span> 十位
			<span name="5" class="checkBox"></span> 个位
		</p>
		<el-input type="textarea" :autosize="{ minRows: 7, maxRows: 7}" resize="none"  class="input-num" placeholder="请输入内容" v-model="inputLottery">
		</el-input>
		<p class="f-14">空格[ ]、逗号[,]或者美元符号[$]隔开</p>
	</div>
</template>
<script lang="babel">
	import ballPosi from './data/ball-position'
	import { errorMsg, succMsg, removeClass,toggleClass, addClass, hasClass } from "../../tools/command"
	import { mapActions } from 'vuex'
	import bet from './betting'
	export default {
		name : "show-time",
		props: {
			datas: Array,
		},
		mounted: function () {
			this.$root.$on("clear_number", this.clearBall)
			this.$root.$on("single_plate", this.bettings)
		},
		beforeDestroy(){
			this.$root.$off("clear_number", this.clearBall)
			this.$root.$off("single_plate", this.bettings)
		},
		data() {
			return {
				count: '',
				inputLottery:'',
			}
		},
		computed : {
			ballPosition(){
				var playMethodType = this.$store.state.lottery.playMethodType
				if(ballPosi.indexOf(playMethodType) > -1){
					return  true
				}
				return false
			}
		},
		methods: {
			...mapActions({
				setCurbetting: 'setCurbetting',
				clearBetting: 'clearBetting',
			}),
			selectCheckBox(e){
				const target = e.target
				const tagName = target.tagName.toLowerCase()
				if('span' == tagName){
					toggleClass(target, "selected-check")
				}else{return}
			},
			clearBall(){
				this.inputLottery = ''
				var selBar = this.$refs.selBarSingle
				if(selBar){
					var all = selBar.querySelectorAll('span')
					var allArray = Array.from(all)
					if(allArray && allArray.length > 0){
						allArray.forEach( function(element, index) {
							removeClass(element, 'selected-check')
						})
					}
				}
			},
			//添加球位
			selBarSingle(){
				var data = {
					name : 'ballposi',
					selected : []
				}
				var selBar = this.$refs.selBarSingle
				if(selBar){
					var all = selBar.querySelectorAll('span')
					var allArray = Array.from(all)
					if(allArray && allArray.length > 0){
						allArray.forEach( function(element, index) {
							if(hasClass(element,'selected-check')){
								data.selected.push(element.getAttribute("name"))
							}
						})
					}
				}
				return data
			},
			bettings(){
				var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
				var curLottery = this.$store.state.lottery.currentLottery
				var playMethodType = this.$store.state.lottery.playMethodType
				var selBarSingle = this.selBarSingle()
				if(gamePlayMethod && curLottery && playMethodType && this.inputLottery){
					var svalue = this.inputLottery.trim().replace(/\s{2,}/g, ' ')
					var rst = bet[curLottery][gamePlayMethod][playMethodType](svalue, selBarSingle)
				}
				rst = rst || {}
				this.count = rst.count || 0
				console.log('rst: ',rst)
				if(rst.msg){
					return errorMsg(rst.msg)
				} else {
					var value = {}
					var tzbs = this.selBarSingle().selected
					if(tzbs.length == 0){
						value.tzbs = ''
					} else {
						value.tzbs = tzbs.join('')
					}
					value.count = this.count
					value.betnumbers = rst.numbers
					value.betnumbersChina = rst.numbers
					console.log(value)
					this.setCurbetting(value)
				}
				if(this.$store.state.lottery.isImmediatelyBet){
					var that = this
					this.$nextTick(function () {
						that.$root.$emit("betOneNow")
					})
				}else{
					var that = this
					this.$nextTick(function () {
						that.$root.$emit("addBetList")
					})
				}
			},
		},
	}
</script>
<style scoped>
	.container{
		width: 787px;
		border-radius: 5px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
	}
	.container p{
		color: #3e3e3e;
		margin: 5px 0;
	}
	.input-num{
		height: 100%;
		width: 100%;
	}
	.checkBox{
		cursor:pointer;
		display: inline-block;
		height: 12px;
		width: 12px;
		border-radius: 2px;
		border: 1px solid #c0c0c0; 
		position: relative;
		top: 2px;
	}
	.selected-check{
		background-image: url(../../images/imgQiuWweiXuanKuang2.png);
		background-position: -1px -1px;
	}
</style>
