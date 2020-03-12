<template>
    <div id="order">
        <van-nav-bar
            title="填写订单"
            left-arrow
            :fixed=true
            :border=true
            @click-left="onClickLeft"
        ></van-nav-bar>
        <!--收货地址-->
        <van-contact-card
                type="add"
                add-text="选择收货地址"
                @click="chooseAddress()"
                style="margin-top: 3rem;"
        ></van-contact-card>
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "Order",
        methods:{
            //点击了左边
            onClickLeft(){
                this.$router.back();
            },
            //选择收获地址
            chooseAddress(){
                this.$router.push("/confirmOrder/MyAddress")
            }
        }
    }
</script>

<style scoped>
    #order{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .router-slide-enter-active,.router-slide-leave-active{
        transition: all 0.5s;
    }
    .router-slide-enter,.router-slide-leave{
        transform: translate3d(2rem,0,0);
        opacity: 0;
    }
</style>
