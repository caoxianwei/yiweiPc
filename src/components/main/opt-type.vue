<template>
    <div class="opt-type select-type-selected-bg">
        <div class="select-type-selected-bg-inner left-bar-stl"></div>
        <div index="1" class="mouse-enter selected-div"><img class="selct-type" src="../../images/imgCaiPiaoYouXi.jpg"><div class="select-type-dibu-bg-selected dibutiao-selected"><p class="selected-content-up"><span>彩票游戏</span><img v-if="showCiapiaoRArrow" class="arrow-right-white" src="../../images/imgBiaoQian-PuTongZhuangTai.png"><img v-if="!showCiapiaoRArrow" class="arrow-down-white" src="../../images/imgBiaoQian-PuTongZhuangTai2.png"></p><p v-if="showCaipiaoDown" class="selected-content-down">经典彩票玩法等你来</p></div><div class="down-arrow"></div></div><div class="mouse-enter" index="2"
        ><img class="no-selct-type" src="../../images/imgQiPaiYouXi.jpg"><div class="select-type-dibu-bg"><p class="no-selected-content"><span>棋牌游戏</span><img v-if="showQipaiRArrow" class="arrow-right-white" src="../../images/imgBiaoQian-PuTongZhuangTai.png"><img v-if="!showQipaiRArrow" class="arrow-down-white" src="../../images/imgBiaoQian-PuTongZhuangTai2.png"></p><p v-if="showQipaiDown" class="selected-content-down">经典棋牌游戏等你来</p></div></div><div class="mouse-enter" index="3"
        ><img class="no-selct-type" src="../../images/imgDianZiYouYi.jpg"><div class="select-type-dibu-bg"><p class="no-selected-content"><span>电子游艺</span><img v-if="showDianziRArrow" class="arrow-right-white" src="../../images/imgBiaoQian-PuTongZhuangTai.png"><img v-if="!showDianziRArrow" class="arrow-down-white" src="../../images/imgBiaoQian-PuTongZhuangTai2.png"></p><p v-if="showDianziDown" class="selected-content-down">经典电子游艺等你来</p></div></div><div class="mouse-enter" index="4"
        ><img class="no-selct-type" src="../../images/imgZhenRenYuLe.jpg"><div class="select-type-dibu-bg"><p class="no-selected-content"><span>真人娱乐</span><img v-if="showZhenrenRArrow" class="arrow-right-white" src="../../images/imgBiaoQian-PuTongZhuangTai.png"><img v-if="!showZhenrenRArrow" class="arrow-down-white" src="../../images/imgBiaoQian-PuTongZhuangTai2.png"></p><p v-if="showZhenrenDown" class="selected-content-down">真人娱乐等你来</p></div></div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import { mapActions } from 'vuex'
    export default {
        name : "optType",

        data(){
            return {
                showCaipiaoDown: true,
                showQipaiDown : false,
                showDianziDown : false,
                showZhenrenDown : false,
                showCiapiaoRArrow : false,
                showQipaiRArrow : true,
                showDianziRArrow : true,
                showZhenrenRArrow : true,
                animate : false,
                animateTime : 300,
                arrowDownElem : '',
            }
        },
        mounted(){
            this.arrowDownElem = $(".select-type-selected-bg .down-arrow")
            $("div.mouse-enter").click((event) => {
                if(this.animate){
                    return
                }
                this.animate = true
                event.stopPropagation()
                event.preventDefault()
                var target = event.target
                var sel = $(target).closest('div.mouse-enter')
                if(!sel){
                    return
                }
                var index = sel.attr("index")
                var cur = $("div.selected-div")
                if(!cur){
                    return
                }
                var curInd = cur.attr("index")
                if(index == curInd){
                    return
                }
                this.setGame(index)
                $(".down-arrow", cur).remove()
                this.closeContent(curInd)
                this.arrowStatus(curInd, index)
                cur.removeClass('selected-div').css("width","293px")
                $("img:first", cur).css({
                    height: '268px',
                    marginTop: '8px'
                })
                $("img.selct-type").removeClass('selct-type').addClass("img-h-260").css("width","292px")
                $(".select-type-dibu-bg-selected").removeClass('select-type-dibu-bg-selected').addClass("select-type-dibu-bg")
                $(".select-type-dibu-bg p", cur).addClass('no-selected-content')
                $(".select-type-dibu-bg", cur).css({
                    width: '293px',
                    height: '80px',
                    bottom: "80px"
                })
                $(".dibutiao-selected").removeClass('dibutiao-selected')
                if(curInd == 1){
                    cur.addClass("p-l-7")
                }
                $(".select-type-selected-bg .selected-div").removeClass('selected-div')
                sel.css("width","200")
                $("img", sel).css("height","260px")
                $("img", sel).css("width","292px")
                //$(".select-type-dibu-bg", sel).removeClass('select-type-dibu-bg').addClass("select-type-dibu-bg-temp2")
                $(".select-type-selected-bg .m-l-7-m").removeClass('m-l-7-m')

                $(".select-type-dibu-bg", sel).css({
                    width: '200px',
                    height: '80px',
                    bottom: "60px"
                })
                this.shrink(cur)
                this.expand(sel)
                this.expandImg(sel)
            })
        },
        watch : {
            "animate" : function(val){
                if(val){
                    setTimeout(() => {
                        this.animate = false
                    }, this.animateTime)
                }
            }
        },
        methods : {
            ...mapActions({
              setGameNav : 'setGameNav',
            }),
            shrink(cur){
                cur.animate({
                    width : "200px"
                },this.animateTime,()=> {
                    cur.css("width", "")
                    
                })
                $("img:first", cur).animate({
                    marginLeft : "-44px",
                    height: "260px",
                    marginTop : "16px"
                },this.animateTime,()=> {
                    $("img:first", cur).css({
                        height: '',
                        marginTop: ''
                    })
                    $(".select-type-selected-bg img").addClass("no-selct-type").removeClass('img-h-260')
                })
                $(".select-type-dibu-bg", cur).animate({
                    width: '200px',
                    bottom: "60px"
                },this.animateTime,()=> {
                    $(".select-type-dibu-bg", cur).css({
                        width: '',
                        height: '',
                        bottom: ''
                    })
                })

            },
            expand(sel){
                sel.animate({
                    width : "293px"
                },this.animateTime,()=> {
                    sel.append(this.arrowDownElem)
                })
                $(".select-type-dibu-bg", sel).animate({
                    width: '293px',
                    bottom: "80px"
                },this.animateTime,()=> {
                    $(".select-type-dibu-bg", sel).css({
                        width: '',
                        bottom: ''
                    })
                })
            },
            expandImg(sel){
                $("img", sel).animate({
                    marginLeft : "0px",
                    marginTop : "8px",
                    height : "268px"
                },this.animateTime,()=> {
                    $("img", sel).css("width","")
                    $("img", sel).css("marginTop","")
                    $("img", sel).css("height","")
                    $("img", sel).addClass("selct-type").removeClass('no-selct-type')
                    var ind = sel.attr("index")
                    sel.addClass("selected-div").addClass('m-l-7-m')
                    $(".select-type-dibu-bg", sel).removeClass('select-type-dibu-bg').addClass("select-type-dibu-bg-selected").addClass("dibutiao-selected")
                    $(".no-selected-content", sel).addClass("selected-content-up").removeClass('no-selected-content')
                    sel.css("width","")
                    $("img", sel).css("height","")
                    
                    this.showContent(ind)
                    if(ind == 1){
                        this.$nextTick(()=>{
                            $(sel).css('marginLeft',"0")
                        })
                    }
                })
            },
            showContent(ind){
                this.showCaipiaoDown = false
                this.showQipaiDown = false
                this.showDianziDown = false
                this.showZhenrenDown = false
                if(ind == 1){
                    this.showCaipiaoDown = true
                } else if(ind == 2){
                    this.showQipaiDown = true
                } else if(ind == 3){
                    this.showDianziDown = true
                } else if(ind == 4){
                    this.showZhenrenDown = true
                }
            },
            closeContent(ind){
                if(ind == 1){
                    this.showCaipiaoDown = false
                } else if(ind == 2){
                    this.showQipaiDown = false
                } else if(ind == 3){
                    this.showDianziDown = false
                } else if(ind == 4){
                    this.showZhenrenDown = false
                }
            },
            arrowStatus(cur, sel) {
                if(cur == 1){
                    this.showCiapiaoRArrow = true
                } else if(cur == 2){
                    this.showQipaiRArrow = true
                } else if(cur == 3){
                    this.showDianziRArrow = true
                } else if(cur == 4){
                    this.showZhenrenRArrow = true
                }

                if(sel == 1){
                    this.showCiapiaoRArrow = false
                } else if(sel == 2){
                    this.showQipaiRArrow = false
                } else if(sel == 3){
                    this.showDianziRArrow = false
                } else if(sel == 4){
                    this.showZhenrenRArrow = false
                }
            },
            setGame(ind){
                console.log('setGame ind', ind)
                switch (ind) {
                    case "1":
                        this.setGameNav("lottery")
                        break;
                    case "2":
                        this.setGameNav("qpgame")
                        break;
                    case "3":
                        this.setGameNav("dianzi")
                        break;
                    case "4":
                        this.setGameNav("zhenren")
                        break;
                    default:
                        break;
                }
            }

        }

    }
</script>
<style scoped>
    .opt-type {
        width: 907px;
        height: 276px;
        margin-top: 15px;
        display: inline-block;
        float: left;
        padding-left: 0;
        position: relative;
        cursor: pointer;
    }
    .opt-type div {
        display: inline-block;
        width: 200px;
        z-index: 100;
        overflow: hidden;
    }
    .opt-type div img {
        width: 200px;
    }
    .opt-type .selct-type {
        width: 288px;
    }
    .selected-div {
        background-image: url('../../images/imgWaiFaGuang.png');
        background-repeat: no-repeat;
        width: 290px !important;
        height: 270px;
        padding-left: 9px;
        padding-top: 8px;
        position: relative;
        overflow: inherit !important;
    }
    .opt-type .no-selct-type {
        width: 288px;
        height: 260px;
        margin-top: 16px;
        margin-left: -44px;
    }
    .down-arrow {
        background-image: url('../../images/imgXuanZhongHuangTiao.png');
        background-repeat: no-repeat;
        background-position: left bottom;
        width: 288px !important;
        height: 13px;
        left: 8px;
        position: absolute;
        bottom: -3px;
    }
    .dibutiao-selected {
        position: absolute;
        width: 288px !important;
        height: 80px;
        left: 9px;
        bottom: 10px;
    }
    .select-type-dibu-bg {
        background-color: black;
        background-repeat: no-repeat;
        height: 60px;
        left: 0;
        bottom: 60px;
        opacity: 0.6;
        position: relative;
    }
    .selected-content-up {
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
        font-size: 27px;
        color: white;
        text-align: center;
        margin-top: 15px;
    } 
    .selected-content-down {
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
        font-size: 18px;
        text-align: center;
        color: #97f9ff;
        margin-top: 3px;
    }
    .no-selected-content {
        font-family: SimHei, 黑体, STHeiti, 华文黑体;
        font-size: 21px;
        text-align: center;
        color: #bec6e3;
        padding-right: 5px;
        margin-top: 18px;
    }
    .selected-width {
        width: 290px;
    }
    .img-width {
        width: 280px;
    }
    .img-h-260 {
        height: 260px;
        margin-top: 16px;
    }
    .mouse-enter {
        height: 277px;
    }
    .left-bar-stl {
        position: absolute !important;
        width: 7px !important;
        height: 260px !important;
        bottom: 0;
        left: 0;
        z-index: 1000 !important;
    }
    .arrow-down-white {
        width: 25px !important;
        height: 12px !important;
    }
    .arrow-right-white {
        width: 12px !important;
        height: 12px !important;
        margin-left : 0 !important;
        margin-top: 0 !important;
    }
</style>