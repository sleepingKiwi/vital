/*------------------------------------*\
	Vital Documentation Javascript
\*------------------------------------*/

/**
 * Scroll all links that link to a valid hash (not a blank hash).
 */
jQuery(function() {
	jQuery('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				jQuery('html,body').animate({
					scrollTop: target.offset().top - 50
				}, 500);
			return false;
			}
		}
	});
});