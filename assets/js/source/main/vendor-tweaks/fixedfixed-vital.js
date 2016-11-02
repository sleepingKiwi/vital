/**
 * THIS VERSION HAS BEEN TWEAKED TO AVOID AN ANNOYING iOS8 ISSUE WHERE getBoundingClientRect DOESN'T WORK
 * - see https://github.com/filamentgroup/fixed-fixed/issues/4
 * - https://gist.github.com/emilbjorklund/e796da508d1f5d006cac
 */
/*! Fixedfixed: a CSS position:fixed qualifier. (c)2012 @scottjehl, Filament Group, Inc. Dual license: MIT and/or GPLv2 */
(function( w, undefined ){

    var htmlclass = 'fixed-supported',
        el = w.document.createElement( 'div' ),
        ua = w.navigator.userAgent,
        docEl = w.document.documentElement;
  
    // fix the test element
    el.style.position = 'fixed';
    el.style.top = 0;

    // support test
    function checkFixed(){

        var scroll = 'scrollTop' in w.document.body ? w.document.body.scrollTop : docEl.scrollTop;

        // only run test if there's a scroll we can compare
        if( scroll !== undefined && scroll > 0 && w.document.body ){

            w.document.body.insertBefore( el, w.document.body.firstChild );

            if( !el.getBoundingClientRect || el.getBoundingClientRect().top !== 0 ) {
                // UA sniff + feature inference for iOS 8+, which has 
                // getBoundingClientRect, but reports it wrong for fixed
                // elements (it seems. Shit.). If not, opt out. 
                if (!(ua.match(/iPad|iPhone|iPod/) && !window.MSStream && !!window.indexedDB)) {
                    docEl.className = docEl.className.replace( htmlclass, '' );
                }
            }

            // remove the test element
            w.document.body.removeChild( el );

            // unbind the handlers
            if( w.removeEventListener ){
                w.removeEventListener( 'scroll', checkFixed, false );
            }
            else{
                w.detachEvent( 'onscroll', checkFixed );
            }
        }
    }

    // if a particular UA is known to return false results with this feature test, try and avoid that UA here.
    if(
        // Android 2.1, 2.2, 2.5, and 2.6 Webkit
        !( ua.match( /Android 2\.[1256]/ ) && ua.indexOf( 'AppleWebKit') > -1 ) ||
        // Opera Mobile less than version 11.0 (7458)
        !( ua.match( /Opera Mobi\/([0-9]+)/ ) && RegExp.$1 < 7458 ) ||
        // Opera Mini
        !( w.operamini && ({}).toString.call( w.operamini ) === '[object OperaMini]' ) ||
        // Firefox Mobile less than version 6
        !( ua.match( /Fennec\/([0-9]+)/ ) && RegExp.$1 < 6 )
        // If necessary, add the other untestable browsers here...
    ){
        //add the HTML class for now.
        docEl.className += ' ' + htmlclass;

        // bind to scroll event so we can test and potentially degrade
        if( w.addEventListener ){
            w.addEventListener( 'scroll', checkFixed, false );
        }
        else{
            w.attachEvent( 'onscroll', checkFixed );
        }
    }

    w.FixedFixed = checkFixed;
}( this ));