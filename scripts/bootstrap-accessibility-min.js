/*! bootstrap-accessibility-plugin - v1.0.4 - 2014-10-25
* https://github.com/paypal/bootstrap-accessibility-plugin
* Copyright (c) 2014 PayPal Accessibility Team; Licensed BSD */
!function($){"use strict";var uniqueId=function(prefix){return(prefix||"ui-id")+"-"+Math.floor(1e3*Math.random()+1)},focusable=function(element,isTabIndexNotNaN){var map,mapName,img,nodeName=element.nodeName.toLowerCase();return"area"===nodeName?(map=element.parentNode,mapName=map.name,element.href&&mapName&&"map"===map.nodeName.toLowerCase()?(img=$("img[usemap='#"+mapName+"']")[0],!!img&&visible(img)):!1):(/input|select|textarea|button|object/.test(nodeName)?!element.disabled:"a"===nodeName?element.href||isTabIndexNotNaN:isTabIndexNotNaN)&&visible(element)},visible=function(element){return $.expr.filters.visible(element)&&!$(element).parents().addBack().filter(function(){return"hidden"===$.css(this,"visibility")}).length};$.extend($.expr[":"],{data:$.expr.createPseudo?$.expr.createPseudo(function(dataName){return function(elem){return!!$.data(elem,dataName)}}):function(elem,i,match){return!!$.data(elem,match[3])},focusable:function(element){return focusable(element,!isNaN($.attr(element,"tabindex")))},tabbable:function(element){var tabIndex=$.attr(element,"tabindex"),isTabIndexNaN=isNaN(tabIndex);return(isTabIndexNaN||tabIndex>=0)&&focusable(element,!isTabIndexNaN)}}),$(".alert").attr("role","alert"),$(".close").removeAttr("aria-hidden").wrapInner('<span aria-hidden="true"></span>').append('<span class="sr-only">Close</span>'),$(".modal-dialog").attr({role:"document"});var modalhide=$.fn.modal.Constructor.prototype.hide;$.fn.modal.Constructor.prototype.hide=function(){var modalOpener=this.$element.parent().find('[data-target="#'+this.$element.attr("id")+'"]');modalhide.apply(this,arguments),modalOpener.focus(),$(document).off("keydown.bs.modal")};var modalfocus=$.fn.modal.Constructor.prototype.enforceFocus;$.fn.modal.Constructor.prototype.enforceFocus=function(){var focEls=this.$element.find(":tabbable"),lastEl=focEls[focEls.length-1];$(document).on("keydown.bs.modal",$.proxy(function(ev){!this.$element.has(ev.target).length&&ev.shiftKey&&9===ev.keyCode&&(lastEl.focus(),ev.preventDefault())},this)),modalfocus.apply(this,arguments)};var $par,firstItem,toggle="[data-toggle=dropdown]",focusDelay=200,menus=$(toggle).parent().find("ul").attr("role","menu"),lis=menus.find("li").attr("role","presentation");lis.find("a").attr({role:"menuitem",tabIndex:"-1"}),$(toggle).attr({"aria-haspopup":"true","aria-expanded":"false"}),$(toggle).parent().on("shown.bs.dropdown",function(){$par=$(this);var $toggle=$par.find(toggle);$toggle.attr("aria-expanded","true"),$toggle.on("keydown.bs.modal",$.proxy(function(){setTimeout(function(){firstItem=$(".dropdown-menu [role=menuitem]:visible",$par)[0];try{firstItem.focus()}catch(ex){}},focusDelay)},this))}),$(toggle).parent().on("hidden.bs.dropdown",function(){$par=$(this);var $toggle=$par.find(toggle);$toggle.attr("aria-expanded","false")}),$(document).on("focusout.dropdown.data-api",".dropdown-menu",function(){var $this=$(this),that=this;setTimeout(function(){$.contains(that,document.activeElement)||($this.parent().removeClass("open"),$this.parent().find("[data-toggle=dropdown]").attr("aria-expanded","false"))},150)}).on("keydown.bs.dropdown.data-api",toggle+", [role=menu]",$.fn.dropdown.Constructor.prototype.keydown);var $tablist=$(".nav-tabs, .nav-pills"),$lis=$tablist.children("li"),$tabs=$tablist.find('[data-toggle="tab"], [data-toggle="pill"]');$tablist.attr("role","tablist"),$lis.attr("role","presentation"),$tabs.attr("role","tab"),$tabs.each(function(){var tabpanel=$($(this).attr("href")),tab=$(this),tabid=tab.attr("id")||uniqueId("ui-tab");tab.attr("id",tabid),tab.parent().hasClass("active")?(tab.attr({tabIndex:"0","aria-selected":"true","aria-controls":tab.attr("href").substr(1)}),tabpanel.attr({role:"tabpanel",tabIndex:"0","aria-hidden":"false","aria-labelledby":tabid})):(tab.attr({tabIndex:"-1","aria-selected":"false","aria-controls":tab.attr("href").substr(1)}),tabpanel.attr({role:"tabpanel",tabIndex:"-1","aria-hidden":"true","aria-labelledby":tabid}))}),$.fn.tab.Constructor.prototype.keydown=function(e){var $items,index,$this=$(this),$ul=$this.closest("ul[role=tablist] "),k=e.which||e.keyCode;if($this=$(this),/(37|38|39|40)/.test(k)){$items=$ul.find("[role=tab]:visible"),index=$items.index($items.filter(":focus")),(38==k||37==k)&&index--,(39==k||40==k)&&index++,0>index&&(index=$items.length-1),index==$items.length&&(index=0);var nextTab=$items.eq(index);"tab"===nextTab.attr("role")&&nextTab.tab("show").focus(),e.preventDefault(),e.stopPropagation()}},$(document).on("keydown.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',$.fn.tab.Constructor.prototype.keydown);var tabactivate=$.fn.tab.Constructor.prototype.activate;$.fn.tab.Constructor.prototype.activate=function(element,container){var $active=container.find("> .active");$active.find("[data-toggle=tab], [data-toggle=pill]").attr({tabIndex:"-1","aria-selected":!1}),$active.filter(".tab-pane").attr({"aria-hidden":!0,tabIndex:"-1"}),tabactivate.apply(this,arguments),element.addClass("active"),element.find("[data-toggle=tab], [data-toggle=pill]").attr({tabIndex:"0","aria-selected":!0}),element.filter(".tab-pane").attr({"aria-hidden":!1,tabIndex:"0"})};var $colltabs=$('[data-toggle="collapse"]');$colltabs.attr({role:"tab","aria-selected":"false","aria-expanded":"false"}),$colltabs.each(function(){var colltab=$(this),collpanel=$(colltab.attr("data-target")?colltab.attr("data-target"):colltab.attr("href")),parent=colltab.attr("data-parent"),collparent=parent&&$(parent),collid=colltab.attr("id")||uniqueId("ui-collapse");$(collparent).find("div:not(.collapse,.panel-body), h4").attr("role","presentation"),colltab.attr("id",collid),collparent&&(collparent.attr({role:"tablist","aria-multiselectable":"true"}),collpanel.hasClass("in")?(colltab.attr({"aria-controls":collpanel.attr("id"),"aria-selected":"true","aria-expanded":"true",tabindex:"0"}),collpanel.attr({role:"tabpanel",tabindex:"0","aria-labelledby":collid,"aria-hidden":"false"})):(colltab.attr({"aria-controls":collpanel.attr("id"),tabindex:"-1"}),collpanel.attr({role:"tabpanel",tabindex:"-1","aria-labelledby":collid,"aria-hidden":"true"})))});var collToggle=$.fn.collapse.Constructor.prototype.toggle;$.fn.collapse.Constructor.prototype.toggle=function(){var href,prevTab=this.$parent&&this.$parent.find('[aria-expanded="true"]');if(prevTab){{var curTab,prevPanel=prevTab.attr("data-target")||(href=prevTab.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""),$prevPanel=$(prevPanel),$curPanel=this.$element;this.$parent}this.$parent&&(curTab=this.$parent.find('[data-toggle=collapse][href="#'+this.$element.attr("id")+'"]')),collToggle.apply(this,arguments),$.support.transition&&this.$element.one($.support.transition.end,function(){prevTab.attr({"aria-selected":"false","aria-expanded":"false",tabIndex:"-1"}),$prevPanel.attr({"aria-hidden":"true",tabIndex:"-1"}),curTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:"0"}),$curPanel.hasClass("in")?$curPanel.attr({"aria-hidden":"false",tabIndex:"0"}):(curTab.attr({"aria-selected":"false","aria-expanded":"false"}),$curPanel.attr({"aria-hidden":"true",tabIndex:"-1"}))})}else collToggle.apply(this,arguments)},$.fn.collapse.Constructor.prototype.keydown=function(e){var $items,index,$this=$(this),$tablist=$this.closest("div[role=tablist] "),k=e.which||e.keyCode;$this=$(this),/(32|37|38|39|40)/.test(k)&&(32==k&&$this.click(),$items=$tablist.find("[role=tab]"),index=$items.index($items.filter(":focus")),(38==k||37==k)&&index--,(39==k||40==k)&&index++,0>index&&(index=$items.length-1),index==$items.length&&(index=0),$items.eq(index).focus(),e.preventDefault(),e.stopPropagation())},$(document).on("keydown.collapse.data-api",'[data-toggle="collapse"]',$.fn.collapse.Constructor.prototype.keydown),$(".carousel").each(function(){var $this=$(this),prev=$this.find('[data-slide="prev"]'),next=$this.find('[data-slide="next"]'),$options=$this.find(".item"),$listbox=$options.parent();$this.attr({"data-interval":"false","data-wrap":"false"}),$listbox.attr("role","listbox"),$options.attr("role","option");var spanPrev=document.createElement("span");spanPrev.setAttribute("class","sr-only"),spanPrev.innerHTML="Previous";var spanNext=document.createElement("span");spanNext.setAttribute("class","sr-only"),spanNext.innerHTML="Next",prev.attr("role","button"),next.attr("role","button"),prev.append(spanPrev),next.append(spanNext),$options.each(function(){var item=$(this);item.attr(item.hasClass("active")?{"aria-selected":"true",tabindex:"0"}:{"aria-selected":"false",tabindex:"-1"})})});var slideCarousel=$.fn.carousel.Constructor.prototype.slide;$.fn.carousel.Constructor.prototype.slide=function(type,next){var $active=this.$element.find(".item.active"),$next=next||$active[type]();slideCarousel.apply(this,arguments),$active.one("bsTransitionEnd",function(){$active.attr({"aria-selected":!1,tabIndex:"-1"}),$next.attr({"aria-selected":!0,tabIndex:"0"})})};var $this;$.fn.carousel.Constructor.prototype.keydown=function(e){$this=$this||$(this),this instanceof Node&&($this=$(this));var index,$ul=$this.closest("div[role=listbox]"),$items=$ul.find("[role=option]"),$parent=$ul.parent(),k=e.which||e.keyCode;/(37|38|39|40)/.test(k)&&(index=$items.index($items.filter(".active")),(37==k||38==k)&&(index--,0>index?index=$items.length-1:($parent.carousel("prev"),setTimeout(function(){$items[index].focus()},150))),(39==k||40==k)&&(index++,index==$items.length?index=0:($parent.carousel("next"),setTimeout(function(){$items[index].focus()},150))),e.preventDefault(),e.stopPropagation())},$(document).on("keydown.carousel.data-api","div[role=option]",$.fn.carousel.Constructor.prototype.keydown)}(jQuery);