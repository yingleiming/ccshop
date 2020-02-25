<template>
    <div id="category">
        <!--头部-->
        <Header />
        <!--内容-->
        <div class="listWrapper" v-if="!showLoading">
            <!--左边-->
            <div class="leftWrapper">
                <ul class="wrapper">
                    <li class="categoryItem selected">
                        <span class="textWrapper">推荐</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">安心蔬菜</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">豆制品</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">新鲜水果</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">肉禽蛋</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">海鲜水产</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">乳品烘焙</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">营养早餐</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">叮咚心选</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">米面粮油</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">调味品</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">方便速食</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">冰淇淋</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">酒水饮料</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">休闲零食</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">快手菜</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">南北干货</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">宝宝餐</span>
                    </li>
                    <li class="categoryItem">
                        <span class="textWrapper">厨房用品</span>
                    </li>
                </ul>
            </div>
        </div>
        <van-loading
                v-else
                type="spinner"
                color="#75a342"
                size="24px"
                style="position: absolute;top: 40%;left: 50%;transform: translate(-50%)"
        >
            数据加载中...
        </van-loading>
    </div>
</template>

<script>
    //1.引入组件
    import Header from "./compontents/Header"
    //2.引入滚动组件
    import BScroll from 'better-scroll'
    //3.引入接口
    import {getCategories,getCategoriesDetail} from "./../../service/api/index"

    export default {
        name: "Category",
        data(){
            return{
                //是否显示加载图标
                showLoading:true,
                // 左边列表数据
                categoriesData:[],
                // 右边列表数据
                categoriesDetailData:[],
            }
        },
        components:{
            Header
        },
        created() {
            // 一般在created钩子选项中请求数据
            this.initData();
        },
        methods:{
            // 一般在methods里面写方法
            async initData() {
                //1.获取左边的数据
                let leftRes = await getCategories();
                if(leftRes.success){
                    this.categoriesData = leftRes.data.cate;
                }
                //2.获取右边的数据
                let rightRes = await getCategoriesDetail("/lk001");
                if(rightRes.success){
                    this.categoriesDetailData = rightRes.data.cate;
                }

                //3.隐藏loading框
               this.showLoading = false;

                //4.初始化滚动框架
                this.$nextTick(()=>{
                    this.leftScroll = new BScroll(".leftWrapper",{probeType:3});
                });


            }
        }
    }
</script>

<style lang="less" scoped>
    #category{
        width: 100%;
        height: 100%;
        background-color: #F5F5F5;
        overflow: hidden;
    }
    .leftWrapper{
        display: flex;
        position: absolute;
        top: 2.75rem;
        bottom: 4rem;
    }
    .wrapper {
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
        position: absolute;
        left: 0;
        bottom: 0;
        top: 0;
        width: 5.3125rem;
        background: #F4F4F4;
    }

    .wrapper::-webkit-scrollbar {
        display: none;
    }

    .categoryItem {
        padding: 0.75rem 0;
        border-bottom: solid 1px #E8E9E8;
    }

    .categoryItem .textWrapper {
        line-height: 1.25rem;
        border-left: solid 0.1875rem transparent;
        padding: 0.3125rem 0.6875rem;
        font-size: 0.8125rem;
        color: #666666;
    }
    .categoryItem.selected {
        background: #FFF;
    }

    .categoryItem.selected .textWrapper {
        border-left-color: #3cb963;
        font-weight: bold;
        font-size: 0.875rem;
        color: #333333;
    }

    @media (min-width: 960px) {
        .wrapper {
            border-right: 1px solid #E8E9E8;
        }
        .wrapper .categoryItem {
            background: #fff;
        }
    }
</style>

