$(function(){
	var $search = $('#search');
	var $headerItems = $('#nav .header-item');
	var $noticeItems = $('#notice-info-item a');
	var $headerLis = $('#header-color li');
	var $nav = $('#nav');
	var $contentNav = $('#content-nav-title');
	for(var i=0; i<$headerLis.length; i++){
		$headerLis.eq(i).css({
			backgroundPosition : 'top 0px left ' + -$headerLis.eq(0).outerWidth(true) * i + 'px'
		});
		console.log($headerLis.eq(i));
		console.log($.cookie('color'));
		if($headerLis.eq(i)[0].title == $.cookie('color')){
			$headerLis.eq(i).css({
				backgroundPosition : 'top -15px left ' + -$headerLis.eq(0).outerWidth(true) * i + 'px'
			});
		}else if(i == 0 && !$.cookie('color')){
			$headerLis.eq(i).css({
				backgroundPosition : 'top -15px left ' + -$headerLis.eq(0).outerWidth(true) * i + 'px'
			});
		}
	}
	/***************header-color*************/
	$nav.css('background-color', $.cookie('color'));	
	$contentNav.css('background-color', $.cookie('color'));
	$headerLis.on('click',function(){
		$.cookie('color', this.title, {expires : 2});
		for(var i=0; i<$headerLis.length; i++){
			$headerLis.eq(i).css({
				backgroundPosition : 'top 0px left ' + -$headerLis.eq(0).outerWidth(true) * i + 'px'
			});
		}
		$(this).css({
			backgroundPosition : 'top -15px left ' + -$headerLis.eq(0).outerWidth(true) * $(this).index() + 'px'
		});
		$nav.css('background-color', this.title);
		$contentNav.css('background-color', this.title);
	});
	/***************搜索框*******************/
	$search.on('focus', function(){
		if(this.value == this.defaultValue){
			this.value = "";
		}
	});
	$search.on('blur', function(){
		if(this.value == ""){
			this.value = this.defaultValue;
		}
	});
	/****************主菜单********************/
	$headerItems.hover(function(){
		$(this).children('.extend-nav').stop().show();
	}, function(){
		$(this).children('.extend-nav').stop().hide();
	});
	/****************热门商品*****************/
	$('.item-sort .promoted').append('<img src="images/hot.gif">');
	/****************banner********************/
	$('#banner-item li').on('mouseenter', function(){
		$(this).addClass('selected').siblings().removeClass('selected');
		$('#banner img').eq($(this).index()).stop().fadeIn().siblings('img').stop().fadeOut();
	});
	/****************最新动态******************/
	$noticeItems.hover(function(e){
		this.defaultTitle = this.title;
		this.title = "";
		$('<div id="toptip">' + this.defaultTitle + '</div>').appendTo('body').css({
			left : e.pageX + 15,
			top :e.pageY +15
		}).show('normal');
	}, function(){
		this.title = this.defaultTitle;
		$('#toptip').remove();
	});
	$noticeItems.on('mousemove', function(e){
		$('#toptip').css({
			left : e.pageX + 15,
			top :e.pageY +15
		});
	});
	var $brandImg = $('#brand-img');
	var $brandLis = $('#brand-img li');
	$('#brand-activities-item li').on('click', function(){
		var index = $(this).index();
		var width = $brandLis.eq(0).outerWidth(true) * 4;
		$(this).addClass('selected').siblings().removeClass('selected');
		$('#brand-img').stop().animate({
			left : -width * index
		});
		return false;
	});
});