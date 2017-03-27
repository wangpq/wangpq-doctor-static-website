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
	    if(index===0){

	    }
	    if(index===1){

	    }
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


new YsAutoScroll("#scroll-wrap-2",{
    pullDownCallBack : function(dom,el,myScroll){
		var liStr="", i;
		for (i=0; i<3; i++) {
			liStr+= '<li class="w">'+
						'<div class="bd">'+
							'<div class="cell">'+
								'<img src="assets/dbImages/ys-doc.jpg" alt="" />'+
							'</div>'+
							'<div class="cell">'+
								'<h2 class="h">'+
									'<span>范佳盈</span>'+
									'<b>心血管内科</b>'+
									'<strong>副主任医师</strong>'+
								'</h2>'+
								'<p class="hospital">首都医科大学附属复兴医院</p>'+
								'<p class="major">冠心病、高血压、心力衰竭、心律失常的诊治</p>'+
							'</div>'+
						'</div>'+
					'</li>';
		}
		$(el).prepend(liStr);
    },
    pullUpCallBack: function(dom,el,myScroll){
		var liStr="", i;
		for (i=0; i<3; i++) {
			liStr+= '<li class="w">'+
						'<div class="bd">'+
							'<div class="cell">'+
								'<img src="assets/dbImages/ys-doc.jpg" alt="" />'+
							'</div>'+
							'<div class="cell">'+
								'<h2 class="h">'+
									'<span>新增范佳盈</span>'+
									'<b>心血管内科</b>'+
									'<strong>副主任医师</strong>'+
								'</h2>'+
								'<p class="hospital">首都医科大学附属复兴医院</p>'+
								'<p class="major">冠心病、高血压、心力衰竭、心律失常的诊治</p>'+
							'</div>'+
						'</div>'+
					'</li>';
		}
		$(el).append(liStr);

    }
});

