<template>
  <div class="dialogContent translate3d-zero">
    <div class="firstTab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane name="lottery-record" class="lotteryRecord" label="彩票投注记录"></el-tab-pane>
            <el-tab-pane name="chess-record" label="棋牌游戏记录"></el-tab-pane>
            <el-tab-pane name="person-record" label="真人类游戏记录"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="gamerecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const lotteryRecord = resolve => {
    require.ensure(['./lottery-record'], () => {
      resolve(require('./lottery-record'))
    }, 'gameBetRecord')
  }
  const chessRecord  = resolve => {
    require.ensure(['./chess-record'], () => {
      resolve(require('./chess-record'))
    }, 'gameBetRecord')
  }
  const personRecord  = resolve => {
    require.ensure(['./person-record'], () => {
      resolve(require('./person-record'))
    }, 'gameRecord')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      lotteryRecord,
      chessRecord,
      personRecord,
    },
    data(){
      return {
        activeName: 'lottery-record',
      }
    },
    mounted () {
      this.setGamerecordView('lottery-record')
    },
    beforeDestory() {
    },
    computed : {
      gamerecordView () {
        var gamerecord = this.$store.state.useraction.gamerecordView;
        if (gamerecord == 'lottery-record') {
          return "lotteryRecord"
        } else if (gamerecord == 'chess-record') {
          return "chessRecord"
        } else if (gamerecord == 'person-record') {
          return "personRecord"
        }
      },
    },
    methods :{
      ...mapActions({
        setGamerecordView : 'setGamerecordView',
        setLotteryRecordView : 'setLotteryRecordView',
      }),
      handleClick(tab){
        console.log(tab)
        switch (tab.name) {
          case "lottery-record":
            this.setGamerecordView('lottery-record')
            this.setLotteryRecordView('lottery-bet-record')
            break
          case "chess-record":
            this.setGamerecordView('chess-record')
            break
          case "person-record":
            this.setGamerecordView('person-record')
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