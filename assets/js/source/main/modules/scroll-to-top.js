/*------------------------------------*\
    scroll to top
\*------------------------------------*/

/**
 * Injecting a link which scrolls to top.
 * - scrolling by _utility.animate-scroll.js
 * - visibility controlled by scroll listeners inside debounced-events.js
 */
    

vital.scrollToTop = (function(){

    function _scrollToTop(e){
        e.preventDefault();
        vital.u_animateScroll.to(2, 600);
    }

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

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.scrollToTop