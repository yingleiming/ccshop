<template>
    <div id="addAddress">
        <van-nav-bar
            title="添加地址"
            left-arrow
            :fixed=true
            :border=true
            @click-left="onClickLeft"
        ></van-nav-bar>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-set-default
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-detail="onChangeDetail"
            style="margin-top: 3rem;"
        ></van-address-edit>

    </div>
</template>

<script>
    import { Toast } from 'vant';
    import areaList from './../../../../config/area';
    import { addUserAddress } from './../../../../service/api/index';
    import { mapState } from "vuex";
    import PubSub from "pubsub-js"; //引入通知
    export default {
        name: "AddAddress",
        data() {
            return {
                areaList:areaList,
                searchResult : []
            }
        },
        computed:{ //取数据
            ...mapState(["userInfo"])
        },
        methods:{
            //点击了左边
            onClickLeft(){
                this.$router.go(-1);
            },
            async onSave(content) { // content 弹出框插件提供
                if(this.userInfo.token){
                    let result = await addUserAddress(this.userInfo.token,content.name,content.tel,content.province + content.city + content.county,content.addressDetail,content.postalCode,content.isDefault,content.province,content.city,content.county,content.areaCode);
                    // 判断
                    if(result.success_code === 200){
                        Toast({
                            message : "添加地址成功！",
                            duration : 500
                        });
                        this.$router.back();
                        //发起通知
                        PubSub.publish('addAddressSuccess');

                    }else {
                        Toast({
                            message : "添加地址失败",
                            duration : 500
                        });
                    }
                }else {
                    Toast({
                        message : "error",
                        duration : 500
                    });
                }
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            }
        }
    }
</script>

<style scoped>
    #addAddress{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        z-index: 9999;
    }
</style>
