<template>
<div class="game-nav-cls">
  <div class="game-tab-left"></div>
  <div class="p-a lottery-gn" v-show="lottery"><lottery></lottery></div>
  <div class="p-a qpgame-gn" v-show="qpgame"><qpgame></qpgame></div>
  <div class="p-a dianzi-gn" v-show="dianzi"><qpgame></qpgame></div>
  <div class="p-a zhenren-gn" v-show="zhenren"><qpgame></qpgame></div>
  <div class="game-tab-bottom"></div>
</div>
</template>
<script lang="babel">
  import lottery from './lottery'
  import qpgame from './qpgame'
  import $ from 'jquery'
  export default {
      name: "game-nav",
      data(){
          return {
              lottery : true,
              qpgame : false,
              dianzi : false,
              zhenren : false,
              animateTime : 600
          }
      },
      components : {
        lottery, qpgame
      },
      computed: {
        gameView () {
            return this.$store.state.useraction.gameNav
        },
      },
      mounted: function () {
          
      },
      methods : {
        switchAnimate(val, older){
          this[val] = true
          var cur = $("."+val+"-gn")
          var old = $("."+older+"-gn")
          cur.css({
            marginLeft: '-1201px',
            zIndex : "99"
          })
          cur.animate({
              marginLeft: "0"
          },this.animateTime,()=> {
              this[older] = false
              cur.css({
                marginLeft: '',
                zIndex : '',
              })
          })
        }
        
      },
      watch : {
         "gameView" : function(val, old){
            this.switchAnimate(val, old)
         }
      }
  }
</script>
<style scoped>
  .game-nav-cls {
    position: relative;
    width: 1207px;
    height: 380px;
    overflow: hidden;
  }
  
</style>