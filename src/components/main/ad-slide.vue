<template>
    <div class="ad-slide-bg ad-container">
        <div class="inner-container">
            <ul ref="adSlide" class="slide-ul">
                <li class="ad-section1"></li>
                <li class="ad-section2"></li>
                <li class="ad-section3"></li>
                <li class="ad-section4"></li>
            </ul>
            <div class="hei-tiao">
                <span index="1" class="qiehuan-click"></span>
                <span index="2" class="qiehuan-click"></span>
                <span index="3" class="qiehuan-click"></span>
                <span index="4" class="qiehuan-click"></span>
            </div>
            <div class="line-left"></div>
            <div class="line-right"></div>
        </div>
    </div>    
</template>
<script>
    import $ from 'jquery'
    export default {
        name: "adSlide",
        data(){
            return {
                slide: 1,
                line : 1,
            }
        },
        mounted: function () {
            var indElem = $('.ad-slide-bg .hei-tiao span')[0]
            $(indElem).removeClass('qiehuan-click').addClass('qiehuan')
            this.lineMeet()
            $(".inner-container").mouseenter(function(event) {
                $('.line-left').stop()
                $('.line-right').stop()
                $('.ad-slide-bg ul').stop()
                $('.line-left,.line-right').css({
                    width: '0',
                })
                $('.line-left,.line-right').css({
                    width: '0',
                })
                $('.ad-slide-bg ul').css('left', '')
            })
            $(".inner-container").mouseleave((event)=> {
                this.lineMeet()
            })
            $('.hei-tiao').click((event) => {
                var clickIndex = event.target.getAttribute("index")
                if(!clickIndex){
                    return
                }
                var cur = $('.hei-tiao .qiehuan')[0]
                if(!cur){
                    return
                }
                var curIndex = cur.getAttribute("index")
                if(clickIndex == curIndex){
                    return
                }
                var diff = clickIndex - curIndex
                if(diff > 0){
                    $('.ad-slide-bg ul').animate({
                        left: -diff * 900
                    }, 400, () => {
                        $('.ad-slide-bg .hei-tiao .qiehuan').removeClass('qiehuan').addClass('qiehuan-click')
                        $(event.target).removeClass('qiehuan-click').addClass('qiehuan')
                        for(var i= 0;i < diff;i++){
                            $('.ad-slide-bg ul li:first-child').appendTo('.ad-slide-bg ul')
                        }
                        $('.ad-slide-bg ul').css('left', '')
                    })
                } else if(diff < 0){
                    for(var i= 0;i < -diff;i++){
                        $('.ad-slide-bg ul li:last-child').prependTo('.ad-slide-bg ul')
                    }
                    $('.ad-slide-bg ul').css('left', diff * 900)
                    $('.ad-slide-bg ul').animate({
                        left: 0
                    }, 400, () => {
                        $('.ad-slide-bg .hei-tiao .qiehuan').removeClass('qiehuan').addClass('qiehuan-click')
                        $(event.target).removeClass('qiehuan-click').addClass('qiehuan')
                        $('.ad-slide-bg ul').css('left', '')
                    })
                }
            })
        },
        methods : {
            lineMeet(){
                var self = this
                $('.line-left').animate({
                    width: "450px"
                }, 6000, function() {
                    $('.line-left,.line-right').css({
                        width: '0',
                    })
                    self.slide += 1 
                }) 
                $('.line-right').animate({
                    width: "450px"
                }, 6000, function() {
                    $('.line-left,.line-right').css({
                        width: '0',
                    })
                })
            },

            moveLeft() {
                var self = this
                $('.ad-slide-bg ul').animate({
                    left: "-900"
                }, 700, function() {
                    $('.ad-slide-bg ul li:first-child').appendTo('.ad-slide-bg ul')
                    $('.ad-slide-bg ul').css('left', '')
                    var clsName =  $('.ad-slide-bg ul li:first-child').attr("class")
                    if(!clsName){
                        return
                    }
                    var ind = clsName.slice(-1)
                    $('.ad-slide-bg .hei-tiao .qiehuan').removeClass('qiehuan').addClass('qiehuan-click')
                    var indElem = $('.ad-slide-bg .hei-tiao span')[ind -1]
                    $(indElem).removeClass('qiehuan-click').addClass('qiehuan')
                    self.line += 1
                })
            },
        },
        watch : {
            "slide" : function(value){
                this.moveLeft()
            },
            "line" : function(value){
                this.lineMeet()
            }
        }
    }
</script>
<style scoped>
    .ad-container {
        width: 900px;
        height: 354px;
        overflow: hidden;
        padding-left: 7px;
        display: inline-block;
        float: left;
    }
    .ad-container .inner-container {
        width: 900px;
        display: inline-block;
        overflow: hidden;
        position: relative;
    }
    .slide-ul{
        width: 3600px;
        list-style: none;
        position: relative;
    }
    .ad-container li {
        width: 900px;
        height: 354px;
        float: left;
    }
    .hei-tiao {
        background-image: url('../../images/imgHeiTiao.png');
        background-repeat: no-repeat;
        width: 900px;
        height: 46px;
        position: absolute;
        z-index: 100;
        left: 0;
        bottom: 7px;
        text-align: center;
    }
    .qiehuan {
        background-image: url('../../images/btnQieHuan.png');
        background-repeat: no-repeat;
        background-position: center;
    }
    .qiehuan-click {
        background-image: url('../../images/btnQieHuanClick.png');
        background-repeat: no-repeat;
        background-position: center;
    }

    .hei-tiao span {
        display: inline-block;
        width: 14px;
        height: 46px;
    }

    .ad-section1 {
        background-image: url('../../images/imgGuangGao-Er.jpg');
        background-repeat: no-repeat;
    }
    .ad-section2 {
        background-image: url('../../images/imgGuangGao-San.jpg');
        background-repeat: no-repeat;
    } 
    .ad-section3 {
        background-image: url('../../images/imgGuangGao-yi.jpg');
        background-repeat: no-repeat;
    } 
    .ad-section4 {
        background-image: url('../../images/imgGuangGao-si.jpg');
        background-repeat: no-repeat;
    }

    .line-left {
       position: absolute;
       width: 0;
       height: 2px;
       background-color: #dbab43;
       left: 0px;
       bottom: 52px;
       z-index: 110;
    }

    .line-right {
        position: absolute;
        width: 0;
        height: 2px;
        background-color: #dbab43;
        right: 0px;
        bottom: 52px;
        z-index: 110;
    }

</style>