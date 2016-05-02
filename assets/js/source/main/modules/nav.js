/*------------------------------------*\
    navigation
\*------------------------------------*/

/**
 * listeners for hovers and keyboard support for the menus 
 */

/**
 * TODO: Use event delegation instead of adding click events in for loops like some kind of animal...
 * http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
 */


vital.nav = (function(){


    /**
     * -private
     *
     *      Mobile Menu
     *
     *      Dropdown Menu
     *
     *      Keyboard Focus
     *
     * -public
     *      
     *      init
     */


    /**
     * PRIVATE
     */


    /*------------------------------------*\
        Mobile Menu
    \*------------------------------------*/


    //menu is hidden with javascript at mobile sizes by the js--toggle-visuallyhidden class
    //this is overwritten in css at larger screen sizes and also overwritten in noscript


    //The mobile menu is animated as if it's another dropdown in this version.
    //to use FLIP style animations the menu needs to be positioned absolutely, this version
    //pushes all content down instead. For a FLIPped example see black jamm or look at:
    //https://aerotwist.com/blog/flip-your-animations/



    function _mobileTogglesMouseDown(e){
        //called after mousedown event on anything with .menu-toggle class...

        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var self = e.currentTarget;

            var menu = document.getElementById( self.getAttribute('data-menu') );
            if(menu){
                if(apollo.hasClass(menu, 'active-dropdown')){
                    apollo.removeClass(self, 'menu-open');
                    _dropAnimate_hide(menu);
                    //apollo.removeClass(menu[i], 'expanded-mobile-menu');
                    //menu[i].style.height = null;
                }else{
                    apollo.addClass(self, 'menu-open');
                    _dropAnimate_show(menu);
                    //_expandMobileMenu(menu[i]);
                }
            }
        }//left clicks
    }//_mobileTogglesMouseDown(e)


    function _mobileMenuSetup(){
        /**
         * Because we also open these menus on focus putting the actions here on .click() does not work 
         * because the focus event (in most browsers) fires after mousedown but before mouseup 
         * so the .click() actions would immediately close the dropdowns 
         * (as they would have been opened by the focus event firing on mousedown)...
         * by putting the logic on mousedown and preventing default we are able to circumvent this...
         */
            //there could be more than one...
        var menuToggles = document.getElementsByClassName('menu-toggle');
        var i, l;
        l = menuToggles.length;
        if(l){
            for ( i = l - 1; i >= 0; i--) {
                menuToggles[i].addEventListener('mousedown', _mobileTogglesMouseDown, false);
                menuToggles[i].addEventListener('click', vital.u_clickKiller.clickKiller, false);
            }
        }
    }//_mobileMenuSetup





    /*------------------------------------*\
        Dropdown Menu
    \*------------------------------------*/
    
    /**
     * TIDYING UP ANIMATIONS
     */
    function _dropAnimate_tidy(e){
            //get rid of this listener
        e.currentTarget.removeEventListener('transitionend', _dropAnimate_tidy, false);
            //remove inline height style now it's animated to
        e.currentTarget.style.removeProperty('height');
            //remove the animating-dropdown class which turns on transitions.
        apollo.removeClass(e.currentTarget, 'animating-dropdown');
            //inactive dropdowns should be visually hidden after transitioning
        if(!apollo.hasClass(e.currentTarget, 'active-dropdown')){
            apollo.addClass(e.currentTarget, 'js--toggle-visuallyhidden');
        }
    }//function _dropAnimate_tidy(e){


    /**
     * ANIMATE SHOWING MOBILE DROPDOWNS
     */
    function _dropAnimate_show(dropdown, dropdownLink){

            //make sure we're clean before starting this process...
        _dropAnimate_tidy( { currentTarget: dropdown } );

            //highlight the active link if it has been specified 
        if(dropdownLink !== undefined){
            apollo.addClass(dropdownLink, 'active-dropdown-link');
        }

            //set this dropdown to it's 'active' state (actually does nothing but act as a js indicator)
        apollo.addClass(dropdown, 'active-dropdown');

            //remove the visuallyhidden class to get dropdown to full height:
        apollo.removeClass(dropdown, 'js--toggle-visuallyhidden');

        var mobSized = window.getComputedStyle( document.querySelector('.menu-toggle') ).getPropertyValue( 'display' ) === 'block';

            //we only do the actual animation steps if we know transitionend event is supported
            //they also only apply at mobile sizes - for desktop the active-dropdown class is enough!
        if(vital.u_detect.transitionend && mobSized){
                //grab the dimensions of the menu whilst it's expanded
            var animateTo = dropdown.getBoundingClientRect();

                //set height to 0 so we have something to transition from
            dropdown.style.height = 1 + 'px';


                // Wait for the next frame so we know all the style changes have taken hold.
            requestAnimationFrame(function() {

                    //switch on animations.
                    //has to be done with class because the changes above need to be instant...
                apollo.addClass(dropdown, 'animating-dropdown');

                    //listen for this animation to finish so we can clear up inline styles etc.
                dropdown.addEventListener('transitionend', _dropAnimate_tidy, false);
                
                    //replace the 1px height with the full menu height for a smooth transition
                dropdown.style.height = animateTo.height + 'px';

            });//requestAnimationFrame(function() {

        }//if(vital.u_detect.transitionend){

    }//function _dropAnimate_show(dropdown, dropdownLink){




    /**
     * ANIMATE HIDING MOBIE DROPDOWNS
     */
    function _dropAnimate_hide(dropdown, dropdownLink){

            //make sure we're clean before starting this process...
        _dropAnimate_tidy( { currentTarget: dropdown } );

            //un-highlight the active link if it has been specified 
        if(dropdownLink !== undefined){
            apollo.removeClass(dropdownLink, 'active-dropdown-link');
        }

            //remove the active state from this dropdown
        apollo.removeClass(dropdown, 'active-dropdown');

        var mobSized = window.getComputedStyle( document.querySelector('.menu-toggle') ).getPropertyValue( 'display' ) === 'block';

             //we only do the actual animation steps if we know transitionend event is supported
             //they also only apply at mobile sizes - for desktop the active-dropdown class is enough!
        if(vital.u_detect.transitionend && mobSized){

                //get current dropdown size - this is what we'll animate 'from' 
            var animateFrom = dropdown.getBoundingClientRect();

                //set the dropdown to it's own height - purely for animation reasons!
            dropdown.style.height = animateFrom.height + 'px';

                // Wait for the next frame so we know all the style changes have taken hold.
            requestAnimationFrame(function() {

                    //switch on animations.
                    //has to be done with class because the changes above need to be instant...
                apollo.addClass(dropdown, 'animating-dropdown');

                    //listen for this animation to finish so we can clear up inline styles etc.
                dropdown.addEventListener('transitionend', _dropAnimate_tidy, false);
                
                    //replace the full height with 1px to shrink the menu
                dropdown.style.height = '1px';

            });//requestAnimationFrame(function() {

        }else{//if(vital.u_detect.transitionend){

            //if we can't detect transitionend then just set it straight back to non visible
            //rather than waiting for the animation to finish first
            apollo.addClass(dropdown, 'js--toggle-visuallyhidden');

        }//if(vital.u_detect.transitionend){

    }//function _dropAnimate_hide(dropdown, dropdownLink){
                




     /**
      * EVENT HANDLERS
      */
    function _dropdownTogglesMouseDown(e){
        //called on touchstart or mousedown events on dropdown-toggle classed things

        /**
         * at mobile sizes all clicks (both touch and mouse) should expand the nav
         * we only listen for mousedown rather than both here to avoid ghost clicks...
         */

        var currentDropMenu = e.currentTarget.parentNode.getElementsByClassName('dropdown-menu')[0];

        //var mobSized = window.getComputedStyle( e.currentTarget ).getPropertyValue( 'display' ) === 'block';
        var mobSized = window.getComputedStyle( document.querySelector('.menu-toggle') ).getPropertyValue( 'display' ) === 'block';
        //console.log('mobSized = '+mobSized);

        if( mobSized && (e.type ==='mousedown') ){ 

            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

                e.stopPropagation();
                e.preventDefault();

                if(apollo.hasClass(currentDropMenu, 'active-dropdown')){
                    _dropAnimate_hide(currentDropMenu, e.currentTarget);
                }else{
                    _dropAnimate_show(currentDropMenu, e.currentTarget);
                }
                
            }

        }else if( !mobSized && (e.type === 'touchstart') ){ 
            /**
             * we're at sizes without the expanding menu so replicate hover but only for touch
             */

            e.stopPropagation();
            e.preventDefault();

            if(apollo.hasClass(currentDropMenu, 'active-dropdown')){
                //apollo.removeClass(currentDropMenu, 'active-dropdown');
                //apollo.removeClass(e.currentTarget, 'active-dropdown-link');
                _dropAnimate_hide(currentDropMenu, e.currentTarget);
            }else{

                    //clear open dropdowns
                _bodyDropClear(null);

                _dropAnimate_show(currentDropMenu, e.currentTarget);

                document.querySelector('body').addEventListener('touchstart', _bodyDropClear, false);
            }

        }//not mobiles && touch event
    }//_dropdownTogglesMouseDown(e)

    function _bodyDropClear(e){
        //function to remove dropdown classes when body is touched...

        document.querySelector('body').removeEventListener('touchstart', _bodyDropClear, false);

        //removing all active dropdown links
        var activeDrops = document.getElementsByClassName('active-dropdown-link');
        /**
         * Looping backwards because getElementsByClassName produces a LiveNodeList that gets 
         * shorter as elements are removed...
         */
        var i, l;
        l = activeDrops.length;
        for (i = l - 1; i >= 0; i--) {
            apollo.removeClass(activeDrops[i], 'active-dropdown-link');
        }

        //and the actual dropdowns
        activeDrops = document.getElementsByClassName('active-dropdown');
        /**
         * Looping backwards because getElementsByClassName produces a LiveNodeList that gets 
         * shorter as elements are removed...
         */
        l = activeDrops.length;
        for (i = l - 1; i >= 0; i--) {
            //apollo.removeClass(activeDrops[i], 'active-dropdown');
            _dropAnimate_hide(activeDrops[i]);
        }
    }

    function _dropdownsSetup(){
        /**
        Binding both touch and mouse and sorting out logic internally... 
        */

        var dropdownToggles = document.getElementsByClassName('dropdown-toggle');
        var i, l;
        l = dropdownToggles.length;
        if(l){
            for (i = l - 1; i >= 0; i--) {
                dropdownToggles[i].addEventListener('touchstart', _dropdownTogglesMouseDown, false);
                dropdownToggles[i].addEventListener('mousedown', _dropdownTogglesMouseDown, false);

                /**
                 * kill standard click events at sizes where the drop menus don't have to expand on click...
                 */
                dropdownToggles[i].addEventListener('click', _mobileKillClick, false);//click listener
            }//for
        }//if(l)
    }//_dropdownsSetup

    function _mobileKillClick(e){
        if( window.getComputedStyle( document.querySelector('.menu-toggle') ).getPropertyValue( 'display' ) === 'block' ){
            vital.u_clickKiller.clickKiller(e);
        }
    }





    /*------------------------------------*\
        Menu Keyboard focus
    \*------------------------------------*/
    
    function _mainNavLinksFocus(){
        //called when any of the main nav links (.main-navigation a) are focused
        var theMenu = document.querySelectorAll('.main-navigation .menu')[0];
        if(!apollo.hasClass(theMenu, 'active-dropdown')){
            //_expandMobileMenu(theMenu);
            _dropAnimate_show(theMenu);
            apollo.addClass(document.getElementsByClassName('menu-toggle')[0], 'menu-open');
        }
    }


    function _dropdownLinksFocus(e){
        //called when '.dropdown-menu li a' is focused
        var loopNode = e.currentTarget;
        apollo.addClass(loopNode, 'currently-focused-link');
        while( loopNode.parentNode.tagName.toLowerCase() !== 'nav' ){
            var loopParent = loopNode.parentNode;


            if( apollo.hasClass(loopParent, 'dropdown-menu') && !apollo.hasClass(loopParent, 'active-dropdown') ){
                console.log('expanding a menu due to focus');
                    //if it isn't already, expand the menu that this link lives in
                _dropAnimate_show(loopParent);
            }

            if( apollo.hasClass(loopParent, 'dropdown') ){
                apollo.addClass(loopParent, 'focused');
            }

            loopNode = loopParent;
        }
    }


    function _dropdownLinksBlur(e){
        //called when '.dropdown-menu li a' is blurred
        var loopNode = e.currentTarget;
        apollo.removeClass(loopNode, 'currently-focused-link');
            //put into rAF so that the focus event can add a currently-focused-class before this blur function runs!
        requestAnimationFrame(function(){
            while( loopNode.parentNode.tagName.toLowerCase() !== 'nav' ){

                var loopParent = loopNode.parentNode;

                if( apollo.hasClass(loopParent, 'dropdown-menu') && !loopParent.querySelector('.currently-focused-link') ){
                    console.log('closing a menu due to blur event');
                        //hide if there are no focused links anywhere under this parent
                    _dropAnimate_hide(loopParent);
                }

                if( apollo.hasClass(loopParent, 'dropdown') ){
                    apollo.removeClass(loopParent, 'focused');
                }

                loopNode = loopParent;

            }//while( loopNode.parentNode.tagName.toLowerCase() !== 'nav' ){
        });//requestAnimationFrame(function(){
    }


    function _menuKeyboardSetup(){
        /**
         * Keyboard focusing will open but not close the mobile nav
         */
        var mainNavLinks = document.querySelectorAll('.main-navigation a');
        var i, l;
        l = mainNavLinks.length;
        if(l){
            for (i = l - 1; i >= 0; i--) {
                mainNavLinks[i].addEventListener('focus', _mainNavLinksFocus, false);
            }//for
        }//if(l)


        var dropdownLinks = document.querySelectorAll('.dropdown-menu li a');
        l = dropdownLinks.length;
        if(l){
            for (i = l - 1; i >= 0; i--) {
                dropdownLinks[i].addEventListener('focus', _dropdownLinksFocus, false);
                dropdownLinks[i].addEventListener('blur', _dropdownLinksBlur, false);
            }//for
        }//if(l)

    }//_menuKeyboardSetup()




    /**
     * PUBLIC
     */
    function init(){
        _mobileMenuSetup();
        _dropdownsSetup();
        _menuKeyboardSetup();
    }

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.nav