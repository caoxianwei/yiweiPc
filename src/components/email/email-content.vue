<template>
    <div class="contentBox">
        <dl>
            <dt>主题：{{data.title}}</dt>
            <dd>发件人：{{data.senderName}}</dd>
            <dd>发件时间：{{data.addTime}}</dd>
            <dd>收件人：{{data.username}}</dd>
        </dl>
        <div class="box-content" ref="IPAddressList">
            <div class="content-msg">
                {{data.msgText}}
            </div>
        </div>
        <div class="email_pre_nxt">
            <el-button size="small" type="text" class="pre_nxt" @click.stop="lastMsg">上一封</el-button>
            <el-button size="small" type="text" class="pre_nxt" @click.stop="nextMsg">下一封</el-button>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions } from 'vuex'
    import jquery from 'jquery'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    import { succMsg,errorMsg } from '../../tools/command';
    export default {
        mounted () {
            this.$root.$on("email-init",this.getData)
            jquery(this.$refs.IPAddressList).mCustomScrollbar()
        },
        beforeDestroy () {
            this.$root.$off("email-init",this.getData)
        },
        data () {
            return {
                data: {},
                form: {
                    id: '',
                },
            }
        },
        methods :{
            ...mapActions({
                  setEmailId : 'setEmailId',
                }),
            getData () {
                this.form.id = this.$store.state.useraction.emailId;
                api.ajax('msg/findMsgDetail',this.form).then(data =>{
                    this.data = data.data; 
                },error =>{
                    errorMsg(data.msg)
                })
            },
            lastMsg () {
                this.setEmailId(this.data.lastId);
                if (this.$store.state.useraction.emailId != null) {
                    this.getData()
                } else {
                    errorMsg("这是第一封！")
                    return
                }
            },
            nextMsg () {
                this.setEmailId(this.data.nextId);
                if (this.$store.state.useraction.emailId != null) {
                    this.getData()
                } else {
                    errorMsg("这是最后一封！")
                    return
                }
            },
        }
    }
</script>
<style scoped>
    a {
        text-decoration: none;
        color: inherit;
    }
    .contentBox {
        width: 660px;
        height: 730px;
        float: right;
        border-top-right-radius: 10px !important;
        border-bottom-right-radius: 10px !important;
        background: #fff;
        font-size: 14px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    dl {
        line-height: 21px;
        padding: 20px 0 0 55px;
    }
    dl dt {
        padding-bottom: 10px;
        font-weight: bold;
    }
    dl dd {
        color: #888;
    }
    .box-content {
        height: 450px; 
        margin: 20px 0;
        border-top: solid 1px #e1e1e1; 
        border-bottom: solid 1px #e1e1e1; 
    }
    .content-msg {
        height: 350px;
        margin: 50px;
    }
    .email_pre_nxt {
        width: 165px;
        height: 25px;
        display: inline-block;
        position: relative;
        left: 230px;
        text-align: center;
    }
    .pre_nxt {
        width: 65px;
        background: #a5a7a9;
        color: #fff;
    }
    .pre_nxt:hover {
        background: #b7b9bb;
    }
</style>