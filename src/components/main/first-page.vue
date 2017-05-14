<template>
    <div class="first-page">
        <ad-slide></ad-slide>
        <user-information></user-information>
        <opt-type></opt-type>
        <notice></notice>
        <game-nav></game-nav>
    </div>
</template>
<script>
    import adSlide from "./ad-slide.vue"
    import userInformation from "./user-information.vue"
    import optType from "./opt-type.vue"
    import notice from "./notice.vue"
    import gameNav from "./game-nav.vue"
    export default {
        name:"firstPage",
        data(){
            return {

            }
        },
        components : {
            adSlide,
            userInformation,
            optType,
            notice,
            gameNav,
        }

    }
</script>
<style scoped>
    .first-page {
        width: 1208px;
        height: 1080px;
        margin: 20px auto;
    }
</style>