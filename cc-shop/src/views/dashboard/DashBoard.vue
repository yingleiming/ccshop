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
            <van-tabbar-item replace to="/dashboard/cart">
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
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "DashBoard",
        data() {
            return {
                active: 0,
                icon: {
                    active: 'https://img.yzcdn.cn/vant/user-active.png',
                    inactive: 'https://img.yzcdn.cn/vant/user-inactive.png'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #dashboard{
        width: 100%;
        height: 100%;
        background-color: blue;
    }
    .van-tabbar--fixed{
        bottom:1rem
    }
</style>
