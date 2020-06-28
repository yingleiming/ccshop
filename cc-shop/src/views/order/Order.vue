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
        <!--送达时间-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="送达时间" :value="arriveDate" is-link @click="showDataPopup"></van-cell>
            <router-link :to="{ path:'/confirmOrder/OrderDetail'}">
                <van-cell :value=" `共${goodsCount}件` " is-link :center=true>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <img v-for="(goods,index) in threeShopCart" :src="goods.small_image" :key="index" width="30px" />
                    </template>
                </van-cell>
            </router-link>
        </van-cell-group>
        <!--支付方式-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="支付方式" value="微信"></van-cell>
        </van-cell-group>
        <!--备注-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="备注">
                <input type="text" style="text-align: right" placeholder="选填，请备注您的特殊需求" v-model="notice"/>
            </van-cell>
        </van-cell-group>
        <!--费用-->
        <van-cell-group style="margin-top: 0.6rem">
            <van-cell title="商品金额" :value="`￥${totalPrice}`"></van-cell>
            <van-cell title="配送费" :value="`￥${disPrice}`"></van-cell>
        </van-cell-group>

        <van-submit-bar
            :price="(totalPrice+disPrice)*100"
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
    import { mapState } from "vuex"
    import { Toast } from "vant"
    import { postOrder,createOrderSuccess,getWXCode,queryPayStatus,getAllSelectedGoods } from "./../../service/api/index"
    export default {
        name: "Order",
        data(){
            return {
                //1.地址  后续再做

                address_id: null,
                //2.日期
                dataShow:false,
                minDate: new Date(),
                maxDate: new Date(2020, 10, 1),
                currentDate: new Date(),
                //3.送达时间
                arriveDate:"请选择送达时间",
                //4.备注
                notice:null,

            }
        },
        computed:{
            ...mapState(["shopCart","userInfo"]),//取数据
            //1.商品总件数
            goodsCount(){
                let selectedGoodsCount = 0;
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if(goods.checked){
                        selectedGoodsCount += 1;
                    }
                });
                return selectedGoodsCount;
            },
            //2.商品总价
            totalPrice(){
                let totalPrice = 0;
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if(goods.checked){
                        totalPrice += goods.num*goods.price;
                    }
                });
                return totalPrice;
            },
            //3.取出选中的前三件商品
            threeShopCart(){
                let shopCart = [];
                Object.values(this.shopCart).forEach((goods,index)=>{
                    if(goods.checked){
                        shopCart.push(goods);
                    }
                });
                return shopCart.slice(0,3);
            },
            //5.配送费 >40元免配送费；<40元 配送费6元
            disPrice(){
                if(this.totalPrice>40){
                    return 0;
                }else {
                    return 6;
                }
            }
        },
        methods:{
            // 1.点击了左边
            onClickLeft(){
                this.$router.back();
            },
            // 2.选择地址
            chooseAddress(){
                this.$router.push("/confirmOrder/MyAddress")
            },
            // 3.提交订单
            async onSubmit(){
                //3.1数据验证
                // if(!this.address_id){
                //     Toast({
                //         message :"请选择收货地址",
                //         duration : 500
                //     });
                //     return;
                // }

                if(this.arriveDate === "请选择送达时间"){
                    Toast({
                        message :"请选择送达时间",
                        duration : 500
                    });
                    return;
                }

                if(!this.notice){
                    Toast({
                        message :"请添加注意事项",
                        duration : 500
                    });
                    return;
                }
                //3.2处理订单相关
                if(this.userInfo.token){
                    //3.2.1查询所有已经被选中的商品
                    let goodsResult = await getAllSelectedGoods(this.userInfo.token);
                    // console.log(goodsResult);
                    //3.2.2创建订单
                    if(goodsResult.success_code === 200){
                        let orderResult = await postOrder(this.userInfo.token, this.address_id, this.arriveDate, goodsResult.data, this.notice, this.totalPrice, this.disPrice)
                        console.log(orderResult);
                        //3.2.3删除已经生成订单的商品 delAllSelectedGoods

                    }else{
                        Toast({
                            message :"获取订单商品失败",
                            duration : 500
                        });
                    }
                }

            },
            // 4.展示日期组件
            showDataPopup(){
                this.dataShow = true
            },
            // 5.取消日期组件
            onDateCancel(){
                this.dataShow = false
            },
            // 6.确认日期组件
            onDateConfirm(val){
                this.dataShow = false;
                this.arriveDate = Monment(val).format('YYYY-MM-DD hh:mm');
            },

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
