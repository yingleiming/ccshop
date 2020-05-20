import ajax from "./ajax"

//1.定义基础路径

const BASE_URL = "http://demo.itlike.com/web/xlmc";

export const getHomeData = ()=>ajax(BASE_URL+"/api/homeApi");

export const getCategories = ()=>ajax(BASE_URL+"/api/homeApi/categories");

export const getCategoriesDetail = (param)=>ajax(BASE_URL+"/api/homeApi/categoriesdetail" + param);

//2.用户中心的接口

const LOCAL_BASE_URL = "/api";
//2.1获取短信验证码
export const getPhoneCode = (phone)=>ajax(LOCAL_BASE_URL+"/api/send_code",{phone});

//2.2手机验证码的登陆
export const phoneCodeLogin = (phone,code)=>ajax(LOCAL_BASE_URL+"/api/login_code",{phone,code},"POST");

//2.3用户名和密码登陆
export const pwdLogin = (user_name,user_pwd,captcha)=>ajax(LOCAL_BASE_URL+"/api/login_pwd",{user_name,user_pwd,captcha},"POST");

//2.4 自动登陆
export const getUserInfo = ()=>ajax(LOCAL_BASE_URL+"/api/userinfo");

//2.5 退出登陆
export const getLogOut = ()=>ajax(LOCAL_BASE_URL+"/api/logout");


//3.购物车接口

export const addGoodsToCart = (goods_id,goods_name,goods_price,small_image)=>ajax(LOCAL_BASE_URL + "/api/cart/add",{goods_id,goods_name,goods_price,small_image},"POST");

