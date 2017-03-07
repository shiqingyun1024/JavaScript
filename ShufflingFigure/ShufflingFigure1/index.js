function animate(obj,target){
    // 先清除定时器
    clearInterval(obj.timer);

    // 用来判断 应该 +  还是 -
    var speed = obj.offsetLeft < target ? 15 : -15;

    obj.timer = setInterval(function() {
        // 因为他们的差值不会超过5
        var result = target - obj.offsetLeft;
        obj.style.left = obj.offsetLeft + speed + "px";
        // 如果差值不小于 5 说明到位置了
        if(Math.abs(result)<=15)
        {
            clearInterval(obj.timer);
            // 有5像素差距   我们直接跳转目标位置
            obj.style.left = target + "px";
        }
    },10);
}

window.onload = function() {
    // 获取元素
    var box = document.getElementById("all");  // 大盒子
    var ul = document.getElementById("ul");
    var ulLis = ul.children;

    // 操作元素

    // 因为我们要做无缝滚动  ，所以要克隆第一张，放到最后一张后面去
    // a.appendchild(b)   把 b 放到 a 的最后面
    // 1. 克隆完毕
    ul.appendChild(ul.children[0].cloneNode(true));

    // 2. 创建 ol  和  小 li
    console.log(ulLis.length);
       // 生成的是ol
    var ol = document.createElement("ol");
       // 把ol 追加到  box 里面
    box.appendChild(ol);
    for(var i=0;i<ulLis.length-1;i++)
    {
        var li = document.createElement("li");
        //  给里面小的li 文字  1 2 3 4 5
        li.innerHTML = i + 1;
        // 添加到 ol 里面
        ol.appendChild(li);
    }
    ol.children[0].className = "current";

    //3. 开始动画部分
    var olLis = ol.children;
    for(var i=0; i<olLis.length;i++)
    {
        // 获得当前第几个小li 的索引号
        olLis[i].index = i;
        olLis[i].onmouseover = function() {
            for(var j=0;j<olLis.length;j++)
            {
                // 所有的都要清空
                olLis[j].className = "";
            }
            this.className = "current";
            animate(ul,-this.index*500)
            // 调用动画函数  第一个参数  谁动画     第二个  走多少
            square = key = this.index;  // 当前的索引号为主
        }
    }
    //  4. 添加定时器
    var timer = null;   // 轮播图的定时器
    var key = 0;  //控制播放张数
    var square = 0; // 控制小方块
    timer = setInterval(autoplay,1000);  // 开始轮播图定时器
    function autoplay() {
        key++;  // 先 ++
        if(key>ulLis.length - 1)  // 后判断
        {
            ul.style.left = 0;  // 迅速调回
            key = 1;  // 因为第6张就是第一张  第6张播放 下次播放第2张
        }
        animate(ul,-key*500);  // 再执行
        // 小方块
        square++;
        if(square > olLis.length -1)
        {
            square = 0;
        }
        for(var i=0;i<olLis.length;i++)   // 先清除所有的
        {
            olLis[i].className = "";
        }
        olLis[square].className = "current";  // 留下当前的
    }
    //last最后  鼠标经过大盒子要停止定时器
    box.onmouseover = function() {
        clearInterval(timer);
    }
    box.onmouseout = function() {
        timer = setInterval(autoplay,1000);  // 开始轮播图定时器
    }
}
