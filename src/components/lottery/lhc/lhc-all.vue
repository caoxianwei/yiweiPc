<template>
    <table class="lhc_table" border="0" cellspacing="0" cellpadding="0">
        <tbody ref="selBar">
            <td v-for="item in mainData" class="table-td-padding" valign="top">
                <th class="lhc-table-head t-a-l f-16"><span class="m-r-42">号码</span>金额</th>
                <tr v-for="elem in item">
                    <th class="lhc-input-box p-r">
                        <div class="lhc_txt t-a-r"><input class="lhc-input-txt f-20 t-a-r" maxlength="6" :name="elem.value" type="text" @keyup="action"></div>
                        <span class="lhc_round t-a-c f-18" :class="elem.color">{{elem.intValue}}</span>
                        <span class="lhc-peilv f-16">X{{lhcpeilv}}</span>
                    </th>
                </tr>
            </td>
        </tbody>
    </table>
</template>
<script lang="babel">
import api from '../../../api'
import cai from '../lottery-data'
import { mapActions } from 'vuex'
import { errorMsg,succMsg,lpad } from '../../../tools/command'
import lotteryType from '../order-type-constants'
export default {

    mounted(){
        this.clear()
        this.$root.$on("clear_number", this.clear)
        this.findNumLHC()
    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
    },

    data(){
        return {
            showSelectUnit : false,
            headData : [1,2,3,4,5,6,7],
            mainData : [],
            lhcData : '',
            lhcpeilv: '',
        }
    },
    computed : {
    },

    methods : {
        ...mapActions({
           setSelected : 'setSelected',
           setLhcPeiLv : 'setLhcPeiLv',
           clearSelected : 'clearSelected',
        }),
        action(event){
            var srcElem = event.target
            var data = {
                name : '',
                selected : [],
            }
            data.name = srcElem.getAttribute("name")
            if(srcElem.value.trim()){
                var ss = /\D/g
                srcElem.value = srcElem.value.trim().replace(ss,'')
                if(srcElem.value){
                    srcElem.value = parseInt(srcElem.value)
                    if(srcElem.value > 0){
                        data.selected.push(srcElem.value)
                    } else {
                        srcElem.value = ''
                    }
                }
            }
            this.setSelected(data)
            var that = this
            this.$nextTick(function () {
                that.$root.$emit("bettingLHC")
            })
        },
        clear(){
            var selBar = this.$refs.selBar
            if(selBar){
                var all = selBar.querySelectorAll('input')
                var allArray = Array.from(all)
                if(allArray && allArray.length > 0){
                    allArray.forEach( function(element, index) {
                        if(element.value){
                            element.value = ''
                        }
                    })
                }
            }
            this.clearSelected()
        },
        numBarData(){
            var item = []
            var data = []
            for(var i = 1;i <= 49;++i) {
                var elem = {}
                var v = lpad(i+'', 2, "0")
                elem.intValue = i
                elem.value = v
                if(this.lhcData.hongbo.indexOf(v) > -1){
                    elem.color  = "red"
                } else if(this.lhcData.lvbo.indexOf(v) > -1){
                    elem.color  = "green"
                } else if(this.lhcData.lanbo.indexOf(v) > -1){
                    elem.color  = "blue"
                }
                item.push(elem)

                if( i%10 === 0 || i==49){
                    data.push(item)
                    item = []
                }
            }
            this.mainData = data
        },
        async findNumLHC(){
            var data = await api.ajax('lottery/type/findNumLHC', {})
            if(data && data.code == '0'){
                this.lhcData = data.data
                this.numBarData()
                this.getOdds()
            } else {
                errorMsg(data.msg)
            }
        },
        async getOdds(){
            var curLottery = this.$store.state.lottery.currentLottery
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            var playMethodType = this.$store.state.lottery.playMethodType
            var lotteryTypeValue = lotteryType[curLottery][gamePlayMethod][playMethodType]
            var param = {classId : curLottery.slice(3), typeId : lotteryTypeValue}
            var data = await api.ajax('lottery/type/findBonus', param)
            if(data && data.code == '0'){
               this.lhcpeilv = data.data.minBonus
               this.setLhcPeiLv(this.lhcpeilv)
            } else {
                errorMsg(data.msg)
            }
        },
    },

}
    
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .gf-main {
        padding-top: 5px;
    }
    .m-l-10 {
        margin-left: 10px;
    }
    .m-l-20 {
        margin-left: 20px;
    }
    .m-r-42 {
        margin-right: 42px;
    }
    .t-a-l {
        text-align: left;
    }
    .t-a-r {
        text-align: right;
    }
    .lhc_table{
        margin-left: 20px;
        width: 97%;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    input {
        outline: none;
    }
    .lhc-table-head{
        height: 30px;
        line-height: 30px;
        width: 212px;
        font-weight: bold;
        color: #656565
    }
    .lhc_round{
        display: inline-block;
        height: 40px;
        width: 38px;
        line-height: 37px;
        font-weight: bold;
        position: absolute;
        left: 0px;
        bottom: 0px;
        color: #ffffff;
    }
    .red{
        background-image: url(../../../images/imgHong-XiaZhuTuBiao.png);
        background-repeat: no-repeat;
    }
    .green{
        background-image: url(../../../images/imgLv-XiaZhuTuBiao.png);
        background-repeat: no-repeat;
    }
    .blue{
        background-image: url(../../../images/imgLan-XiaZhuTuBiao.png);
        background-repeat: no-repeat;
    }
    .lhc_txt{
        background-color: white;
        width: 100px;
        height: 30px;
        position: absolute;
        left: 20px;
        bottom: 5px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
    }
    .lhc-input-txt{
        width: 65px;
        margin-right: 15px;
        border: none;
        height: 30px;
        color: #3d3d3d;
        font-weight: bold;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    .lhc-input-box{
        height: 48px;
    }
    .table-td-padding{
        padding-top: 0;
    }
    .lhc-peilv{
        position: absolute;
        right: 13px;
        top: 18px;
        font-weight: bold;
        color: #a2a2a2;
    }
</style>