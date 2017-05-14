<template>
    <div class="example">
        <el-popover
          ref="example"
          placement="top"
          trigger="hover"
          popper-class="eh-self-popper"
          :visible-arrow="false" :offset="250"
          >
            <div class="example-and-help example-and-help-content">
              <span>{{example}}</span>
            </div>
        </el-popover>

        <el-popover
          ref="help"
          placement="top"
          trigger="hover"
          popper-class="eh-self-popper"
          :visible-arrow="false" :offset="250"
          >
          <div class="example-and-help example-and-help-content">
            <span>{{help}}</span>
          </div>
        </el-popover>
        <span class="f-16 font-color-80 font-bold">玩法介绍：</span>
        <span v-show="showExample" class="example-bg f-14 example-img" v-popover:example>示例</span>
        <span v-show="showHelp" class="example-bg f-14 help-img" v-popover:help>帮助</span>
    </div>
</template>
<script lang="babel">

    import cai from './lottery-data'

    export default {

        name: "example",

        computed : {
            showExample(){
                var curLottery = this.$store.state.lottery.currentLottery
                var cail = ['cai4', 'cai5', 'cai8', 'cai9', 'cai10', 'cai13', 'cai14']
                if(cail.indexOf(curLottery) > -1){
                    return false
                }
                return true
            },
            showHelp(){
                var curLottery = this.$store.state.lottery.currentLottery
                var cail = ['cai14']
                if(cail.indexOf(curLottery) > -1){
                    return false
                }
                return true
            },

            example(){
                return  (this.getExamplAndHelp || {}).example
            },
            help(){
                return  (this.getExamplAndHelp || {}).help
            },

            getExamplAndHelp(){
                var curLottery = this.$store.state.lottery.currentLottery
                var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
                var playMethodType = this.$store.state.lottery.playMethodType

                if(curLottery && gamePlayMethod && playMethodType){
                    if(cai && cai[curLottery] && cai[curLottery].exapmleAndHelp[gamePlayMethod]){
                        return cai[curLottery].exapmleAndHelp[gamePlayMethod][playMethodType]
                    }
                }
            },
        }
    }

</script>
<style scoped>
.example-and-help-content {
    width: 605px;
    height: 72px;
    margin-top: -10px;
    margin-bottom: -35px;
    margin-left: -10px;
    margin-right: -20px;
    font-family: SimSun, 宋体, STSong, 华文宋体;
    font-size: 14px;
    color: #fff;
    padding-top: 6px;
    padding-left: 10px;
    line-height: 20px;
}
.example-and-help-content span {
    display: inline-block;
    width: 570px;
    margin-left: 5px;
}

</style>