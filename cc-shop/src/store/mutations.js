
import {
    ADD_GOODS,
    INIT_SHOP_CART
} from "./mutations-type"

import {getStore,setStore} from "./../config/global"
export default {
    //1.往购物车中添加数据
    [ADD_GOODS](state,{goodsId,goodsName,smallImage,goodsPrice}){
        let shopCart = state.shopCart;
        //1.1判断商品是否存在
        if(shopCart[goodsId]){//存在
            shopCart[goodsId]["num"]++;
        }else{//不存在
            shopCart[goodsId] = {
                "num":1,
                "id":goodsId,
                "name":goodsName,
                "small_image":smallImage,
                "price":goodsPrice,
                "checked":true
            }
        }

        //1.2产生新对象
        state.shopCart = {...shopCart};
        //1.3存入本地
        setStore("shopCart",state.shopCart);

    },

    //2.页面初始化，获取购物车的数据（目前本地，最终是要从服务器中获取）
    [INIT_SHOP_CART](state){
        let initCart = getStore("shopCart");
        if(initCart){
            state.shopCart = JSON.parse(initCart);
        }
    }
}
