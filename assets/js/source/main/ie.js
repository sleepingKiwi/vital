/*----------------------------------------*\
    $IE SCRIPTS
\*----------------------------------------*/

/**
 * For the most part we don't want IE < 9 to parse any Javascript at all
 *
 * however! for our lazy loaded 'responsible' images these browsers won't get the noscript
 * fallback.
 * So. We serve these browsers juuuuust the necessary js to transform our lazyload style span
 * placeholders into proper images!
 *
 * we're going to assume that if they don't cut the mustard they probably won't support
 * srcset and sizes either, and just make them normal oldschool image tags
 */

/**
 * Code based loosely on the version 1.x releases of picturefill
 */

(function( w ){

    w.picturefill = function( fillArray ) {

            //there's no easy way to get everything with a class because these haggard browsers
            //don't support querySelector.
            //so we have to loop all spans. Fortunately we only do this the one time.
        var ps = document.getElementsByTagName( 'span' );

        // Loop the pictures
        for( var i = 0, il = ps.length; i < il; i++ ){

            if( ps[ i ].getAttribute( 'data-responsible' ) !== null ){

                ps[ i ].removeAttribute( 'data-responsible' );

                var picImg = w.document.createElement( 'img' );
                picImg.src = '';
                picImg.alt = ps[ i ].getAttribute( 'data-alt' );
                picImg.width = ps[ i ].getAttribute( 'data-width' );
                picImg.height = ps[ i ].getAttribute( 'data-height' );
                picImg.src =  ps[ i ].getAttribute( 'data-fallback' );
                ps[ i ].className += ' js--vitally-responsible--loaded';
                ps[ i ].appendChild( picImg );

            }

        }
    };


    // Run on resize and domready (w.load as a fallback)
    if( w.addEventListener ){
        w.addEventListener( 'DOMContentLoaded', function(){
            w.picturefill();
            // Run once only
            w.removeEventListener( 'load', w.picturefill, false );
        }, false );
        w.addEventListener( 'load', w.picturefill, false );
    }
    else if( w.attachEvent ){
        w.attachEvent( 'onload', w.picturefill );
    }

}( this ));
