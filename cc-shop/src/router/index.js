import Vue from "vue"
import Router from "vue-router"

//引入一级路由
import dashboard from "./../views/dashboard/DashBoard"
//路由懒加载
const Cart = ()=>import("./../views/cart/Cart")
const Category = ()=>import("./../views/category/Category")
const Home = ()=>import("./../views/home/Home")
const Mine = ()=>import("./../views/mine/Mine")

Vue.use(Router);

export default new Router({
    routes:[
        { path:"/",redirect:"/dashboard" },
        {
            path:"/dashboard",
            name:"dashboard",
            component:dashboard,
            children:[
                {path:"/dashboard",redirect:"/dashboard/home"},
                {path:"home",name:"home",component:Home},
                {path:"cart",name:"cart",component:Cart},
                {path:"category",name:"category",component:Category},
                {path:"mine",name:"mine",component:Mine},
            ]
        }
    ]
});
