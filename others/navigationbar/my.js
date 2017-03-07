function scroll(){
    if(window.pageYOffset != null)//ie9和其它浏览器
    {
        return{//return后面一定要跟东西，后面不能为空
            left : window.pageXOffset,
            top : window.pageYOffset
//这里相当于var josn = {key:value,key1:value}
        }
    }
    else if(document.compatMode == "CCS1Compat")
//检测是不是怪异模式浏览器也就是没有声明<!DOCTYPE html>，CCS1Compat表示已经声明，BackCompat表示未声明
    {
        return{//火狐和其他浏览器
            left : document.documentElement.scrollLeft,
            top : document.documentElement.scrollTop
        }
    }
    return{//剩下的肯定是怪异模式，同时谷歌浏览器也可以
        left : document.body.scrollLeft,
        top : document.body.scrollTop
    }
}
//window.onscroll = function(){//形式相当于入口函数 window.onload = function(){}
//    console.log(scroll().top);//可以控制台输出看看
//}
function show(obj){return obj.style.display = "block";}
function hide(obj){return obj.style.display = "none";}
function $(id){return document.getElementById(id);}