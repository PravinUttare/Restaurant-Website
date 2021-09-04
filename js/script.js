var isSplash = -1;
function start(){
	
};
function startF(){	
	setTimeout(function () {
		$('#menu_splash .nav1').css({'marginTop':'-1000px','opacity':'0'}).stop().delay(300).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav2').css({'marginTop':'-1000px','opacity':'0'}).stop().delay(200).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav3').css({'marginTop':'-1000px','opacity':'0'}).stop().delay(100).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav4').css({'marginTop':'-1000px','opacity':'0'}).stop().delay(200).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav5').css({'marginTop':'-1000px','opacity':'0'}).stop().delay(300).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
	}, 200);
};
function showSplash(){
	setTimeout(function () {		
		$('header').stop().animate({'marginTop':'-160px', 'top':'25%'}, 800, "easeOutExpo");

		$('.close').stop().animate({'marginTop':'0px'}, 800, "easeOutExpo");

		$('#menu_splash .nav1').css({'display':'block','marginTop':'-1000px','opacity':'0'}).stop().delay(300).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav2').css({'display':'block','marginTop':'-1000px','opacity':'0'}).stop().delay(200).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav3').css({'display':'block','marginTop':'-1000px','opacity':'0'}).stop().delay(100).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav4').css({'display':'block','marginTop':'-1000px','opacity':'0'}).stop().delay(200).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
		$('#menu_splash .nav5').css({'display':'block','marginTop':'-1000px','opacity':'0'}).stop().delay(300).animate({'marginTop':'0','opacity':'1'},1200,'easeOutBack');
	}, 400);	
};
function hideSplash(){ 
	$('header').stop().animate({'marginTop':'0px', 'top':'90px'}, 800, "easeOutExpo");

	$('.close').stop().animate({'marginTop':'290px'}, 800, "easeOutExpo");

	$('#menu_splash .nav1').stop().delay(300).animate({'marginTop':'1000px','opacity':'0'},800,'easeInExpo', function(){ $(this).css({'display':'none'}); });		
	$('#menu_splash .nav2').stop().delay(200).animate({'marginTop':'1000px','opacity':'0'},800,'easeInExpo', function(){ $(this).css({'display':'none'}); });		
	$('#menu_splash .nav3').stop().delay(100).animate({'marginTop':'1000px','opacity':'0'},800,'easeInExpo', function(){ $(this).css({'display':'none'}); });		
	$('#menu_splash .nav4').stop().delay(200).animate({'marginTop':'1000px','opacity':'0'},800,'easeInExpo', function(){ $(this).css({'display':'none'}); });		
	$('#menu_splash .nav5').stop().delay(300).animate({'marginTop':'1000px','opacity':'0'},800,'easeInExpo', function(){ $(this).css({'display':'none'}); });		
};
function hideSplashQ(){
	$('header').css({'marginTop':'0px', 'top':'90px'});

	$('.close').css({'marginTop':'290px'});

	$('#menu_splash .nav1').css({'marginTop':'-1000px','opacity':'0', 'display':'none'});
	$('#menu_splash .nav2').css({'marginTop':'-1000px','opacity':'0', 'display':'none'});
	$('#menu_splash .nav3').css({'marginTop':'-1000px','opacity':'0', 'display':'none'});
	$('#menu_splash .nav4').css({'marginTop':'-1000px','opacity':'0', 'display':'none'});
	$('#menu_splash .nav5').css({'marginTop':'-1000px','opacity':'0', 'display':'none'});
};

/////////////////////// ready
$(document).ready(function() {
	MSIE8 = ($.browser.msie) && ($.browser.version == 8),
	$.fn.ajaxJSSwitch({
		classMenu:"#menu",
		classSubMenu:".submenu",
		topMargin: 270,//mandatory property for decktop
		bottomMargin: 60,//mandatory property for decktop
		topMarginMobileDevices: 270,//mandatory property for mobile devices
		bottomMarginMobileDevices: 60,//mandatory property for mobile devices
		delaySubMenuHide: 300,
		fullHeight: true,
		bodyMinHeight: 880,
		menuInit:function (classMenu, classSubMenu){
			//classMenu.find(">li").each(function(){
			//	$(">a", this).append("<div class='openPart'></div>");
			//})
		},
		buttonOver:function (item){
            $('>.over1',item).stop().animate({'opacity':'1'},300,'easeOutCubic');            
            $('>.txt1',item).stop().animate({'color':'#ffecd0'},300,'easeOutCubic');
		},
		buttonOut:function (item){
            $('>.over1',item).stop().animate({'opacity':'0'},300,'easeOutCubic');
            $('>.txt1',item).stop().animate({'color':'#f1c990'},300,'easeOutCubic');           
		},
		subMenuButtonOver:function (item){
		},
		subMenuButtonOut:function (item){
		},
		subMenuShow:function(subMenu){        	
        	subMenu.stop(true,true).animate({"opacity":"show"}, 500, "easeOutCubic");
		},
		subMenuHide:function(subMenu){
        	subMenu.stop(true,true).animate({"opacity":"hide"}, 700, "easeOutCubic");
		},
		pageInit:function (pages){
			//console.log('pageInit');
		},
		currPageAnimate:function (page){
			//console.log('currPageAnimate');
			var Delay=400; // default
			if(isSplash==-1){ // on reload				
				hideSplashQ();
				Delay=0;				
			}
			if(isSplash==0){ // on first time click				
				hideSplash();
				Delay=800;
			}
			isSplash = 2;
			
			// animation of current page
			jQuery('body,html').animate({scrollTop: 0}, 0); 
			
			page.css({"left":$(window).width()}).stop(true).delay(Delay).animate({"left":0}, 1000, "easeOutCubic", function (){
					$(window).trigger('resize');
			});    	
		},
		prevPageAnimate:function (page){
			//console.log('prevPageAnimate');
			page.stop(true).animate({"display":"block", "left":-$(window).width()}, 500, "easeInCubic");
		},
		backToSplash:function (){
			//console.log('backToSplash');
			if(isSplash==-1){
				isSplash = 0;
				startF();				
			}
			else{
				isSplash = 0;				
				showSplash();
			};
			$(window).trigger('resize');			      
		},
		pageLoadComplete:function (){
			//console.log('pageLoadComplete');            
    }
	});  /// ajaxJSSwitch end

	////// sound control	
	$("#jquery_jplayer").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"music.mp3"
			});
			//$(this).jPlayer("play");
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
          	var kickoff = function () {
            $("#jquery_jplayer").jPlayer("play");
            document.documentElement.removeEventListener(click, kickoff, true);
         	};
          	document.documentElement.addEventListener(click, kickoff, true);
		},
		
		repeat: function(event) { // Override the default jPlayer repeat event handler				
				$(this).bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
					$(this).jPlayer("play");
				});			
		},
		swfPath: "js",
		cssSelectorAncestor: "#jp_container",
		supplied: "mp3",
		wmode: "window"
	});
	




	

	
	
	
	

	
		
});

/////////////////////// load
$(window).load(function() {	
	setTimeout(function () {					
  		$('#spinner').fadeOut();		
  		$(window).trigger('resize');
  		start();
	}, 100);
	setTimeout(function () {$("#jquery_jplayer").jPlayer("play");}, 2000);	
});
