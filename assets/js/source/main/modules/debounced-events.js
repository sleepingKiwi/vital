/*------------------------------------*\
    debounced events
\*------------------------------------*/

/**
 * Requesting animation frames on scroll/resize updates 
 * rather than running these functions a billion times...
 * http://www.html5rocks.com/en/tutorials/speed/animations/ 
 */
    


vital.debouncedEvents = (function(){


    /**
     *
     * $scrollUpdate - functions to run on scroll 
     *      picturefill loading
     *      scroll to top
     *
     * $resizeUpdate - functions to run on resize
     *
     * $pageUpdateTick - called by requestAnimationFrame, calls appropriate event functions
     *
     * $requestAnimationTick - using requestAnimationFrame to debounce event handlers
     * 
     */


    /**
     * PRIVATE
     */

    /*----------------------------------------*\
        $scrollupdate
            loading picturefills
            scrollToTop
    \*----------------------------------------*/

        //this function used to match expanders in a call to 'closest' below
    function _closestExpanderMatch(el) {
        return apollo.hasClass(el, 'vitally-expandable');
    }

    function _scrollUpdate(){

        //console.log('scroll Update Ticked');

        /*- $loading picturefills -*/
        var fillArray = [];
        //var deferredImages = document.getElementsByClassName('data-deferred');
        /**
         * getElementsByClassName returns a Live NodeList - it's length updates dynamically
         * this is great most of the time but because our for loop was removing the applicable
         * classes the node list kept getting shorter and the for loop would never reach all elements
         * //http://stackoverflow.com/questions/11705171/can-not-modify-classes-of-dom-elements
         * we could loop backwards through the list or cast to a static array but we've switched
         * to use querySelectorAll which returns a static (non live) list anyway...
         */
        var deferredImages = document.querySelectorAll('.data-deferred');
        var i, l;
        l = deferredImages.length;

        //console.log('found '+l+' deferred images');

        //console.log(deferredImages);

        for(i=0; i<l; i++){
            var self = deferredImages[i];

            //console.log(i);
            //console.log(verge.rectangle(self));

            if( verge.inY(self, 25) ){

                //console.log('in Y');

                //by default we'll perform the deferred load unless we find a reason not to
                var visible = true;

                //this image is inside an expandable block (the class in-an-expander is added in the expandersClick() function which is called whenever new content is loaded on the page)
                if(apollo.hasClass(self, 'in-an-expander')){
                    //get the closest node with class of 'vitally-expandable'
                    var expandableContainer = vital.u_closest.closest( self, _closestExpanderMatch);
                    //if the container isn't expanded then don't load images inside it!
                    if( !apollo.hasClass(expandableContainer, 'expand-show') ){
                        visible = false;
                    }
                }

                if(visible){
                    apollo.removeClass(self, 'data-deferred');
                    self.removeAttribute('data-deferred');
                    fillArray.push(self);
                }

            }//if in 25px of Y
        }// for loop of deferredImages 


        /* global picturefill */
        picturefill(fillArray);


        /*- $scrollToTop -*/
        /**
         * hide/show to top link.
         */
        //var sd = $(window).scrollTop();
        //console.log(window.pageYOffset);
        if (window.pageYOffset > 300) {
            apollo.addClass(document.getElementById('js-to-top'), 'top-show');
        } else {
           apollo.removeClass(document.getElementById('js-to-top'), 'top-show');
        }

    }



    /*----------------------------------------*\
        $resizeUpdate
    \*----------------------------------------*/
    function _resizeUpdate(){
        //boom
    }



    /*------------------------------------*\
        $pageUpdateTick
    \*------------------------------------*/
    var _animationTicking = false;
    var _animateResize = false;
    var _animateScroll = false;

    //called by requestAnimationTick on pages with deferred images
    function _pageUpdateTick(){

        if(_animateScroll){
            _scrollUpdate();
            _animateScroll = false;
        }

        if(_animateResize){
            _resizeUpdate();
            _animateResize = false;
        }

        _animationTicking = false;

    }//pageUpdateTick        



    /**
     * PUBLIC
     */
    /*------------------------------------*\
     $requestAnimationTick
    \*------------------------------------*/
    function requestAnimationTick(type){
        //console.log(type);
        if(type === 'scroll'){
            _animateScroll = true;
        }else if(type === 'resize'){
            _animateResize = true;
        }

        if(!_animationTicking){
            requestAnimationFrame(_pageUpdateTick);
        }
        
        _animationTicking = true;
    }

    //revealing public methods
    return {
        requestAnimationTick : requestAnimationTick,
    };

}()); //vital.debouncedEvents