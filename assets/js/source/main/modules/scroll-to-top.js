/*------------------------------------*\
    scroll to top
\*------------------------------------*/

/**
 * Injecting a link which scrolls to top.
 * - scrolling by _utility.animate-scroll.js
 * - visibility controlled using scroll function by scroll listeners inside debounced-events.js
 */
    

vital.scrollToTop = (function(){

    /**
     * PRIVATE
     */
         //default options for the scroll function
    var _defaultScrollOptions = {
            // debug determines whether we should log to console or not.
        debug : false,
    };

        //actually scrolling - called on click
    function _scrollToTop(e){
        e.preventDefault();
        vital.u_animateScroll.to(2, 600);
    }



    /**
     * PUBLIC
     */
    function init(body){
        //<a href="#page" class="dynamic-to-top" id="#js-to-top" ><span class="vitalicon vitalicon-top"></span></a>
        
        var topLink = document.createElement('a');
        topLink.setAttribute('href', '#page');
        topLink.className = 'dynamic-to-top';
        topLink.id = 'js-to-top';

        var topLinkArrow = document.createElement('span');
        topLinkArrow.className = 'vitalicon vitalicon-top';

        topLink.appendChild(topLinkArrow);

        body.appendChild(topLink);

        document.getElementById('js-to-top').addEventListener('click', _scrollToTop, false);
    }



        //called on scroll events
    function scroll(_opts){
        /**
         * optional _opts object can apply the debug option which outputs to console at various stages
         */

            //we first extend a blank object with our defaults which effectively makes a copy 
            //because the extend method would otherwise overwrite the defaults array.
        var opts = vital.u_extend.extend( {}, _defaultScrollOptions );
            //then we extend our new copy with any supplied options
        vital.u_extend.extend( opts, _opts );

        if(opts.debug){
            console.log('%c [DEBUG] vital.scrollToTop scroll update ticked', 'color:#ff9999; font-size:0.9em;');
            console.log('%c [DEBUG] window.pageYOffset: '+window.pageYOffset, 'color:#ff9999; font-size:0.9em;');
        }

            //more than 300px down we show our link
        if (window.pageYOffset > 300) {
            apollo.addClass(document.getElementById('js-to-top'), 'top-show');
        } else {
           apollo.removeClass(document.getElementById('js-to-top'), 'top-show');
        }
    }



    function toTop(){
        _scrollToTop( 
            { 
                preventDefault: function(){ /* not a thing */ } 
            } 
        );
    }




        //revealing public methods
    return {
        init : init,
        scroll : scroll,
        toTop : toTop
    };

}()); //vital.scrollToTop