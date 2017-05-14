<template>
	<div :class="{ 'cai13-number-list': this.currentLottery == 'cai13', 'cai14-number-list': this.currentLottery == 'cai14'}">
		<div class="open-number-box">
			<p class="text-size f-14">第{{recordList.numTitle}}期 <span class="kaijiangTitle">开奖结果</span></p>
			<div v-if="this.currentLottery != 'cai14'" class="open-number t-a-c">
				<div class="number-list t-a-c" v-for="(item, index) in recordNum">
					<span class="show-open-position show-openum-bg" :class="{ 'show-openum-bg-left': index==0 ,'show-openum-bg-right': index==(recordNum.length-1) }">
						<div class="open-record-png-box" v-if="!isJump">
							<span class="openumber-img-box" v-for="num in item" :class="{ 'openumber-img-box-two': isDoubleDigit}" :style="{backgroundPosition : judgeNumberPosi(num) + 'px' }" ></span>
						</div>
						<img class="open-record-img" v-if="isJump" src="../../images/move.gif">
					</span>
				</div>
			</div>
			<div v-else class="lhc-open-number t-a-c">
				<div class="lhc-number-list t-a-c" v-for="item in recordNum">
					<span class="lhc-open-box t-a-c" :class="lhcBackImg(item)">
						<div>
							<span v-for="num in item" class="lhc-num-img" :style="{backgroundPosition : judgeLhcPosi(num) + 'px' }"></span>
						</div>
					</span>
				</div>
				<div class="lhc-number-list lianjie t-a-c">
					<span class="t-a-c"></span>
				</div>
				<div class="lhc-number-list t-a-c">
					<span class="lhc-open-box t-a-c" :class="lhcBackImg(lhcLast)">
						<div>
							<span v-for="num in lhcLast" class="lhc-num-img" :style="{backgroundPosition : judgeLhcPosi(num) + 'px' }"></span>
						</div></span>
				</div>
			</div>
		</div>
		<div class="open-descrip t-a-c f-13">
			<div class="descrip-show t-a-c f-13"><span>{{recordList.pattern1name}}</span><span class="red-color">{{recordList.pattern1}}</span><span>{{recordList.sum1name}}</span><span class="red-color">{{recordList.sum1}}</span></div>
			<div class="descrip-show t-a-c f-13"><span>{{recordList.pattern2name}}</span><span class="red-color">{{recordList.pattern2}}</span><span>{{recordList.sum2name}}</span><span class="red-color">{{recordList.sum2}}</span></div>
			<div class="descrip-show t-a-c f-13"><span>{{recordList.pattern3name}}</span><span class="red-color">{{recordList.pattern3}}</span><span>{{recordList.sum3name}}</span><span class="red-color">{{recordList.sum3}}</span></div>
		</div>
		<div class="yiloudescrip f-14">
			<a @mouseenter="animate" @mouseleave="leave"><img class="yiloudescrip-img" src="../../images/imgLieBiao.png">遗漏分析</a>
			<a @mouseenter="animate" @mouseleave="leave"><img class="yiloudescrip-img" src="../../images/imgChaXun.png">奖金详情</a>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { errorMsg, succMsg, removeClass,toggleClass, addClass, hasClass } from "../../tools/command"
	import { mapActions } from 'vuex'
	import jquery from 'jquery'
	export default {
		name : "open-number",
		// props: {
		// 	datas: Object,
		// },
		mounted: function () {
			this.getRecentOpen()
        	this.judgeDigit()
		},
		beforeDestroy(){
		},
		data() {
			return {
				recordList:{},
				recordNum:[],
				//六合彩最后一位
				lhcLast: '',
				isJump: false,
				isDoubleDigit: false,
				Calculate: '31',
				lhcData: {},
			}
		},
		computed : {
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
			lastOpenRecord(){
				return this.$store.state.lottery.lastOpenRecord
			},
		},
        watch : {
        	"currentLottery": function(value,old){
        		this.getRecentOpen()
        		this.judgeDigit()
        	},
        	"lastOpenRecord": function(value,old){
        		this.isOpenSteTime()
        	},
        },
		methods: {
        	...mapActions({
        		setLastOpen: 'setLastOpen',
        	}),
        	judgeDigit(){
        		switch(this.currentLottery){
					case "cai8":
					  	break;
					case "cai9":
					  	break;
					case "cai10":
					  	break;
					case "cai13":
					  	break;
					case "cai14":
					  	break;
					default:
	        			this.isDoubleDigit = false
	        			this.Calculate = '31'
	        			return
					}
        			this.isDoubleDigit = true
        			this.Calculate = '20'
        	},
			async getRecentOpen() {
				var parameter = {}
				parameter.classId = this.currentLottery.slice(3)
				var data = await api.ajax('lottery/num/findRecentOpenOne', parameter)
				if(data && data.code == '0'){
					this.recordList = data.data
					this.recordNum = this.recordList.openNum.split(",")
					if(this.currentLottery == 'cai14'){
						this.findNumLHC()
						this.lhcLast = this.recordNum[6]
						this.recordNum = this.recordNum.slice(0,-1)
					}
	        		if( this.recordList.id == this.lastOpenRecord.id ){
	        			if(this.getRecentList){
							clearInterval(this.getRecentList)
							this.isJump = false
	        			}
	        			var that = this
	        			this.$nextTick(function () {
						that.$root.$emit("get_newMiss")
					})
					}
				} else {
					errorMsg(data.msg)
				}
			},
        	isOpenSteTime(){
    			if(this.getRecentList){
					clearInterval(this.getRecentList)
					this.isJump = false
    			}
        		if( this.recordList.id != this.lastOpenRecord.id ){
					if(this.lastOpenRecord.openTM >= 0 && this.lastOpenRecord.openTM < 30){
						var applytimes = (30 - this.lastOpenRecord.openTM)*1000
						this.getRecentList = setInterval(this.getRecentOpen, 3000)
						var clearint = setTimeout(()=>{clearInterval(this.getRecentList)}, applytimes)
						this.isJump = true
					}
				}
        	},
            animate(event){
                var elem = event.target
                if(!elem){
                  return
                }
                var tag = elem.tagName.toLowerCase()
                if(tag == "a"){
                  jquery("img", elem).addClass('animated infinite bounce')
                }
            },
            leave(event){
                var elem = event.target
                if(!elem){
                  return
                }
                jquery("img", elem).removeClass('animated infinite bounce')
            },
            judgeNumberPosi(num){
            	var res = (-num*this.Calculate)+''
        		return res
        	},
        	judgeLhcPosi(num){
            	var res = (-num*19)+''
        		return res
        	},
	        async findNumLHC(){
	            var data = await api.ajax('lottery/type/findNumLHC', {})
	            if(data && data.code == '0'){
	                this.lhcData = {
	                	red: data.data.hongbo,
	                	blue: data.data.lanbo,
	                	green: data.data.lvbo,
	                }
	            } else {
	                errorMsg(data.msg)
	            }
	        },
	        lhcBackImg(value){
	        	// debugger
	        	for(var color in this.lhcData.red){
	        		if(this.lhcData.red[color] == value){
	        			return 'red'
	        		}
	        	}
	        	for(var bluecolor in this.lhcData.blue){
	        		if(this.lhcData.blue[bluecolor] == value){
	        			return 'blue'
	        		}
	        	}
	        	for(var greencolor in this.lhcData.green){
	        		if(this.lhcData.green[greencolor] == value){
	        			return 'green'
	        		}
	        	}
	        }
		},
	}
</script>
<style scoped>
	.open-number{
		display: inline-block;
		clear: both;
		border-top: 5px solid #989898;
		border-bottom: 5px solid #989898;
		border-right: 15px solid #989898;
		border-left: 15px solid #989898;
		border-radius: 5px;
		height: 83px;
	}
	.number-list {
		position: relative;
		display: inline-block;
		width: 66px;
		height: 83px;
	}
	.cai13-number-list .open-number-box{
		width: 690px!important;
	}
	.cai13-number-list .yiloudescrip{
		top: -5px!important;
	}
	.cai13-number-list .yiloudescrip a{
		display: inline!important;
		margin-left: 5px;
	}
	.cai13-number-list .open-descrip{
		width: 688px!important;
		left: 1px!important;
	}
	.show-open-position{
		color: white;
		display: inline-block;
		height: 83px;
		width: 67px;
	}
	.text-size{
		font-weight:bold;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #656565;
		padding-left: 175px;
		padding-bottom: 5px;
    	text-align: left;
	}
	.open-descrip{
		position: absolute;
		top: 115px;
		left: 60px;
		height: 23px;
		width: 425px;
		line-height: 23px;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		display: inline-block;
		background-color: white;
	}
	.descrip-show{
		display: inline-block;
		width: 32%;
		line-height: 23px;
		color: #313131;
	}
	.kaijiangTitle{
		padding-left: 25px;
	}
	.yiloudescrip{
		font-family: SimSun, 宋体, STSong, 华文宋体;
		position: absolute;
		right: 20px;
		top: 15px;
	}
	.yiloudescrip-img{
		position: relative;
		top: 3px;
		margin-right: 10px;
	}
	.yiloudescrip a{
		display: block;
		line-height: 20px;
		margin: 18px 0;
		cursor:pointer;
	}
	.show-openum-bg {
		background-image: url('../../images/imgHaoMaQiuBeiJing-Zhong.png');
		background-repeat: no-repeat;
	    background-size: contain;
	}
	.open-number-box{
		width: 555px;
		text-align: center;
	}
	.show-openum-bg-left {
		background-color: #989898;
		background-image: url('../../images/imgHaoMaQiuBeiJing-Zuo.png');
		background-repeat: no-repeat;
	    background-size: contain;
	    width: 68px!important;
	}
	.show-openum-bg-right {
		background-color: #989898;
		background-image: url('../../images/imgHaoMaQiuBeiJing-You.png');
		background-repeat: no-repeat;
	    background-size: contain;
	}
	.open-record-img{
		position: absolute;
		top: 14px;
    	right: 9px;
	}
	.open-record-png-box{
		height: 45px;
		position: relative;
    	top: 20px;
	}
	.openumber-img-box{
		display: inline-block;
		height: 45px;
		width: 31px;
		line-height: 45px;
		background-image: url(../../images/taHaoMa.png);
		background-repeat: no-repeat;
	    background-size: percentage;
	}
	.openumber-img-box-two{
		background-image: url(../../images/taHaoMa2.png)!important;
		width: 20px!important;
	}
	.cai14-number-list .open-descrip{
		width: 688px!important;
		left: 1px!important;
	}
	.lhc-open-number{
		width: 560px;
	    height: 60px;
	    line-height: 70px;
	    margin: 15px 0 0 20px;
	}
	.lhc-number-list{
		position: relative;
		display: inline-block;
		width: 69px;
		height: 65px;
	}
	.lhc-open-box{
		display: inline-block;
		width: 61px;
		height: 60px;
		background-repeat: no-repeat;
	}
	.lianjie{
		width: 51px!important;
	}
	.lianjie span{
		background-image: url(../../images/imgTuBiao.png);
		background-repeat: no-repeat;
		display: inline-block;
		width: 36px;
		height: 25px;    
		position: relative;
	}
	.red{
		background-image: url(../../images/imgHaoMaQiu-HongBo.png);
	}
	.blue{
		background-image: url(../../images/imgHaoMaQiu-LanBo.png);
	}
	.green{
		background-image: url(../../images/imgHaoMaQiu-LvBo.png);
	}
	.lhc-num-img{
		display: inline-block;
		height: 23px;
		width: 19px;
		line-height: 23px;
		background-image: url(../../images/haomaqiushuzi.png);
		background-repeat: no-repeat;
	    background-size: percentage;
	}
</style>
