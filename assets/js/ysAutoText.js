;(function($){
  "use strict"
  var YsAutoText=function(element,options){
    this._init.apply(this,arguments);
  }
  YsAutoText.prototype={
    defaults:{
      animateToName : "slideToLeft",
      animateExitName : "slideExitLeft",
      animateObj : "#ys-wp-box",
      dialogTpl :
        '<div id="ys-wp-box">'+
          '<header class="mui-bar mui-bar-nav">'+
              '<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>'+
              '<span class="mui-pull-right btn-text" id="btn-ok">完成</span>'+
              '<h1 class="mui-title"></h1>'+
          '</header>'+
          '<div class="mui-iframe-wrapper mui-content">'+
          '</div>'+
        '</div>',
      textTpl:
        '<div class="ys-padding">'+
            '<div class="mui-input-row">'+
                '<input type="text" class="mui-input-clear" value="<%= result %>">'+
            '</div>'+
        '</div>',
      radioTpl :
        '<div class="w">'+
          '<div class="mui-card">'+
              '<form class="mui-input-group">'+
                  '<% var item; for(var i=0, length=result.length; i<length; i++) { item=result[i]; %>'+
                  '<div class="mui-input-row mui-radio">'+
                      '<label><%=item.text%></label>'+
                      '<input name="radio1" type="radio" <% if ( item.checked ) { %>checked<% } %> >'+
                  '</div>'+
                  '<%}%>'+
              '</form>'+
          '</div>'+
        '</div>'
    },
    _init:function(element,options){
      this.options=$.extend({}, this.defaults, options);
      this._render();
      this.dom=element;
      this.element=$(element);
      this.animateObj=$(this.options.animateObj);
      this.init();
    },
    _render : function(){
      if($(this.options.animateObj).length>0){
      }else{
        $("body").append(this.options.dialogTpl);
      }
    },
    init : function(){
      this.initEvents();
    },
    initEvents : function(){
      var self=this;
      self.element.find("[data-autotext]").unbind("tap").bind("tap",function(evt){
        $("html,body").css("overflow","hidden");
        var _this=$(this);
        self.animateObj.removeClass().addClass("magictime "+self.options.animateToName);

        var target=_this.find(".target");
        var animateObjBody=self.animateObj.find(".mui-content");
        var animateObjHead=self.animateObj.find(".mui-title");
        var targetoptions= (new Function("return " + _this.attr("data-autotext")) )();
        var dataType=targetoptions.type;
        animateObjHead.html(targetoptions.key);

        if(dataType==="text"){
          animateObjBody.html(self.parseTpl(self.options.textTpl,targetoptions));
        }
        if(dataType==="radio"){
            animateObjBody.html(self.parseTpl(self.options.radioTpl,targetoptions));
        }

        self.animateObj.find("#btn-ok").unbind("tap").bind("tap",function(){
          var value;
          if(dataType==="text")
            value=animateObjBody.find("input").val();
          if(dataType==="radio")
            value=animateObjBody.find(":checked").prev().text();
          _this.find("input").val(value);
          self.animateObj.removeClass().addClass("magictime "+self.options.animateExitName);
          $("html,body").css({"overflow-x":"hidden","overflow-y":"auto"});
        })

        self.animateObj.find(".mui-action-back").unbind("tap").bind("tap",function(){
          self.animateObj.removeClass().addClass("magictime "+self.options.animateExitName);
          $("html,body").css({"overflow-x":"hidden","overflow-y":"auto"});
        })

      })
    },
    parseTpl : function( str, data ) {
        var tmpl = 'var __p=[];' + 'with(obj||{}){__p.push(\'' +
                str.replace( /\\/g, '\\\\' )
                .replace( /'/g, '\\\'' )
                .replace( /<%=([\s\S]+?)%>/g, function( match, code ) {
                    return '\',' + code.replace( /\\'/, '\'' ) + ',\'';
                } )
                .replace( /<%([\s\S]+?)%>/g, function( match, code ) {
                    return '\');' + code.replace( /\\'/, '\'' )
                            .replace( /[\r\n\t]/g, ' ' ) + '__p.push(\'';
                } )
                .replace( /\r/g, '\\r' )
                .replace( /\n/g, '\\n' )
                .replace( /\t/g, '\\t' ) +
                '\');}return __p.join("");',

            /* jsbint evil:true */
            func = new Function( 'obj', tmpl );
        return data ? func( data ) : func;
    }
  }

  $.fn.ysAutoText = function (option) {
    this.each(function(){
      var $this = $(this)
      , data = $this.data('ysAutoText')
      , options = typeof option == 'object' && option

      if (!data){
        $this.data('ysAutoText', (data = new YsAutoText(this, options)))
      }
    })
  };

})(Zepto);
