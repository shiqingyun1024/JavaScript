$(function(){
    // 遍历动态的添加选择的小图并设置样式
    for(var i = 1; i < 6; i++ ){
        $("#down").append("<li><img src='images/0"+i+".jpg'/></li>");
        $("#down li").css({
            float : 'left',
            margin : '0 10px',
            border : '1px solid #2195de'
        });
        $("#down li").eq(0).css({
            marginLeft : '45px'
        });
    };

    // 通过选择的小图动态的添加相应的需要被被放大的图
    $("#small").append("<li><img src='images/01big.jpg'/></li>");
    $("#down li").each(function(index,element){
        $(this).mouseenter(function(){
            $("#small li").remove();
            $("#small").append("<li><img src='images/0" + (index + 1) + "big.jpg'/></li>");
        })

    });

    // 这是实现放大镜的核心逻辑
    $("#small").on({

        // 主要是移动时出现放大镜并随鼠标的移动而移动，还有放大后的放大图，并且随着鼠标的移动而移动
        mousemove : function(e){
            var x = e.pageX - $(".up").offset().left - 1/2 * $("#little").width();
            var y = e.pageY - $(".up").offset().top - 1/2 * $("#little").height();
            if(x < 0){
                x = 0;
            }else if(x > $(".up").width() - $("#little").width()){
                x = $(".up").width() - $("#little").width();
            }
            if(y < 0){
                y = 0;
            }else if(y > $(".up").width() - $("#little").height()){
                y = $(".up").width() - $("#little").height();
            }

            // 放大镜 并且出现动态的效果
            $("#little").css({
                display : 'block',
                left : x,
                top : y
            });

            // 获取放大后的放大图 并且随着鼠标的移动而移动
            var src = $("#small li img").attr("src");
            $("#large li").remove();
            $("#large").append("<li><img src='images/00" + (src.charAt(8)) + ".jpg'/></li>");
            $("#large").css({
                display : "block"
            });
            $("#large li").css({
                position : 'absolute',
                display : 'block',
                // 注意比例 注意方向
                left : - $("#large").width() / $(".up").width() * x,
                top : - $("#large").height() / $(".up").height() * y
            });
        },

        mouseout : function(){
            $("#little").css({
                display : "none"
            });
            $("#large").css({
                display : "none"
            });

        },
    });
});
