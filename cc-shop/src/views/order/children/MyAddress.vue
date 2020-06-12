<template>
    <div id="myAddress">
        <van-nav-bar
                title="我的地址"
                left-arrow
                :fixed=true
                :border=true
                @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                style="margin-top: 3rem;"
        ></van-address-list>
        <!--一定要有出口出口出口-->
        <transition name="router-slide" mode="out-in">
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
    import { Toast } from 'vant';
    import {getUserAddress} from  './../../../service/api/index';
    import {mapState} from 'vuex';
    import PubSub from "pubsub-js"
    export default {
        name: "MyAddress",
        data() {
            return {
                chosenAddressId: '1',
                list: [],
            }
        },
        computed:{ //计算属性
            ...mapState(["userInfo"])
        },
        mounted(){
            this.initUserAddress();
            //订阅 添加地址成功
            PubSub.subscribe('addAddressSuccess',(msg)=>{

                if(msg === "addAddressSuccess"){
                    this.initUserAddress();
                }
            });
        },
        methods:{
            //点击了左边
            onClickLeft(){
                this.$router.go(-1);
            },
            //新增地址
            onAdd() {
                // Toast('新增地址');
                this.$router.push({
                    path:"/confirmOrder/myAddress/addAddress"
                })
            },
            onEdit(item, index) {
                // Toast('编辑地址:' + index);
                this.$router.push({
                    path:"/confirmOrder/myAddress/editAddress"
                })
            },
            // 获取当前用户的地址
            async initUserAddress(){
                if(this.userInfo.token){ // 处于登陆状态
                    //发起网络请求
                    let result = await getUserAddress(this.userInfo.token);
                    console.log(result);
                    if(result.success_code === 200){
                        //获取地址成功
                        let addressArr = result.data;
                        //先清空
                        this.list = [];
                        addressArr.forEach((address,index)=>{
                            let addObj = {
                                id : String(index+1),
                                name : address.address_name,
                                tel : address.address_phone,
                                address : address.address_area + address.address_area_detail,
                                address_id : address.address_id,
                                user_id : address.user_id,
                            };
                            this.list.push(addObj);
                        });
                    }else {
                        Toast({
                            message : "地址更新失败！",
                            duration : 500
                        });
                    }

                }else{
                    Toast({
                        message : "登陆已过期,请退出登陆！",
                        duration : 500
                    });
                }
            }
        },
        beforeDestroy(){
            //销毁
            PubSub.unsubcribe('addAddressSuccess');
        }
    }

</script>

<style scoped>
    #myAddress{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 200;
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
</style>
