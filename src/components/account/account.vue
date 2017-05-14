<template>
  <div class="dialog">
    <navmenu></navmenu>
    <component :is="firstView"></component>
  </div>
</template>
<script lang="babel">
  import navmenu from "../navmenu/navmenu.vue"
  const useraccount = resolve => {
    require.ensure(['./useraccount'], () => {
      resolve(require('./useraccount'))
    }, 'useraccount')
  }
  const safecenter = resolve => {
    require.ensure(['./safecenter'], () => {
      resolve(require('./safecenter'))
    }, 'safecenter')
  }
  const bankcard = resolve => {
    require.ensure(['./bankcard'], () => {
      resolve(require('./bankcard'))
    }, 'accountAdmin')
  }
  const gameBetRecord = resolve => {
    require.ensure(['../record/game-bet-record'], () => {
      resolve(require('../record/game-bet-record'))
    }, 'record')
  }
  const accountFlowRecord = resolve => {
    require.ensure(['../record/account-flow-record'], () => {
      resolve(require('../record/account-flow-record'))
    }, 'record')
  }
  const PersonalProfitLossRecord = resolve => {
    require.ensure(['../record/Personal-profitLoss-record'], () => {
      resolve(require('../record/Personal-profitLoss-record'))
    }, 'record')
  }
  const addMember = resolve => {
    require.ensure(['../team/add-member'], () => {
      resolve(require('../team/add-member'))
    }, 'team')
  }
  const memberList = resolve => {
    require.ensure(['../team/member-list'], () => {
      resolve(require('../team/member-list'))
    }, 'team')
  }
  const teamBet = resolve => {
    require.ensure(['../team/team-bet'], () => {
      resolve(require('../team/team-bet'))
    }, 'team')
  }
  const teamChange = resolve => {
    require.ensure(['../team/team-change'], () => {
      resolve(require('../team/team-change'))
    }, 'team')
  }
  const teamReport = resolve => {
    require.ensure(['../team/team-report'], () => {
      resolve(require('../team/team-report'))
    }, 'team')
  }
  const teamData = resolve => {
    require.ensure(['../team/team-data'], () => {
      resolve(require('../team/team-data'))
    }, 'team')
  }
  const teamDividend = resolve => {
    require.ensure(['../team/team-dividend'], () => {
      resolve(require('../team/team-dividend'))
    }, 'team')
  }
  const moneyIn = resolve => {
    require.ensure(['../fundmanage/money-in'], () => {
      resolve(require('../fundmanage/money-in'))
    }, 'fundmanage')
  }
  const moneyOut = resolve => {
    require.ensure(['../fundmanage/money-out'], () => {
      resolve(require('../fundmanage/money-out'))
    }, 'fundmanage')
  }
  const transfer = resolve => {
    require.ensure(['../fundmanage/transfer'], () => {
      resolve(require('../fundmanage/transfer'))
    }, 'fundmanage')
  }
  const inRecord = resolve => {
    require.ensure(['../fundmanage/in-record'], () => {
      resolve(require('../fundmanage/in-record'))
    }, 'fundmanage')
  }
  const outRecord = resolve => {
    require.ensure(['../fundmanage/out-record'], () => {
      resolve(require('../fundmanage/out-record'))
    }, 'fundmanage')
  }
  const transferRecord = resolve => {
    require.ensure(['../fundmanage/transfer-record'], () => {
      resolve(require('../fundmanage/transfer-record'))
    }, 'fundmanage')
  }
  import { mapActions } from 'vuex'
  export default {
    name : "account",
    components : {
      navmenu,
      useraccount,
      safecenter,
      bankcard,
      gameBetRecord,
      accountFlowRecord,
      PersonalProfitLossRecord,
      addMember,
      memberList,
      teamBet,
      teamChange,
      teamReport,
      teamData,
      teamDividend,
      moneyIn,
      moneyOut,
      transfer,
      inRecord,
      outRecord,
      transferRecord,
    },
    data(){
      return {
      }
    },
    mounted () {
      
    },
    computed : {
      firstView () {
        var first = this.$store.state.useraction.firstView;
        if (first == 'useraccount') {
          return "useraccount"
        } else if (first == 'safecenter') {
          return "safecenter"
        } else if (first == 'bankcard') {
          return "bankcard"
        } else if (first == 'game-bet-record') {
          return "gameBetRecord"
        } else if (first == 'account-flow-record') {
          return "accountFlowRecord"
        } else if (first == 'add-member') {
          return "addMember"
        } else if (first == 'member-list') {
          return "memberList"
        } else if (first == 'team-bet') {
          return "teamBet"
        } else if (first == 'team-change') {
          return "teamChange"
        } else if (first == 'team-report') {
          return "teamReport"
        } else if (first == 'team-data') {
          return "teamData"
        } else if (first == 'team-dividend') {
          return "teamDividend"
        } else if (first == 'Personal-profitLoss-record') {
          return "PersonalProfitLossRecord"
        } else if (first == 'money-in') {
          return "moneyIn"
        } else if (first == 'money-out') {
          return "moneyOut"
        } else if (first == 'transfer') {
          return "transfer"
        } else if (first == 'in-record') {
          return "inRecord"
        } else if (first == 'out-record') {
          return "outRecord"
        } else if (first == 'transfer-record') {
          return "transferRecord"
        }
      },
    },
    methods :{
      ...mapActions({
        setFirstView : 'setFirstView',
      }),
    },
    
    beforeRouteEnter (to, from, next) {
      next(vm => {
      })
    },

  }
</script>
<style scoped>
  .dialog {
    width: 1160px;
    height: 731px;
    border-radius: 10px !important;
    border: solid 1px #9393a2;
    border-left: none;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .1s ease 0;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>