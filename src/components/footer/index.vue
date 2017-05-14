<template>
  <div class="footer">
    <div class="shang footer-bg">
        <div class="item">
            <span>服务条款</span>
            <span>隐私政策</span>
            <span>责任博彩</span>
            <span>安全性</span>
            <span>免责申明</span>
            <span @click="changeSkin" class="skin">换肤</span>
        </div>
    </div>
    <div class="xia">
        <div class="cont p-r">
            <div class="left"></div>
            <div class="content">菲律宾合法网投 (CEZA牌照编号: NO.CF-163) 赌博委员会监管</div>
            <div class="right bg1">
                <div class="bg2"></div>
            </div>
            <div class="declare">负责任的博彩<br>我们积极推行负责任博彩，并极力拒绝未成年玩家使用我们的软体进行网上娱乐。同时，我们更透过专业人员及各种有效方法以防止问题博彩的发生 ：点选左边手型图示寻求帮助
            </div>
        </div>
    </div>   
  </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    export default {
        name : "footer",

        data(){
            return {
            }
        },

        methods :{
            ...mapActions({
              updateUsername: 'updateUsername',
              updateLoginStatus : 'updateLoginStatus',
              setSkin : 'setSkin',
            }),
            changeSkin(){
                var skin = this.$store.state.user.skin
                var key = this.$store.state.user.username+"_skin"
                if(skin == "green"){
                    this.setSkin("blue")
                    localStorage.setItem(key, 'blue')
                } else if(skin == 'blue'){
                    this.setSkin("green")
                    localStorage.setItem(key, 'green')
                }
            },
            lottery(){
                this.$router.push({name : "lottery"})
            }
        }

    }
</script>
<style scoped>
    .footer {
        width: 100%;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        position: relative;
    }
    .shang {
        width: 100%;
        height: 45px;
        line-height: 45px;
    }
    .shang .item {
        margin-left: auto;
        margin-right: auto;
        width: 1200px;
        color: #e5e5e5;
        font-size: 14px;
    }
    .shang .item span {
        background-image: url('../../images/imgDiBu-FenGeXian.png');
        background-position: right center;
        display: inline-block;
        height: 17px;
        line-height: 17px;
        margin-left: 8px;
        vertical-align: middle;
        margin-bottom: 2px;
        background-repeat: no-repeat;
        padding-right: 10px;
    }
    .xia {
        width: 100%;
        height: 135px;
        line-height: 135px;
        background-color: #171717;
    }
    .xia .cont {
        margin-left: auto;
        margin-right: auto;
        width: 1200px;
    }
    .cont .left {
        font-size: 14px;
        color: #999999;
        background-image: url('../../images/imgIco-Yi.png');
        background-repeat: no-repeat;
        background-position: 0% 40%;
        display: inline-block;
        width: 400px;
        position: absolute;
        height: 130px;
        line-height: 220px;
        padding-left: 15px;
    }
    .cont .content {
        position: absolute;
        width: 400px;
        left: 15px;
        height: 20px;
        line-height: 20px;
        overflow: hidden;
        color: #999999;
        top: 92px;
        font-size: 14px;
    }
    .cont .right {
        display: inline-block;
        position: absolute;
        left: 635px;
        height: 100px;
        width: 500px;
        top: 15px;
    }
    .bg1 {
         background-image: url('../../images/imgIco-Er.png');
         background-repeat: no-repeat;
         background-position: 0% 67%;
    }
    .bg2 {
        background-image: url('../../images/imgIco-San.png');
        background-repeat: no-repeat;
        background-position: 60px 65%;
        height: 100px;
        padding-left: 110px;
    }
    .declare {
        position: absolute;
        width: 380px;
        left: 750px;
        height: 100px;
        line-height: 25px;
        overflow: hidden;
        color: #999999;
        top: 20px;
        font-size: 14px;
    }
    .skin {
        cursor: pointer;
    }
</style>