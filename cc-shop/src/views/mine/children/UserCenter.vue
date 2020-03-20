<template>
    <div id="userCenter">
        <van-nav-bar
                title="用户中心"
                left-arrow
                :fixed=true
                :border=true
                @click-left="$router.go(-1)"
        ></van-nav-bar>
        <div>
            <button class="logout">退出登陆</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCenter"
    }
</script>

<style scoped>
    #userCenter{
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 200;
        background-color: #f5f5f5;
    }
    /*.logout{*/

    /*}*/
</style>
