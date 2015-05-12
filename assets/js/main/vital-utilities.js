/*------------------------------------*\
    $VITAL UTILITY HELPERS
\*------------------------------------*/
/**
 * helpers or utility functions that are used elsewhere
 *
 * http://toddmotto.com/mastering-the-module-pattern/
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 * https://carldanley.com/js-revealing-module-pattern/
 */


/**
 * 
 * $clickKiller - prevent default for left mouse clicks (used for links where mousedown is bound)
 *
 * $requestAnimationTick - using requestAnimationFrame to debounce event handlers
 *
 * $contentListeners - adding listeners to the WP blog content
 * 
 */


var VitalUtility = (function( w, $ ){


    /*------------------------------------*\
        $clickKiller
    \*------------------------------------*/
    /**
     * generic function to kill left click events on links etc. which rely on mousedown events.
     */
    function clickKiller(e){
      if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
          e.preventDefault();
          e.stopImmediatePropagation();
      }
    }//clickKiller





    /*----------------------------------------*\
        $scrollupdate - loading picturefills
    \*----------------------------------------*/
    function _scrollUpdate(){

        console.log('scroll Update Ticked');

        var fillArray = [];
        $('.data-deferred').each(function(){

            var $this = $(this);
            var self = this;

            if( $.inY( $this, 25 ) ){

                var visible = true;
                //this image is inside an expandable block (the class in-an-expander is added in the expandersClick() function which is called whenever new content is loaded on the page)
                if($this.hasClass('in-an-expander')){
                    if(!$this.closest('.vitally-expandable').hasClass('expand-show')){
                        visible = false;
                    }
                }

                if(visible){
                    $this.removeAttr('data-deferred').removeClass('data-deferred');
                    fillArray.push(self);
                }
            }

        });

        /* global picturefill */
        picturefill(fillArray);


        /**
         * hide/show to top link.
         */
        var sd = $(window).scrollTop();
        if (sd > 300) {
            $('.dynamic-to-top').addClass('top-show');
        } else {
           $('.dynamic-to-top').removeClass('top-show');
        }

    }





    /*------------------------------------*\
        $requestAnimationTick
    \*------------------------------------*/
    /**
    * Requesting animation frames on scroll/resize updates 
    * rather than running these functions a billion times...
    * http://www.html5rocks.com/en/tutorials/speed/animations/ 
    */
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





    /*------------------------------------*\
        $contentListeners
    \*------------------------------------*/
    function _expandersClick(){

        //$('.vitally-expandable .picturefill-wrap').addClass('in-an-expander');
        //disabled on single by default
        if(!$('body').hasClass('single-post')){
            $('.vitally-expandable .picturefill-wrap').addClass('in-an-expander');
        }

        $('.expand-link').off('click');
        $('.expand-link').on('click', function(e){
            console.log('setting up expanderListeners');
            //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

                e.preventDefault();

                //finding the expander this link is paired with...
                var $prev = $('#'+$(this).attr('data-expander'));

                if($prev.hasClass('expand-show')){

                    $prev.removeClass('expand-show');
                    $(this).html($(this).attr('data-show'));

                }else{

                    $prev.addClass('expand-show');
                    $(this).html($(this).attr('data-hide'));

                    if( !$prev.hasClass('once-opened-twice-shy') ){
                        $prev.addClass('once-opened-twice-shy');
                        requestAnimationTick('scroll');
                    }           

                }

            }
        });//.expand-link on click

    }//_expandersClick

    function contentListeners(){
        _expandersClick();
    }





    /**
     * Public functions/vars are revealed here!
     */
    return {
        clickKiller: clickKiller,
        requestAnimationTick: requestAnimationTick,
        contentListeners: contentListeners
    };



}( this, jQuery_vital ));//VitalUtility