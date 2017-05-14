<template>
  <div id="right">
       <component :is="currentBetView">
       </component>
  </div>
</template>
<script lang="babel">
import lhcAll from './lhc/lhc-all'
import lhcTmsx from './lhc/lhc-tmsx'
import lhcDxds from './lhc/lhc-dxds'
import lhcTmsb from './lhc/lhc-tmsb'
    export default {

        components : {
          lhcAll,
          lhcTmsx,
          lhcDxds,
          lhcTmsb,
        },
        methods :{
        },
        computed : {
          currentBetView(){
            var lottery = this.$store.state.lottery.currentLottery
            var type = this.$store.state.lottery.playMethodType
            var gamePlayMethod = this.$store.state.lottery.gamePlayMethod
            if(lottery == 'cai14'){  
                if("lhc_tmsx" == gamePlayMethod){
                    return 'lhcTmsx'
                } else if("lhc_tmdxds" == gamePlayMethod){
                    return 'lhcDxds'
                } else if("lhc_tmsb" == gamePlayMethod){
                    return 'lhcTmsb'
                } else {
                    return 'lhcAll'
                }
            }
          },
        },

    }
</script>
<style scoped>

</style>