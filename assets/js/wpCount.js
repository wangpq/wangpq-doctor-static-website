;(function($){

"use strict"

function WpCount(element,options){
     this.defaults={
         minValue : 1,
         maxValue : 100,
         disableClass : "disable",
         onChange : function(){}
    }
    this._init.apply(this,arguments);
}

WpCount.prototype={
    vsersion : '0.0.1',
    _init : function(element,options){
        this.dom=element;
        this.element=$(element);
        this.options=$.extend({}, this.defaults, options);
        this.btnSub=this.element.find(".minus");
        this.btnAdd=this.element.find(".add");
        this.input=this.element.find("input");
        this.minValue=this.options.minValue;
        this.maxValue=this.options.maxValue;
        this.val=this.options.minValue;
        this._initParams();
        this._initEvent();
    },
    getOptions : function(){
        return this.options;
    },
    setOptions : function(newOptions){
    },
    _initParams : function(){
        this.value(this.val);
    },
    _initEvent : function(){
       var self=this;
       self.btnSub.off("click").on("click",function(){
           self.val--;
           self.val=self.val<=self.minValue ? self.minValue : self.val;
           self.value(self.val);
           self.autoDisable();
       })
       self.btnAdd.off("click").on("click",function(){
           self.val++;
           self.val=self.val>=self.maxValue ? self.maxValue : self.val;
           self.value(self.val);
           self.autoDisable();
       })
       self.input.off("change").on("change",function(){
           self.val=$(this).val();
           self.val=self.val>=self.maxValue ? self.maxValue : self.val;
           self.value(self.val);
           self.autoDisable();
       })
    },
    autoDisable : function(num){
       if(num){
          this.val=num;
       }
       if(this.val<=this.minValue ){
          this.btnSub.addClass(this.options.disableClass);
          this.btnAdd.removeClass(this.options.disableClass);
       }else if(this.val>=this.maxValue ){
          this.btnAdd.addClass(this.options.disableClass);
          this.btnSub.removeClass(this.options.disableClass);
       }else{
          this.btnAdd.removeClass(this.options.disableClass);
          this.btnSub.removeClass(this.options.disableClass);
       }
    },
    /**
     * value 设置或者获取控件的值，如果有参数，则表示设置控件值，反之，则表示获取控件值
     * @param  {Number} num 设置控件的数值
     * @return {null || Number} 如果有参数，则表示设置控件值；如果没有参数，表示获取控件值
     */
    value : function(num){
       if(num){
           this.val=this.autoGetVal(num);
           this.input.val(this.val);
           this.options.onChange(this.val,this.element);
           this.autoDisable(num);
       }else{
           return this.val;
       }
    },
    autoGetVal : function(num){
        var self=this;
        if(num<=self.minValue){
            self.val=self.minValue;
        }else if(num>=self.maxValue ){
            self.val=self.maxValue;
        }else{
            self.val=num;
        }
        return self.val;
    }
}

$.fn.wpCount = function (option) {
    this.each(function(){
        var $this = $(this)
          , data = $this.data('wpCount')
          , options = typeof option == 'object' && option

        if (!data){
            $this.data('wpCount', (data = new WpCount(this, options)))
        }
    })
};

})(Zepto);