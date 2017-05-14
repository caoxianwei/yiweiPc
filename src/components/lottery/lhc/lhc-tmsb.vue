<template>
    <table class="lhcHm" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody ref="selBar">
            <tr class="lhc-table-head f-16">
                <th class="td1">玩法</th><th class="td2">赔率</th><th class="td3">金额</th><th class="td4">号码</th>
            </tr>
            <tr v-for="(item, index) in mainData" class="lhc-table-body">
                <td class="td1"><span class="lhcSx f-16" :class="item.value"><span class="m-l-13">{{item.cname}}</span></span></td>
                <td class="td2 bonusxs f-18 t-a-c">{{item.bonus}}</td>
                <td class="td3"><span class="lhc_txt"><input :name="item.value" type="text" @keyup="action"></span></td>
                <td class="td4 t-a-l">
                    <span class="lhc_round t-a-c" :class="item.name" v-for="num in item.num">{{num}}</span>
                </td>
                <img v-if="index != 0" src="../../../images/imgSeBoFenGeXian.png" class="lhc-gexian">
            </tr>
        </tbody>
    </table>
</template>
<script lang="babel">
import api from '../../../api'
import cai from '../lottery-data'
import { mapActions } from 'vuex'
import { errorMsg,succMsg,lpad } from '../../../tools/command'
export default {

    mounted(){
        this.$root.$on("clear_number", this.clear)
        this.getBonus()
    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
    },
    
    components : {
    },

    updated(){
    },

    data(){
        return {
            mainData : null,
            lhcData : null,
            bonus : null,
        }
    },

    methods : {
        ...mapActions({
           setSelected : 'setSelected',
           clearSelected : 'clearSelected',
        }),
        action(event){
            var srcElem = event.target
            var data = {
                name : '',
                selected : []
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
            var curLottery = this.$store.state.lottery.currentLottery
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            var hongboBonus = this.bonus["hongbo"]
            var lanboBonus = this.bonus["lanbo"]
            var lvboBonus = this.bonus["lvbo"]
            this.mainData =  [
                {name : "red",cname : "红波", value:"hongbo", num : this.lhcData.hongbo, bonus : hongboBonus},
                {name : "blue",cname : "蓝波", value:"lanbo", num : this.lhcData.lanbo, bonus : lanboBonus},
                {name : "green",cname : "绿波", value:"lvbo", num : this.lhcData.lvbo, bonus : lvboBonus},
            ]
        },
        findNumLHC(){
            api.ajax('lottery/type/findNumLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.lhcData = data.data
                   this.numBarData()
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
        getBonus(){
            api.ajax('lottery/type/findBonusLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.bonus = data.data
                   this.findNumLHC()
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
    },
    computed : {

    }
}
    
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
    }
    .m-l-13 {
        margin-left: 13px;
    }
    .t-a-l {
        text-align: left;
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
    .lhc_txt{
        display: inline-block;
        height: 30px;
        width: 100px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        background-color: white;
    }
    .lhc_txt input{
        text-align: right;
        float: left;
        border: none;
        width: 90px;
        height: 30px;
        font-weight: bold;
        color: #3d3d3d;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-size: 20px;
    }
    .bonusxs{
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-weight: bold;
    }
    .td1{
        width: 70px;
    }
    .td2{
        width: 70px;
    }
    .td3{
        width: 90px;
    }
    .lhcSx{
        display: inline-block;
        width: 79px;
        height: 62px;
        line-height: 62px;
        color: white;
        font-weight: bold;
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
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
    .lhc_round{
        display: inline-block;
        height: 40px;
        width: 38px;
        line-height: 37px;
        color: #ffffff;
        margin-left: 5px;
    }
    .hongbo{
        background-image: url(../../../images/imgHongBoBg.png);
        background-repeat: no-repeat;
    }
    .lanbo{
        background-image: url(../../../images/imgLanBoBg.png);
        background-repeat: no-repeat;
    }
    .lvbo{
        background-image: url(../../../images/imgLvBoBg.png);
        background-repeat: no-repeat;
    }
    .lhc-table-body{
        position: relative;
        height: 105px;
    }
    .lhc-gexian{
        position: absolute;
        /*top: 0px;*/
        left: 79px;
    }
</style>