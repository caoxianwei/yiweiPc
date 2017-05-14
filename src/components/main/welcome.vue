<template>
    <div class="container">
        <span class="welcome">欢迎使用亿维平台</span>
       <!--  <div style="width: 200px;">
        <side-nav :data="sideNavData"></side-nav>
            </div> -->
       <div class="Contentbox">
                <div id="con_one_1">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;" data-id="0">
                            <div class="dv_scroll_text Scroller-Container"  style="left: 0px; top: 0px;" id="id1">
                                <ul>
                                    <li><a href="index.aspx?classid=1"  onclick="addMuneIndex('ssc.aspx',1,'重庆时时彩');"><span>
                                        <img src="Login_data/cai1.png" /></span><p>
                                            重庆时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=12" onclick="addMuneIndex('ssc.aspx',12,'分分彩');"><span>
                                        <img src="Login_data/cai12.png" /></span><p>
                                            分分彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=15" onclick="addMuneIndex('ssc.aspx',15,'三分彩');"><span>
                                        <img src="Login_data/cai15.png" /></span><p>
                                            三分彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=11" onclick="addMuneIndex('ssc.aspx',11,'五分彩');"><span>
                                        <img src="Login_data/cai11.png" /></span><p>
                                            五分彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=2" onclick="addMuneIndex('ssc.aspx',2,'江西时时彩');"><span>
                                        <img src="Login_data/cai2.png" /></span><p>
                                            江西时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=6" onclick="addMuneIndex('ssc.aspx',6,'新疆时时彩');"><span>
                                        <img src="Login_data/cai6.png" /></span><p>
                                            新疆时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=3" onclick="addMuneIndex('ssc.aspx',3,'黑龙江时时彩');"><span>
                                        <img src="Login_data/cai3.png" /></span><p>
                                            黑龙江时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=7" onclick="addMuneIndex('ssc.aspx',7,'天津时时彩');"><span>
                                        <img src="Login_data/cai7.png" /></span><p>
                                            天津时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=13" onclick="addMuneIndex('pk10.aspx',13,'北京赛车PK10');"><span>
                                        <img src="Login_data/cai13.png" /></span><p>
                                            北京赛车PK10</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=14" onclick="addMuneIndex('lhc.aspx',14,'香港六合彩');"><span>
                                        <img src="Login_data/cai14.png" /></span><p>
                                            香港六合彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=8" onclick="addMuneIndex('syxw.aspx',8,'广东11选5');"><span>
                                        <img src="Login_data/cai8.png" /></span><p>
                                            广东11选5</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=9" onclick="addMuneIndex('syxw.aspx',9,'江西11选5');"><span>
                                        <img src="Login_data/cai9.png" /></span><p>
                                            江西11选5</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=10" onclick="addMuneIndex('syxw.aspx',10,'山东11选5');"><span>
                                        <img src="Login_data/cai10.png" /></span><p>
                                            山东11选5</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=4" onclick="addMuneIndex('fc3d.aspx',4,'福彩3D');"><span>
                                        <img src="Login_data/cai4.png" /></span><p>
                                            福彩3D</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=5" onclick="addMuneIndex('fc3d.aspx',5,'排列3');"><span>
                                        <img src="Login_data/cai5.png" /></span><p>
                                            排列3</p>
                                    </a></li>
                                      <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp1.png" /></span><p>
                                            百家乐</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp2.png" /></span><p>
                                            二人牛牛</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp3.png" /></span><p>
                                            百人牛牛</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp4.png" /></span><p>
                                            炸金花</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp5.png" /></span><p>
                                            斗地主</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp6.png" /></span><p>
                                            港式五张</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp7.png" /></span><p>
                                            两张牌</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp8.png" /></span><p>
                                            疯狂赛车</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="con_one_2" style="display: none">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="1">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id2">
                                <ul>
                                    <li><a href="index.aspx?classid=1"  onclick="addMuneIndex('ssc.aspx',1,'重庆时时彩');"><span>
                                        <img src="Login_data/cai1.png" /></span><p>
                                            重庆时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=12" onclick="addMuneIndex('ssc.aspx',12,'分分彩');"><span>
                                        <img src="Login_data/cai12.png" /></span><p>
                                            分分彩</p>
                                    </a></li>
                                     <li><a href="index.aspx?classid=15" onclick="addMuneIndex('ssc.aspx',15,'三分彩');"><span>
                                        <img src="Login_data/cai15.png" /></span><p>
                                            三分彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=11" onclick="addMuneIndex('ssc.aspx',11,'五分彩');"><span>
                                        <img src="Login_data/cai11.png" /></span><p>
                                            五分彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=2" onclick="addMuneIndex('ssc.aspx',2,'江西时时彩');"><span>
                                        <img src="Login_data/cai2.png" /></span><p>
                                            江西时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=6" onclick="addMuneIndex('ssc.aspx',6,'新疆时时彩');"><span>
                                        <img src="Login_data/cai6.png" /></span><p>
                                            新疆时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=3" onclick="addMuneIndex('ssc.aspx',3,'黑龙江时时彩');"><span>
                                        <img src="Login_data/cai3.png" /></span><p>
                                            黑龙江时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?classid=7" onclick="addMuneIndex('ssc.aspx',7,'天津时时彩');"><span>
                                        <img src="Login_data/cai7.png" /></span><p>
                                            天津时时彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=13" onclick="addMuneIndex('pk10.aspx',13,'北京赛车PK10');"><span>
                                        <img src="Login_data/cai13.png" /></span><p>
                                            北京赛车PK10</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                       
                    </div>
                </div>
                <div id="con_one_3" style="display: none">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="2">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id3">
                                <ul>
                                    <li><a href="index.aspx?ClassID=8" onclick="addMuneIndex('syxw.aspx',8,'广东11选5');"><span>
                                        <img src="Login_data/cai8.png" /></span><p>
                                            广东11选5</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=9" onclick="addMuneIndex('syxw.aspx',9,'江西11选5');"><span>
                                        <img src="Login_data/cai9.png" /></span><p>
                                            江西11选5</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=10" onclick="addMuneIndex('syxw.aspx',10,'山东11选5');"><span>
                                        <img src="Login_data/cai10.png" /></span><p>
                                            山东11选5</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                         
                    </div>
                </div>
                <div id="con_one_4" style="display: none">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="3">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id4">
                                <ul>
                                    <li><a href="index.aspx?ClassID=14" onclick="addMuneIndex('lhc.aspx',14,'香港六合彩');"><span>
                                        <img src="Login_data/cai14.png" /></span><p>
                                            香港六合彩</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=4" onclick="addMuneIndex('fc3d.aspx',4,'福彩3D');"><span>
                                        <img src="Login_data/cai4.png" /></span><p>
                                            福彩3D</p>
                                    </a></li>
                                    <li><a href="index.aspx?ClassID=5" onclick="addMuneIndex('fc3d.aspx',5,'排列3');"><span>
                                        <img src="Login_data/cai5.png" /></span><p>
                                            排列3</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div id="con_one_5" style="display: none">
                    <div class="scr_con">
                        <div class="dv_scroll" style=" width:980px;height:330px;"  data-id="4">
                            <div class="dv_scroll_text Scroller-Container" style="left: 0px; top: 0px;" id="id5">
                                <ul>
                                    <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp1.png" /></span><p>
                                            百家乐</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp2.png" /></span><p>
                                            二人牛牛</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp3.png" /></span><p>
                                            百人牛牛</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp4.png" /></span><p>
                                            炸金花</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp5.png" /></span><p>
                                            斗地主</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp6.png" /></span><p>
                                            港式五张</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp7.png" /></span><p>
                                            两张牌</p>
                                    </a></li>
                                     <li><a href="javascript:void(0)" onclick="showClient('<%=khdUrl %>');"><span>
                                        <img src="Login_data/qp8.png" /></span><p>
                                            疯狂赛车</p>
                                    </a></li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>     
    </div>
</template>
<script lang="babel">
    import sideNav from "../index/side-nav"
	export default {
        components : {
          sideNav
        },

        data() {
            return {
                sideNavData : [
                {
                    name : "彩票",
                    path : "#",
                    id : "caipiao-1",
                    show : true,
                    active : false,
                    children : [
                        {
                            name : "222",
                            path : "#",
                            id : "caipiao-c1",
                            active : false,
                        },
                        {
                            name : "333",
                            path : "#",
                            id : "caipiao-c2",
                            active : false,
                        }
                    ],
                    groups:[
                    {
                        name : "组1",
                        id : "caipiao-g1",
                        show : true,
                        list: [
                            {
                                name : "444",
                                path : "#",
                                id : "caipiao-g1-c1",
                                active : false,
                            },
                            {
                                name : "555",
                                path : "#",
                                id : "caipiao-g1-c2",
                                active : false,
                            }
                        ]
                    },
                    {
                        name : "组2",
                        show : true,
                        id : "caipiao-g2",
                        list: [
                           {
                               name : "666",
                               path : "#",
                               id : "caipiao-g2-c1",
                               active : false,
                           },
                           {
                               name : "777",
                               path : "#",
                                id : "caipiao-g2-c2",
                                active : false,
                           }
                        ]
                    },
                    ]
                },
               {
                    name : "游戏",
                    path : "#",
                    id : "youxi-1",
                    show : true,
                    children : [
                        {
                            name : "222",
                            path : "#",
                            id : "youxi-c1",
                            active : false,
                        },
                        {
                            name : "333",
                            path : "#",
                            id : "youxi-c2",
                            active : false,
                        }
                    ],
                    groups:[
                    {
                        name : "组1",
                        id : "youxi-g1",
                        show : true,
                        list: [
                            {
                                name : "444",
                                path : "#",
                                id : "youxi-g1-c1",
                                active : false,
                            },
                            {
                                name : "555",
                                path : "#",
                                id : "youxi-g1-c2",
                                active : false,
                            }
                        ]
                    },
                    {
                        name : "组2",
                        show : true,
                        id : "youxi-g2",
                        list: [
                           {
                               name : "666",
                               path : "#",
                               id : "youxi-g2-c1",
                               active : false,
                           },
                           {
                               name : "777",
                               path : "#",
                                id : "youxi-g2-c2",
                                active : false,
                           }
                        ]
                    },
                    ]
                }
                ],
            }
        }

	}
</script>
<style type="text/css" scoped>
	.container {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        font-size: 36px;
        text-align: center;
    }
    .welcome {
       margin-top: 50px;
       display: inline-block;
    }
</style>