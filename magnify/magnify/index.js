window.onload = function(){
    function $(id){return document.getElementById(id);};
    var lis = document.getElementsByTagName("li");//在这里用li和img都行
    for(var i = 0; i < lis.length; i++){

        //关键使用了它，自定义函数
        lis[i].index = i;
        lis[i].onmouseover = function() {
            $("up").style.backgroundImage = "url(images/0" + (this.index + 1) + "big.jpg)";
            $("img").src = "images/00" + (this.index + 1) + ".jpg";
            this.style.borderColor = "#2195de";
            this.onmouseout = function(){
                this.style.borderColor = "#ccc";
            };
        };
    };

    //leaderX = 0,targetX = 0,leaderY = 0,targetY = 0,在这里没有用到缓动动画，所以这些就没用到
    var x = 0,y = 0;
    //这个函数是让鼠标在sml上滑动时little和big能够显现出来
    $("up").onmouseover = function(){
        $("little").style.display = "block";
        $("big").style.display = "block";
    }
    //这个函数是让鼠标从sml上滑出时little和big能够隐藏起来
    $("up").onmouseout = function() {
        $("little").style.display = "none";
        $("big").style.display = "none";
    }
    //这个函数是让鼠标在up上移动时，产生一些效果，注意onmousemove和onmouseover的区别 ，一个是移动，一个是滑动
    $("up").onmousemove = function(event){
        var event = event || window.event;//兼容性，所以这样声明
        x = event.clientX - this.offsetParent.offsetLeft - $("little").offsetWidth/2;
        //这样写是以后改变什么参数了，这儿就不用改了，x轴减去盒子离页面左边的距离offsetLeft
        y = event.clientY - this.offsetParent.offsetTop - $("little").offsetHeight/2;
        //  原理同上
        //限定范围，使透明盒子一直在sml这个盒子内
        if(x < 0)
        {
            x = 0;
        }
        else if(x > this.offsetWidth - $("little").offsetWidth)
        {
            x = this.offsetWidth - $("little").offsetWidth;
        }
        //限定范围，使透明盒子一直在sml这个盒子内
        if(y < 0)
        {
            y = 0;
        }
        else if(y > this.offsetHeight - $("little").offsetHeight)
        {
            y = this.offsetHeight - $("little").offsetHeight;
        }
        //下面就是根据上面的值改变定位的值，谁要移动改变谁的定位值。
        $("little").style.left = x+"px";
        $("little").style.top = y+"px";
        $("img").style.left = -$("big").offsetWidth/$("up").offsetWidth*x+"px";
        //这个我要着重写一下，开始不知道怎么让大盒子跟着小盒子里的透明little盒子的位置一直变，而且大盒子的位置变动是相反的
        //记住旁边大盒子的位置是相反的动，为什么呢，不知道，记住原理和算法吧，记住前面加负号
        //用big大盒子的宽高比up小盒子的宽高这样得出比例，就可以根据比例乘以小盒子的移动的xy的值
        //而可以得到big大盒子里面图片img该移动的位置
        $("img").style.top = -$("big").offsetHeight/$("up").offsetHeight*y+"px";
    }
    //    setInterval(function fun(){ //也可以这样写，只不过略显麻烦了
    //        leaderX = leaderX + (targetX - leaderX)/10;
    //        leaderY = leaderY + (targetY - leaderY)/10;
    //        $("little").style.left = leaderX+"px";
    //        $("little").style.top = leaderY+"px";
    //    },10);
}
