/*
*Version: 1.1 - last update: 13.02.2013;
*Jquery version: 1.8.3;
*Author: Behaart;
*/
(function($){
	$.fn.ajaxJSSwitch=function(o){
		var customObject={
				contentHolder:".dynamicContent",
				activeClass:"activeLink",
				classMenu:".sf-menu",
				classSubMenu:".sub-menu",
				classSelectMenu:".select-menu",
				mainPage:"index.html",
				hoverClass:"hoverItem",
				webSite:"#wrapper",
				pagesLoader:"#pageLoader",
				topMargin:0,
				bottomMargin:0,
				topMarginMobileDevices:0,
				bottomMarginMobileDevices:0,
				bodyMinHeight:0,
				bodyMinHeightMobileDevices:480,
				fullHeight:false,
				deviceSize:767,
				errorPage:"404.html",
				delaySubMenuHide:0,
				pageInit:function(pages){},
				backToSplash:function(){},
				currPageAnimate:function(page){},
				prevPageAnimate:function(page){},
				pageLoadComplete:function(){},
				menuInit:function(classMenu, classSubMenu){},
				buttonOver:function(item){},
				buttonOut:function(item){},
				subMenuButtonOver:function(item){},
				subMenuButtonOut:function(item){},
				subMenuShow:function(item){},
				subMenuHide:function(item){}
			},
			MSIE9 = ($.browser.msie) && ($.browser.version == 9),
			MSIE8 = ($.browser.msie) && ($.browser.version == 8),
			xhr,
			animationComplete = true,
			currentPage = 0,
			currButton ,
			prevButton,
			contentHeight = 0,
			initLoad = false,
			webSiteHref = window.location.protocol+"//"+window.location.hostname+window.location.pathname,
			minHeight,
			currHref = webSiteHref;
			
		$.extend(customObject, o);
//ajax settings
		$.ajaxSetup({
			type: "get",
			cache:true,
			dataType: "html",
			isLocal:true,
			crossDomain:false
		});
//initialization function	
		init();
		function init(){
//parsing DOM
			if(MSIE9){
				$("html").css({"overflow-y":"scroll", "position":"absolute", "width":"100%"});
			}else{
				$("body").css({"overflow-y":"scroll", "position":"absolute", "width":"100%"});
			}
			$("html, body").css({"height":"100%"});
			if($(customObject.contentHolder).contents().length==0){
				$(customObject.contentHolder).html("<div class='content'></div>");
			}else{
				$(customObject.contentHolder).contents().wrapAll("<div class='content'></div>");
			}
			$(customObject.contentHolder).after($(customObject.contentHolder).clone().html("<div class='content'></div>"));
			$(customObject.webSite).css({"position":"absolute", "width":"100%", "height":"100%", "overflow":"hidden"}).append("<div id='scriptHolder'></div>");
			$(customObject.classSelectMenu).css({display:"none"});
			$(customObject.contentHolder).eq(1).css({visibility:"hidden"});
			if($(customObject.contentHolder).eq(currentPage).find(".content").html().length==0){
				$(customObject.contentHolder).eq(currentPage).css({visibility:"hidden"});
			}
			$("head").append('<style>#wrapper section {overflow:visible!important}</style>')
			minHeight =  customObject.bodyMinHeight;
//call user function			
			customObject.menuInit($(customObject.classMenu), $(customObject.classSubMenu));
			customObject.pageInit($(customObject.contentHolder));
//if request URL - reload page
			if(location.protocol!="file:"){
				if(location.search.replace("/?", "/")){
					var requestUrl = history.location || document.location;
					initLoad = true;
					loadContent(requestUrl.href.replace("/?", "/"), true);
				}else{
					currButton=$("a[href*='"+$(".logo").attr("href")+"']").parent();
					//currButton=$("a[href*='"+$("h1>a").attr("href")+"']").parent();					
					changeActiveButton();
					customObject.backToSplash();
					wrapperResize();
					customObject.pageLoadComplete();
				}
			}
//add events
			$(window).bind('popstate', popStateHcange).bind('resize', wrapperResize)//.scroll(windowScroll);
			$("a", customObject.webSite).live("click", followLink);
			$(".select-menu").live("change", followLink);
			$("#searchButton", ".search").live("click", searchButton);
			$("input[name='s']", ".search").live("keypress", pressKey);
			$("li", customObject.classMenu).hover(menuButtonOver, menuButtonOut).mousedown(menuButtonOver).trigger("mouseout");
			$("*").not("a, li, ul").click('click', function(){})
			customObject.subMenuHide($("li", customObject.classMenu).find(">ul"));
		}
		function followLink(){
			if(location.protocol!="file:"){
				var linkHref,
					hrefDomenSlice,
					hrefDomen,
					followLinkTest,
					linkHrefLower,
					splash;
		
				if($(this).filter("a").length!=0){
					linkHref = this.href;////////////////////////
				}else{
					linkHref = $(this).val();
				}
				if(linkHref.indexOf("#")==-1){
					linkHrefLower = linkHref.toLowerCase();
					followLinkTest = linkHrefLower.indexOf(".html")!=-1 || linkHrefLower.indexOf(".htm")!=-1 || linkHrefLower.indexOf(".php")!=-1;
				 	splash = linkHref!=window.location.href+customObject.mainPage;
					if($(this).parents("form").length==0){
						hrefDomenSlice = linkHref.slice(linkHref.indexOf("://")+3, linkHref.length),
						hrefDomen = hrefDomenSlice.slice(0, hrefDomenSlice.indexOf("/"));
						if(webSiteHref.indexOf(hrefDomen)!=-1 && followLinkTest && linkHref.indexOf("assets")==-1){
							if(linkHref!=currHref && linkHref.indexOf($(">a", currButton).attr("href"))==-1 && animationComplete && splash){
								currHref = linkHref;
								loadContent(linkHref, true);
								if($(this).parents("li", customObject.classMenu).length!=0){
									$(this).addClass(customObject.activeClass);
								}
							}
							return false;
						}
					}else{
						return false;	
					}
				}else{
					return false;
				}
			}	
		}
		function searchButton(){
			if(location.protocol!="file:"){
				if(animationComplete){
					var formAction = $(this).parents("form").attr("action"),
						searchVal = $(this).parents("form").find("input[name='s']").val();	
					$(this).parent().find("input[type=text]").val("Search:");
					currHref = formAction+"?s="+searchVal;
					loadContent(formAction+"?s="+searchVal, true);
				}
				return false;
			}
		}
		function pressKey(e){
			if(location.protocol!="file:"){
				if(e.keyCode==13){
					if(animationComplete){
						var formAction = $(this).parents("form").attr("action"),
							searchVal = $(this).val();	
						$(this).val("Search:").blur();
						loadContent(formAction+"?s="+searchVal, true);
					}
					return false;
				}
			}
		}
		function changeActiveButton(){
			if($("option[value*='"+$(">a", currButton).attr("href")+"']").length==0){
				$("option", ".select-menu").eq(0).attr({"selected":true});
			}else{
				$("option[value*='"+$(">a", currButton).attr("href")+"']").attr({"selected":true});
			}
			if($(">a", prevButton).parents("li", customObject.classMenu).length!=0){
				if($(">a", prevButton).length!=0){
					if(prevButton.parent(customObject.classMenu).length!=0){
						customObject.buttonOut($(">a",prevButton));
					}else{
						customObject.subMenuButtonOut($(">a",prevButton));
					}
					$(prevButton, "ul").find(">a").removeClass(customObject.activeClass);
				}
			}
			if(currButton && currButton!=""){
				currButton = $("ul").find(currButton);
				if($(">a", currButton).parents("li", customObject.classMenu).length!=0){
					if(!$(">a", currButton).hasClass(customObject.activeClass)){
						if(currButton.parent(customObject.classMenu).length!=0){
							customObject.buttonOver($(">a", currButton));
						}else{
							customObject.subMenuButtonOver($(">a", currButton));
						}
						$(">a", currButton).addClass(customObject.activeClass);
					}
				}
			}
		}
		function menuButtonOver(){
			var item = $(">a", this);
			if(!item.hasClass(customObject.activeClass)){
				if(item.parent().parent(customObject.classMenu).length!=0){
					customObject.buttonOver(item);
				}else{
					customObject.subMenuButtonOver(item);
				}
			}
			item.addClass(customObject.hoverClass)
			$(".openSubMenu").removeClass("openSubMenu")
			//customObject.subMenuShow(item.parent().find(">ul"));
			customObject.subMenuShow(item.parent().find(">" + customObject.classSubMenu));			
			//item.parent().find(">ul").addClass("openSubMenu");
			item.parent().find(customObject.classSubMenu).addClass("openSubMenu");
		}
		function menuButtonOut(){
			var item = $(">a", this);
			if(!item.hasClass(customObject.activeClass)){
				if(item.parent().parent(customObject.classMenu).length!=0){
					customObject.buttonOut(item);
				}else{
					customObject.subMenuButtonOut(item);
				}
			}
			setTimeout(function(){
				if(!item.hasClass(customObject.hoverClass)){
					//customObject.subMenuHide(item.parent().find(">ul"));
					customObject.subMenuHide(item.parent().find(">" + customObject.classSubMenu));
					//item.parent().find(">ul").removeClass("openSubMenu");
					item.parent().find(customObject.classSubMenu).removeClass("openSubMenu");
				}
			}, customObject.delaySubMenuHide)
			item.removeClass(customObject.hoverClass)
		}
		function popStateHcange(){
			if(location.protocol!="file:"){
				var requestUrl = history.location || document.location;
				if(!initLoad){
					currHref = window.location.protocol+"//"+window.location.hostname+window.location.pathname;
					loadContent(requestUrl.href.replace("/?", "/"));
				}				
			}
		}
		function loadContent(url, push){
				if(customObject.errorPage!=url){
					currentPage = currentPage==0 ? 1 : 0;
				}
				if (xhr)xhr.abort();
				xhr = $.ajax({
					url: url,
					beforeSend:function(){
						var prevHolder = $(customObject.contentHolder).not($(customObject.contentHolder).eq(currentPage))
						animationComplete = false;
						prevButton = $("."+customObject.activeClass).parent();
						currButton = ""
						if(url.indexOf("search.php")==-1){
							currButton=$("a[href='"+url.slice(url.lastIndexOf("/")+1, url.length)+"']").parent();
						}else{
							currButton = $(".search").find("a");
						}
						$("option", ".select-menu").eq(0).attr({"selected":true});
						changeActiveButton();
						$(customObject.contentHolder).find("*").unbind();
						prevHolder.removeClass("currentHolder")
						customObject.prevPageAnimate(prevHolder);
						prevHolder.queue(prevPageAnonateComplete);
						$(customObject.pagesLoader).stop(true).fadeIn(400);
					},
					success: function(data, textStatus, xhr) {
						var dataPage=$(data),
							titlePage = dataPage.filter("title").text(),
							getContent = dataPage.find(customObject.contentHolder).contents(),
							currentHolder = $(customObject.contentHolder).eq(currentPage);	
						if(url.indexOf("results.php")!=-1){
							getContent = dataPage.filter(customObject.contentHolder).contents();		
						}
						document.title = titlePage;
						if (push){history.pushState(null, null, url)};
						currentHolder.addClass("currentHolder").stop(true).css({visibility:"visible"}).find(".content").html(getContent);
						//customObject.pageLoadComplete();
						
						customObject.currPageAnimate(currentHolder);
						//currentHolder.queue(currPageAnonateComplete);
						animationComplete = true;
						if(url.indexOf("search.php")==-1){
							parseHTML(data);
						}
						$(customObject.pagesLoader).stop(true).fadeOut(400);
						if(webSiteHref==url || url.lastIndexOf(customObject.mainPage)!=-1){
							customObject.backToSplash();
							if(currentHolder.find(".content").html().length==0){
								currentHolder.css({visibility:"hidden"});
							}
						}
						setTimeout(function(){
							currentHolder.find(">.content").bind("resize.rainbows", wrapperResize).trigger("resize.rainbows");
						}, 200)
						setTimeout(function(){
							initLoad = false;
						}, 500)
					},
			  		error:function() {
			  			loadContent(customObject.errorPage, true);
			  		}
				});
		}
		function prevPageAnonateComplete(){
			animationComplete = true;
			$(customObject.contentHolder).not($(customObject.contentHolder).eq(currentPage)).css({visibility:"hidden", height:0}).find(".content").contents().remove();
			customObject.pageLoadComplete();
		}
		function currPageAnonateComplete(){
		}
		function wrapperResize(){
			var margins = customObject.topMargin+customObject.bottomMargin,
				bodyChange = $("body"),
				contentHeight = $(customObject.contentHolder).eq(currentPage).outerHeight(),
				addContentHeight = $(customObject.contentHolder).eq(currentPage).find(">.content").outerHeight()+parseInt($(customObject.contentHolder).eq(currentPage).css("padding-top"))+parseInt($(customObject.contentHolder).eq(currentPage).css("padding-bottom")),
				noFullContent=addContentHeight+margins<$(window).height();
				
			if(MSIE9){
				bodyChange = $("html");
			}
			if($(document).outerWidth()<customObject.deviceSize){
				margins = customObject.topMarginMobileDevices+customObject.bottomMarginMobileDevices;
				minHeight = customObject.bodyMinHeightMobileDevices;
			}else{
				minHeight = customObject.bodyMinHeight
			}
			if(noFullContent && customObject.fullHeight){
				$(customObject.contentHolder).eq(currentPage).height($(window).height()-margins-parseInt($(customObject.contentHolder).eq(currentPage).css("padding-top"))-parseInt($(customObject.contentHolder).eq(currentPage).css("padding-bottom"))-2)
			}else{
				$(customObject.contentHolder).eq(currentPage).height("auto")
				$(customObject.contentHolder).eq(currentPage).parents("section").stop(true).animate({"height":$(customObject.contentHolder).eq(currentPage).find(">.content").outerHeight()}, 500);
			}
			contentHeight = $(customObject.contentHolder).eq(currentPage).outerHeight()+margins;
			if(contentHeight>minHeight){
				if($(document).outerWidth(true)<customObject.deviceSize){
					bodyChange.stop(true).css({"min-height":contentHeight});
				}else{
					bodyChange.stop(true).animate({"min-height":contentHeight}, 600);
				}
			}else{
				bodyChange.stop(true).css({"min-height":minHeight});
			}
		}
		function windowScroll(){
			var bodyChange = $("body");
			if(MSIE9){
				bodyChange  = $("html");
			}
			$("body, html").stop(true, true);
		}
		function parseHTML(data){
			var sliceBody = data.slice(data.indexOf("<body>"), data.lastIndexOf("</body>")), 
				sliceScript = $(sliceBody.slice(sliceBody.indexOf("<script"), sliceBody.lastIndexOf("</script>")+10));
			$("#scriptHolder").html("");
			sliceScript.each(function(){
				var scriptSRC = $(this).attr("src");
				if(scriptSRC){
					if(scriptSRC.indexOf("bootstrap")==-1){
						$("#scriptHolder").append($(this))	
					}	
				}else{
					$("#scriptHolder").append($(this));
				}
			})
		}
	}
})(jQuery)