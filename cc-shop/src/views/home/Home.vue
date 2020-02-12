<template>
    <div id="home">
        <div v-if="!showLoading">
            <Header />
            <Sowing :sowing_list="sowing_list"/>
            <Nav :nav_list="nav_list"/>
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
    export default {
        name: "Home",
        components:{//注册组件
            Header,
            Sowing,
            Nav
        },
        data(){
            return {
                //轮播图数据
                sowing_list:[],
                //导航数据
                nav_list:[],
                showLoading:true
            }
        },
        created() {
            //2.请求网络数据
            getHomeData().then((response)=>{
                this.sowing_list = response.data.list[0].icon_list;
                this.nav_list = response.data.list[2].icon_list;
                this.showLoading = false;
            })
        }
    }
</script>

<style lang="less" scoped>
    #home{
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
</style>
