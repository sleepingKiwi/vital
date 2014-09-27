/*******************************************************
1 - Paul Irish stopping me breaking everything with console.log

2 - adding position fixed support to modernizr - with horrible android/ios hacks

3 - ipod zoom on orientation fix - thanks to http://adactio.com/journal/4470/

3.5 - hiding address bar on mobile... //https://github.com/scottjehl/Hide-Address-Bar/blob/master/hide-address-bar.js

4- requestAnimationFrame polyfill - for debouncing events

5- smartresize/smartscroll for more heavily debounced events

6- Picturefill - https://github.com/scottjehl/picturefill


///// OPTIONAL AND SOMETIMES USEFUL:
- Ajax for WP comments - from - http://www.makeuseof.com/tag/ajaxify-wordpress-comments/
*******************************************************/

// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/

window.log = function f() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var args = arguments;
        var newarr;

        try {
            args.callee = f.caller;
        } catch(e) {

        }

        newarr = [].slice.call(args);

        if (typeof console.log === 'object') {
            log.apply.call(console.log, console, newarr);
        } else {
            console.log.apply(console, newarr);
        }
    }
};

// make it safe to use console.log always

(function(a) {
    function b() {}
    var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn";
    var d;
    for (c = c.split(","); !!(d = c.pop());) {
        a[d] = a[d] || b;
    }
})(function() {
    try {
        console.log();
        return window.console;
    } catch(a) {
        return (window.console = {});
    }
}());


//2
/*! Fixedfixed: a CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */
(function( w, undefined ){

  var htmlclass = "fixed-supported",
    el = w.document.createElement( "div" ),
    ua = w.navigator.userAgent;

  // fix the test element
  el.style.position = "fixed";
  el.style.top = 0;

  // support test
  function checkFixed(){

    var scroll = "scrollTop" in w.document.body ? w.document.body.scrollTop : w.document.documentElement.scrollTop;

    // only run test if there's a scroll we can compare
    if( scroll !== undefined && scroll > 0 && w.document.body ){

      w.document.body.insertBefore( el, w.document.body.firstChild );

      if( !el.getBoundingClientRect || el.getBoundingClientRect().top !== 0 ){
        // Fixed is not working or can't be tested
        w.document.documentElement.className = w.document.documentElement.className.replace( htmlclass, "" );
      }

      // remove the test element
      w.document.body.removeChild( el );

      // unbind the handlers
      if( w.removeEventListener ){
        w.removeEventListener( "scroll", checkFixed, false );
      }
      else{
        w.detachEvent( "onscroll", checkFixed );
      }
    }
  }

  // if a particular UA is known to return false results with this feature test, try and avoid that UA here.
  if(
    // Android 2.1, 2.2, 2.5, and 2.6 Webkit
    !( ua.match( /Android 2\.[1256]/ ) && ua.indexOf( "AppleWebKit") > -1 ) ||
    // Opera Mobile less than version 11.0 (7458)
    !( ua.match( /Opera Mobi\/([0-9]+)/ ) && RegExp.$1 < 7458 ) ||
    // Opera Mini
    !( w.operamini && ({}).toString.call( w.operamini ) === "[object OperaMini]" ) ||
    // Firefox Mobile less than version 6
    !( ua.match( /Fennec\/([0-9]+)/ ) && RegExp.$1 < 6 )
    // If necessary, add the other untestable browsers here...
  ){
    //add the HTML class for now.
    w.document.documentElement.className += " " + htmlclass;

    // bind to scroll event so we can test and potentially degrade
    if( w.addEventListener ){
      w.addEventListener( "scroll", checkFixed, false );
    }
    else{
      w.attachEvent( "onscroll", checkFixed );
    }
  }
}( this ));


//3
/************************************************
ONLY ENABLE IOS SCALING ON FIRST PINCH GESTURE...
************************************************/

jQuery(function() {
  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    var viewportmeta = document.querySelector('meta[name="viewport"]');
    if (viewportmeta) {
      viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
      document.body.addEventListener('gesturestart', function() {
        viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
      }, false);
    }
  }
 });

//3.5
//https://github.com/scottjehl/Hide-Address-Bar/blob/master/hide-address-bar.js
/*! Normalized address bar hiding for iOS & Android (c) @scottjehl MIT License */
(function( win ){
  var doc = win.document;
  
  // If there's a hash, or addEventListener is undefined, stop here
  if( !location.hash && win.addEventListener ){
    
    //scroll to 1
    win.scrollTo( 0, 1 );
    var scrollTop = 1,
      getScrollTop = function(){
        return win.pageYOffset || doc.compatMode === "CSS1Compat" && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
      },
    
      //reset to 0 on bodyready, if needed
      bodycheck = setInterval(function(){
        if( doc.body ){
          clearInterval( bodycheck );
          scrollTop = getScrollTop();
          win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
        }
      }, 15 );
    
    win.addEventListener( "load", function(){
      setTimeout(function(){
        //at load, if user hasn't scrolled more than 20 or so...
        if( getScrollTop() < 20 ){
          //reset to hide addr bar at onload
          win.scrollTo( 0, scrollTop === 1 ? 0 : 1 );
        }
      }, 0);
    }, false );
  }
})( this );

//4
/*------------------------------------*\
    REQUEST ANIMATION FRAME POLY
\*------------------------------------*/
//used to debounce scroll/resize and for any animations!
//taken from http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/ 2014-08-03
//and http://www.html5rocks.com/en/tutorials/speed/animations/ (for info on scrolling debounce techniques)
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




//5
/*------------------------------------*\
    Smart Resize/Smart Scroll
\*------------------------------------*/
//use in combo with request animation frame and tweak timeout value as appropriate!
(function($,sr,ss){
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {

      var timeout;
 
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap){
                func.apply(obj, args);
              }
              timeout = null;
          }
 
          if (timeout){
            clearTimeout(timeout);
          }
          else if (execAsap){
            func.apply(obj, args);
          }
 
          timeout = setTimeout(delayed, threshold || 100);
      };
  };
    // smartresize
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
    jQuery.fn[ss] = function(fn){  return fn ? this.bind('scroll', debounce(fn)) : this.trigger(ss); };
 
})(jQuery,'smartresize','smartscroll');


//6
//Custom tweaks have been added to skip elements with the data-deferred attr and to add a class after loading...
//We've also added an optional Array argument to pass an array of picturefill spans rather than have the function check every span on the page.
//Picturefill - for responsive images. use with Vitally Responsible plugin for automatic responsive images
/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */
(function( w ){

  // Enable strict mode
  "use strict";

  w.picturefill = function( fillArray ) {

    /* T&O edit */
    //optionally use a passed array of elements rather than looking at all spans... useful for lazy loads
    var ps = (fillArray === undefined) ? w.document.getElementsByTagName( "span" ) : fillArray;

    // Loop the pictures
    for( var i = 0, il = ps.length; i < il; i++ ){

      /* Added by T&O */
      if( ps[ i ].getAttribute( "data-deferred" ) !== null ){
        continue;
      }
      /* End T&O Additions */

      if( ps[ i ].getAttribute( "data-picture" ) !== null ){

        var sources = ps[ i ].getElementsByTagName( "span" ),
          matches = [];

        // See if which sources match
        for( var j = 0, jl = sources.length; j < jl; j++ ){
          var media = sources[ j ].getAttribute( "data-media" );
          // if there's no media specified, OR w.matchMedia is supported 
          if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
            matches.push( sources[ j ] );
          }
        }

      // Find any existing img element in the picture element
      var picImg = ps[ i ].getElementsByTagName( "img" )[ 0 ];

      if( matches.length ){
        var matchedEl = matches.pop();
        if( !picImg || picImg.parentNode.nodeName === "NOSCRIPT" ){
          picImg = w.document.createElement( "img" );
          picImg.alt = ps[ i ].getAttribute( "data-alt" );
        }
        else if( matchedEl === picImg.parentNode ){
          // Skip further actions if the correct image is already in place
          continue;
        }

        /* Added by T&O */
          //http://markdalgleish.com/2011/03/self-executing-anonymous-functions/
          //http://www.mennovanslooten.nl/blog/post/62

        //removing loaded class if it exists
          //http://stackoverflow.com/questions/195951/change-an-elements-css-class-with-javascript
        ps[i].className = ps[i].className.replace( /(?:^|\s)picturefill-loaded(?!\S)/g , '' );

        //adding loaded class after load
        picImg.onload = (
          function (pictureFillParent) {
            return function() {
              pictureFillParent.className += ' picturefill-loaded';
            }
          }
        )( ps[i] ); 
        /* End T&O Additions */

        picImg.src = '';
        picImg.src =  matchedEl.getAttribute( "data-src" );
        matchedEl.appendChild( picImg );
      }
      else if( picImg ){
        picImg.parentNode.removeChild( picImg );
      }
    }
    }
  };

  // Run on resize and domready (w.load as a fallback)
  if( w.addEventListener ){
    w.addEventListener( "resize", w.picturefill, false );
    w.addEventListener( "DOMContentLoaded", function(){
      w.picturefill();
      // Run once only
      w.removeEventListener( "load", w.picturefill, false );
    }, false );
    w.addEventListener( "load", w.picturefill, false );
  }
  else if( w.attachEvent ){
    w.attachEvent( "onload", w.picturefill );
  }

}( this ));