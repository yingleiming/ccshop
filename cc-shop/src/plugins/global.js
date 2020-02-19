export const showBack =(callback)=>{
    //1.变量
    let docB = document.documentElement || document.body;
    let oldScrollTop,requestFrame;
    //2.滚动触摸
    document.addEventListener("scroll",()=>{
        showBackFunc();
    },false);
    //3.监听触摸
    document.addEventListener("touchstart",()=>{
        showBackFunc();
    },{passive:true});

    document.addEventListener("touchmove",()=>{
        showBackFunc();
    },{passive:true});

    document.addEventListener("touchend",()=>{
        oldScrollTop = docB.scrollTop;
        moveEnd();
    },{passive:true});


    const moveEnd = ()=>{
        /*
        *处理帧率=====>自动异步刷新
        * 屏幕刷新率 60HZ 1000/60 = 16.7ms
        * 屏幕刷新率 75HZ 1000/75 = 13.3ms
        1）函数节流
        * */
        requestFrame = requestAnimationFrame(()=>{
            if(docB.scrollTop !== oldScrollTop){
                oldScrollTop = docB.scrollTop;
                moveEnd();
            }else {
                cancelAnimationFrame(requestFrame);
            }
            showBackFunc();
        });
    };

    //判断是否到达目标点
    const showBackFunc = ()=>{
        if(docB.scrollTop>=200){
            callback(true);
        }else {
            callback(false);
        }
    };
};







