<template>
    <div class="logos">
        <img v-if="currentLottery == 'cai1'" src="../../images/cai/cai1.png">
        <img v-if="currentLottery == 'cai2'" src="../../images/cai/cai2.png">
        <img v-if="currentLottery == 'cai3'" src="../../images/cai/cai3.png">
        <img v-if="currentLottery == 'cai4'" src="../../images/cai/cai4.png">
        <img v-if="currentLottery == 'cai5'" src="../../images/cai/cai5.png">
        <img v-if="currentLottery == 'cai6'" src="../../images/cai/cai6.png">
        <img v-if="currentLottery == 'cai7'" src="../../images/cai/cai7.png">
        <img v-if="currentLottery == 'cai8'" src="../../images/cai/cai8.png">
        <img v-if="currentLottery == 'cai9'" src="../../images/cai/cai9.png">
        <img v-if="currentLottery == 'cai10'" src="../../images/cai/cai10.png">
        <img v-if="currentLottery == 'cai11'" src="../../images/cai/cai11.png">
        <img v-if="currentLottery == 'cai12'" src="../../images/cai/cai12.png">
        <img v-if="currentLottery == 'cai13'" src="../../images/cai/cai13.png">
        <img v-if="currentLottery == 'cai14'" src="../../images/cai/cai14.png">
        <img v-if="currentLottery == 'cai15'" src="../../images/cai/cai15.png">
    </div>
</template>
<script>
    export default {
        name : "lottery-logo",
        computed : {
            currentLottery(){
                return this.$store.state.lottery.currentLottery
            }
        }
    }
</script>
<style scoped>
    .logos{
        position: absolute;
        top: 10px;
        left: 48px;
    }
    img {
        width: 134px;
        height: 108px;
    }
</style>