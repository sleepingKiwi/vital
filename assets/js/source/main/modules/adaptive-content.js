/*------------------------------------*\
    Adaptive Content containers
\*------------------------------------*/

/**
 * very simple content fader/switching class with optional prev/next & swipe controls etc.
 * DOES NOT NEST CURRENTLY - although multiple instances on a page is fine and dandy
 */

 /**
  * Classes:
  *
    .adaptive-content-with-nav 
        - show left/right nav

    .adaptive-content-with-position 
        - show dots for positioning marker/navigation

    .adaptive-content-with-view-all
        - show 'view all' link to toggle off slider functionality

    .adaptive-content-swipe
        - allow finger swipe control

    .adaptive-content-keyboard
        - allow keyboard control
    
    .adaptive-content-no-transitions (stops smooth height and fades)
        -stops the height being added for smooth height transitions.

    .adaptive-load-em-as-i-see-em
        - only loads responsive images that are active (default behaviour is one ahead and one behind)

    .adaptive-content-with-synced-nav
        - has external nav which it tries to synchronise - uses data-nav for nav ID

    .adaptive-content-image-advance
        - clicking the images advances the carousel
  */


vital.adaptiveContent = (function(){

    /**
     * PRIVATE
     */

        var _keyboardListening = false;


        function _undefferImages(aContent){
            var respImages = aContent.querySelectorAll('.deferred-in-slideshow');
            var i = respImages.length - 1;
            for (i; i >= 0; i--) {
                apollo.removeClass(respImages[i], 'deferred-in-slideshow');
            }
        }

        function _responsiveImageReveal(aContainer){

            //console.log('revealing responsive images');

            //allows previous and next images to be loaded dynamically for each active content (should only be 1)
            var activeContent = aContainer.querySelectorAll('.active-content');
            if(activeContent){
                var i = activeContent.length - 1;
                for ( i; i >= 0; i--) {
                    
                    if( apollo.hasClass(aContainer, 'adaptive-load-em-as-i-see-em') ){
                        //only loading active slides
                        _undefferImages(activeContent[i]);
                    }else{
                        //loading previous and next
                        _undefferImages(activeContent[i]);
                        _undefferImages(_returnNextContent(activeContent[i], aContainer));
                        _undefferImages(_returnPrevContent(activeContent[i], aContainer));
                    }

                }

                //call the vital scroll update if it exists
                if (typeof vital.debouncedEvents !== 'undefined') {
                    //console.log('calling scroll');
                    vital.debouncedEvents.requestAnimationTick('scroll');
                }else{
                    //console.log('no function hombré');
                }

            }

        }



        //returns the slide after the given node
        function _returnNextContent(currentContent, aContainer){
            var nextEl;

            //nextSibling grabs text nodes and comments as well as whitespace and other junk...
            //we check nodeType to make sure we only work with elements.
            //https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
            //https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling

            var gotNext = false;
            var el = currentContent;
            while(el.nextSibling){
                el = el.nextSibling;
                //console.log(el);
                if(el.nodeType === 1){
                    if(apollo.hasClass(el, 'adaptive-content')){
                        gotNext = true;
                        nextEl = el;
                        //console.log('got next content');
                        break;
                    }
                }
            }

            if(!gotNext){
                //no next sibling so get the first adaptive-content
                nextEl = aContainer.querySelector('.adaptive-content');
                //console.log('no next - got first content');
            }

            return nextEl;
        }



        //returns the slide before the given node
        function _returnPrevContent(currentContent, aContainer){
            var prevEl;

            var gotPrev = false;
            var el = currentContent;
            while(el.previousSibling){
                el = el.previousSibling;
                if(el.nodeType === 1){
                    if(apollo.hasClass(el, 'adaptive-content')){
                        gotPrev = true;
                        prevEl = el;
                        break;
                    }
                }
            }

            if(!gotPrev){
                //no prev sibling so get the last adaptive-content
                var allContent = aContainer.querySelectorAll('.adaptive-content');
                prevEl = allContent[allContent.length-1];
            }

            return prevEl;
        }


        function _setActiveContent(aContainer, aContent){

            /**
             * Private function that actually sets the active slideshow content
             * -
             * RETURNS:
             * 'sync' - if content was set and if this slideshow has synced nav and we synced it!
             * true - if the content was set (no synced nav) 
             */

            //remove already active classes
            var activeContent = aContainer.querySelectorAll('.active-content');
            if(activeContent){
                var i = activeContent.length - 1;
                for ( i; i >= 0; i--) {
                    apollo.removeClass(activeContent[i], 'active-content');
                }
            }

            //set the new one!
            apollo.addClass(aContent, 'active-content');

            //smooth height
            if( !apollo.hasClass(aContainer, 'adaptive-content-no-transitions') ){
                aContainer.style.height = aContent.offsetHeight+'px';
            }

            //if we have position dots set the proper one!
            if( apollo.hasClass(aContainer, 'adaptive-content-with-position') ){
                var currentDot = aContainer.parentNode.querySelector('.adaptive-current-position');
                if(currentDot){ apollo.removeClass(currentDot, 'adaptive-current-position'); }
                var contentCount = aContainer.querySelectorAll('.adaptive-content');
                var k = 0;
                for (k; k < contentCount.length; k++) {
                    if( apollo.hasClass(contentCount[k], 'active-content') ){
                        //console.log('switching placement dot to active content');
                        aContainer.parentNode.querySelector('.adaptive-position-dot[data-position="'+(k+1)+'"]').className += ' adaptive-current-position';
                        break;
                    }
                }
            }

            //reveal responsive images if needed.
            _responsiveImageReveal(aContainer);

            //sync linked nav if it exists
            if( apollo.hasClass(aContainer, 'adaptive-content-with-synced-nav') ){
                var navId = aContainer.getAttribute('data-nav');
                if(navId){
                    vital.adaptiveContentActivators.sync(navId, '#'+aContent.getAttribute('id'));
                    return 'sync';
                }
            }

            //we've done everything but not returned 'sync' already so must not have synced!
            return true;

        }


        function _nextContent(aContainer){
            //console.log('next content');
            var activeContent = aContainer.querySelector('.active-content');
            var nextEl = _returnNextContent(activeContent, aContainer);
            _setActiveContent(aContainer, nextEl);
        }


        function _prevContent(aContainer){
            var activeContent = aContainer.querySelector('.active-content');
            var prevEl = _returnPrevContent(activeContent, aContainer);
            _setActiveContent(aContainer, prevEl);
        }



        /**
         * EVENTS
         */

        function _viewAllClick(e){
            var viewAllLink = e.currentTarget;
            var controlWrap = viewAllLink.parentNode;
            var adaptiveContainer = controlWrap.querySelector('#'+controlWrap.getAttribute('data-target'));

            if(apollo.hasClass(controlWrap, 'viewing-all')){
                apollo.removeClass(controlWrap, 'viewing-all');
                viewAllLink.textContent = adaptiveContainer.getAttribute('data-view-all-show') || 'show all';
            }else{
                apollo.addClass(controlWrap, 'viewing-all');
                viewAllLink.textContent = adaptiveContainer.getAttribute('data-view-all-hide') || 'show individually';

                //reveal all responsive images in slider
                _undefferImages(adaptiveContainer);
            }
        }

        function _nextClicked(e){
            var controlWrap = e.currentTarget.parentNode.parentNode;
            var adaptiveContainer = controlWrap.querySelector('#'+controlWrap.getAttribute('data-target'));
            _nextContent(adaptiveContainer);
        }
        function _prevClicked(e){
            var controlWrap = e.currentTarget.parentNode.parentNode;
            var adaptiveContainer = controlWrap.querySelector('#'+controlWrap.getAttribute('data-target'));
            _prevContent(adaptiveContainer);
        }

        function _positionClick(e){
            var controlWrap = e.currentTarget.parentNode.parentNode;
            var adaptiveContainer = controlWrap.querySelector('#'+controlWrap.getAttribute('data-target'));
            var contentCount = adaptiveContainer.querySelectorAll('.adaptive-content');
            var el = contentCount[ (e.currentTarget.getAttribute('data-position') -1) ];
            _setActiveContent(adaptiveContainer, el);
        }

        function _imageAdvance(e){
            var adaptiveContainer = e.currentTarget;
            _nextContent(adaptiveContainer);
        }



        function _keyboarding(e) {

            var aContainers = document.querySelectorAll('.adaptive-content-container.adaptive-content-keyboard');
            var i = aContainers.length - 1;
            var keyCode = e.keyCode || e.which;

            //console.log(keyCode);

            switch (keyCode) {
                // up key
                case 38:
                    break;
                // down key
                case 40:
                    break;
                // left key
                case 37:
                    for ( i; i >= 0; i--) {
                        _prevContent(aContainers[i]);
                    }
                    break;
                // right key
                case 39:
                    for ( i; i >= 0; i--) {
                        _nextContent(aContainers[i]);
                    }
                    break;
                // space key
                case 32:
                    break;
                // enter key
                case 13:
                // esc key
                case 27:
                    break;
                default:

            }
        }





     /**
      * PUBLIC
      */
        function init(){
            /**
             * ADD LISTENERS ETC TO EACH .adaptive-content-container AS DICTATED BY THE CLASSES THEY HAVE
             */

             //grab all containers
            var aContainers = document.querySelectorAll('.adaptive-content-container');

            //loop the containers.
            var i = aContainers.length - 1;
            for ( i; i >= 0; i--) {

                //get active content
                var activeContent = aContainers[i].querySelector('.active-content');

                //set an ID if it doesn't have one.
                var contId = aContainers[i].id;
                if(!contId.length){
                    aContainers[i].id = 'adaptive-container-'+i;
                }


                //FUNCTIONS THAT DEPEND ON AN ACTIVE BIT OF CONTENT
                if(activeContent){

                    //Sizing for animated containers:
                    if( ! apollo.hasClass(aContainers[i], 'adaptive-content-no-transitions') ){
                        aContainers[i].style.height = activeContent.offsetHeight+'px';
                    }

                }//if(activeContent)


                //FUNCTIONS THAT DON'T DEPEND ON ACTIVE CONTENT


                /**
                 * Load prev and next images if necessary
                 */
                _responsiveImageReveal(aContainers[i]);




                /**
                 * Checking for more than one item.
                 */
                var enoughContent = aContainers[i].querySelectorAll('.adaptive-content').length;



                /**
                 * We wrap up the content if it has controls to allow for positioning...
                 */
                var _wrapper = false;

                if( apollo.hasClass(aContainers[i], 'adaptive-content-with-view-all') ||
                    apollo.hasClass(aContainers[i], 'adaptive-content-with-position') ||
                    apollo.hasClass(aContainers[i], 'adaptive-content-with-nav') )
                {

                    if(enoughContent > 1){
                        _wrapper = document.createElement('div');
                        _wrapper.className = 'adaptive-content-with-controls adaptive-content-control-wrap';
                        if( apollo.hasClass(aContainers[i], 'adaptive-content-with-nav') ){
                            _wrapper.className += ' adaptive-content-with-nav-wrap';
                        }
                        _wrapper.setAttribute('data-target', aContainers[i].id);

                        aContainers[i].parentNode.insertBefore(_wrapper, aContainers[i]);

                        aContainers[i].parentNode.removeChild(aContainers[i]);
                        _wrapper.appendChild(aContainers[i]);
                    }
                }



                /**
                 * POSITION DOTS
                 */
                
                if( apollo.hasClass(aContainers[i], 'adaptive-content-with-position') ){

                    var contentCount = aContainers[i].querySelectorAll('.adaptive-content');

                    if(contentCount.length > 1){
                        var positionDots = document.createElement('span');
                        positionDots.className = 'adaptive-position-dots adaptive-content-control';
                        
                        var k = 0;
                        for (k; k < contentCount.length; k++) {
                            var positionDot = document.createElement('span');
                            positionDot.className = 'adaptive-position-dot';
                            if(apollo.hasClass(contentCount[k], 'active-content')){
                                positionDot.className += ' adaptive-current-position';
                            }

                            positionDot.setAttribute('data-position', k+1);

                            positionDots.appendChild(positionDot);

                            //would be better applied to the parent and handled with delegation...
                            positionDot.addEventListener('click', _positionClick, false);
                        }

                        _wrapper.appendChild(positionDots);
                    }
                }




                /**
                 * CLICK TO ADVANCE
                 */
                if( apollo.hasClass(aContainers[i], 'adaptive-content-image-advance') ){
                    aContainers[i].addEventListener('click', _imageAdvance, false);
                }
                


                /**
                 * DIRECTION NAV
                 */
                if( apollo.hasClass(aContainers[i], 'adaptive-content-with-nav') ){

                    if(enoughContent > 1){
                        var dirNav = document.createElement('span');
                        dirNav.className = 'adaptive-direction-nav adaptive-content-control';

                        var prevDir = document.createElement('span');
                        var leftSVG = document.querySelector('.js--chev-left');
                        prevDir.className = 'adaptive-direction-prev vitalicon vitalicon-20 vitalicon-left';
                        if(leftSVG){
                            prevDir.innerHTML = leftSVG.innerHTML;
                        }

                        var nextDir = document.createElement('span');
                        var rightSVG = document.querySelector('.js--chev-right');
                        nextDir.className = 'adaptive-direction-next vitalicon vitalicon-20 vitalicon-right';
                        if(rightSVG){
                            nextDir.innerHTML = rightSVG.innerHTML;
                        }

                        dirNav.appendChild(prevDir);
                        dirNav.appendChild(nextDir);
                        _wrapper.appendChild(dirNav);

                        prevDir.addEventListener('click', _prevClicked, false);
                        nextDir.addEventListener('click', _nextClicked, false);
                    }
                }



                /**
                 * VIEW ALL LINK
                 */
                if( apollo.hasClass(aContainers[i], 'adaptive-content-with-view-all') ){

                    if(enoughContent > 1){

                        var viewAllLink = document.createElement('span');
                        viewAllLink.className = 'adaptive-view-all-link adaptive-content-control';
                        viewAllLink.textContent = aContainers[i].getAttribute('data-view-all-show') || 'view all';
                        _wrapper.appendChild(viewAllLink);

                        viewAllLink.addEventListener('click', _viewAllClick, false);
                    }
                }





                /**
                 * LISTENERS FOR CONTROLS (keyboard/swipe)
                 */
                 /* global Hammer */
                if( apollo.hasClass(aContainers[i], 'adaptive-content-swipe') ){

                    if(enoughContent > 1){
                        var mc = new Hammer(aContainers[i], {
                            preset: [
                                [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }]
                            ]
                        });
                        /*jshint -W083 *///https://jslinterrors.com/dont-make-functions-within-a-loop
                        mc.on('swipeleft', function(e){
                            if(e.pointerType !== 'mouse'){
                                var aContainer;
                                if( apollo.hasClass(e.target, 'adaptive-content-container') ){
                                    aContainer = e.target;
                                }else{
                                    aContainer = vital.u_closest.closest( e.target, function(el){
                                        return apollo.hasClass(el, 'adaptive-content-container');
                                    });
                                }
                                //console.log(aContainer);
                                _nextContent(aContainer);
                            }
                        });
                        /*jshint -W083 *///https://jslinterrors.com/dont-make-functions-within-a-loop
                        mc.on('swiperight', function(e){
                            if(e.pointerType !== 'mouse'){
                                var aContainer;
                                if( apollo.hasClass(e.target, 'adaptive-content-container') ){
                                    aContainer = e.target;
                                }else{
                                    aContainer = vital.u_closest.closest( e.target, function(el){
                                        return apollo.hasClass(el, 'adaptive-content-container');
                                    });
                                }
                                //console.log(aContainer);
                                _prevContent(aContainer);
                            }
                        });
                    }//enoughContent
                }//if( apollo.hasClass(aContainers[i], 'adaptive-content-swipe') )


                /**
                 * KEYBOARD EVENTS
                 */
                if( apollo.hasClass(aContainers[i], 'adaptive-content-keyboard') ){
                    if(enoughContent > 1){
                        if(!_keyboardListening){
                            //console.log('adding keyboard listener');
                            document.addEventListener( 'keydown', _keyboarding, false);
                            _keyboardListening = true;
                        }
                    }
                }



            }//for ( i; i >= 0; i--) {


        }//init()


        function setActiveNode(elem){
            /**
             * Set an element to be active
             * -
             * RETURNS:
             * 'sync' - if this worked and also synced external nav
             * true - if this worked but didn't sync anything
             * false - if setting the active node failed
             * -
             * expects an actual node (DOM object) - the logic for this should be handled
             * outside of this class... 
             * supplied node must be child of .adaptive-content-container 
             * and also be .adaptive-content
             */
            if( apollo.hasClass(elem, 'adaptive-content') ){

                var adaptiveParent = vital.u_closest.closest(elem, 
                    function(el) {
                        return apollo.hasClass(el, 'adaptive-content-container');
                    }
                );

                if(adaptiveParent){
                    var didWeSync = _setActiveContent(adaptiveParent, elem);
                    return didWeSync;
                }

            }

            return false;

        }



        function noActiveContent(aContainer){
            //removes all active content in the provided element...
            //remove already active classes
            var activeContent = aContainer.getElementsByClassName('active-content');
            while(activeContent.length){
                apollo.removeClass(activeContent[0], 'active-content');
            }

            if( ! apollo.hasClass(aContainer, 'adaptive-content-no-transitions') ){
                aContainer.style.height = '0px';
            }
        }



        function adjustHeight(){
             //grab all containers
            var aContainers = document.querySelectorAll('.adaptive-content-container');
            //loop the containers.
            var i = aContainers.length - 1;
            for ( i; i >= 0; i--) {
                //get active content
                var activeContent = aContainers[i].querySelector('.active-content');
                if(activeContent){
                    //Sizing for animated containers:
                    if( ! apollo.hasClass(aContainers[i], 'adaptive-content-no-transitions') ){
                        aContainers[i].style.height = activeContent.offsetHeight+'px';
                    }
                }//if(activeContent)
            }//for ( i; i >= 0; i--) {
        }//adjustHeight()

    //revealing public methods
    return {
        init : init,
        setActiveNode : setActiveNode,
        noActiveContent : noActiveContent,
        adjustHeight : adjustHeight,
    };

}()); //vital.adaptiveContent