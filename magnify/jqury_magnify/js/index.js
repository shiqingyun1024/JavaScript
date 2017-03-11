$(function(){
    // 遍历以便于动态添加参考的小图
    for(var i = 0; i < 5; i++){
        $("#down").append("<li><img src='images/0" + (i+1) + ".jpg'></li>");
    };
    // 给每个小图设置样式
    $("#down li").css({
        display : 'block',
        float : 'left',
        margin : '0 10px',
        border : '1px solid #9521de'
    });
    // 由于需要所以单独给第一个小图设置样式
    $("#down li:first").css({
        marginLeft : '50px',
    });
    $("#small").append("<li><img src='images/01big.jpg'></li>");
    // 根据参考的小图来动态的切换静止的大图
    // 动态的添加大图，用each()方法边遍历添加 与for in作对比
    $("#down").children().each(function(index,element){
        $(this).on("mouseenter",function(){
            $("#small li").remove();
            $("#small").append("<li><img src='images/0"+(index+1)+"big.jpg'></li>");
        });
    });
     // 这一步是所有逻辑关系的重点
    $("#small").on({
        //当放大镜在图上滑动时，会痴线大图进行放大
        mousemove : function(e){
            // 获取放大镜跟随鼠标箭头的位置，记住这个x，y是相对坐标，因为放大镜已经绝对定位
            var y = e.clientY - 1/2 * $("#little").height() - $(".up").offset().top;
            var x = e.clientX -1/2 * $("#little").width() - $(".up").offset().left;
           // 由于放大镜不能脱离small中的图，所以限制它的x，y坐标
            if(x < 0){
                x = 0;
            }
            else if(x > $(this).width() - $("#little").width()){
                x = $(this).width() - $("#little").width()
            }
            if(y < 0){
                y = 0;
            }else if(y > $(this).height() - $("#little").height()){
                y = $(this).height() - $("#little").height()
            }
                $("#little").css({
                    display : 'block',
                    top : y,
                    left : x
                });
            // 开始对放大图的操作
           $("#large").css({
               display : 'block',
           });
            // 添加放大图 利用属性src来进行动态的添加放大图
            var srcs = $("#small li img").attr("src");
           $("#large li").remove();
           $("#large").append("<li><img src='images/00"+srcs.charAt(8)+".jpg'></li>");
            // 设置放大图的x，y的相对坐标
            $("#large li").css({
                position : "absolute",
                top : -$("#large").height() / $(this).height() * y +'px',
                left : -$("#large").width() / $(this).width() * x + 'px'
            });
        },
        mouseout : function(e){
           $("#little").css({
               display : 'none',
           });
            $("#large").css({
                display : 'none',
            });
        },
    });
});
// 代码还可以更简洁一些，后期需要进一步改进