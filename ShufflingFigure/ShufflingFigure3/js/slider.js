window.onload = function(){
//第一步获取元素
    function $(id){return document.getElementById(id);}
    var js_slider = $("js_slider");//获取最大的盒子
    var slider_main_block = $("slider_main_block");//图片的父亲
    var imgs = slider_main_block.children;//获得所有的图片组
    var slider_ctrl = $("slider_ctrl");//获得 控制的父盒子

//第二步操作元素
    //生成小span
    for(var i = 0;i < imgs.length;i++){
        var span = document.createElement("span");
        span.className = "slider-ctrl-con";
        span.innerHTML = imgs.length - i;//又是经典的一步，后面可以获取相当于索引号
        slider_ctrl.insertBefore(span,slider_ctrl.children[1]);
    }
    //下面的第一个span，默认颜色蓝色
    var spans = slider_ctrl.children;//获得所有的span
    spans[1].setAttribute("class","slider-ctrl-con current");//增加类名，以前的很多快捷方式都忘了，需要复习一下了
   //相当于 span[1].className = "slider-ctrl-con current"
    var scrollWidth = js_slider.clientWidth;//得到大盒子的宽度 也就是后面动画走的距离
   // 第一张留在中央，其余的放在右边
    for(var i = 1;i<imgs.length;i++)
    {
        imgs[i].style.left = scrollWidth+"px"; //其他人先移动到310的位置
    }
    //遍历三个按钮 （这个案例的第一个核心）
    //spans是8个按钮，它们都是span
    var iNow = 0; //用来控制播放张数
    for(var k in spans){ //k是索引号，记住spans里面存放的是按钮，spans[k]输出的是值，所以spans[0]就是第一个按钮
        spans[k].onclick = function(){
            //alert(this.innerHTML);
            if(this.className == "slider-ctrl-prev")//判断点击的这个是不是slider-ctrl-prev
            {
                //当我们点击的时候，当前的这张图片先慢慢的走到右边，下一张一定先快速的走到左侧（-310）的位置，然后慢慢走到中央
               // alert("你点击了左侧按钮");
                animate(imgs[iNow],{left:scrollWidth});//当前的那张图片慢慢走到scrollWidth的位置上去
                --iNow<0?iNow=imgs.length-1:iNow;//判断iNow的值然后跟imgs的长度相比
                imgs[iNow].style.left = -scrollWidth+"px";//先让盒子迅速走到左边的位置
                animate(imgs[iNow],{left:0});//再让左边位置的盒子来到中央
                setSquare();//调用函数，改变下面方块的颜色
            }
            else if(this.className == "slider-ctrl-next")
            {
                //当我们点击的时候，当前的这张图片先慢慢的走到左边，下一张一定先快速的走到右侧（310）的位置，然后慢慢走到中央
                //alert("你点击了右侧按钮");
                animate(imgs[iNow],{left:-scrollWidth});//当前的那张图片慢慢走到-scrollWidth的位置上去
                //iNow++;//执行完iNow++;之后，iNow=iNow+1;i++是先参加运算然后在自加
                ++iNow>imgs.length-1?iNow=0:iNow;//判断iNow的值然后跟imgs的长度相比
                imgs[iNow].style.left = scrollWidth+"px";//先让盒子走到右边的位置
                animate(imgs[iNow],{left:0});//再让右边位置的盒子来到中央
                setSquare();//调用函数，改变下面方块的颜色
            }
            else
            {
                //alert("你点击了下面的span");
                //这个案例最难的部分来了，下面的小span
                //首先我们要知道我们当前点击的图片是第几张，所以我们要获得当前的索引号
                //alert(this.innerHTML);
                var that = this.innerHTML - 1;//this.innerHTML是一个字符串，但是减1后就变成了数值型，可以试验一下
                //console.log(typeof that);实验以后果然如此变成了数值型
                if(that > iNow)//iNow是当前图片所在的索引号，不过此处有点疑惑,因为iNow初值是0
                {
                   //大于的话，图片应该从右侧传过来，等同于右侧按钮
                    animate(imgs[iNow],{left:-scrollWidth});//当前的那张图片慢慢走到-scrollWidth的位置，即左侧位置
                    imgs[that].style.left = scrollWidth+"px";//先让盒子走到右边的位置
                    //animate(imgs[that],{left:0});//再让右边位置的盒子来到中央
                }
                else if(that < iNow)
                {
                    //小于的话，图片是从左侧传过来，等同于左侧按钮
                    animate(imgs[iNow],{left:scrollWidth});//当前的那张图片慢慢走到scrollWidth的位置上去，即右侧位置
                    imgs[that].style.left = -scrollWidth+"px";//先让盒子迅速走到左边的位置
                   // animate(imgs[that],{left:0});//再让左边位置的盒子来到中央
                }
                //还有一种情况，就是相等的情况,这时索引号相等。因为上面两种情况最后也是animate(imgs[that],{left:0});所以都可以写在最下面
                iNow = that;//索引号相等
                animate(imgs[iNow],{left:0});
                setSquare();//调用函数，改变下面方块的颜色
            }
        }
    }
    //封装一个函数，让这个函数可以改变span小方块的颜色
    function setSquare(){
        //清除所有span的current，留下需要的那一个，即当前的那个
        for(var i = 1;i < spans.length - 1;i++)//首先有方块的span是索引号1到6之间的，0和7都是在图片上的，所以在这里span的范围为1到6
        {
            spans[i].className = "slider-ctrl-con";
        }
        spans[iNow+1].className = "slider-ctrl-con current";//为什么这里iNow加1呢？因为iNow初值是0，而这里span的索引号的范围为1到6
        //iNow为当前图片位置的索引号，它是从0开始的而且最大值为5，span呢，这里对应的索引号必须得加1
    }
    // 定时器部分开始，其实 定时器就是右侧按钮，绝了，真没想到，非常好
    var timer = null;
    timer = setInterval(autoplay,2000);//开启定时器
    function autoplay(){
        //当我们点击的时候，当前的这张图片先慢慢的走到左边，下一张一定先快速的走到右侧（310）的位置，然后慢慢走到中央
        //alert("你点击了右侧按钮");
        animate(imgs[iNow],{left:-scrollWidth});//当前的那张图片慢慢走到-scrollWidth的位置上去
        //iNow++;//执行完iNow++;之后，iNow=iNow+1;i++是先参加运算然后在自加
        ++iNow>imgs.length-1?iNow=0:iNow;//判断iNow的值然后跟imgs的长度相比
        imgs[iNow].style.left = scrollWidth+"px";//先让盒子走到右边的位置
        animate(imgs[iNow],{left:0});//再让右边位置的盒子来到中央
        setSquare();//调用函数，改变下面方块的颜色
    }
    //鼠标经过，定时器停止
    js_slider.onmouseover = function(){
        clearInterval(timer);//关闭定时器
    }
    js_slider.onmouseout = function(){
        clearInterval(timer);//要执行定时器，要先关闭定时器
        timer = setInterval(autoplay,2000);//重新开启定时器
    }
}