if (location.protocol != "file:") {
    var siteHref = document.location.href, 
	sitePath = location.pathname.slice(0, location.pathname.lastIndexOf("/") + 1),
	ieVersion = /*@cc_on (function() {switch(@_jscript_version) {case 1.0: return 3; case 3.0: return 4; case 5.0: return 5; case 5.1: return 5; case 5.5: return 5.5; case 5.6: return 6; case 5.7: return 7; case 5.8: return 8; case 9: return 9; case 10: return 10;}})() || @*/ 0,
	hashString = (window.navigator.userAgent.indexOf('MSIE')!= -1 && ieVersion<10)?"/#/":"?";
	
    if (siteHref.lastIndexOf(".html") != -1 && siteHref.lastIndexOf("/?") == -1 && siteHref.lastIndexOf("/#") == -1 && siteHref.lastIndexOf("index.") == -1 || siteHref.lastIndexOf(".htm") != -1 && siteHref.lastIndexOf("/?") == -1 && siteHref.lastIndexOf("/#") == -1 && siteHref.lastIndexOf("index.") == -1 || siteHref.lastIndexOf(".php") != -1 && siteHref.lastIndexOf("/?") == -1 && siteHref.lastIndexOf("/#") == -1 && siteHref.lastIndexOf("index.") == -1) {
		document.location.href = siteHref.slice(0, siteHref.lastIndexOf("/"))+hashString+siteHref.slice(siteHref.lastIndexOf("/") + 1, siteHref.length);
    }else{
 	 	  document.write('<script type="text/javascript" src="js/history.min.js?type=/&redirect=true&basepath=' + sitePath + '"></script>');
	}
}
