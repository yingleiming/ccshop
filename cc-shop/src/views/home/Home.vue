<template>
    <div id="home">
        <Header />
        <Sowing />
    </div>
</template>

<script>
    //1.引入
    import {getHomeData} from "./../../service/api/index"
    //2.引入组件
    import Header from "./components/header/Header"
    import Sowing from "./components/sowing/Sowing"
    export default {
        name: "Home",
        components:{//注册组件
            Header,
            Sowing
        },
        created() {
            //2.请求网络数据
            getHomeData().then((response)=>{
                console.log(response);
            }).catch(error=>{
                console.log(error);
            })
        }
    }
</script>

<style lang="less" scoped>
    #home{
        width: 100%;
        height: 100%;
        background-color: salmon;
    }
</style>
