<template>
  <div class="dialogContent">
    <div class="firstTab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane name="lottery-change-record" label="团队彩票变帐记录"></el-tab-pane>
            <el-tab-pane name="chess-change-record" label="团队棋牌变帐记录"></el-tab-pane>
            <el-tab-pane name="person-change-record" label="团队真人类变帐记录"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="flowrecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const lotteryChangeRecord = resolve => {
    require.ensure(['./lottery-change-record'], () => {
      resolve(require('./lottery-change-record'))
    }, 'teamChange')
  }
  const chessChangeRecord  = resolve => {
    require.ensure(['./chess-change-record'], () => {
      resolve(require('./chess-change-record'))
    }, 'teamChange')
  }
  const personChangeRecord  = resolve => {
    require.ensure(['./person-change-record'], () => {
      resolve(require('./person-change-record'))
    }, 'teamChange')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      lotteryChangeRecord,
      chessChangeRecord,
      personChangeRecord,
    },
    data(){
      return {
        activeName: 'lottery-change-record',
      }
    },
    mounted () {
      this.setFlowrecordView('lottery-change-record')
    },
    beforeDestory() {
    },
    computed : {
      flowrecordView () {
        var flowrecord = this.$store.state.useraction.flowrecordView;
        if (flowrecord == 'lottery-change-record') {
          return "lotteryChangeRecord"
        } else if (flowrecord == 'chess-change-record') {
          return "chessChangeRecord"
        } else if (flowrecord == 'person-change-record') {
          return "personChangeRecord"
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
          case "lottery-change-record":
            this.setFlowrecordView('lottery-change-record')
            break
          case "chess-change-record":
            this.setFlowrecordView('chess-change-record')
            break
          case "person-change-record":
            this.setFlowrecordView('person-change-record')
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