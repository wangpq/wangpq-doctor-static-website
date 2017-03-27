/*一个简单的对话框插件*/
function Dialog(element,options){
    this._init.apply(this,arguments);
}
Dialog.prototype={
    defaults :{
        tapHide : true,
        onAfterDialogInit : function(){}
    },
    _init:function(element,options){
		this.dom=element;
		this.element=$(element);
		this.options=$.extend({}, this.defaults, options);
        this.init();
    },
    init : function(){
        this.dialogShow();
        this.tap();
        this.options.onAfterDialogInit();
    },
    tap : function(){
    	var self=this;
        self.element.bind('click', function(evt) {
            if(self.options.tapHide){
                var $clicked = $(evt.target);
                if (!$clicked.parents().hasClass("dialog-wrap") && !$clicked.hasClass("dialog-wrap") ){
                    self.dialogHide();
                    return false;
                }
            }
        });
    },
    dialogShow : function(){
        this.element.css("display","table");
    },
    dialogHide : function(){
        this.element.css("display","none");
    }
}

/*简单二维码地址和参数组装*/
function QRCode(url,obj){
    var params="",_url="";
    for (key in obj){
        params+="&"+key+"="+obj[key]
    }
    _url=url+"?"+params.substr(1);
    $('#wxErWeiMa').empty().attr("title",_url).qrcode({width: 120, height: 120, text:_url });
}


