<template>
    <table class="lhcHm" width="845px" border="0" cellspacing="0" cellpadding="0">
        <colgroup><col width="50%"><col width="50%"></colgroup>
        <tbody>
            <tr ref="selBar">
                <td v-for="item in mainData">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr class="lhc-table-head f-16">
                                <th class="td1">生肖</th><th class="td2">赔率</th><th class="td3">金额</th><th class="td4">号码</th>
                            </tr>
                            <tr v-for="type in item" class="lhc-table-body">
                                <td><span class="lhcSx f-16 lhcSx-bg"><span class="m-l-20">{{type.name | lhcsx}}</span></span></td>
                                <td class="bonusxs f-18 t-a-c">{{type.bonus}}</td>
                                <td class="t-a-c"><span class="lhc_sxtxt"><input type="text" :name="type.name" @keyup="action"></span></td>
                                <td class="t-a-l">
                                <span class="lhc_sxnum " v-for="num in type.value" :class="lhcBackImg(num)">{{num}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
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
        this.clear()
        this.$root.$on("clear_number", this.clear)
        this.getBonus()

    },
    beforeDestroy(){
        this.$root.$off("clear_number", this.clear)
    },

    data(){
        return {
            mainData : null,
            lhcData : {},
            bonus : null
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
            var left = []
            var right = []
            var data = []
            var that = this
            var shu = {
                name : "shu",
                value : that.lhcData.shu,
                bonus : that.bonus["shu"]
            }
            var hu = {
                name : "hu",
                value : that.lhcData.hu,
                bonus : that.bonus["hu"]
            }
            var long = {
                name : "long",
                value : that.lhcData.long,
                bonus : that.bonus["long"]
            }
            var ma = {
                name : "ma",
                value : that.lhcData.ma,
                bonus : that.bonus["ma"]
            }
            var hou = {
                name : "hou",
                value : that.lhcData.hou,
                bonus : that.bonus["hou"]
            }
            var gou = {
                name : "gou",
                value : that.lhcData.gou,
                bonus : that.bonus["gou"]
            }
            var niu = {
                name : "niu",
                value : that.lhcData.niu,
                bonus : that.bonus["niu"]
            }
            var tu = {
                name : "tu",
                value : that.lhcData.tu,
                bonus : that.bonus["tu"]
            }
            var she = {
                name : "she",
                value : that.lhcData.she,
                bonus : that.bonus["she"]
            }
            var yang = {
                name : "yang",
                value : that.lhcData.yang,
                bonus : that.bonus["yang"]
            }
            var ji = {
                name : "ji",
                value : that.lhcData.ji,
                bonus : that.bonus["ji"]
            }
            var zhu = {
                name : "zhu",
                value : that.lhcData.zhu,
                bonus : that.bonus["zhu"]
            }
            left.push(shu)
            left.push(hu)
            left.push(long)
            left.push(ma)
            left.push(hou)
            left.push(gou)

            right.push(niu)
            right.push(tu)
            right.push(she)
            right.push(yang)
            right.push(ji)
            right.push(zhu)

            data.push(left)
            data.push(right)
            
            this.mainData = data
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
        //判断颜色
        lhcBackImg(value){
            // debugger
            for(var color in this.lhcData.hongbo){
                if(this.lhcData.hongbo[color] == value){
                    return 'red'
                }
            }
            for(var bluecolor in this.lhcData.lanbo){
                if(this.lhcData.lanbo[bluecolor] == value){
                    return 'blue'
                }
            }
            for(var greencolor in this.lhcData.lvbo){
                if(this.lhcData.lvbo[greencolor] == value){
                    return 'green'
                }
            }
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
    .gf-main {
        padding-top: 5px;
    }
    .m-l-20 {
        margin-left: 20px;
    }
    .m-r-15 {
        margin-right: 18px;
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
    .lhcSx{
        display: inline-block;
        width: 64px;
        height: 29px;
        line-height: 29px;
        color: white;
        font-weight: bold;
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
    }
    .bonusxs{
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-weight: bold;
    }
    .lhc_sxtxt{
        display: inline-block;
        width: 80px;
        height: 30px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        background-color: white;
    }
    .lhc_sxtxt input{
        text-align: right;
        float: left;
        border: none;
        width: 70px;
        height: 30px;
        color: #3d3d3d;
        font-weight: bold;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-size: 20px;
    }
    .lhc_sxnum{
        display: inline-block;
        height: 40px;
        width: 38px;
        line-height: 37px;
        margin-left: 3px;
        text-align: center;
        color: white;
    }
    .lhc-table-body{
        height: 60px;
    }
    .td1{
        width: 70px;
    }
    .td2{
        width: 50px;
    }
    .td3{
        width: 90px;
    }
    .td4{
        width: 200px;
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
</style>