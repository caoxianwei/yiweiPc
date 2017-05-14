<template>
    <div class="container">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
</template>
<script lang="babel">
	import { winHeight,errorMsg } from "../../tools/command"
    import api from '../../api'
    import { mapActions } from 'vuex'
    import $ from 'jquery'

	export default {
        name : "main",
        data(){
            return {
                showSkin : '',
                skinCssLink : '',
            }
        },
        components : {
        },
        created() {
            if(location.hash != '#/login'){
                this.checkLogin()
            }
            this.skinCssLink = document.createElement('link')
            this.skinCssLink.rel = 'stylesheet'
            this.skinCssLink.href = ""
            document.getElementsByTagName('head')[0].appendChild(this.skinCssLink)
        },

        computed: {
            contentheight: function () {
                return winHeight()
            },
            fullscreenLoading: function(){
            	return this.$store.state.loading
            },
            loginStatus(){
                return this.$store.state.user.isLogin
            },
            skin(){
                return this.$store.state.user.skin
            },
        },
        methods : {
            ...mapActions({
              updateUsername: 'updateUsername',
              updateLoginStatus : 'updateLoginStatus',
              setSkin : 'setSkin',
            }),
            async checkLogin(){
                const data = await api.ajax('checkLogin', {})
                if(data && data.code != '0'){
                    this.updateLoginStatus(false)
                    this.$router.push({name : "login"})
                } else {
                    this.getTheme()
                }
            },
            async getTheme(){
                const data = await api.ajax('user/getTheme', {})
                if(data && data.code == '0'){
                    console.log("getTheme: ",data.data)
                    const theme = JSON.parse(data.data || null)
                    if(theme){
                        this.setSkin(theme.skin || "blue")
                    } else {
                        this.setSkin("blue")
                    }
                } else {
                    this.setSkin("blue")
                }
            },
            async updateSkin(val){
                const data = await api.ajax('user/getTheme', {})
                if(data && data.code == '0'){
                    console.log("getTheme: ",data.data)
                    var theme = JSON.parse(data.data || null)
                    if($.isPlainObject(theme)){
                        if(theme.skin == val){
                            return
                        } else {
                            theme.skin = val
                        }
                    } else {
                        theme = {}
                        theme.skin = val
                    }
                    var para = {}
                    para.theme = JSON.stringify(theme)
                    const rst = await api.ajax('user/updateTheme', para)
                    if (rst.code != '0') {
                        errorMsg(rst.msg)
                    }
                } else {
                    errorMsg(data.msg)
                }
            }
        },
        watch : {
           "loginStatus" : function(value, old){
                if(value == false || value == 'no'){
                    this.$router.push({name : "login"})
                }
           },
           "skin" : function(value, old) {
                const ts = new Date().getTime()
                this.updateSkin(value)
                if(this.skinCssLink){
                    if(value == "blue"){
                        if (process.env.NODE_ENV === 'production') {
                            this.skinCssLink.href = '/static/css/blue.css'+'?ts='+ts
                        } else {
                            this.skinCssLink.href = '/static/blue.css'
                        }
                    } else if (value == "green") {
                        if (process.env.NODE_ENV === 'production') {
                            this.skinCssLink.href = '/static/css/green.css'+'?ts='+ts
                        } else {
                            this.skinCssLink.href = '/static/green.css'
                        }
                    }
                }
           },
       }
	}
</script>
<style type="text/css" scoped>
	.container {
        width: 100%;
        height: 100%;
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
