
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
    },

    //3.把商品移除购物车
    [REDUCE_CART](state,{goodsId}){
        //拿到购物车中的所有商品
        let shopCart = state.shopCart;
        //拿到单个商品
        let goods = shopCart[goodsId];
        if(goods){//找到该商品
            if(goods["num"]>0){
                goods["num"]--;
                //3.1判断是否为0个
                if(goods["num"]===0){
                    delete shopCart[goodsId];
                }
            }else {
                goods = null;
            }
            //3.2同步数据
            state.shopCart = {...shopCart};
            setStore("shopCart0", state.shopCart)

        }
    }


}
