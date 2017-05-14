 <template>
 	<div>
 		<span class="text-size f-14 f-l">第{{newTitles}}期</span>
 		<span class="text-size f-14 f-r">投注时间</span>
 		<div class="daojishi">
 			<div class="daojishi-size hours t-a-c">
				<div class="daojishi-box">
					<span class="daijishi-img-box" v-for="num in countdown.hours" :style="{backgroundPosition : judgeDaojisPosi(num) + 'px' }" ></span>
				</div>
 			</div>
 			<div class="daojishi-size min t-a-c">
 				<div class="daojishi-box">
 					<span class="daijishi-img-box" v-for="num in countdown.minute" :style="{backgroundPosition : judgeDaojisPosi(num) + 'px' }" ></span>
 				</div>
 			</div>
 			<div class="daojishi-size second t-a-c">
 				<div class="daojishi-box">
 					<span class="daijishi-img-box" v-for="num in countdown.second" :style="{backgroundPosition : judgeDaojisPosi(num) + 'px' }" ></span>
 				</div>
 			</div>
 			<img class="daojishi-line" src="../../images/imgDaoJiShi02.png">
 		</div>
 	</div>
 </template>
 <script lang="babel">
 	import api from '../../api'
    import { errorMsg, succMsg } from "../../tools/command"
	import { mapActions } from 'vuex'
 	export default {
 		name : "show-time",
		// props: {
		// 	datas: Object,
		// },
		mounted: function () {
			this.getCurrentNumNext()
			this.orderTmIntervalId = setInterval(this.orderTmInterval, 1000)
			this.orderTmcheckId = setInterval(this.getCurrentNumNext, 15000)
		},
		beforeDestroy(){
			clearInterval(this.orderTmcheckId)
			clearInterval(this.orderTmIntervalId)
		},
		data() {
			return {
				newTitles:'',
				orderTM:'',
				countdown: {
					hours: '',
					minute: '',
					second: '',
				},
				openTM: '',
				lastOpenLottery: '',
				openWaitTM:'0',
			}
		},
		computed : {
			currentLottery(){
				return this.$store.state.lottery.currentLottery
			},
		},
        watch : {
        	"currentLottery": function(value,old){
	        			console.log("切换彩种调用")
        		this.getCurrentNumNext()
        	},
        },
		methods: {
        	...mapActions({
        		setNowLotteryId: 'setNowLotteryId',
        		setLastOpen: 'setLastOpen',
        		setCanBetNow: 'setCanBetNow',
        	}),

			async getCurrentNumNext() {
				var parameter = {}
				parameter.classId = this.currentLottery.slice(3)
				var data = await api.ajax('lottery/findCurrentCanBet', parameter)
				if(data && data.code == '0'){
					if(!data.data){
						return
					}
					this.orderTM = data.data.orderTM;
					console.log(this.orderTM)
					this.newTitles = data.data.numTitle;
					this.setNowLotteryId(data.data.id)
					this.lastOpenLottery = data.data.previousId
					this.openTM = data.data.openTM
					this.setLastOpen({
						id: this.lastOpenLottery,
						openTM: this.openTM,
					})
					if(data.data.openTM && data.data.openTM<0){
						this.openWaitTM = data.data.openTM;
					}
				} else {
					errorMsg(data.msg)
				}
			},

        	//定时倒计时
        	orderTmInterval(){
                var orderTM = this.orderTM
                let h, m, s;
				var that = this
                if(orderTM >= 0) {
                    h = Math.floor(orderTM/60/60%24);
                    m = Math.floor(orderTM/60%60);
                    s = Math.floor(orderTM%60);
                    this.countdown.hours = this.addzero(h);
                    this.countdown.minute = this.addzero(m);
                    this.countdown.second = this.addzero(s);
                }
                if(orderTM <= 0){
					this.$nextTick(function () {
						that.$root.$emit("updateLotNew")
					})
	        			console.log("倒计时归零调用")
                    return this.getCurrentNumNext()
                }
        		this.orderTM--
        		if(this.openWaitTM<0){
        			this.openWaitTM++;
	        		if(this.openWaitTM == 0){
	        			console.log("累加调用")
						this.getCurrentNumNext()
	        			//call
	        		}
        		}
        	},

        	//时间补零
        	addzero(value){
        		let nums = Number(value)
        		if(nums>9){
        			return nums+''
        		}else{
        			return '0'+nums
        		}
        	},

            judgeDaojisPosi(num){
            	var res = (-num*22)+''
        		return res
        	},
        },
    }
</script>
<style scoped>
	.daojishi{
		font-family: SimHei, 黑体, STHeiti, 华文黑体;
		font-weight:bold;
		position: relative;
		clear: both;
		width: 257px;
		height: 91px;
		background: url(../../images/imgDaoJiShi01.png);
		background-repeat: no-repeat;
	}
	.daojishi-line{
		position: absolute;
		top: 45px;
		left: 16px;
	}
	.text-size{
		font-weight:bold;
		font-family: SimSun, 宋体, STSong, 华文宋体;
		color: #656565;
		padding: 0 8px 14px;
	}
	.f-l{
		float: left;
	}
	.f-r{
		float: right;
	}
	.daojishi-size{
		height: 60px;
		width: 55px;
		position: absolute;
		top: 16px;
		/*line-height: 60px;*/
		font-size: 35px;
		color: #727272;
	}
	.hours{
		left: 24px;
	}
	.min{
		left: 102px;
	}
	.second{
		left: 180px;
	}
	.daojishi-box{
		height: 36px;
		position: relative;
		top: 13px;
	}
	.daijishi-img-box{
		display: inline-block;
		height: 36px;
		width: 22px;
		background-image: url(../../images/taNaoZhongShuZi.png);
		background-repeat: no-repeat;
	    background-size: percentage;
	}
</style>
