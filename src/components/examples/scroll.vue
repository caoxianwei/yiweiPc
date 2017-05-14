0 <template>
    <div class="login" :style="{top: contentheightHalf + 'px'}" ref="loginMain" style="height:100px">
        <el-form :model="form" ref="form" label-width="100px" class="content" >
            <el-form-item prop="email" label="用户名">
              <el-input v-model="form.username" :autofocus="true" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkbox">
              <el-checkbox v-model="form.rememberMe" true-label="1" false-label="0">记住我</el-checkbox>&nbsp;<a @click.stop="forgetPassword" class="password">忘记密码？</a>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="submitLogin">登录</el-button>
              <el-button @click.native.prevent="toRegister">注册</el-button>
            </el-form-item>
          </el-form>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions } from 'vuex'
    import jquery from 'jquery'
    import fullpage from 'fullpage.js'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    import { winHeight, errorMsg, succMsg } from "../../tools/command"
    import Decimal from 'decimal.js'
    export default {
        name : "login",
        mounted: function () {
            console.log('fullpage',fullpage)
            console.log('jquery',jquery)
            this.form.username = this.$store.state.user.username
            jquery(this.$refs.loginMain).mCustomScrollbar()
            document.addEventListener("keyup", this.enterSubmit, false)
            var x = new Decimal("0.3")
            var add = x.add("0.2") //加
            var sub = x.sub("0.2") //减
            var mul = x.mul("0.2") //乘
            var div = x.div("0.2") //除
            console.log('add', add.toNumber())
            console.log('sub', sub.toNumber())
            console.log('mul', mul.toNumber())
            console.log('div', div.toNumber())
            //api文档 http://mikemcl.github.io/decimal.js/#toNumber
            // github https://github.com/MikeMcl/decimal.js/
        },
        beforeDestroy(){
            document.removeEventListener("keyup", this.enterSubmit, false)
        },
        data() {
            return {
                form: {
                    username:'',
                    password: '',
                    rememberMe: '0',
                }
            }
        },
        computed : {
            contentheightHalf: function () {
                return Math.round(winHeight()/2) - 152
            }
        },
        methods: {
            ...mapActions({
              updateUsername: 'updateUsername',
              updateLoginStatus : 'updateLoginStatus'
            }),
            async submitLogin() {
                if(!this.form.username || !this.form.password){
                    errorMsg("请输入用户名和密码")
                    return false
                }
                const data = await api.ajax('login', this.form)
                if(data && data.code == '0'){
                    this.updateUsername(this.form.username)
                    this.updateLoginStatus(true)
                    succMsg("succ")
                } else {
                    errorMsg(data.msg)
                }
            },
            toRegister(){
                this.$router.push({name: 'fullpage'})
            },
            enterSubmit(event){
                if(event.keyCode == 13){
                    this.submitLogin()
                }
            },
            forgetPassword(){
                if(!this.form.username){
                    errorMsg("游戏帐号不存在！")
                } else {
                    this.updateUsername(this.form.username)
                    this.$router.push({name : "retrieve-password"})  
              }
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
        height: 200px;
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
</style>
