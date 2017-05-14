<template>
	<div class="Detailbox">
		<div class="box_top">
			<table width="100%" border="0" cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td>追号编号</td>
						<td>{{followData.id}}</td>
						<td>游戏用户</td>
						<td>{{followData.username}}</td>
						<td>追号时间</td>
						<td>{{followData.addTime}}</td>
					</tr>
					<tr>
						<td>游戏</td>
						<td>{{followData.className}}</td>
						<td>玩法</td>
						<td>{{followData.typeName}}</td>
						<td>模式</td>
						<td>
							<span v-if="followData.singleMoney >= 1">{{followData.multiple}}倍. 元</span>
							<span v-if="followData.singleMoney == 0.2">{{followData.multiple}}倍. 角</span>
							<span v-if="followData.singleMoney == 0.02">{{followData.multiple}}倍. 分</span>
						</td>
					</tr>
					<tr>
						<td>开始期号</td>
						<td>{{followData.ksActivityName}}</td>
						<td>追号期数</td>
						<td>{{followData.actCount}}</td>
						<td>完成期数</td>
						<td>{{followData.kjCount}}</td>
					</tr>
					<tr>
						<td>取消期数</td>
						<td>{{followData.cancelCount}}</td>
						<td>追号总金额</td>
						<td><span v-text="followData.amount"></span></td>
						<td>完成金额</td>
						<td><span v-text="followData.kjMoney"></span></td>
					</tr>
					<tr>
						<td>中奖期数</td>
						<td>{{followData.bingoCount}}</td>
						<td>派奖总金额</td>
						<td><span v-text="followData.bingoMoney"></span></td>
						<td>取消金额</td>
						<td><span v-text="followData.cancelMoney"></span></td>
					</tr>
					<tr>
						<td>中奖后停止追号</td>
						<td><span v-text="followData.isBingoStop==true? '是' : '否'"></span></td>
						<td> </td>
						<td> </td>
						<td>追号状态</td>
						<td><span v-text="followData.state ==1 ? '是' : '否'"></span></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="box_content">
			<div class="box_content-title">追号内容</div>
			<textarea disabled v-if="followData.typeName =='前二大小单双'" v-text="filter(followData.orderValue)"></textarea>
			<textarea disabled v-if="followData.typeName =='后二大小单双'" v-text="filter(followData.orderValue)"></textarea>
			<textarea disabled v-if="followData.typeName =='特码大小单双'" v-text="filter(followData.orderValue)"></textarea>
			<textarea disabled v-if="followData.typeName !='前二大小单双' && followData.typeName !='特码大小单双' && followData.typeName !='后二大小单双'" v-text="followData.orderValue"></textarea>
		</div>
		<div class="grey_box_top">
			<div class="grey_box_bottom">
				<div class="grey_box_tit">追号列表</div>
				<div class="scroll"  ref="IPAddressList">
				<table id="theTable" width="100%" border="0" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>奖期</th>
							<th>追号倍数</th>
							<th>追号状态</th>
							<th>操作</th>
						</tr>	
					</thead>
					<tbody>
						<tr v-for="item in followData.list">
							<td>{{item.numTitle}}</td>
							<td>{{item.multiple}}</td>
							<td>
                                <span v-if="item.bingoFlag == 0" class="isBingoRed">未开奖</span>
                                <span v-if="item.bingoFlag == 1" class="isBingoRed">已中奖</span>
                                <span v-if="item.bingoFlag == 2" class="isBingoGreen">未中奖</span>
                                <span v-if="item.bingoFlag == 3" class="isBingoRed">中奖停追</span>
                                <span v-if="item.bingoFlag == 4" class="isBingoGrey">已撤单</span>
							</td>
							<td><a @click.stop="openDialog(item.id)">详情</a> <a @click.stop="cancelorder(item.id)" v-if="item.bingoFlag == 0" style="text-decoration:underline">撤单</a></td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="babel">
	import api from '../../api'
	import { succMsg,errorMsg,exchange } from '../../tools/command'
	import { mapActions } from 'vuex'
	import jquery from 'jquery'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    import orderDetail from "./order-detail.vue"
	export default {
		components : {
            orderDetail
        },
		data () {
			return {
				followData: {},
				form: {
					followId: '50'
				},
			}
		},
		mounted() {
			jquery(this.$refs.IPAddressList).mCustomScrollbar()
			this.$root.$on("follow-detail-init",this.getFollowData)
		},
		beforeDestroy () {
			this.$root.$off("follow-detail-init",this.getFollowData)
		},
		methods: {
			...mapActions({
                setLotteryOrderId : 'setLotteryOrderId',
                setLotteryDialogView : 'setLotteryDialogView',
            }),
			async getFollowData(){
				this.form.followId = this.$store.state.useraction.lotteryOrderId;
                var followData = await api.ajax('order/findFollowDetail', this.form)
                if(followData && followData.code == '0'){
                    this.followData = followData.data
                } else {
                    errorMsg(followData.msg)
                }
            },
            openDialog(id){
                this.setLotteryOrderId(id);
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("order-detail-init")
                })
                this.setLotteryDialogView('order-detail')
            },
            async cancelOrder(id) {
            	this.form.orderId = id;
                var cancelOrderData = await api.ajax('order/cancel', this.form)
                if(cancelOrderData && cancelOrderData.code == '0'){
                    succMsg(cancelOrderData.msg)
                } else {
                    errorMsg(cancelOrderData.msg)
                }
            },
            filter (val) {
                return exchange(val)
            },
		},
	}
</script>
<style scoped>
	.Detailbox {
	    font-size: 14px;
	    font-family: SimSun, 宋体, STSong, 华文宋体;
	    color: #65646a;
	    background-color: #f6f9fd;
    	border-bottom-left-radius: 5px;
    	border-bottom-right-radius: 5px;
    	border: solid 1px #676770;
    	border-top: none;
	}
	.grey_box_top {
    	background:url(../../images/grey_box_top.png) top left repeat-x #eee; 
    	border-bottom-left-radius: 5px;
    	border-bottom-right-radius: 5px;
    	border-top: none;
	}
	.grey_box_bottom {
    	background:url(../../images/grey_box_bottom.png) bottom left repeat-x; 
    	border-bottom-left-radius: 5px;
    	border-bottom-right-radius: 5px;
    	border-top: none;
	}
	.box_top table td {
	    height: 25px;
	    padding: 0 5px;
	    border-bottom: solid 1px #eee;
	}
	.box_top table td:nth-child(2n) {
	   text-align: right;
	   color: #212123;
	   border-right: solid 1px #eee;
	}
	.box_content {
    	padding: 10px 0 10px 15px;
	}
	.box_content-title {
		position: relative;
		bottom: 50px;
		display: inline-block;
	}
	.box_content textarea {
		width: 445px;
		height: 112px;
		border-color: #e1e1eb;
		resize: none;
		outline: none;
		background-color: #fff;
	}
	.grey_box_tit {
	    height: 30px;
    	line-height: 30px;
    	font-weight: bold;
    	text-align: center;
	}
	.scroll {
		height: 159px;
		border-bottom-left-radius: 5px;
    	border-bottom-right-radius: 5px;
    	border-top: none;
	}
	#theTable {
	    overflow: hidden;
	    text-align: center;
	}
	#theTable thead tr {
	    height: 30px;
	}
	#theTable thead tr th {
	    height: 30px;
	    line-height: 30px;
	    font-size: 12px;
	    font-weight: normal;
	    white-space: nowrap;
	    border-bottom: solid 1px #e1e1e1;
	    background: url(../../images/thBg.png) right top no-repeat;
	}
	#theTable td {
	    height: 30px;
	    line-height: 30px;
	    font-size: 12px;
	    white-space: nowrap;
	    background: url(../../images/tableLine.gif) right top repeat-y;
	}
	#theTable td a {
        text-decoration: underline;
    }
	#theTable td a:hover {
        color: #ec0000;
        cursor: pointer;
    }
	#theTable>tbody>tr:nth-child(2n) {
        background: #f7f7f7;
    }
    #theTable>tbody>tr:hover {
        background: lightgrey;
    }
    .isBingoRed {
        color: #f00;
        font-weight: bold;
    }
    .isBingoGreen {
        color: #090;
        font-weight: bold;
    }
    .isBingoGrey {
        color: #888;
        font-weight: bold;
    }
</style>