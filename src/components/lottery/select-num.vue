<template>
	<div>
		<div class="container">
			<div class="descript-size">
				<div class="jiantou-img t-a-c"><div class="wei-position f-16" ref="titleBar" :name="datas.type">{{datas.values.titles}}</div></div>
				<div v-show="showYilouLengre">
					<span v-show="isYilou" class="f-12 now-yilou-size">当前遗漏</span>
					<span v-show="isLengre" class="f-12 now-yilou-size left-20">冷热</span>
				</div>
			</div>
			<div class="show-num-but t-a-c" @click.prevent="addSelectNum" ref="selBar">
				<div class="number-list t-a-c"  v-for="num in datas.values.vulues" :key="num.name">
					<span class="yuan-bg t-a-c f-19" :name="num.name" :title="num.value">{{num.value}}<p class="f-14 yilou">{{num.value | sscleak(datas.type, yilou, currentLottery)}}</p></span>
				</div>
			</div>
			<div class="but-function f-15 t-a-c" @click.prevent="SelectFunction" v-if="!isShow">
				<div id="quan" class="button-size">全</div>
				<div id="da" class="button-size" v-if="!isDaxiaodanshuang">大</div>
				<div id="xiao" class="button-size" v-if="!isDaxiaodanshuang">小</div>
				<div id="ji" class="button-size" v-if="!isDaxiaodanshuang">奇</div>
				<div id="ou" class="button-size" v-if="!isDaxiaodanshuang">偶</div>
				<div id="qing" class="button-size">清</div>
			</div>
			<div class="under-line" v-if="isunderline"></div>
		</div>
	</div>
</template>
<script lang="babel">
	import { removeClass,toggleClass, addClass, hasClass } from "../../tools/command"
	import { mapActions } from 'vuex'
	import $ from 'jquery'
	import leakConstants from './data/show-leak-constants'
	export default {
		name : "select-number",
		props: {
			datas: Object,
			isunderline: Boolean,
			yilou : Array,
			yilouStatus : String,
		},
		mounted: function () {
			this.$root.$on("clear_number", this.clearAll)
			this.setYilouLengreColor()
        },
        beforeDestroy(){
        	this.$root.$off("clear_number", this.clearAll)
        },
		data() {
			return {
			}
		},
		updated(){
			this.setYilouLengreColor()
		},
		computed : {
			isDaxiaodanshuang(){
				if(this.$store.state.lottery.gamePlayMethod == "big_little_odd_even"){
					return true
				}else{
					return false
				}
			},
			isShow(){
				if(this.$store.state.lottery.gamePlayMethod == "pk10_guess_danshuang" || this.$store.state.lottery.gamePlayMethod == "pk10_guess_daxiao"){
					return true
				}else{
					return false
				}
			},
			playMethodType(){
				return this.$store.state.lottery.playMethodType
			},
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
			gamePlayMethod(){
				return this.$store.state.lottery.gamePlayMethod
			},
			isYilou(){
				return this.yilouStatus.indexOf("leak") > -1
			},
			isLengre(){
				return this.yilouStatus.indexOf("hot") > -1
			},
			showYilouLengre(){
				if(!this.playMethodType || !this.gamePlayMethod || !this.currentLottery){
					return false
				}
				const type = leakConstants[this.currentLottery][this.gamePlayMethod]
				if(type && type.indexOf(this.playMethodType) > -1){
					return true
				}
				return false
			}
		},
        watch : {
        	"playMethodType": function(value,old){
        		this.clearAll()
        	},
        },
		methods: {
			...mapActions({
				setSelected : 'setSelected',
			}),
			addSelectNum(e){
				const target = e.target
				const tagName = target.tagName.toLowerCase()
				if('span' == tagName){
					toggleClass(target, "yuan-select-number")
				}else{return}
				this.staticSelected()
			},
			SelectFunction(e){
				const target = e.target
				if('button-size' == target.className){
					switch (target.id){
						case 'quan' :
						this.selectAll()
						break ;
						case 'da' :
						this.selectBig()
						break ;
						case 'xiao' :
						this.selectSmall()
						break ;
						case 'ji' :
						this.selectOdd()
						break ;
						case 'ou' :
						this.selectEven()
						break ;
						case 'qing' :
						this.clearAll()
						break ;
						default : 
						break; 
					}
					this.staticSelected()
				}else{return}
			},
	    	//计算倍数
	    	staticSelected(){
	    		var titleBar = this.$refs.titleBar
	    		var selBar = this.$refs.selBar
	    		var data = {
	    			name : '',
	    			selected : []
	    		}
	    		var all = selBar.querySelectorAll('span.yuan-select-number')
	    		if(all && all.length > 0){
	    			var allArray = Array.from(all)
	    			allArray.forEach( function(element, index) {
	    			//添加号码
	    			data.selected.push(element.getAttribute("name"))
	    		});
	    		}
	    		data.name = titleBar.getAttribute("name")
	    		console.log(data)
	    		this.setSelected(data)
	    		var that = this
	    		this.$nextTick(function () {
	    			//lottery的betting函数计算倍数
	    			that.$root.$emit("betting")
	    		})
	    	},
	    	selectAll(){
	    		var selBar = this.$refs.selBar
	    		var allArray = selBar.querySelectorAll('span')
	    		var liAddClass = Array.prototype.slice.call(allArray)
	    		liAddClass.forEach( function(element, index) {
	    			addClass(element, "yuan-select-number")
	    		})
	    	},
	    	clearAll(){
	    		var selBar = this.$refs.selBar
	    		var allArray = selBar.querySelectorAll('span')
	    		var liAddClass = Array.prototype.slice.call(allArray)
	    		liAddClass.forEach( function(element, index) {
	    			removeClass(element, "yuan-select-number")
	    		})
	    		this.staticSelected()
	    	},
	    	selectBig(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('span')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
	    			var max = allArray[allArray.length - 1].getAttribute("title")
	    			allArray.forEach( function(element, index) {
	    				var value = element.getAttribute("title")
	    				if( value > max/2){
	    					addClass(element, 'yuan-select-number')
	    				} else {
	    					removeClass(element, 'yuan-select-number')
	    				}
	    			})
	    		}
	    	},
	    	selectSmall(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('span')
	    		if(all && all.length > 0){
	    			var len = all.length / 2
	    			var allArray = Array.prototype.slice.call(all)
	    			var max = allArray[allArray.length - 1].getAttribute("title")
	    			allArray.forEach( function(element, index) {
	    				var value = element.getAttribute("title")
	    				if( value <= max/2){
	    					addClass(element, 'yuan-select-number')
	    				} else {
	    					removeClass(element, 'yuan-select-number')
	    				}
	    			})
	    		}
	    	},
	    	selectEven(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('span')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
	    			allArray.forEach( function(element, index) {
	    				var value = element.getAttribute("title")
	    				if(0 == value%2){
	    					addClass(element, 'yuan-select-number')
	    				} else {
	    					removeClass(element, 'yuan-select-number')
	    				}
	    			})
	    		}
	    	},
	    	selectOdd(){
	    		var selBar = this.$refs.selBar
	    		var all = selBar.querySelectorAll('span')
	    		if(all && all.length > 0){
	    			var allArray = Array.prototype.slice.call(all)
	    			allArray.forEach( function(element, index) {
	    				var value = element.getAttribute("title")
	    				if(1 == value%2){
	    					addClass(element, 'yuan-select-number')
	    				} else {
	    					removeClass(element, 'yuan-select-number')
	    				}
	    			})
	    		}
	    	},
	    	setYilouLengreColor(){
	    		$(".color-green", this.$refs.selBar).removeClass('color-green')
	    		$(".color-red", this.$refs.selBar).removeClass('color-red')
	    		const yilou = $(".yilou",this.$refs.selBar)
	    		if(yilou.length == 0){
	    			return
	    		}
	    		var varr = []
	    		yilou.each(function(index, el){
	    			varr.push($(el).text())
	    		})
	    		varr.sort(function(a,b){
	    			return a - b
	    		})
	    		const min = varr[0]
	    		const max = varr[varr.length - 1]
	    		yilou.each(function(index, el) {
	    			if($(el).text() == min) {
	    				$(el).addClass("color-green")
	    			} else if($(el).text() == max){
	    				$(el).addClass("color-red")
	    			}
	    		})
	    	}
	    },
	}
</script>
<style scoped>
	.container{
		position: relative;
		height: 67px;
	}
	.wei-position{
		color: #fff;
		width: 65px;
		height: 29px;
		line-height: 29px;
		font-family: SimHei, 黑体, STHeiti, 华文黑体;
		font-weight:bold;
	}
	.descript-size{
		float: left;
		width: 77px;
		height: 100%;
	}
	.now-yilou-size{
		font-family: SimSun, 宋体, STSong, 华文宋体;
		position: absolute;
		left: 8px;
		top: 42px;
		color: #7a7a7a;
	}
	.show-num-but{
		height: 60px;
		width: 490px;
		position: absolute;
		left: 88px;
	}
	.number-list {
		margin: 8px 2px 0;
		width: 39px;
		height: 57px;
		display: inline-block;
	}
	.yilou{
		position: absolute;
		bottom: 14px;
		top: 27px;
		left: 0px;
		height: 10px;
		width: 100%;
		text-align: center;
		font-family: SimSun, 宋体, STSong, 华文宋体;
	}

	.yuan-bg{
		cursor:pointer;
		display: inline-block;
		color: #505355;
		position: relative;
		height: 39px;
		width: 39px;
		background-image: url(../../images/btnYuan02.png);
		background-repeat: no-repeat;
		line-height: 39px;
		font-family: SimHei, 黑体, STHeiti, 华文黑体;
	}
	.but-function{
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #424242;
		height: 35px;
		width: 245px;
		position: absolute;
		top: 16px;
		right: 25px;
	}
	.button-size{
		cursor:pointer;
		display: inline-block;
		width: 34px;
		background-image: url(../../images/bynHanZi02.png);
		background-position-x: 0px;
		background-position: 1px 1px;
		line-height: 35px;
	}
	.under-line{
		height: 1px;
		width: 745px;
		background-image: url(../../images/imgJianGeXian.jpg);
		position: absolute;
		bottom: 0px;
		left: 78px;	
	}
	.yellow-color{
		color: #d36d00!important;
	}
	.left-20 {
		left: 20px;
	}
	.color-red {
		color: #d36d00;
	}
	.color-green {
		color: #21b333;
	}
</style>
