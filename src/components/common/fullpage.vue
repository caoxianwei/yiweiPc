 <template>
    <div ref="fullpage">
        <div class="section sec1"><div class="t-a-c">section 1</div></div>
        <div class="section sec2"><div class="t-a-c">section 2</div></div>
        <div class="section sec3"><div class="t-a-c">section 3</div></div>
        <div class="section sec4"><div class="t-a-c">section 4</div></div>
    </div>
</template>
<script lang="babel">
    import jquery from 'jquery'
    import fullpage from 'fullpage.js'
    import { winHeight, errorMsg, succMsg } from "../../tools/command"
    import 'fullpage.js/dist/jquery.fullpage.css'
    export default {
        name : "login",
        mounted: function () {
            console.log('fullpage',jquery.fn.fullpage)
            jquery(this.$refs.fullpage).fullpage({loopBottom : true})
        },
        beforeDestroy(){
        },
        data() {
            return {
            }
        },
        computed : {
            contentheightHalf: function () {
                return Math.round(winHeight()/2) - 152
            }
        },
        methods: {
            forgetPassword(){
               
            }
        },
    }
</script>
<style scoped>
    .login {
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
    }
    .content {
        width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    a:hover {
        text-decoration: underline;
        cursor: pointer;
    }
    .sec1 {
        background-color: #66CC00;
    }
    .sec2 {
        background-color: #66FFFF;
    }
    .sec3 {
        background-color: #FFFF00;
    }
    .sec4 {
        background-color: #9900CC;
    }
</style>
