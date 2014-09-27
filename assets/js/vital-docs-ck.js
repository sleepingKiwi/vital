/*------------------------------------*\
	Vital Documentation Javascript
\*------------------------------------*//**
 * Scroll all links that link to a valid hash (not a blank hash).
 */jQuery(function(){jQuery("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=jQuery(this.hash);e=e.length?e:jQuery("[name="+this.hash.slice(1)+"]");if(e.length){jQuery("html,body").animate({scrollTop:e.offset().top-50},500);return!1}}})});