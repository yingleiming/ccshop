<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide>I'm Slide 1</swiper-slide>
        <swiper-slide>I'm Slide 2</swiper-slide>
        <swiper-slide>I'm Slide 3</swiper-slide>
        <swiper-slide>I'm Slide 4</swiper-slide>
        <swiper-slide>I'm Slide 5</swiper-slide>
        <swiper-slide>I'm Slide 6</swiper-slide>
        <swiper-slide>I'm Slide 7</swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: "Sowing",
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    // some swiper options/callbacks
                    // 所有的参数同 swiper 官方 api 参数
                    // ...
                    notNextTick:true,
                    //分页
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    //循环
                    loop: true,
                    //自动切换
                    autoplay: {
                        delay: 1000,
                    },
                    //速度
                    speed:500,
                    //滑动后回调函数
                    on:{
                        slideChangeTransitionEnd(){
                            console.log(this.activeIndex);
                        },
                    }


                }
            }
        }
    }
</script>

<style scoped>
    #swiper{
        width: 100%;
        height: 150px;
        background: #ffffff;
    }
</style>
