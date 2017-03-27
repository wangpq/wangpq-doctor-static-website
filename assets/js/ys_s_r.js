/*绑定数组数据到对象*/
function renderTabTitle(dom,arr){
	for(var i=0,len=arr.length;i<len;i++){
		dom[i].innerHTML=arr[i];
	}
}

$(function(){

    /*顶部焦点图*/
    new Swiper('#swiper-slide', {
        pagination: '#swiper-slide .swiper-pagination',
        paginationClickable: true,
	    loop : true,
        autoplay: 4000
    });

	touch.on('.ys-hd-tab li', 'hold tap doubletap', function(ev){
	    var index=$(this).index();
	    $(this).addClass("active").siblings().removeClass("active");
	    $(".ys-bd-tab").children().eq(index).show().siblings().hide();
	});


})

