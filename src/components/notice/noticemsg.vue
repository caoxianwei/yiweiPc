<template>
    <div class="dialog">
        <noticemsg-nav></noticemsg-nav>
        <div class="dialogContent">
           <noticenew></noticenew>
        </div>  
    </div>
</template>
<script lang="babel">
    import noticemsgNav from './noticemsg-nav'
    import { mapActions } from 'vuex'
    const noticenew = resolve => {
        require.ensure(['./noticenew'], () => {
        resolve(require('./noticenew'))
        }, 'notice')
    }
    export default {
        name: "email",
	    components : {
	      noticemsgNav,
          noticenew
	    },
        mounted () {
           
        },
        beforeDestroy () {

        },
        data(){
            return {
                showNews: [],
                newsList: [],
                toptitle: {},
                titles:[],
                newsIndex: 0,
            }
        },
        computed :{
            currentBetView(){
                var first = this.$store.state.useraction.firstView;
                if (first == 'email-1' || first == 'email-2' || first == 'email-3') {
                    return "noticenew"
                }
            },
        },
        watch : {
        },
        methods :{
        }
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
</style>