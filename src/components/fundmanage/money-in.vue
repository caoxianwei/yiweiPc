<template>
    <div class="dialogContent">
        <div class="money-in-main">
           <a href="http://route.yinhu3399.me:17369/Route.aspx?ModID=6&Username=liweifeng002" target="_blank"></a>
        </div>
    </div>
</template>
<script lang="babel">
	export default {
        methods :{
            handleClick(tab){
                console.log(tab)
            },
        }

    }
</script>
<style scoped>
    .dialogContent {
        background-color: #eeeeee;
    }
    .money-in-main {
        width: 999px;
        height: 546px;
        background: url(../../images/cz_bg.png) no-repeat;
        background-size: cover;
        border-top-right-radius: 10px;
    }
    .money-in-main > a {
        width: 270px;
        height: 69px;
        float: left;
        margin-top: 300px;
        margin-left: 340px;
        background: url(../../images/cz_btn.png) -270px 0px no-repeat;
        display: block;
        cursor: pointer;
    }
    .money-in-main > a:hover {
        width: 270px;
        height: 69px;
        float: left;
        margin-top: 300px;
        margin-left: 340px;
        background: url(../../images/cz_btn.png) 0 0 no-repeat;
        display: block;
        cursor: pointer;
    }
</style>