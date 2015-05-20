/*------------------------------------*\
    MAIN.JS
\*------------------------------------*/

/**
 * Main.js is where everything comes together.
 * All of our submodules are imported above this file by our build tool 
 * and this is where we initialise things and tell them what to do...
 *
 * -
 *
 * for more detail on structure see the js/structural/vital-closure-pre.js file
 * basically all of our custom code is wrapped in a closure and passed a reference to itself as 'vital'
 *
 * -
 *
 * http://toddmotto.com/mastering-the-module-pattern/
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 * https://carldanley.com/js-revealing-module-pattern/
 */


/**
 * 
 * CONTENTS
 * --------
 *
 * define theBody var
 *
 * page ready class
 *
 * responsive indicator injection - allows accurate js reading of current breakpoint
 *
 * To Top Link
 *
 * Content Listeners - first run of content listeners 
 *      (expandable content clicks)
 *
 * Lazy loading images on scroll - set up scroll event handler
 *
 * svg fallbacks
 *
 * footer promotion
 *
 * Ajax post loading
 *
 * Navigation scripts
 *
 * Window load event scripts
 *
 */




/*------------------------------------*\
    $define theBody var
\*------------------------------------*/
 var theBody = document.querySelector('body');




/*------------------------------------*\
    $page ready class
\*------------------------------------*/
vital.pageReady.init(theBody);




/*------------------------------------*\
    $Responsive Indicator
\*------------------------------------*/
/**
Used to reliably inform us which of our css breakpoints we're in and to make sure js triggers inline with css - the responsive indicator has it's width changed at each breakpoint in css. This method is used due to cross-browser/device inconsistencies with detecting screen widths in js.
*/
var respInd = document.createElement('span');
respInd.className = 'responsive-indicator';
theBody.appendChild(respInd);




/*------------------------------------*\
    $To Top Link
\*------------------------------------*/
vital.scrollToTop.init(theBody);







/*------------------------------------*\
    $Content Listeners
\*------------------------------------*/
/**
 * Initialise content listeners that will need to be reapplied
 */
vital.contentListeners.listen(theBody);





/*------------------------------------*\
    $Lazy loading images on scroll
\*------------------------------------*/
//if( document.querySelectorAll('.data-deferred').length > 0 ){

    window.addEventListener('scroll', function(){
        vital.debouncedEvents.requestAnimationTick('scroll');
    });

    vital.debouncedEvents.requestAnimationTick('scroll');

//}




/*------------------------------------*\
    $svg fallbacks
\*------------------------------------*/
//setup fallbacks for svg if required
//vital.svg.initFallbacks();
/**
 * We're no longer using a js fallback (provisionally) especially because we don't serve js to old
 * browsers any more...
 * instead using the <image> inside inline SVG approach outlined by Amelia Bellamy-Royds here: 
 * https://css-tricks.com/a-complete-guide-to-svg-fallbacks/#fallback-inline-svg-imgtag
 */






/*------------------------------------*\
    $footer promotion        
\*------------------------------------*/
var footerPromotion = document.querySelectorAll('.tando-footer a');
if(footerPromotion.length > 0){
    footerPromotion[0].addEventListener('mouseover', function(e){
        apollo.addClass(document.querySelector('.attribution .promotional'), 'promotional-show');
    });
    footerPromotion[0].addEventListener('mouseout', function(e){
        apollo.removeClass(document.querySelector('.attribution .promotional'), 'promotional-show');
    });
}



/*------------------------------------*\
    $ajax post loading
\*------------------------------------*/
//setup for listeners for the more posts functionality
vital.loadMore.init();



/*------------------------------------*\
    $Navigation - (the main nav menus)
\*------------------------------------*/
//setup various listeners on the navigation(s)
vital.nav.init();



/*------------------------------------*\
    $Window Load Events
\*------------------------------------*/
//any script which needs to wait for -everything- else in the DOM to have loaded
vital.windowLoaded.init();