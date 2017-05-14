<template>
    <div class="team-dividend-data-dia">
        <div class="account-tabs">
            <el-tabs :active-name="defaultActive" @tab-click="handleClick">
                <el-tab-pane name="transfer-balance" label="余额转换"></el-tab-pane>
                <el-tab-pane name="dividend-detail" label="分红资金明细"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <component :is="transferBalanceView"></component>
        </div>
    </div>
</template>
<script lang="babel">
    import transferBalance from './team-dividend-data-transfer'
    import dividendDetail from './team-dividend-data-detail'
    export default {
        props: {
            aview : String,
        },
        components : {
            transferBalance,
            dividendDetail,
        },
        data () {
            return {
                defaultActive : "",
                transferBalanceView : "",
            }
        },
        mounted: function () {
            this.transferBalanceView = this.aview
            if(this.aview == 'dividendDetail'){
                this.defaultActive = "dividend-detail"
            } else {
                this.defaultActive = "transfer-balance"
            }
        },
        methods : {
            handleClick (tab) {
                console.log(tab);
                switch (tab.name) {
                    case 'transfer-balance':
                        this.transferBalanceView = "transferBalance"
                        break
                    case 'dividend-detail':
                        this.transferBalanceView = "dividendDetail"
                        break
                }
            }
        }
    }
</script>
<style scoped>
    .team-dividend-data-dia {
        height: 462px;
    }
    .account-tabs {
        margin-left: auto;
        margin-right: auto;
        width: 204px;
        margin-bottom: -17px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
</style>