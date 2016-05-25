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
 * CLEAN ME UP
 * ===========
 *
 * There is a lot of js included here by default.
 * remember to pull out anything you don't need!
 * 
 * One day (soon...) we will move to a more sensible modular system/build system
 *
 * that day is not today.
 */








/**
 * GENERAL MODULES
 * ===============
 * Reusable modules or code with minimal tweaks for this specific site
 */
/**
 * define theBody var
 *
 * responsive indicator
 *
 * to top link
 *
 * listener: window load events
 *
 * loading custom fonts and setting html class
 *
 * lazy loading images on scroll
 *
 * detecting and adding classes to 'in y' elements
 *
 * height sizing 
 *
 * adding 'hovered' classes to elements that want them
 *
 * smooth scrolling links
 *
 * navigation - (the main nav menus)
 *
 * adaptive content
 *
 * expandable content - contentListeners
 *
 * adaptive content activator link - contentListeners
 *
 * generic popups - contentListeners
 *
 */
/*------------------------------------*\
    $define theBody var
\*------------------------------------*/
 var theBody = document.querySelector('body');





/*------------------------------------*\
    $responsive indicator
\*------------------------------------*/
/**
 * Used to reliably inform us which of our css breakpoints we're in.
 * makes sure js triggers inline with css.
 *
 * The responsive indicator has it's width changed at each breakpoint in css.
 * Method is used due to cross-browser/device inconsistencies with detecting screen widths in js.
 */
var respInd = document.createElement('span');
respInd.className = 'responsive-indicator';
theBody.appendChild(respInd);






/*------------------------------------*\
    $to top link
\*------------------------------------*/
/**
 * Adding a 'to top' link to the body and making it scroll to the top.
 */
vital.scrollToTop.init(theBody);
    //3rd arg (_priority) optional but defaults to 10 if left out (lower priorities happen earlier)
    //4th arg (_args) is an, also optional, object of options
vital.debouncedEvents.addFunctionOn( 'scroll', vital.scrollToTop.scroll, 10, {debug: false} );







/*------------------------------------*\
    $listener: window load events
\*------------------------------------*/
/**
 * script which needs to wait for -everything- else in the DOM to have loaded...
 * ---
 * - bones gravatars
 */
vital.windowLoaded.init();






/*------------------------------------------------*\
    $loading custom fonts and setting html class
\*------------------------------------------------*/
    //*
    // ** remember to update this with the actual font names used in your theme!
    //*
vital.fontLoader.init();





/*------------------------------------*\
    $lazy loading images on scroll
\*------------------------------------*/
    //loading responsible image elements on scroll events with a fairly low priority.
vital.debouncedEvents.addFunctionOn( 'scroll', vital.responsibleLoader.scroll, 5, {debug: false} );




/*-----------------------------------------------------*\
    $detecting and adding classes to 'in y' elements
\*-----------------------------------------------------*/
    //adding classes to any elements that want to check whether they're within a certain distance 
    //of the viewport in the Y axis
vital.debouncedEvents.addFunctionOn( 'scroll', vital.onscreeny.update, 10, {debug: false} );
vital.debouncedEvents.addFunctionOn( 'resize', vital.onscreeny.update, 10, {debug: false} );






/*------------------------------------*\
    $height sizing 
\*------------------------------------*/
    //forcing viewport height minimums on resize events
vital.debouncedEvents.addFunctionOn( 'resize', vital.forceHeights.resize, 10, {debug: false} );






/*--------------------------------------------------------*\
    $adding 'hovered' classes to elements that want them
\*--------------------------------------------------------*/
vital.hoverWatch.init({debug: false});





/*------------------------------------*\
    $smooth scrolling links
\*------------------------------------*/
vital.contentListeners.addFunction(vital.scrollLinks.init, 10);





/*------------------------------------*\
    $navigation - (the main nav menus)
\*------------------------------------*/
//setup various listeners on the navigation(s)
vital.nav.init();




/*------------------------------------*\
    $adaptive content
\*------------------------------------*/
    //removing default from touch js that prevents text highlighting:
    //http://hammerjs.github.io/tips/
/* global Hammer */
delete Hammer.defaults.cssProps.userSelect;
    
    //initialising all adaptive content
vital.adaptiveContent.init();
    
    //resizing heights of adaptive content on resize events
    //we give a late priority of 20 because this should probably happen after any other loading etc.
    //adjustHeight function doesn't take options so we leave fourth arg blank
vital.debouncedEvents.addFunctionOn('resize', vital.adaptiveContent.adjustHeight, 20 );






/*------------------------------------------*\
    $expandable content - contentListeners
\*------------------------------------------*/
    // contentListeners.addFunction(funk, _priority, _args) takes a function and optional priority
    // and arguments object and adds them to a list of functions which are called whenever we call
    // vital.contentListeners.listen
    // default priority is 10, lower priorities go first!
vital.contentListeners.addFunction(vital.expandable.init, 10);




/*-------------------------------------------------------*\
    $adaptive content activator link - contentListeners
\*-------------------------------------------------------*/
vital.contentListeners.addFunction(vital.adaptiveContentActivators.listen, 10);




/*--------------------------------------*\
    $generic popups - contentListeners
\*--------------------------------------*/
vital.contentListeners.addFunction(vital.popup.init, 10, {debug:false});








/*------------------------------------------------------------------------*\
  ========================================================================
\*------------------------------------------------------------------------*/







/**
 * SITE SPECIFIC
 * =============
 * These modules aren't generic
 * generally they apply to specific pages or elements that are unique to this site.
 */
/**
 * 
 * ajax post loading
 * 
 * footer promotion        
 *
 */

/*------------------------------------*\
    $ajax post loading
\*------------------------------------*/
//setup for listeners for the more posts functionality
vital.loadMore.init();

/*------------------------------------*\
    $footer promotion        
\*------------------------------------*/
var footerPromotion = document.querySelectorAll('.tando-footer a');
if(footerPromotion.length > 0){
    footerPromotion[0].addEventListener('mouseover', function(e){
        apollo.addClass(document.querySelector('.attribution .promotional'), 'promotional-show');
    }, false);
    footerPromotion[0].addEventListener('mouseout', function(e){
        apollo.removeClass(document.querySelector('.attribution .promotional'), 'promotional-show');
    }, false);
}










/*------------------------------------------------------------------------*\
  ========================================================================
\*------------------------------------------------------------------------*/











/**
 * FINAL BITS AND BOBS
 * ===================
 * We want this to run after everything else!
 */
/**
 * apply all content listeners
 *
 * add debounced scroll/resize listeners
 *
 * page ready class
 */

/*------------------------------------------*\
    $apply all content listeners
\*------------------------------------------*/
/**
 * Functions are added above using the addFunction(funk, _priority, _args) function
 * where _priority is an optional integer which defaults to 10. 
 * functions with lower priorities are run before those with higher.
 */
vital.contentListeners.listen();


/*------------------------------------------*\
    $add debounced scroll/resize listeners
\*------------------------------------------*/
/**
 * Functions are added above using the addFunctionOn(type, funk, _priority, _args) function
 * where type can be 'scroll' or 'resize' and where _priority is an optional integer
 * which defaults to 10. functions with lower priorities are run before those with higher.
 */
    //we also call each function explicitly to run for a first time
window.addEventListener('scroll', function(){
    vital.debouncedEvents.requestAnimationTick('scroll');
}, false);

vital.debouncedEvents.requestAnimationTick('scroll');

window.addEventListener('resize', function(e){
    vital.debouncedEvents.requestAnimationTick('resize');
}, false);

vital.debouncedEvents.requestAnimationTick('resize');


/*------------------------------------*\
    $page ready class
\*------------------------------------*/
vital.pageReady.init(theBody);