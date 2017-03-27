$(function(){

    /*顶部焦点图*/
    new Swiper('#swiper-slide', {
        pagination: '#swiper-slide .swiper-pagination',
        paginationClickable: true,
	    loop : true,
        autoplay: 4000
    });

})


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

