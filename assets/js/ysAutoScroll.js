
/**
 * 封装的一个简单的滚动函数
 *
 * options对象的属性有：
 * duration 默认值：0
 * scrollerSelector 默认值：'.scroller-body'
 * pullDownCallBack 上拉回调函数,参数dom,el,myScroll。
 * ---dom表示滚动模块外层dom对象；
 * ---el表示滚动区块内层dom对象；
 * ---myScroll表示新建的一个iscroll对象。
 * pullUpCallBack  参数和pullDownCallBack的参数相同
 *
 * @method YsAutoScroll
 * @param {String} selector 滚动对象的外层dom选择器
 * @param {Object} options 参数对象
 * @return {Null} 无返回值
 */
function YsAutoScroll(selector,options){
	var defaultConfig={
		duration : 0 ,
		downDomSelector :".pullDown",
		upDomSelector :".pullUp",
		downIconSelector :".pullDownIcon",
		upIconSelector :".pullUpIcon",
		downTextSelector :".pullDownLabel",
		upTextSelector :".pullUpLabel",
		scrollerSelector : '.scroller-body',
        scrollbars: true,//滚动条可见
        fadeScrollbars: true,//滚动条渐隐
        interactiveScrollbars: false,//滚动条可拖动
		pullUpCallBack : function(){},
		pullDownCallBack : function(){}

	}
	options=$.extend({},defaultConfig,options);

	var scrollLimit=40,
	    myScroll,
	    dom,
		pullDownDom,
		pullUpDom,
		downIcon,
		upIcon,
		upText,
		downText,
		pullDownFlag=0,
		pullUpFlag=0;//pullDownFlag和pullUpFlag值为1代表可以刷新

	function autoScroll(selector,options) {
		dom=document.querySelector(selector);
		pullDownDom = document.querySelector(options.downDomSelector);
		pullUpDom = document.querySelector(options.upDomSelector);
		downIcon = pullDownDom.querySelector(options.downIconSelector);
		upIcon = pullUpDom.querySelector(options.upIconSelector);
		upText =  pullUpDom.querySelector(options.upTextSelector);
		downText =  pullDownDom.querySelector(options.downTextSelector);

		pullDownOffset = pullDownDom.offsetHeight;
		pullUpOffset = pullUpDom.offsetHeight;


        $(pullDownDom).hide();
	    myScroll = new IScroll(selector,{
	        probeType: 3,
	        //momentum: false,//关闭惯性滑动
	        mouseWheel: options.mouseWheel,//鼠标滑轮开启
	        scrollbars: options.scrollbars,//滚动条可见
	        fadeScrollbars: options.fadeScrollbars,//滚动条渐隐
	        interactiveScrollbars: options.interactiveScrollbars,//滚动条可拖动
	        shrinkScrollbars: 'scale', // 当滚动边界之外的滚动条是由少量的收缩
	        useTransform: true,//CSS转化
	        useTransition: true,//CSS过渡
	        bounce: true,//反弹
	        freeScroll: false,//只能在一个方向上滑动
	        startX: 0,
	        startY: 0
	    });
	    myScroll.on('scroll',positionJudge);
	    myScroll.on("scrollEnd",action);

		function positionJudge(){
			//下拉
			if(this.y>0){
		    	$(pullDownDom).show();
		    	if(this.y> scrollLimit){
			        $(pullDownDom).addClass("flip");
			        downText.innerHTML = "释放刷新...";
			        pullDownFlag = 1;
			    }
			}
			//上拉
			else if(this.y<0){
		    	$(pullUpDom).show();
		        if(this.y<(this.maxScrollY)){
			        $(pullUpDom).addClass("flip");
			        upText.innerHTML = "释放刷新...";
			        pullUpFlag = 1;
			    }
		    }
		}

		function action(){
		    if(pullDownFlag===1){
		        pullDownAction();
		    }else if(pullUpFlag===1){
		        pullUpAction();
		    }else{
		        $(pullDownDom).hide();
		    }
		}

		function pullDownAction(){
		    $(pullDownDom).removeClass("flip").addClass("loading");
		    downText.innerHTML = "正在加载中...";

		    setTimeout(function(){

				var scrollerDom = dom.querySelector(options.scrollerSelector);
				options.pullDownCallBack(dom,scrollerDom,myScroll);

		        $(pullDownDom).removeClass("loading");
		        downText.innerHTML = "下拉刷新…";
		        $(pullDownDom).hide();
		        myScroll.refresh();
		        pullDownFlag=0;

		    },options.duration);
		}

		function pullUpAction(){
		    $(pullUpDom).removeClass("flip").addClass("loading");
		    upText.innerHTML = "正在加载中...";

		    setTimeout(function(){
				var scrollerDom = dom.querySelector(options.scrollerSelector);
				options.pullUpCallBack(dom,scrollerDom,myScroll);

		        $(pullUpDom).removeClass("loading");
		        upText.innerHTML = "上拉加载更多…";
		        myScroll.refresh();
		        pullUpFlag = 0;
		    },options.duration);
		}

		function updatePosition(){
		    pullDown.innerHTML = this.y>>0;
		}

	}

	document.addEventListener('touchmove', function (e) {
	    e.preventDefault();
	}, false);

    document.addEventListener('DOMContentLoaded', function () {
        setTimeout( autoScroll(selector,options), 10);
    }, false);
}

