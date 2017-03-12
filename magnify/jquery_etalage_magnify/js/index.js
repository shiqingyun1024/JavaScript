$(function(){
    $("#etalage").etalage({
        thumb_image_width : 450, //缩略图的宽度
        thumb_image_height : 450, //缩略图的高度
        source_image_width : 900, //大图的宽度
        source_image_height : 900, //大图的高度
        zoom_area_width : 500, //放大镜的大小
        zoom_area_height : 500, //放大镜的高度
        zoom_area_distance : 10, //大图显示的位置
        small_thumbs : 5, //略缩图的个数
        smallthumb_inactive_opacity : 0.8, //没有放大镜部分的透明度
        smallthumbs_position : 'left', //略缩图的位置，本例是在左边从上到下排列，默认是在底部从左到右排列
        show_icon: false,
        autoplay: true,//是否自动轮播，默认是true，也就是默认是自动
        keyboard: false,
        zoom_easing: false//淡入淡出效果
    });
});
