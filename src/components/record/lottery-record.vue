<template>
  <div class="firstTab">
    <div class="secondTab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="lottery-bet-record" class="lotteryBetBtn" label="彩票投注记录"></el-tab-pane>
            <el-tab-pane name="lottery-follow-record" label="彩票追号记录"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="lotteryRecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const lotteryBetRecord = resolve => {
    require.ensure(['./lottery-bet-record'], () => {
      resolve(require('./lottery-bet-record'))
    }, 'lotteryRecord')
  }
  const lotteryFollowRecord  = resolve => {
    require.ensure(['./lottery-follow-record'], () => {
      resolve(require('./lottery-follow-record'))
    }, 'lotteryRecord')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      lotteryBetRecord,
      lotteryFollowRecord,
    },
    data(){
      return {
        activeName: 'lottery-bet-record',
      }
    },
    mounted () {
      this.$root.$on("changeActiveNameBet", this.changeActiveNameBet)
      this.$root.$on("changeActiveNameFollow", this.changeActiveNameFollow)
      this.setLotteryRecordView('lottery-bet-record')
    },
    beforeDestory() {
      this.$root.$off("changeActiveNameBet", this.changeActiveNameBet)
      this.$root.$off("changeActiveNameFollow", this.changeActiveNameFollow)
      this.setOpenRecordType(false)
    },
    computed : {
      lotteryRecordView () {
        var lotteryRecord = this.$store.state.useraction.lotteryRecordView;
        if (lotteryRecord == 'lottery-bet-record') {
          return "lotteryBetRecord"
        } else if (lotteryRecord == 'lottery-follow-record') {
          return "lotteryFollowRecord"
        }
      },
    },
    methods :{
      ...mapActions({
        setLotteryRecordView : 'setLotteryRecordView',
      }),
      handleClick(tab){
        console.log(tab)
        switch (tab.name) {
          case "lottery-bet-record":
            this.setLotteryRecordView('lottery-bet-record')
            break
          case "lottery-follow-record":
            this.setLotteryRecordView('lottery-follow-record')
            break
          default:
            break
        }
      },
      changeActiveNameBet() {
        this.activeName = 'lottery-bet-record'
      },
      changeActiveNameFollow() {
        this.activeName = 'lottery-follow-record'
      },
    },
    
    beforeRouteEnter (to, from, next) {
      next(vm => {
      })
    },


  }
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: all .1s ease 0;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>