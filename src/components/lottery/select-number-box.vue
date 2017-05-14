<template>
	<div class="container">
		<p class="f-14" ref="selBarSingle" v-if="ballPosition" @click.prevent="selectCheckBox">选择球位：
			<span name="1" class="checkBox"></span> 万位
			<span name="2" class="checkBox"></span> 千位
			<span name="3" class="checkBox"></span> 百位
			<span name="4" class="checkBox"></span> 十位
			<span name="5" class="checkBox"></span> 个位
		</p>
		<select-num v-for="(item, index) in datas" :yilouStatus="yilouStatus" :yilou="yilou" :key="index" :datas="item" :isunderline="(index+1)==datas.length?false:true"></select-num>
        <div class="bet-shadow" v-if="this.curLottery != 'cai14'"></div>
	</div>
</template>
<script lang="babel">
	import ballPosi from './data/ball-position'
	import { errorMsg, succMsg, removeClass,toggleClass, addClass, hasClass } from "../../tools/command"
	import { mapActions } from 'vuex'
	import bet from './betting'
	import selectNum from './select-num'
	import api from '../../api'
	export default {
		name : "select-number-box",
		props: {
			datas: Array,
			yilouStatus : String,
		},
		components : {
			selectNum
		},
		mounted: function () {
			this.$root.$on("clear_number", this.clearBall)
			this.$root.$on("get_newMiss", this.getLeak)
			this.getLeak()
		},
		beforeDestroy(){
			this.$root.$off("clear_number", this.clearBall)
			this.$root.$off("get_newMiss", this.getLeak)
		},
		data() {
			return {
				count: '',
				yilouData : {},
			}
		},
		computed : {
			ballPosition(){
				var playMethodType = this.$store.state.lottery.playMethodType
				if(ballPosi.indexOf(playMethodType) > -1){
					return  true
				}
				return false
			},
			curLottery(){
				return this.$store.state.lottery.currentLottery
			},
			yilou(){
				return this.yilouData[this.yilouStatus] || []
			}
		},
		watch : {
			"curLottery" : function(val){
				this.getLeak(val)
			}
		},
		methods: {
			...mapActions({
				setCurbetting: 'setCurbetting',
				setSelected: 'setSelected',
			}),
			selectCheckBox(e){
				var data = {
					name : 'ballposi',
					selected : []
				}
				const target = e.target
				const tagName = target.tagName.toLowerCase()
				if('span' == tagName){
					toggleClass(target, "selected-check")
				}else{return}
				var selBar = this.$refs.selBarSingle
				var all = selBar.querySelectorAll('span')
				var allArray = Array.from(all)
				if(allArray && allArray.length > 0){
					allArray.forEach( function(element, index) {
						if( hasClass(element, 'selected-check') ){
							data.selected.push(element.getAttribute("name"))
						}
					})
				}
				console.log(data)
				this.setSelected(data)
				var that = this
				this.$nextTick(function () {
	    		//lottery==>betting
	    		that.$root.$emit("betting")
	    	})
			},
			clearBall(){
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
			async getLeak(curLottery){
				if(!curLottery){
			       curLottery = this.$store.state.lottery.currentLottery
				}
			    var parameter = {}
			    parameter.classId = curLottery.slice(3)
			    var data = await api.ajax('lottery/num/findLeakAndHot', parameter)
			    if(data && data.code == '0'){
			        this.yilouData = data.data || {}
			    }
			},
		},
	}
</script>
<style scoped>
	.container{
		width: 100%;
		font-family: SimSun, 宋体, STSong, 华文宋体;
	}
	.container p{
		padding-left: 47px;
		color: #3e3e3e;
		margin: 5px 0;
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
	.bet-shadow{
		height: 335px;
		width: 4px;
		background-image: url(../../images/imgBeiJing_shadow.png);
		background-repeat: repeat-y;
		position: absolute;
	    top: 0;
	    left: -4px;
	}
</style>
