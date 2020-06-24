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

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" :value=arriveDate is-link @click="showDataPopup"></van-cell>
            <van-cell value="内容" is-link :center=true>
                <!-- 使用 title 插槽来自定义标题 -->
                <template slot="title">
                    <img src="./images/detail1.jpg" alt="" width="30px">
                    <img src="./images/detail1.jpg" alt="" width="30px">
                    <img src="./images/detail1.jpg" alt="" width="30px">
                </template>
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"></van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text" placeholder="选填，请备注您的特殊需求"/>
            </van-cell>
        </van-cell-group>

        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" value="￥50.30"></van-cell>
            <van-cell title="配送费" value="0.00"></van-cell>
        </van-cell-group>

        <van-submit-bar
            :price="3050"
            button-text="提交订单"
            label="实付"
            @submit="onSubmit"
        ></van-submit-bar>

        <!--弹出日期组件-->
        <van-popup
            v-model="dataShow"
            round
            position="bottom"
        >
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                :min-date="minDate"
                :max-date="maxDate"
                @cancel="onDateCancel"
                @confirm="onDateConfirm"
            ></van-datetime-picker>
        </van-popup>

        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import Monment from "moment";
    export default {
        name: "Order",
        data(){
            return {
                //1.地址  后续再做


                //2.日期
                dataShow:false,
                minDate: new Date(),
                maxDate: new Date(2020, 10, 1),
                currentDate: new Date(),
                arriveDate:"请选择送达时间"
            }
        },
        methods:{
            //点击了左边
            onClickLeft(){
                this.$router.back();
            },
            //选择地址
            chooseAddress(){
                this.$router.push("/confirmOrder/MyAddress")
            },
            onSubmit(){
                alert(0);
            },
            //展示日期组件
            showDataPopup(){
                this.dataShow = true
            },
            //取消日期组件
            onDateCancel(){
                this.dataShow = false
            },
            //确认日期组件
            onDateConfirm(val){
                this.dataShow = false;
                this.arriveDate = Monment(val).format('YYYY-MM-DD hh:mm');
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
    /*转场动画*/
    .router-slide-enter-active,.router-slide-leave-active{
        transition: all 0.5s;
    }
    .router-slide-enter,.router-slide-leave{
        transform: translate3d(2rem,0,0);
        opacity: 0;
    }
    input{
        outline: none;
        border: 0;
    }
</style>
