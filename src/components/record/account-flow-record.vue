<template>
  <div class="dialogContent">
    <div class="firstTab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane name="lottery-flow-record" label="彩票变帐记录"></el-tab-pane>
            <el-tab-pane name="chess-flow-record" label="棋牌变帐记录"></el-tab-pane>
            <el-tab-pane name="person-flow-record" label="真人类变帐记录"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="flowrecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const lotteryFlowRecord = resolve => {
    require.ensure(['./lottery-flow-record'], () => {
      resolve(require('./lottery-flow-record'))
    }, 'accountFlowRecord')
  }
  const chessFlowRecord  = resolve => {
    require.ensure(['./chess-flow-record'], () => {
      resolve(require('./chess-flow-record'))
    }, 'accountFlowRecord')
  }
  const personFlowRecord  = resolve => {
    require.ensure(['./person-flow-record'], () => {
      resolve(require('./person-flow-record'))
    }, 'accountFlowRecord')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      lotteryFlowRecord,
      chessFlowRecord,
      personFlowRecord,
    },
    data(){
      return {
        activeName: 'lottery-flow-record',
      }
    },
    mounted () {
      this.setFlowrecordView('lottery-flow-record')
    },
    beforeDestory() {
    },
    computed : {
      flowrecordView () {
        var flowrecord = this.$store.state.useraction.flowrecordView;
        if (flowrecord == 'lottery-flow-record') {
          return "lotteryFlowRecord"
        } else if (flowrecord == 'chess-flow-record') {
          return "chessFlowRecord"
        } else if (flowrecord == 'person-flow-record') {
          return "personFlowRecord"
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
          case "lottery-flow-record":
            this.setFlowrecordView('lottery-flow-record')
            break
          case "chess-flow-record":
            this.setFlowrecordView('chess-flow-record')
            break
          case "person-flow-record":
            this.setFlowrecordView('person-flow-record')
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