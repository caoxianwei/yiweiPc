<template>
	<div>
		<ul class="play-game-size f-13" @click.prevent="changePlayMethod" ref="allPlayMethod">
			<li class="border-top-transparent" v-for="(item, index) in allPlayMethods" :key="item.name" :name="item.name"
			:class="{ 'border-top': index==0?true:false }">{{item.value}}</li>
		</ul>
		<ul class="play-method-size f-13" @click.prevent="changeMethodContent" ref="gameMethod":class="{ 'liuhecai-top-padding': this.currentLottery=='cai14'?true:false }">
			<span>{{desc1}}</span>
			<li class="border-transparent" v-for="(item, index) in allGamePlayMethods1.items" :key="item.name" :name="item.name"
			:class="{ 'border-brown': index==0?true:false }">{{item.value}}</li>
			<br>
			<span>{{desc2 || ''}}</span>
			<li class="border-transparent" v-for="(item, index) in allGamePlayMethods2.items" :key="item.name" :name="item.name">{{item.value}}</li>
		</ul>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { mapActions } from 'vuex'
	import cai from './data/lottery-data'
	import { removeClass,toggleClass, addClass } from "../../tools/command"

	export default {
		name : "game-method",
		// props: {
		// 	datas: Object,
		// },
		mounted: function () {
			this.getUserPlayGame()
		},
		data() {
			return {
				//保存该彩种玩法
				allPlayMethods: [],
				//保存每种玩法的具体neir
				allGamePlayMethods1: {},
				allGamePlayMethods2: {},
				desc1: '',
				desc2: '',
			}
		},
		computed : {
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
			gamePlayMethod(){
				return this.$store.state.lottery.gamePlayMethod
			},
			playMethodType(){
				return this.$store.state.lottery.playMethodType
			},
		},
        watch : {
        	"currentLottery": function(value,old){
        		this.getUserPlayGame()
        		var selBar = this.$refs.allPlayMethod
        		var all = selBar.querySelectorAll('li')
        		var allArray = Array.from(all)
        		if(allArray && allArray.length > 0){
        			allArray.forEach( function(element, index) {
        				removeClass(element, 'border-top')
        				if(index == 0){
        					addClass(element, 'border-top')
        				}
        			})
        		}
        	},
        	"playMethodType": function(value,old){
        		if(this.currentLottery == "cai14"){
	        		var that = this
		            this.$nextTick(function () {
		                that.$root.$emit("clear_number")
		            })
        		}
        	},
        },
		methods: {
			...mapActions({
				currentLottery: 'currentLottery',
				setPlayMethod: 'setPlayMethod',
				setPlayMethodType: 'setPlayMethodType',
				setIsInput: 'setIsInput',
				setZWgamePlay: 'setZWgamePlay',
				setZWmethodType: 'setZWmethodType',
			}),

        	//玩法获取
        	getUserPlayGame(){
        		let curLottery = this.$store.state.lottery.currentLottery;
        		let playtype = cai[curLottery].playMethod;
        		let playMethods = [];
        		for(var index in playtype){
        			playMethods.push(playtype[index])
        		};
        		this.allPlayMethods = playMethods;
        		//默认设置第一种玩法
        		this.setPlayMethod(playMethods[0].name);
        		this.setZWgamePlay(playMethods[0].value)
        		this.getmethodsClass();
        	},

        	//获取具体玩法内容
        	getmethodsClass(){
        		let gamePlayMethod = this.$store.state.lottery.gamePlayMethod;
        		let curLottery = this.$store.state.lottery.currentLottery;
        		let PlayMethodType = cai[curLottery].methodType[gamePlayMethod];
        		this.allGamePlayMethods1 = PlayMethodType[0];
        		if(this.allGamePlayMethods1.desc){
        			this.desc1 = this.allGamePlayMethods1.desc + "："
        		}else{
        			this.desc1 = ""
        		}
        		if(PlayMethodType.length >1){
        			this.allGamePlayMethods2 = PlayMethodType[1];
        			this.desc2 = this.allGamePlayMethods2.desc + "："
        		}else{
        			this.allGamePlayMethods2 = [];
        			this.desc2 = ''
        		}
        		//默认设置第一种玩法内容
        		this.setPlayMethodType(this.allGamePlayMethods1.items[0].name);
        		this.setZWmethodType(this.allGamePlayMethods1.items[0].value)
        		console.log('具体玩法内容',this.allGamePlayMethods1)
        	},

        	//改变玩法
        	changePlayMethod(e){
        		const target = e.target
        		const tagName = target.tagName.toLowerCase()
        		if('li' == tagName){
        			var allArray = target.parentNode.children;
        			var liClear = Array.prototype.slice.call(allArray)
        			liClear.forEach( function(element, index) {
        				removeClass(element, 'border-top')
        			})
        			addClass(target, "border-top")
        		}else{return}
        		//设定玩法为所点击的值
        		this.setPlayMethod(target.attributes.name.value);
        		this.setZWgamePlay(target.innerText)
        		var selBar = this.$refs.gameMethod
        		var all = selBar.querySelectorAll('li')
        		var allArray = Array.from(all)
        		if(allArray && allArray.length > 0){
        			allArray.forEach( function(element, index) {
        				removeClass(element, 'border-brown')
        				if(index == 0){
        					addClass(element, 'border-brown')
        				}
        			})
        		}
        		this.getmethodsClass();
        	},

        	//改变玩法内容
        	changeMethodContent(e){
        		const target = e.target
        		const tagName = target.tagName.toLowerCase()
        		if('li' == tagName){
        			var allArray = target.parentNode.children;
        			var liClear = Array.prototype.slice.call(allArray)
        			liClear.forEach( function(element, index) {
        				removeClass(element, 'border-brown')
        			})
        			addClass(target, "border-brown")
        		}else{return}
        		this.setPlayMethodType(target.attributes.name.value);
        		this.setZWmethodType(target.innerText)
        		console.log('变更玩法内容',target.attributes.name.value)
        	},
        },
    }
</script>
<style scoped>
	.play-game-size{
		list-style: none;
		float: left;
		width: 100%;
		padding-left: 5px;
	}
	.play-game-size li{
		color: #3e3e3e;
		float: left;
		height: 31px;
		padding: 0 10px;
		margin-left: 5px;
		line-height: 31px;
		cursor:pointer;
	}
	.play-game-size li:hover{
		color: #3d5290;
	}
	.border-top-transparent{
		font-family: SimSun, 宋体, STSong, 华文宋体;
		border-top: 4px solid transparent;
	}
	.play-method-size{
		list-style: none;
		float: right;
		width: 802px;
		height: 51px;
	}
	.play-method-size li{
		display: inline-block;
		cursor:pointer;
		color: #666;
		height: 20px;
		line-height: 20px;
		padding: 0 10px;
		margin-top: 4px;
	}
	.play-method-size li:hover{
		border: 1px solid rgb(204, 113, 16);
		color: rgb(204, 113, 16);
	}
	.border-transparent{
		font-family: SimSun, 宋体, STSong, 华文宋体;
		border: 1px solid transparent;
	}
	.border-brown{
		border: 1px solid rgb(204, 113, 16)!important;
		color: rgb(204, 113, 16)!important;
	}
	.liuhecai-top-padding{
		padding-top: 4px;
	}
</style>
