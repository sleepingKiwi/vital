/*---------------------------------------------*\
    PICTUREFILL 1.2 WITH TEDWORTH & OSCAR TWEAKS
\*---------------------------------------------*/
/*!*
 * Custom tweaks have been added to skip elements with the data-deferred attr 
 * and to add a class after loading...
 * 
 * We've also added an optional Array argument to pass an array of picturefill spans 
 * rather than have the function check every span on the page.
 *
 * Picturefill - Responsive Images that work today. 
 * (and mimic the proposed Picture element with span elements). 
 * Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2
 */

(function( w ){

    // Enable strict mode
    'use strict';

    w.picturefill = function( fillArray ) {

        /* T&O edit */
        //optionally use a passed array of elements rather than looking at all spans... useful for lazy loads
        var ps = (fillArray === undefined)||(!(fillArray instanceof Array)) ? w.document.getElementsByTagName( 'span' ) : fillArray;

        // Loop the pictures
        for( var i = 0, il = ps.length; i < il; i++ ){

            /* Added by T&O */
            //skip data deferred images unless we don't pass the mustard..
            if ( 'querySelector' in document && 'addEventListener' in window ) {
                if( ps[ i ].getAttribute( 'data-deferred' ) !== null ){
                    continue;
                }
            }
            /* End T&O Additions */

            if( ps[ i ].getAttribute( 'data-picture' ) !== null ){

                var sources = ps[ i ].getElementsByTagName( 'span' ),
                    matches = [];

                // See if which sources match
                for( var j = 0, jl = sources.length; j < jl; j++ ){
                    var media = sources[ j ].getAttribute( 'data-media' );
                    // if there's no media specified, OR w.matchMedia is supported 
                    if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
                        matches.push( sources[ j ] );
                    }
                }

            // Find any existing img element in the picture element
            var picImg = ps[ i ].getElementsByTagName( 'img' )[ 0 ];

            if( matches.length ){
                var matchedEl = matches.pop();
                if( !picImg || picImg.parentNode.nodeName === 'NOSCRIPT' ){
                    picImg = w.document.createElement( 'img' );
                    picImg.alt = ps[ i ].getAttribute( 'data-alt' );
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
                /*jshint loopfunc: true */
                picImg.onload = (
                function (pictureFillParent) {
                    return function() {
                    pictureFillParent.className = pictureFillParent.className.replace( /(?:^|\s)picturefill-loading(?!\S)/g , '' );
                    pictureFillParent.className += ' picturefill-loaded';
                    };
                }
                )( ps[i] ); 


                picImg.src = '';
                picImg.src =  matchedEl.getAttribute( 'data-src' );
                ps[i].className += ' picturefill-loading';
                matchedEl.appendChild( picImg );
                /* End T&O Additions */
            }
            else if( picImg ){
                picImg.parentNode.removeChild( picImg );
            }
        }
        }
    };

    /* Added by T&O from Picturefill 2.0 code */
    function checkResize() {
        var resizeThrottle;
        if (!w._picturefillWorking) {
            w._picturefillWorking = true;
            w.clearTimeout( resizeThrottle );
            resizeThrottle = w.setTimeout( function() {
                w.picturefill();
                w._picturefillWorking = false;
            }, 60 );
        }
    }
    /* End T&O Additions */

    // Run on resize and domready (w.load as a fallback)
    if( w.addEventListener ){
        w.addEventListener( 'resize', checkResize, false );
        w.addEventListener( 'DOMContentLoaded', function(){
            w.picturefill();
            // Run once only
            w.removeEventListener( 'load', w.picturefill, false );
        }, false );
        w.addEventListener( 'load', w.picturefill, false );
    }
    else if( w.attachEvent ){
        w.attachEvent( 'onresize', checkResize );
        w.attachEvent( 'onload', w.picturefill );
    }

}( this ));