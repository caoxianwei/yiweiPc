<template>
	<div class=" translate3d-zero">
		<div class="lhc-list-table" ref="lhc_add_src">
			<div>
				<div class="t-a-c f-16 lhc-list-th">
					<span class="lhc-list-num-play-box">玩法</span>
					<span class="lhc-list-num-box">内容</span>
					<span class="lhc-list-num-box">赔率</span>
					<span class="lhc-list-num-box">金额</span>
					<span class="lhc-list-delete"></span>
				</div>
				<div class="lhc-list-tr t-a-c f-14" v-for="(item, index) in lhcSelect" :class="{ 'hovercolor':isOdd(index)} ">
					<span class="lhc-list-num-play-box">{{item.name}}</span>
					<span class="lhc-list-num-box">{{item.betnumbersNameChina}}</span>
					<span class="lhc-list-num-box">{{item.peilv}}</span>
					<span class="lhc-list-num-box">{{item.totalMoney}}</span>
					<span class="lhc-list-delete"><img id="deleteImg" src="../../images/imgX.png" @click.stop="deleteOne(index)"></span>
				</div>
			</div>
		</div>
		<div class="lhc-mon-all f-16">
			<span class="lhc-tongji t-a-c">你选择了<span>{{allCount}}</span>注，共<span>{{allLhcMoney}}</span>元</span>
			<span class="clear-lhc-list" @click.prevent="clearLhcSelect"></span>
		</div>
		<div class="add-to-list" @click.prevent="addToList"></div>
		<div class="sure-bet-list" @click.prevent="betLHC"></div>
	</div>
</template>
<script lang="babel">
	import { errorMsg,succMsg } from '../../tools/command'
	import { mapActions } from 'vuex'
	import api from '../../api'
	import jquery from 'jquery'
	import fullpage from 'fullpage.js'
	import mousewheel from 'jquery-mousewheel'
	import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
	import pei from './order-type-constants'
	export default {
		name : "lhc-add-num",
		mounted(){
			jquery(this.$refs.lhc_add_src).mCustomScrollbar()
			this.$root.$on("clearLhcSelect", this.clearLhcSelect)
			this.$root.$on("bettingLHC", this.bettingLHC)
			this.getBonus()
		},
		beforeDestroy(){
			this.$root.$off("clearLhcSelect", this.clearLhcSelect)
			this.$root.$off("bettingLHC", this.bettingLHC)
		},

		data(){
			return {
				lhcSelect:[],
				count: '',
				lhcMoney: '',
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
			ZWgamePlay(){
				return this.$store.state.lottery.ZWgamePlay
			},
			ZWmethodType(){
				return this.$store.state.lottery.ZWmethodType
			},
			allCount(){
				return this.lhcSelect.length
			},
			allLhcMoney(){
				var sum = 0
				if(this.lhcSelect.length == 0){
					return 0
				}
				for(var index in this.lhcSelect){
					sum += Number(this.lhcSelect[index].totalMoney)
				}
				return sum
			},
		},

		methods : {
			...mapActions({
				setSelected : 'setSelected',
				setLhcBetList : 'setLhcBetList',
			}),
			clearLhcSelect(){
				this.lhcSelect = [];
				var that = this
				this.$nextTick(function () {
					that.$root.$emit("clear_number")
				})
			},
			bettingLHC(){
				var selected = this.$store.state.lottery.selected
				if(this.currentLottery == 'cai14'){
					var selArray = Object.keys(selected)
					if(selArray && selArray.length > 0){
						var count = 0, lhcMoney = 0
						selArray.forEach((element, index) => {
							if(selected[element][0] && selected[element][0].length > 0){
								count ++
								lhcMoney += selected[element][0]/1
							}
						})
						this.count = count
						this.lhcMoney = lhcMoney
                    // peiLv
                }
            }
        },
        addToList(){
        	var selected = this.$store.state.lottery.selected
        	for(var index in selected){
        		if(index == 'empty'){
        			this.setSelected("")
        			return errorMsg("请选择投注号码！")
        		}else{
        			if(selected[index].length != 0){
        				var lhcbet = {
        					name: this.ZWmethodType,
        					peilv: this.$store.state.lottery.lhcPeiLv,
        					totalMoney: selected[index][0],
        					gid: (this.currentLottery).slice(3),
        					gmcid: pei[this.currentLottery][this.gamePlayMethod][this.playMethodType],
        					count: 1,
        					multiple: selected[index][0],
        					model: 1,
        					tzbs: "0",
        					typeName: this.$store.state.lottery.ZWmethodType,
        					betnumbersName: index,
        					betnumbersNameChina: index,
        				}
        				if(this.playMethodType == "lhc_tmsx_type"){
        					lhcbet.betnumbersNameChina = this.sxChange(index)
        					lhcbet.peilv = this.bonus[index]
        				}
        				if(this.playMethodType == "lhc_tmdxds_type"){
        					lhcbet.betnumbersNameChina = this.dxdsChange(index)
        					lhcbet.peilv = this.bonus.dxds
        				}
        				if(this.playMethodType == "lhc_tmsb_type"){
        					lhcbet.betnumbersNameChina = this.sbChange(index)
        					lhcbet.peilv = this.bonus[index]
        				}
        				this.lhcSelect.push(lhcbet)
        			}
        		}
        	}
        	var that = this
        	this.$nextTick(function () {
        		that.$root.$emit("clear_number")
        	})
        },
        deleteOne(value){
        	this.lhcSelect.splice(value, 1)
        },
        betLHC(){
        	this.setLhcBetList(this.lhcSelect)
        	var that = this
        	this.$nextTick(function () {
        		that.$root.$emit("betLHC")
        	})
        },
        isOdd(value){
        	if(value%2===0){
        		return true
        	}else{
        		return false
        	}
        },
        sxChange(value){
        	var data = ["鼠", "虎", "龙", "马", "猴", "狗", "牛", "兔", "蛇", "羊", "鸡", "猪"]
        	var cdata = ["shu","hu","long","ma","hou","gou","niu","tu","she","yang","ji","zhu"]
        	var ind = cdata.indexOf(value+"")
        	return data[ind]
        },
        dxdsChange(value){
        	var data = ["大", "小", "单", "双"]
        	var cdata = ["09","01","03","02"]
        	var ind = cdata.indexOf(value+"")
        	return data[ind]
        },
        sbChange(value){
        	var data = ["红波", "蓝波", "绿波"]
        	var cdata = ["hongbo","lanbo","lvbo"]
        	var ind = cdata.indexOf(value+"")
        	return data[ind]
        },
        //获得六合彩赔率
        getBonus(){
            api.ajax('lottery/type/findBonusLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.bonus = data.data
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
    },

}

</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	.lhc-list-tr{
		color: #424242;
		height: 30px;
		line-height: 30px;
	}
	.lhc-list-th{
		font-weight: bold;
		color: #656565;
		height: 30px;
		line-height: 30px;
	}
	.lhc-list-table{
		height: 200px;
		width: 320px;
		margin-top: 16px;
		margin-left: 10px;
	}
	.lhc-list-num-box{
		display: inline-block;
		width: 52px;
	}
	.lhc-list-num-play-box{
		display: inline-block;
		width: 90px;
		text-align: left;
	}
	.lhc-list-delete{
		display: inline-block;
		width: 30px;
	}
	.lhc-mon-all{
		height: 30px;
		margin-top: 35px;
	}
	.lhc-tongji{
		display: inline-block;
		width: 213px;
		height: 30px;
		line-height: 30px;
		float: left;
		margin-left: 18px;
		color: #1d1d1d;
	}
	.lhc-tongji span{
		color: #f13118;
	}
	.clear-lhc-list{
		cursor:pointer;
		display: inline-block;
		height: 30px;
		width: 95px;
		background-image: url(../../images/btnQingKong-PuTong.png);
		background-repeat: no-repeat;
		float: right;
		margin-right: 18px;
	}
	.clear-lhc-list:hover{
		background-image: url(../../images/btnQingKong-FaLiang.png);
	}
	.hovercolor{
		background-color: #ececec;
	}
	.add-to-list{
		cursor:pointer;
		height: 64px;
		width: 139px;
		background-image: url(../../images/btnTianJiaFangAn-PuTong.png);
		position: absolute;
    	left: 20px;
        margin-top: 30px;
	}
	.add-to-list:hover{
		background-image: url(../../images/btnTianJiaFangAn-FaLiang.png)!important;
	}
	.sure-bet-list{
		cursor:pointer;
		height: 64px;
		width: 139px;
		background-image: url(../../images/btnQueRenTouZhu-PuTong.png);
		position: absolute;
    	left: 180px;
        margin-top: 30px;
	}
	.sure-bet-list:hover{
		background-image: url(../../images/btnQueRenTouZhu-FaLiang.png)!important;
	}
</style>