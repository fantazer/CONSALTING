$(document).ready(function () {

	//smooth scroll
	$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
	});
	//smooth scroll === end

	//modal
	$('.modal-content').click(function(event){
		event.stopPropagation();
	});
	var scrollPos = 0;

	var openModal = function () {
	if(!$('.modal-layer').hasClass('modal-layer-show')){
		$('.modal-layer').addClass('modal-layer-show');
	}
	 scrollPos = $(window).scrollTop();
		$('body').css({
			overflow: 'hidden',
			position: 'fixed',
			overflowY: 'scroll',
			top : -scrollPos,
			width:'100%'
		});
		return scrollPos;
	};

	var closeModal = function () {
		console.log("scrollPos",scrollPos);
  	$('.modal-layer').removeClass('modal-layer-show');
  	$("body").removeClass("modal-fix");
  	$('body').css({
			overflow: '',
			position: '',
			top: ''
		})
    $(window).scrollTop(scrollPos);
    $('.modal').removeClass('modal__show');
		$('.enter').removeClass('enter--open');
		$('.basket').removeClass('basket--open');
	};

	var initModal = function(el){
		openModal();
		$('.modal').each(function () {
			console.log($(this).data('modal'));
			if ($(this).data('modal')===el){
				$(this).addClass('modal__show')
			} else {
				$(this).removeClass('modal__show')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
		$('.modal-wrap').css('height',modalHeightCont );
		$('.modal-wrap').css('minHeight',modalHeightCont );
	}

	$('.modal-get').click(function (){
		var currentModal = $(this).data("modal");
		initModal(currentModal);
	});

	$('.modal-layer , .modal-close').click(function (){
		closeModal();
	});
	//modal===end
	//validate
	$('.validate-form').each(function() {
		var curentForm = $(this);
    $(this).validate({
    			highlight: function(element) { //даем родителю класс если есть ошибка
							$(element).parent().addClass("field-error");
					},
					unhighlight: function(element) {
							$(element).parent().removeClass("field-error");
					},
		    	rules:{ //правила для полей
						name:{
							required:true,
						},
						phone:{
							required:true,
							minlength:5,
							number:true
						},
						comment:{
							required:true,
							minlength:5,
						},
						agree: {
							required: true
						}
					},
					messages:{
						name:{
							required: 'Обязательное поле',
						},
						phone:{
							required: 'Обязательное поле',
							number:'Введите правильный номер',
							minlength:'Номер должен быть длиннее',
						},
						comment:{
							required: 'Обязательное поле',
							minlength:'Сообщение должно быть длиннее',
						},
						agree:{
							required: 'Необходимо согласие',
						}
					},
					submitHandler : function(form){
						$.ajax({ //отправка ajax
						            type: "POST",
						            //url: "/wp-content/themes/redesign/sender.php",
						            url: "/",
						            data: $(form).serialize(),
						            timeout: 3000,
						          });
							$('.modal-close').click(); // автозакрытие окна
									closeModal();
									initModal("trueMsg");
									setTimeout(function(){
												closeModal();
												$(':input','.validate-form') //очитска формы от данных
												  .not(':button, :submit, :reset, :hidden')
												  .val('')
												  .removeAttr('checked')
												  .removeAttr('selected')
									},2500)

				}
		    });
		});
	//validate===end
		//mobile menu
		$('.menu-toggle').click(function(event){
				event.stopPropagation();
				$(".header-nav").toggleClass("header-nav--open");
				$(".menu-toggle").toggleClass("menu-toggle--close");

		});
		$(".header-nav").on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(".header-nav").removeClass("header-nav--open");
				$(".menu-toggle").removeClass("menu-toggle--close");
		});
		$(".header-nav-close").on("click", function () {
				$(".menu-toggle").removeClass("menu-toggle--close");
				$(".header-nav").removeClass("header-nav--open");
		});
	//slide menu

	var shrinkHeader = 250;
	var heightHeader=$('.header').height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				//$('body').css('paddingTop',heightHeader);
				$('.header').addClass('shrink');
			}
			else {
					$('body').css('paddingTop',0);
					$('.header').removeClass('shrink');
			}
	});

	$(window).resize(function(){
		heightHeader=$('.header').height();
	});



	/* ###### For only ies  ######*/
	//if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
	//	//code
	//}

	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}

	console.log(detectIE());
	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
			'<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
			'</div>');
	}

	//for init SVG 
	svg4everybody();
	// ==== clear storage =====
	localStorage.clear();
	sessionStorage.clear();
	$(window).unload(function () {
		localStorage.clear();
	});
	// ==== clear storage end =====


	/* ###### For SlideToggle Elements  ######*/

	/*var hideToggle = function(targetClick,toggleEl) {
		$(targetClick).click(function(event){
				event.stopPropagation();
				$(toggleEl).slideToggle("fast");
		});
		$(toggleEl).on("click", function (event) {
			event.stopPropagation();
		});
		$(document).on("click", function () {
				$(toggleEl).hide();
		});
	}
	hideToggle('.icon-bars','.top-menu_link');*/

	$('.about').slick({
		slidesToShow: 1,
		autoplay: true,
		speed: 1500,
		vertical: false,
		arrows: false,
		edgeFriction:0.45,
		swipeToSlide:true,
		//fade:true
	});



	$('.slider-control--right').click(function(){
		$(this).closest(".slider-wrap").find(".slider-custom").slick('slickNext');
	});

	$('.slider-control--left').click(function(){
		$(this).closest(".slider-wrap").find(".slider-custom").slick('slickPrev');
	});

	if(document.getElementById("barChart")) {
		function bars1() {
			var barData = {
				labels: ["2012 год", "2013 год", "2014 год", "2015 год", "2016 год", "2017 год"],
				datasets: [
					{
						label: "My First dataset",
						fillColor: "#db0f31",
						strokeColor: "#e1dfdf",
						highlightFill: "#db0f31",
						highlightStroke: "#db0f31",
						data: [90, 80, 64, 56, 42, 27]
					},
					{
						label: "My Second dataset",
						fillColor: "#efefef",
						strokeColor: "#efefef",
						highlightFill: "#efefef",
						highlightStroke: "#efefef",
						data: [40, 47, 59, 68, 74, 95]
					},

				]
			};

			var barOptions = {
				scaleBeginAtZero: true,
				scaleShowGridLines: true,
				scaleGridLineColor: "rgba(0,0,0,.05)",
				scaleGridLineWidth: 1,
				barShowStroke: true,
				barStrokeWidth: 2,
				barValueSpacing: 5,
				barDatasetSpacing: 1,
				pointDotStrokeWidth: 20

			}

			var ctx1 = document.getElementById("barChart").getContext("2d");
			var myNewChart1 = new Chart(ctx1).Bar(barData, barOptions);

		}

		function bars2() {
			var radarData = {
				labels: ["Мониторинг и оценка"
					, "Мониторинг производительности"
					, "Управление эксплуатацией"
					, "Управление оборудованием"
					, "Управление конфигурацией"
					, "Управение инциндентами"
					, "Обучение пользователей"
					, "Управление безопасностью"
					, "Обеспечение непрерывности"
					, "Управление мощностями"
					, "Управление подрядчиками"
					, "Управление сервисами"
					, "Управление тех.инфраструктурой"
					, "Управление приложениями"
					, "Управление проектами"
					, "Управление рисками"
					, "Управление персоналом"
					, "Определение процессов"
					, "Определение плана"
				],
				datasets: [
					{
						label: "My First dataset",
						fillColor: "rgba(220,220,220,0.2)",
						strokeColor: "#db0f31",
						pointColor: "#db0f31",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(220,220,220,1)",
						data: [76, 81, 84, 80, 72, 78, 83, 72, 78, 83, 72, 78, 83, 72, 78, 83, 78, 83]
					},
					{
						label: "My Second dataset",
						fillColor: "rgba(164, 180, 243,0.2)",
						strokeColor: "#6078B8",
						pointColor: "#6078B8",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: [32, 37, 28, 24, 39, 26, 32, 39, 28, 22, 34, 26, 34, 31, 23, 21, 32, 26]
					}
				]
			};

			var radarOptions = {
				scaleShowLine: true,
				angleShowLineOut: true,
				scaleShowLabels: false,
				scaleBeginAtZero: true,
				angleLineColor: "rgba(0,0,0,.1)",
				angleLineWidth: 1,
				pointLabelFontFamily: "'Arial'",
				pointLabelFontStyle: "normal",
				pointLabelFontSize: 10,
				pointLabelFontColor: "#666",
				pointDot: true,
				pointDotRadius: 3,
				pointDotStrokeWidth: 1,
				pointHitDetectionRadius: 60,
				datasetStroke: true,
				datasetStrokeWidth: 2,
				datasetFill: true,


			}


			var ctx2 = document.getElementById("radarChart").getContext("2d");
			var myNewChart2 = new Chart(ctx2).Radar(radarData, radarOptions);
		}

		function bars3() {
			var lineData = {
				labels: ["2011 год", "2012 год", "2013 год", "2014 год", "2015 год", "2016 год", "2017 год"],
				datasets: [
					{
						label: "My First dataset",
						fillColor: "rgba(164, 180, 243,0.2)",
						strokeColor: "#6078B8",
						pointColor: "#6078B8",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: [81, 77, 68, 62, 50, 42, 32, 28, 22]
					},
					{
						label: "My Second dataset",
						fillColor: "rgba(250,10,10,0.2)",
						strokeColor: "#db0f31",
						pointColor: "#db0f31",
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: "rgba(151,187,205,1)",
						data: [28, 31, 38, 52, 59, 62, 69]
					}
				]
			};
			var lineOptions = {
				scaleShowLine: true,
				angleShowLineOut: true,
				scaleShowLabels: false,
				scaleBeginAtZero: true,
				angleLineColor: "rgba(0,0,0,.1)",

			}

			var ctx3 = document.getElementById("lineChart").getContext("2d");
			var myNewChart3 = new Chart(ctx3).Line(lineData, lineOptions);


		}

		bars1();
		bars2();
		bars3();
	}

})

//cash SVG

;(function (window, document) {
	'use strict';

	var file = 'img/pack.html',
		revision = 1;

	if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
		return true;

	var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
		request,
		data,
		insertIT = function () {
			document.body.insertAdjacentHTML('afterbegin', data);
		},
		insert = function () {
			if (document.body) insertIT();
			else document.addEventListener('DOMContentLoaded', insertIT);
		};

	if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
		data = localStorage.getItem('inlineSVGdata');
		if (data) {
			insert();
			return true;
		}
	}

	try {
		request = new XMLHttpRequest();
		request.open('GET', file, true);
		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				data = request.responseText;
				insert();
				if (isLocalStorage) {
					localStorage.setItem('inlineSVGdata', data);
					localStorage.setItem('inlineSVGrev', revision);
				}
			}
		}
		request.send();
	}
	catch (e) {
	}

}(window, document));