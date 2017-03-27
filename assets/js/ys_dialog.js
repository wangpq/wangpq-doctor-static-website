;(function($){

"use strict"

function Dialog(element,options){
     this.defaults={
        tapHide : true,
        headHtml : "",
        bodyHtml : "",
        footHtml : ""
    }
    this._init.apply(this,arguments);
}

Dialog.prototype={
    vsersion : '0.0.1',
    template :
        '<div class="dialog-mask">'+
            '<div class="w">'+
                '<div class="dialog-wrap">'+
                    '<div class="head">'+
                    '</div>'+
                    '<div class="body">'+
                    '</div>'+
                    '<div class="foot">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>',
    _init : function(element,options){
        this.dom=element;
        this.element=$(element);

        this.options=$.extend({}, this.defaults, options);

        this._initPlugin();
        this._initEvents();
    },
    _initPlugin : function(){
        var self=this;
        $("body").append(self.template);
        self.dialogMask=$(".dialog-mask");
        self.dialogHead=self.dialogMask.find(".head");
        self.dialogBody=self.dialogMask.find(".body");
        self.dialogFoot=self.dialogMask.find(".foot");

        self.dialogHead.html(self.options.headHtml);
        self.dialogBody.html(self.options.bodyHtml);
        self.dialogFoot.html(self.options.footHtml);
        self.dialogMask.show();
    },
    _initEvents : function(){
        var self=this;
        self.dialogMask.bind('click', function(e) {
            if(self.options.tapHide){
                var $clicked = $(e.target);
                if (!$clicked.parents().hasClass("dialog-wrap") && !$clicked.hasClass("dialog-wrap") ){
                    self.remove();
                    return false;
                }
            }
        });
    },
    remove: function(){
        this.dialogMask.remove();
    }

}

$.fn.dialog = function (option) {
    this.each(function(){
        var $this = $(this)
          , data = $this.data('dialog')
          , options = typeof option == 'object' && option

        if (!data){
            $this.data('dialog', (data = new Dialog(this, options)))
        }
    })
};

})(Zepto);
