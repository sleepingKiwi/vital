/*------------------------------------*\
    scroll to links
\*------------------------------------*/

/**
 * making js--scroll-to links smooth scroll
 */
    

vital.scrollLinks = (function(){

    /**
     * PRIVATE
     */
    function _slideLinkClicked(e){
        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

            e.preventDefault();

            var targ = document.querySelector( e.currentTarget.getAttribute('href') );

            //console.log(targ);
            if(targ){
                var top = vital.u_animateScroll.findTop(targ);
                top = top[0];
                vital.u_animateScroll.to(top, 600);
            }

        }
    }//_slideLinkClicked


    /**
     * PUBLIC
     */
    function init(body){

        var scrollLinks = document.querySelectorAll('.js--scroll-to');
        var l = scrollLinks.length;
        var i;
        for(i=0; i<l; i++){
            /**
             * because this might already be applied to some elements (it's run after ajax loads)
             * we remove the event listener before re-adding it.
             */
            scrollLinks[i].removeEventListener('click', _slideLinkClicked, false);
            scrollLinks[i].addEventListener('click', _slideLinkClicked, false);
        }

    }

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.scrollLinks