<template>
  <div class="dialogContent">
    <div class="firstTab">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane name="team-data-msg" label="团队数据信息"></el-tab-pane>
            <el-tab-pane name="team-data-yk" label="团队数据盈亏日报"></el-tab-pane>
        </el-tabs>
    </div>
    <div>
        <component :is="flowrecordView"></component>
    </div>
  </div>
</template>
<script lang="babel">
  const teamDataMsg = resolve => {
    require.ensure(['./team-data-msg'], () => {
      resolve(require('./team-data-msg'))
    }, 'teamData')
  }
  const teamDataYk  = resolve => {
    require.ensure(['./team-data-yk'], () => {
      resolve(require('./team-data-yk'))
    }, 'teamData')
  }
  import { mapActions } from 'vuex'
  import $ from 'jquery'
  export default {
    components : {
      teamDataMsg,
      teamDataYk,
    },
    data(){
      return {
        activeName: 'team-data-msg',
      }
    },
    mounted () {
      this.setFlowrecordView('team-data-msg')
    },
    beforeDestory() {
    },
    computed : {
      flowrecordView () {
        var flowrecord = this.$store.state.useraction.flowrecordView;
        if (flowrecord == 'team-data-msg') {
          return "teamDataMsg"
        } else if (flowrecord == 'team-data-yk') {
          return "teamDataYk"
        }
      },
    },
    methods :{
      ...mapActions({
        setFlowrecordView : 'setFlowrecordView',
      }),
      handleClick(tab){
        switch (tab.name) {
          case "team-data-msg":
            this.setFlowrecordView('team-data-msg')
            break
          case "team-data-yk":
            this.setFlowrecordView('team-data-yk')
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