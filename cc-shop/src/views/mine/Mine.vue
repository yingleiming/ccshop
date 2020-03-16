<template>
    <div id="mine">
        <van-nav-bar
            title="我的"
            :fixed=true
            :border="true"
        ></van-nav-bar>
        <van-cell-group style="margin-top: 2.6rem">
            <van-cell
                style="background-color:#2eba5a;color: #ffffff"
                is-link
                :center=true
            >
                <template slot="title">
                    <div class="personMsg">
                        <img src="./images/yjh.png" alt="">
                        <div class="personInfo">
                            <span>撩课-盈雷明</span>
                            <span>微信号：yingleiming</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="label" title="我的订单" value="查看所有的订单" is-link></van-cell>
            <van-grid :column-num="4">
                <van-grid-item
                        v-for="(order,index) in orderData"
                        :key="index"
                        :icon="order.icon"
                        :text="order.title"
                ></van-grid-item>
            </van-grid>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="label" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="label" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
            <van-cell icon="label" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="label" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
            <van-cell icon="label" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem;">
            <van-cell icon="label" title="我的优惠券" value="查看所有的订单" is-link></van-cell>
        </van-cell-group>

    </div>
</template>

<script>
    export default {
        name: "Mine",
        data(){
            return{
                orderData:[
                    {icon:"cart-circle-o",title:"待支付"},
                    {icon:"gift-o",title:"待收货"},
                    {icon:"smile-comment-o",title:"待评价"},
                    {icon:"cash-back-record",title:"售后/退款"},
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    #mine{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
    .van-nav-bar{
        background-color: #3bba63;
    }
    .van-nav-bar__title{
        color: #ffffff;
        font-size: 1.2rem;
    }
    .personMsg{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .personMsg>img{
        width: 4rem;
        height: 4rem;
        border-radius: 2rem;
        border: 0.2rem solid #FFF;
    }
    .personInfo{
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
    }

    .van-icon-label{
        font-size: 1.2rem;
        color: orange;
    }
</style>
