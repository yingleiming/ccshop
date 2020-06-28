<template>
    <div id="mineOrder">
        <!--导航栏-->
        <van-nav-bar
                title="我的订单"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        ></van-nav-bar>
        <van-tabs v-model="activeName" style="margin-top: 2.6rem;" title-active-color="#75a342" color="#75a342">
            <van-tab title="全部" name="a">
                <MineOrderItem v-for="(order) in allOrderArr" :order="order" :key="order._id"/>
            </van-tab>
            <van-tab title="待支付" name="b">内容 2</van-tab>
            <van-tab title="待收货" name="c">内容 3</van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import MineOrderItem from "./components/MineOrderItem"
    import {getOrder} from "./../../../service/api/index"
    import {mapState} from "vuex"
    import {Toast} from "vant"
    export default {
        name: "MineOrder",
        data(){
            return{
                activeName : "a",
                allOrderArr:null,//所有的订单
                willOrderArr:null,//所有待支付订单
                payOrderArr:null,//所有已支付订单
            }
        },
        components:{
            MineOrderItem
        },
        computed:{
            ...mapState(["userInfo"])
        },
        mounted() {
            //获取订单数据
            this.initOrder();
        },
        methods:{
            async initOrder(){
                let result = await getOrder(this.userInfo.token);
                console.log(result);
                if(result.success_code === 200){
                    this.allOrderArr = result.data;
                }else {
                    Toast({
                        message :"订单获取失败",
                        duration:600
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #mineOrder{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 120%;
        background-color: #f5f5f5;
        z-index: 200;
    }
</style>
