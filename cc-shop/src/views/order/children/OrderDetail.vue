<template>
    <div id="orderDetail">
        <!--导航栏-->
        <van-nav-bar
                title="商品详情"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        ></van-nav-bar>
    </div>
</template>

<script>
    export default {
        name: "OrderDetail"
    }
</script>

<style scoped>
    #orderDetail{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
        z-index: 200;
    }
</style>
