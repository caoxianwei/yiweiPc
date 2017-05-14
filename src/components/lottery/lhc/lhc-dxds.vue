<template>
    <table class="lhcHm" width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody ref="selBar">
            <tr class="lhc-table-head f-16">
                <th class="td1">玩法</th><th class="td2">赔率</th><th class="td3">金额</th><th></th>
            </tr>
            <tr v-for="item in mainData" class="lhc-table-body">
                <td class="td1"><span class="lhcSx f-16 lhcSx-bg"><span class="m-l-20">{{item.cname}}</span></span></td>
                <td class="td2 bonusxs f-16 t-a-c">{{item.bonus}}</td>
                <td class="td3"><span class="lhc_txt"><input :name="item.value" type="text" @keyup="action"></span></td>
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

    mounted() {
        this.clear()
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
            mainData :
            [
                {name : "da",cname : "大",value:"09", bonus: ""},
                {name : "xiao",cname : "小",value:"01", bonus: ""},
                {name : "dan",cname : "单",value:"03", bonus: ""},
                {name : "shuang",cname : "双",value:"02", bonus: ""}
            ],
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
        getBonus(){
            api.ajax('lottery/type/findBonusLHC', {})
            .then(data => {
                if(data && data.code == '0'){
                   this.bonus = data.data
                   this.setBonus()
                } else {
                    errorMsg(data.msg)
                }
            }, error => {
                errorMsg("系统出错，请稍后重试")
            })
        },
        setBonus(){
            this.mainData.forEach((element, index) => {
                element.bonus = this.bonus["dxds"]
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
    .lhcSx{
        display: inline-block;
        width: 64px;
        height: 29px;
        line-height: 29px;
        color: white;
        font-weight: bold;
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
    }
    .td1{
        width: 70px;
    }
    .td2{
        width: 150px;
    }
    .td3{
        width: 90px;
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
    .lhc-table-body{
        height: 50px;
    }
</style>