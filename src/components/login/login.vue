 <template>
	<div class="login login-bg" :style="{top: contentheightHalf + 'px'}">
        <el-form :model="form" ref="form" label-width="100px" class="login-content">
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
    import { winHeight, errorMsg, succMsg } from "../../tools/command"
    export default {
        name : "login",
        mounted: function () {
            this.updateLoginStatus(false)
            this.form.username = this.$store.state.user.username
            document.addEventListener("keyup", this.enterSubmit, false)
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
                    loginType: '1',
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
              updateLoginStatus : 'updateLoginStatus',
              setSkin : 'setSkin',
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
                    var theme = JSON.parse(data.data.theme || null)
                    if(theme) {
                        this.setSkin(theme.skin || "blue")
                    } else {
                        this.setSkin("blue")
                    }
                    this.$router.push({name : "main"})
                } else {
                    errorMsg(data.msg)
                }
            },
            toRegister(){
                
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
    .login-content {
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
</style>
