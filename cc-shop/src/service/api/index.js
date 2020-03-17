import ajax from "./ajax"

//http://demo.itlike.com/web/xlmc/api/homeApi
//http://demo.itlike.com/web/xlmc/api/homeApi/categories
//http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001
//lk001-lk006

//1.定义基础路径
const BASE_URL = "http://demo.itlike.com/web/xlmc/";

export const getHomeData = ()=>ajax(BASE_URL+"api/homeApi");

export const getCategories = ()=>ajax(BASE_URL+"api/homeApi/categories");

export const getCategoriesDetail = (param)=>ajax(BASE_URL+"api/homeApi/categoriesdetail" + param);

//2.用户中心的接口

// http://demo.itlike.com/web/xlmc/api/send_code
// localhost:3000/web/xlmc/api/send_code
const LOCAL_BASIC_URL = "http://demo.itlike.com/web/xlmc/";
//2.1获取短信验证码
export const getPhoneCode = (phone)=>ajax(LOCAL_BASIC_URL+"api/send_code",{phone});

//2.2手机验证码的登陆
export const phoneCodeLogin = (phone,code)=>ajax(LOCAL_BASIC_URL+"api/login_code",{phone,code},"POST");

