<template>
    <div id="dashboard">
        <van-tabbar v-model="active">
            <van-tabbar-item replace to="/dashboard/home">
                <span>首页</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item replace to="/dashboard/category">
                <span>分类</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item replace to="/dashboard/cart" :info="goodsNum>0?goodsNum:''">
                <span>购物车</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>
            <van-tabbar-item replace to="/dashboard/mine">
                <span>我的</span>
                <img
                    slot="icon"
                    slot-scope="props"
                    :src="props.active ? icon.active : icon.inactive"
                >
            </van-tabbar-item>

        </van-tabbar>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
    </div>
</template>

<script>
    import {mapState,mapMutations,mapActions} from "vuex"
    import {getGoodsCart} from "./../../service/api/index"
    import {setStore} from "../../config/global";
    export default {
        name: "DashBoard",
        data() {
            return {
                active: Number(sessionStorage.getItem("tabBarActiveIndex")) || 0,
                icon: {
                    active: 'https://img.yzcdn.cn/vant/user-active.png',
                    inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
                }
            }
        },
        // 监视
        watch:{
            active(value){
                this.active = value;
                let tabBarActiveIndex = value>0 ? value: 0;
                sessionStorage.setItem("tabBarActiveIndex",tabBarActiveIndex);

            }
        },
        //计算属性----从vuex中获取的所有数据都放到computed里面
        computed:{
            //取数据
            ...mapState(["shopCart","userInfo"]),
            goodsNum(){
                if(this.shopCart){
                    //总的购物车商品数量
                    let num = 0;
                    // console.log(Object.values(this.shopCart));
                    Object.values(this.shopCart).forEach((goods,index)=>{
                        num += goods.num;
                    });
                    return num;
                }else {
                    return 0;
                }
            }
        },
        methods:{
            ...mapMutations(["INIT_SHOP_CART"]),
            ...mapActions(["reqUserInfo"]),
            async initShopCart(){
                if(this.userInfo.token){//当前用户已经登陆
                    //1.获取当前用户购物车中得商品（服务器端）
                    let result = await getGoodsCart(this.userInfo.token);
                    console.log(result);
                    //2.如果成功
                    if(result.success_code === 200){
                        // this.INIT_SHOP_CART();
                        let cartArr = result.data;
                        let shopCart = {};
                        //2.1 遍历
                        cartArr.forEach((value)=>{
                            shopCart[value.goods_id] = {
                                "num":value.num,
                                "id":value.goods_id,
                                "name":value.goods_name,
                                "small_image":value.small_image,
                                "price":value.goods_price,
                                "checked":true
                            }
                        });
                        //2.2 本地数据同步
                        setStore({'shopCart':shopCart});//先存储到本地
                        this.initShopCart();
                    }

                }
            }
        },
        mounted(){//此钩子，是页面初始化完毕后调用

            //1.自动登陆
            this.reqUserInfo();

            //2.获取购物车的数据
            this.INIT_SHOP_CART();

            this.initShopCart();
        },

    }

</script>

<style lang="less" scoped>
    #dashboard{
        width: 100%;
        height: 100%;
        background-color: transparent;
    }
    .van-tabbar--fixed{
        /*bottom:1rem*/
    }
</style>
