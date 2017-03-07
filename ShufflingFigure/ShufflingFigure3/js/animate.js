 // 开始
function animate(obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var flag = true;//停止定时器用的
        for(var attr in json){
            var current = 0;//为了下面給值
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
            //说实在的这一步我有点看不懂了，Math.round是四舍五入函数,主要是考虑到兼容性
            // console.log(current);
            }
            else
            {
                current = parseInt(getStyle(obj,attr));
            }
            var step = (json[attr] - current)/10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(attr == "opacity")//后面不带px单位的单独列出来
            {
                if("opacity" in obj.style)//用in的用法判断在样式中有没有opacity，即查看浏览器是否支持这个属性
                {
                    obj.style.opacity = (current + step)/100;//w3c标准
                }
                else
                {
                    obj.style.filter = "alpha(opacity = "+(current+step)*10+")";//上面step是除以10得到的
                }
            }
            else if(attr == "zIndex")//后面不带px单位的单独列出来
            {
                obj.style.zIndex = json[attr];//记住后面用的是给的值，这个没有给它渐变
            }
            else
            {
                obj.style[attr] = current + step +"px";
            }
            if(current != json[attr])
            {
                flag = false;
            }
        }
        if(flag)
        {
            clearInterval(obj.timer);
            if(fn)
            {
                fn();
            }
        }
    },20);
};
// 考虑到兼容性
function getStyle(obj,attr){
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];
    }
}