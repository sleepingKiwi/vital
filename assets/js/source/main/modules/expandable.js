/*------------------------------------*\
    expandable content
\*------------------------------------*/

vital.expandable = (function(){

    /**
     * PRIVATE
     */

    /**
     * TIDYING UP AFTER ANIMATIONS
     */
    function _expandAnimate_tidy(e){
            //get rid of this listener
        e.currentTarget.removeEventListener('transitionend', _expandAnimate_tidy, false);
            //remove inline height style now it's animated to
        e.currentTarget.style.removeProperty('height');
            //remove the animating-dropdown class which turns on transitions.
        apollo.removeClass(e.currentTarget, 'js--animating-expander-show');
        apollo.removeClass(e.currentTarget, 'js--animating-expander-hide');
    }//function _dropAnimate_tidy(e){


    /**
     * EXPANDING CONTENT TO CORRECT HEIGHT
     */
    function _expandShow(expander){

        apollo.addClass(expander, 'js--vitally-expanded');

            //we only do the actual animation steps if we know transitionend event is supported
        if(vital.u_detect.transitionend){

                //make sure we're clean before starting this process...
            _expandAnimate_tidy( { currentTarget: expander } );

                //grab the dimensions of the menu whilst it's expanded
            var animateTo = expander.getBoundingClientRect();

                //set height to 0 so we have something to transition from
            expander.style.height = 1 + 'px';

                // Wait for the next frame so we know all the style changes have taken hold.
            requestAnimationFrame(function() {

                    //switch on animations.
                    //has to be done with class because the changes above need to be instant...
                apollo.addClass(expander, 'js--animating-expander-show');

                    //listen for this animation to finish so we can clear up inline styles etc.
                expander.addEventListener('transitionend', _expandAnimate_tidy, false);
                
                    //replace the 1px height with the full expanded height for a smooth transition
                expander.style.height = animateTo.height + 'px';

            });//requestAnimationFrame(function() {

        }//if(vital.u_detect.transitionend){

    }//function _expandShow(expander){



    /**
     * HIDING CONTENT SMOOTHLY
     */
    function _expandHide(expander){

             //we only do the actual animation steps if we know transitionend event is supported
        if(vital.u_detect.transitionend){

                //make sure we're clean before starting this process...
            _expandAnimate_tidy( { currentTarget: expander } );

                //get current expander size - this is what we'll animate 'from' 
            var animateFrom = expander.getBoundingClientRect();

                //set the expander to it's own height - purely for animation reasons!
            expander.style.height = animateFrom.height + 'px';

                //remove the expanded class
            apollo.removeClass(expander, 'js--vitally-expanded');

                // Wait for the next frame so we know all the style changes have taken hold.
            requestAnimationFrame(function() {

                    //switch on animations.
                    //has to be done with class because the changes above need to be instant...
                apollo.addClass(expander, 'js--animating-expander-hide');

                    //listen for this animation to finish so we can clear up inline styles etc.
                expander.addEventListener('transitionend', _expandAnimate_tidy, false);
                
                    //replace the full height with 1px to shrink the menu
                expander.style.height = '1px';

            });//requestAnimationFrame(function() {

        }else{//if(vital.u_detect.transitionend){
            apollo.removeClass(expander, 'js--vitally-expanded');
        }

    }//function _expandHide(expander){



    function _expandLinkClicked(e){
        
        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

            e.preventDefault();

            //finding the expander this link is paired with...
            var _this = e.currentTarget;
            var prev = document.getElementById( _this.getAttribute('data-expander') );

            if(apollo.hasClass(prev, 'js--vitally-expanded')){

                _expandHide(prev);
                apollo.removeClass(_this, 'has-active-expander');

                var dataShow = _this.getAttribute('data-show');
                if(dataShow){
                    _this.textContent = dataShow;
                }

            }else{

                _expandShow(prev);
                apollo.addClass(_this, 'has-active-expander');

                var dataHide = _this.getAttribute('data-hide');
                if(dataHide){
                    _this.textContent = dataHide;
                }

                if( !apollo.hasClass(prev, 'once-opened-twice-shy') ){
                    apollo.addClass(prev, 'once-opened-twice-shy');
                    vital.debouncedEvents.requestAnimationTick('scroll');
                }           

            }

        }//left clicks
    }//_expandLinkClicked


    function _expanderLinkFocused(e){
        //console.log(e.currentTarget); //the expander
        //console.log(e.target); //whatever link we're currently focusing
        if( !apollo.hasClass(e.currentTarget, 'js--vitally-expanded') ){

            _expandShow(e.currentTarget);
                //changing the text of the expand link
            var theAppropriateLink = document.querySelector('.js--expand-link[data-expander='+e.currentTarget.id+']');
            apollo.addClass(theAppropriateLink, 'has-active-expander');
            //theAppropriateLink.textContent = theAppropriateLink.getAttribute('data-hide');
            var dataHide = theAppropriateLink.getAttribute('data-hide');
            if(dataHide){
                theAppropriateLink.textContent = dataHide;
            }

            if( !apollo.hasClass(e.currentTarget, 'once-opened-twice-shy') ){
                apollo.addClass(e.currentTarget, 'once-opened-twice-shy');
                vital.debouncedEvents.requestAnimationTick('scroll');
            } 

        }    
    }//_expanderLinkFocused()


    function _expandersSetup(){

            //for loop vars...
        var i, l;

        //console.log('setting up expanderListeners');


        //adding 'in-an-expander' class to all picturefill elements inside expanders for deferred loading...
        var pictureFillWraps = document.querySelectorAll('.js--vitally-expandable .picturefill-wrap');
        l = pictureFillWraps.length;

        for( i=0; i<l; i++ ){
            apollo.addClass( pictureFillWraps[i], 'in-an-expander' );
        }


        /**
         * setting up focus listeners for expandable content 
         * (so that links automatically open it on tab-through)
         *
         * rather than adding a focus event to every link in every expander we use event 
         * delegation to capture focus events on the parents (the expanders) whenever anything 
         * inside them is focused!
         * - because focus events don't bubble we have to set the 'useCapture' event argument
         * to true - http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
         */
        var expanders = document.querySelectorAll('.js--vitally-expandable');
        l = expanders.length;

        for( i=0; i<l; i++ ){
            expanders[i].addEventListener('focus', _expanderLinkFocused, true);
        }

        /**
         * adding click listeners
         */
        var expandLinks = document.querySelectorAll('.js--expand-link');
        l = expandLinks.length;
        for(i=0; i<l; i++){
            /**
             * because this might already be applied to some elements (it's run after ajax loads)
             * we remove the event listener before re-adding it.
             */
            expandLinks[i].removeEventListener('click', _expandLinkClicked, false);
            expandLinks[i].addEventListener('click', _expandLinkClicked, false);
        }

    }//_expandersSetup




    /**
     * PUBLIC
     */
    function init(body){

       _expandersSetup();

    }

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.expandable