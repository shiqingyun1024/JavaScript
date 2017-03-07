window.onload = function(){
    var top = $("top").offsetHeight;
    var top1 = $("as1").offsetTop;
    var leader = 0,target = 0,timer = null;

//为了不相互干扰，我定义了两组缓动动画的公式
    var lea = 0,tar = 0,tim = null;
    window.onscroll = function(){
//记住scroll()这个函数只有在window.onscroll = function(){里才能应用
        if(scroll().top >= top)
        {
            $("nav").className = "nav current";
            $("close").className = "close show";
        }
        else
        {
            $("nav").className = "nav";
            $("close").className = "close";
        }
        //清除定时器
        clearInterval(timer);
        //重要的一步,目的是为了让广告栏的位置保持不变
        target = scroll().top + top1;
        //开启定时器
        timer = setInterval(function(){
            leader = leader + (target - leader)/10;//缓动公式
            $("as1").style.top  = leader+"px";//让广告栏的top值保持不变
            // $("as2").style.top  = leader+"px";
        },10);
        scroll().top > 400?$("back").className = "back current1":$("back").className = "back";
        // ?:if else语句
        tar = -scroll().top;//定义tar值
    }

    //点击隐藏
    $("close").onclick = function(){
      //还有一点就是一滚动还是会出来不知道怎么彻底隐藏了,以后再完善吧
        $("nav").className = "nav hide";
        $("close").className = "close hide";
    }

    //点击回顶部
    $("back").onclick = function(){
        tim = setInterval(function(){//开启定时器
            lea = lea + (tar - lea)/10;
            window.scrollTo(0,lea);//这一步是关键,记住是整个页面回到顶部
            if (tar == 0)//到顶部的时候清除定时器记住一定用==
            {
                clearInterval(tim);//清除定时器
            }
        },100);
    }
}
