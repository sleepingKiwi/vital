/*------------------------------------*\
    svg
\*------------------------------------*/

/**
 * Js relating to SVG - initially just fallback methods
 */

/*
vital.svg = (function(){


    function initFallbacks(){
        //http://css-tricks.com/svg-fallbacks/
        if( !apollo.hasClass(document.documentElement, 'inline-svg') ){

            var svgFallbacks = document.getElementsByClassName('svg-fallback-img');
            var i, l;
            l = svgFallbacks.length;

            for(i=0; i<l; i++){
                //looping all .svg-fallback-img
                var self = svgFallbacks[i];
                var picImg = document.createElement( 'img' );
                picImg.alt = self.getAttribute( 'data-fallback-alt' );
                picImg.src = '';
                picImg.src =  self.getAttribute( 'data-fallback' );
                picImg.className = self.getAttribute( 'data-fallback-class' );
                self.appendChild( picImg );
            }

            var svgElements = document.getElementsByClassName('svg-with-fallback');
            l = svgElements.length;
            for (i = l - 1; i >= 0; i--) {
                svgElements[i].style.display = 'none';
            }
        }
    }

    //revealing public methods
    return {
        initFallbacks : initFallbacks,
    };

}()); //vital.svg
*/