<template>
  <div class="dialogContent">
    <div class="firstTab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane name="team-bet-lottery" label="团队彩票投注记录"></el-tab-pane>
            <el-tab-pane name="team-bet-chess" label="团队棋牌投注记录"></el-tab-pane>
            <el-tab-pane name="team-bet-person" label="团队真人类投注记录"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="flowrecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const teamBetLottery = resolve => {
    require.ensure(['./team-bet-lottery'], () => {
      resolve(require('./team-bet-lottery'))
    }, 'teamBet')
  }
  const teamBetChess  = resolve => {
    require.ensure(['./team-bet-chess'], () => {
      resolve(require('./team-bet-chess'))
    }, 'teamBet')
  }
  const teamBetPerson  = resolve => {
    require.ensure(['./team-bet-person'], () => {
      resolve(require('./team-bet-person'))
    }, 'teamBet')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      teamBetLottery,
      teamBetChess,
      teamBetPerson,
    },
    data(){
      return {
        activeName: 'team-bet-lottery',
      }
    },
    mounted () {
      this.setFlowrecordView('team-bet-lottery')
    },
    beforeDestory() {
    },
    computed : {
      flowrecordView () {
        var flowrecord = this.$store.state.useraction.flowrecordView;
        if (flowrecord == 'team-bet-lottery') {
          return "teamBetLottery"
        } else if (flowrecord == 'team-bet-chess') {
          return "teamBetChess"
        } else if (flowrecord == 'team-bet-person') {
          return "teamBetPerson"
        }
      },
    },
    methods :{
      ...mapActions({
        setFlowrecordView : 'setFlowrecordView',
        setLotteryRecordView : 'setLotteryRecordView',
      }),
      handleClick(tab){
        console.log(tab)
        switch (tab.name) {
          case "team-bet-lottery":
            this.setFlowrecordView('team-bet-lottery')
            break
          case "team-bet-chess":
            this.setFlowrecordView('team-bet-chess')
            break
          case "team-bet-person":
            this.setFlowrecordView('team-bet-person')
            break
          default:
            break
        }
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