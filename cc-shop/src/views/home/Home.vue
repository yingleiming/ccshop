<template>
    <div id="home">
        <Header />
    </div>
</template>

<script>
    //1.引入
    import {getHomeData} from "./../../service/api/index"
    //2.引入Header
    import Header from "./components/Header"
    export default {
        name: "Home",
        components:{//注册组件
            Header,

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
