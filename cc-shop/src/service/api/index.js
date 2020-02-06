import ajax from "./ajax"
//http://demo.itlike.com/web/xlmc/api/homeApi
//1.定义基础路径
const BASI_URL = "http://demo.itlike.com/web/xlmc/";
export const getHomeData = ()=>ajax(BASI_URL+"api/homeApi");
