$(function(){

	touch.on('.ys-hd-wrap li', 'hold tap doubletap', function(ev){
	    var index=$(this).index();
	    $(this).addClass("active").siblings().removeClass("active");
	    $(".ys-bd-wrap .ys-bd-tab").children().eq(index).show().siblings().hide();
	});

	new YsAutoScroll("scroll-wrap-1",{
	    pullDownCallBack : function(dom,el,myScroll){
			alert("pullDownCallBack");
	    },
	    pullUpCallBack: function(dom,el,myScroll){
			alert("pullUpCallBack");
	    }
	});



})

