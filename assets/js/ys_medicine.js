$(function(){

    /*顶部焦点图*/
    new Swiper('#swiper-slide', {
        pagination: '#swiper-slide .swiper-pagination',
        paginationClickable: true,
	    loop : true,
        autoplay: 4000
    });

})






new YsAutoScroll("#scroll-wrap-1",{
    pullDownCallBack : function(dom,el,myScroll){
		var liStr="", i;
		for (i=0; i<3; i++) {
			liStr+='<dl style="line-height:40px;">文字</dl>';
		}
		$(el).prepend(liStr);
    },
    pullUpCallBack: function(dom,el,myScroll){

		var liStr="", i;
		for (i=0; i<3; i++) {
			liStr+='<dl style="line-height:40px;">文字</dl>';
		}
		$(el).append(liStr);

        /*
		$.ajax({
		    type : "get",
		    url : "assets/js/video.json",
		    dataType : "json",
		    success : function(data){   debugger
			    var liStr="";
			    $.each(data,function(index,dom){
			      liStr+='<dl>'+dom.content+'</dl>';
			    })
			    $(el).append(liStr);
		    }
		})
		*/
    }
});
