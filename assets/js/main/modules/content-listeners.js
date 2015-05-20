/*------------------------------------*\
    content listeners
\*------------------------------------*/

/**
 * listeners that might frequently need to be set up 
 */


vital.contentListeners = (function(){

    /**
     * PRIVATE
     */
    function _expandLinkClicked(e){
        
        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

            e.preventDefault();

            //finding the expander this link is paired with...
            var _this = e.currentTarget;
            var prev = document.getElementById( _this.getAttribute('data-expander') );

            if(apollo.hasClass(prev, 'expand-show')){

                apollo.removeClass(prev, 'expand-show');
                _this.textContent = _this.getAttribute('data-show');

            }else{

                apollo.addClass(prev, 'expand-show');
                _this.textContent = _this.getAttribute('data-hide');

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
        if( !apollo.hasClass(e.currentTarget, 'expand-show') ){

            apollo.addClass(e.currentTarget, 'expand-show');
                //changing the text of the expand link
            var theAppropriateLink = document.querySelector('.expand-link[data-expander='+e.currentTarget.id+']');
            theAppropriateLink.textContent = theAppropriateLink.getAttribute('data-hide');

            if( !apollo.hasClass(e.currentTarget, 'once-opened-twice-shy') ){
                apollo.addClass(e.currentTarget, 'once-opened-twice-shy');
                vital.debouncedEvents.requestAnimationTick('scroll');
            } 

        }    
    }//_expanderLinkFocused()


    function _expandersSetup(body){

            //for loop vars...
        var i, l;

        console.log('setting up expanderListeners');

        //disabled on single by default
        if(!apollo.hasClass(body, 'single-post')){

            //adding 'in-an-expander' class to all picturefill elements inside expanders for deferred loading...
            var pictureFillWraps = document.querySelectorAll('.vitally-expandable .picturefill-wrap');
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
            var expanders = document.querySelectorAll('.vitally-expandable');
            l = expanders.length;

            for( i=0; i<l; i++ ){
                expanders[i].addEventListener('focus', _expanderLinkFocused, true);
            }
        }

        /**
         * adding click listeners
         */
        var expandLinks = document.querySelectorAll('.expand-link');
        l = expandLinks.length;
        for(i=0; i<l; i++){
            /**
             * because this might already be applied to some elements (it's run after ajax loads)
             * we remove the event listener before re-adding it.
             */
            expandLinks[i].removeEventListener('click', _expandLinkClicked);
            expandLinks[i].addEventListener('click', _expandLinkClicked);
        }

    }//_expandersSetup




    /**
     * PUBLIC
     */
    function listen(body){
        //setting up listeners which are often reapplied

        _expandersSetup(body);
    }

    //revealing public methods
    return {
        listen : listen,
    };

}()); //vital.contentListeners