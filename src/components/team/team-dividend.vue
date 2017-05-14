<template>
  <div class="dialogContent">
    <div class="firstTab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane name="team-dividend-data" label="当前分红数据"></el-tab-pane>
            <el-tab-pane name="team-dividend-day" label="团队分红日报"></el-tab-pane>
            <el-tab-pane name="team-dividend-month" label="团队分红月报"></el-tab-pane>
            <el-tab-pane name="team-dividend-members" label="团队分红会员"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="flowrecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const teamDividendData = resolve => {
    require.ensure(['./team-dividend-data'], () => {
      resolve(require('./team-dividend-data'))
    }, 'teamDividend')
  }
  const teamDividendDay  = resolve => {
    require.ensure(['./team-dividend-day'], () => {
      resolve(require('./team-dividend-day'))
    }, 'teamDividend')
  }
  const teamDividendMonth  = resolve => {
    require.ensure(['./team-dividend-month'], () => {
      resolve(require('./team-dividend-month'))
    }, 'teamDividend')
  }
  const teamDividendMembers  = resolve => {
    require.ensure(['./team-dividend-members'], () => {
      resolve(require('./team-dividend-members'))
    }, 'teamDividend')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      teamDividendData,
      teamDividendDay,
      teamDividendMonth,
      teamDividendMembers
    },
    data(){
      return {
        activeName: 'team-dividend-data',
      }
    },
    mounted () {
      this.setFlowrecordView('team-dividend-data')
    },
    beforeDestory() {
    },
    computed : {
      flowrecordView () {
        var flowrecord = this.$store.state.useraction.flowrecordView
        if (flowrecord == 'team-dividend-data') {
          return "teamDividendData"
        } else if (flowrecord == 'team-dividend-day') {
          this.activeName = "team-dividend-day"
          return "teamDividendDay"
        } else if (flowrecord == 'team-dividend-month') {
          return "teamDividendMonth"
        } else if (flowrecord == 'team-dividend-members') {
          return "teamDividendMembers"
        }
      },
    },
    methods :{
      ...mapActions({
        setFlowrecordView : 'setFlowrecordView',
      }),
      handleClick(tab){
        switch (tab.name) {
          case "team-dividend-data":
            this.setFlowrecordView('team-dividend-data')
            break
          case "team-dividend-day":
            this.setFlowrecordView('team-dividend-day')
            break
          case "team-dividend-month":
            this.setFlowrecordView('team-dividend-month')
            break
          case "team-dividend-members":
            this.setFlowrecordView('team-dividend-members')
            break
          default:
            break
        }
      },
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