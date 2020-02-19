<template>
    <div id="home">
        <div v-if="!showLoading">
            <Header />
            <!--轮播图-->
            <Sowing :sowing_list="sowing_list"/>
            <!--中部导航-->
            <Nav :nav_list="nav_list"/>
            <!--秒杀-->
            <FlashSale :flash_sale_list="flash_sale_list"/>
            <!--猜你喜欢-->
            <YouLike :you_like_list="you_like_list"/>
            <!--返回顶部-->
            <MarkPage :scrollToTop="scrollToTop"/>
        </div>
        <van-loading
            v-else
            type="spinner"
            color="#75a342"
            size="24px"
            style="position: absolute;top: 40%;left: 50%;transform: translate(-50%)"
        >
            数据加载中...
        </van-loading>
    </div>
</template>

<script>
    import {getHomeData} from "./../../service/api/index"
    //2.引入组件
    import Header from "./components/header/Header"
    import Sowing from "./components/sowing/Sowing"
    import Nav from "./components/nav/Nav"
    import FlashSale from "./components/flashSale/FlashSale"
    import YouLike from "./components/youlike/YouLike"
    import MarkPage from "./components/markPage/MarkPage"
    export default {
        name: "Home",
        components:{//注册组件
            Header,
            Sowing,
            Nav,
            FlashSale,
            YouLike,
            MarkPage
        },
        data(){
            return {
                //轮播图数据
                sowing_list:[],
                //导航数据
                nav_list:[],
                //秒杀数据
                flash_sale_list:[],
                //猜你喜欢数据
                you_like_list:[],

                showLoading:true
            }
        },
        created() {
            //2.请求网络数据
            getHomeData().then((response)=>{
                this.sowing_list = response.data.list[0].icon_list;
                this.nav_list = response.data.list[2].icon_list;
                this.flash_sale_list = response.data.list[3].product_list;
                this.you_like_list = response.data.list[12].product_list;
                this.showLoading = false;
            })
        },
        methods:{
            scrollToTop(){
                alert("来了！")
            }
        }
    }
</script>

<style lang="less" scoped>
    #home{
        width: 100%;
        height: 300rem;
        background-color: transparent;
    }
</style>
