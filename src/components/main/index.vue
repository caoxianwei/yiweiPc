<template>
    <div class="container container-bg container-bg-color">
      <top></top>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      <separate></separate>
      <foot></foot>
    </div>
</template>
<script lang="babel">
    import foot from '../footer/index.vue'
    import separate from '../footer/separate.vue'
    import top from "../top/top.vue"
	export default {
    name : "main",
    data(){
        return {

        }
    },
    components : {
        foot,top,separate
    }
   }
</script>
<style scoped>
	.container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    .fade-enter-active, .fade-leave-active {
      transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
      opacity: 0;
    }
</style>
