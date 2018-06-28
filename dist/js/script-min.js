$(document).ready(function(){function e(){var e=window.navigator.userAgent,o=e.indexOf("MSIE ");if(o>0)return parseInt(e.substring(o+5,e.indexOf(".",o)),10);var t=e.indexOf("Trident/");if(t>0){var a=e.indexOf("rv:");return parseInt(e.substring(a+3,e.indexOf(".",a)),10)}var l=e.indexOf("Edge/");return l>0&&parseInt(e.substring(l+5,e.indexOf(".",l)),10)}function o(){var e={labels:["2012 год","2013 год","2014 год","2015 год","2016 год","2017 год"],datasets:[{label:"My First dataset",fillColor:"#db0f31",strokeColor:"#e1dfdf",highlightFill:"#db0f31",highlightStroke:"#db0f31",data:[90,80,64,56,42,27]},{label:"My Second dataset",fillColor:"#efefef",strokeColor:"#efefef",highlightFill:"#efefef",highlightStroke:"#efefef",data:[40,47,59,68,74,95]}]},o={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,pointDotStrokeWidth:20},t=document.getElementById("barChart").getContext("2d");new Chart(t).Bar(e,o)}function t(){var e={labels:["Мониторинг и оценка","Мониторинг производительности","Управление эксплуатацией","Управление оборудованием","Управление конфигурацией","Управение инциндентами","Обучение пользователей","Управление безопасностью","Обеспечение непрерывности","Управление мощностями","Управление подрядчиками","Управление сервисами","Управление тех.инфраструктурой","Управление приложениями","Управление проектами","Управление рисками","Управление персоналом","Определение процессов","Определение плана"],datasets:[{label:"My First dataset",fillColor:"rgba(220,220,220,0.2)",strokeColor:"#db0f31",pointColor:"#db0f31",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(220,220,220,1)",data:[76,81,84,80,72,78,83,72,78,83,72,78,83,72,78,83,78,83]},{label:"My Second dataset",fillColor:"rgba(164, 180, 243,0.2)",strokeColor:"#6078B8",pointColor:"#6078B8",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(151,187,205,1)",data:[32,37,28,24,39,26,32,39,28,22,34,26,34,31,23,21,32,26]}]},o={scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:60,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0},t=document.getElementById("radarChart").getContext("2d");new Chart(t).Radar(e,o)}function a(){var e={labels:["2011 год","2012 год","2013 год","2014 год","2015 год","2016 год","2017 год"],datasets:[{label:"My First dataset",fillColor:"rgba(164, 180, 243,0.2)",strokeColor:"#6078B8",pointColor:"#6078B8",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(151,187,205,1)",data:[81,77,68,62,50,42,32,28,22]},{label:"My Second dataset",fillColor:"rgba(250,10,10,0.2)",strokeColor:"#db0f31",pointColor:"#db0f31",pointStrokeColor:"#fff",pointHighlightFill:"#fff",pointHighlightStroke:"rgba(151,187,205,1)",data:[28,31,38,52,59,62,69]}]},o={scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)"},t=document.getElementById("lineChart").getContext("2d");new Chart(t).Line(e,o)}$(".modal-content").click(function(e){e.stopPropagation()});var l=0,r=function(){return $(".modal-layer").hasClass("modal-layer-show")||$(".modal-layer").addClass("modal-layer-show"),l=$(window).scrollTop(),$("body").css({overflow:"hidden",position:"fixed",overflowY:"scroll",top:-l,width:"100%"}),l},i=function(){console.log("scrollPos",l),$(".modal-layer").removeClass("modal-layer-show"),$("body").removeClass("modal-fix"),$("body").css({overflow:"",position:"",top:""}),$(window).scrollTop(l),$(".modal").removeClass("modal__show"),$(".enter").removeClass("enter--open"),$(".basket").removeClass("basket--open")},n=function(e){r(),$(".modal").each(function(){console.log($(this).data("modal")),$(this).data("modal")===e?$(this).addClass("modal__show"):$(this).removeClass("modal__show")});var o=$(window).height();$(".modal-filter").height(o),$(".modal-wrap").css("height",o),$(".modal-wrap").css("minHeight",o)};$(".modal-get").click(function(){var e=$(this).data("modal");n(e)}),$(".modal-layer , .modal-close").click(function(){i()}),$(".validate-form").each(function(){$(this);$(this).validate({highlight:function(e){$(e).parent().addClass("field-error")},unhighlight:function(e){$(e).parent().removeClass("field-error")},rules:{name:{required:!0},phone:{required:!0,minlength:5,number:!0},comment:{required:!0,minlength:5},agree:{required:!0}},messages:{name:{required:"Обязательное поле"},phone:{required:"Обязательное поле",number:"Введите правильный номер",minlength:"Номер должен быть длиннее"},comment:{required:"Обязательное поле",minlength:"Сообщение должно быть длиннее"},agree:{required:"Необходимо согласие"}},submitHandler:function(e){$.ajax({type:"POST",url:"/",data:$(e).serialize(),timeout:3e3}),$(".modal-close").click(),i(),n("trueMsg"),setTimeout(function(){i(),$(":input",".validate-form").not(":button, :submit, :reset, :hidden").val("").removeAttr("checked").removeAttr("selected")},2500)}})}),$(".menu-toggle").click(function(e){e.stopPropagation(),$(".header-nav").toggleClass("header-nav--open"),$(".menu-toggle").toggleClass("menu-toggle--close")}),$(".header-nav").on("click",function(e){e.stopPropagation()}),$(document).on("click",function(){$(".header-nav").removeClass("header-nav--open"),$(".menu-toggle").removeClass("menu-toggle--close")}),$(".header-nav-close").on("click",function(){$(".menu-toggle").removeClass("menu-toggle--close"),$(".header-nav").removeClass("header-nav--open")});var s=250,d=$(".header").height();$(window).scroll(function(){var e=$(this).scrollTop();e>=s?$(".header").addClass("shrink"):($("body").css("paddingTop",0),$(".header").removeClass("shrink"))}),$(window).resize(function(){d=$(".header").height()}),console.log(e()),e()<=14&&e()&&($("body").empty(),$("body").prepend('<div class="old-browser"><div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br><div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br></div>')),svg4everybody(),localStorage.clear(),sessionStorage.clear(),$(window).unload(function(){localStorage.clear()}),$(".about").slick({slidesToShow:1,autoplay:!0,speed:1500,vertical:!1,arrows:!1,edgeFriction:.45,swipeToSlide:!0}),$(".slider-control--right").click(function(){$(this).closest(".slider-wrap").find(".slider-custom").slick("slickNext")}),$(".slider-control--left").click(function(){$(this).closest(".slider-wrap").find(".slider-custom").slick("slickPrev")}),document.getElementById("barChart")&&(o(),t(),a())}),function(e,o){"use strict";var t="img/pack.html",a=1;if(!o.createElementNS||!o.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect)return!0;var l,r,i="localStorage"in e&&null!==e.localStorage,n=function(){o.body.insertAdjacentHTML("afterbegin",r)},s=function(){o.body?n():o.addEventListener("DOMContentLoaded",n)};if(i&&localStorage.getItem("inlineSVGrev")==a&&(r=localStorage.getItem("inlineSVGdata")))return s(),!0;try{l=new XMLHttpRequest,l.open("GET",t,!0),l.onload=function(){l.status>=200&&l.status<400&&(r=l.responseText,s(),i&&(localStorage.setItem("inlineSVGdata",r),localStorage.setItem("inlineSVGrev",a)))},l.send()}catch(d){}}(window,document);