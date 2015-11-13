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
    function _mobileTogglesMouseDown(e){
        //called after mousedown event on anything with .menu-toggle class...

        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var self = e.currentTarget;

            var menu = document.getElementsByClassName('menu');
                //with this current implementation every menuToggle toggles every menu (if there are multiple)
                // look into using data attr to link toggles and menus like the expand links are...
            var i, l;
            l = menu.length;
            if(l){
                for (i = l - 1; i >= 0; i--) {
                    if(apollo.hasClass(menu[i], 'expanded-mobile-menu')){
                        apollo.removeClass(menu[i], 'expanded-mobile-menu');
                        apollo.removeClass(self, 'menu-open');
                    }else{
                        apollo.addClass(menu[i], 'expanded-mobile-menu');
                        apollo.addClass(self, 'menu-open');
                    }
                }//for
            }//if any .menu exist
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
    function _dropdownTogglesMouseDown(e){
        //called on touchstart or mousedown events on dropdown-toggle classed things

        /**
         * at mobile sizes all clicks (both touch and mouse) should expand the nav
         * we only listen for mousedown rather than both here to avoid ghost clicks...
         */

        var currentDropMenu = e.currentTarget.parentNode.getElementsByClassName('dropdown-menu')[0];

        //var mobSized = window.getComputedStyle( e.currentTarget ).getPropertyValue( 'display' ) === 'block';
        var mobSized = window.getComputedStyle( document.querySelector('.menu-toggle') ).getPropertyValue( 'display' ) === 'block';
        console.log('mobSized = '+mobSized);

        if( mobSized && (e.type ==='mousedown') ){ 

            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

                e.stopPropagation();
                e.preventDefault();

                if(apollo.hasClass(currentDropMenu, 'active-dropdown')){
                    apollo.removeClass(currentDropMenu, 'active-dropdown');
                    apollo.removeClass(e.currentTarget, 'active-dropdown-link');
                }else{
                    apollo.addClass(currentDropMenu, 'active-dropdown');
                    apollo.addClass(e.currentTarget, 'active-dropdown-link');
                }
            }

        }else if( !mobSized && (e.type === 'touchstart') ){ 
            /**
             * we're at sizes without the expanding menu so replicate hover but only for touch
             */

            e.stopPropagation();
            e.preventDefault();

            if(apollo.hasClass(currentDropMenu, 'active-dropdown')){
                apollo.removeClass(currentDropMenu, 'active-dropdown');
                apollo.removeClass(e.currentTarget, 'active-dropdown-link');
            }else{

                    //clear open dropdowns
                _bodyDropClear(null);

                apollo.addClass(currentDropMenu, 'active-dropdown');
                apollo.addClass(e.currentTarget, 'active-dropdown-link');

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
            apollo.removeClass(activeDrops[i], 'active-dropdown');
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
        if(!apollo.hasClass(theMenu, 'expanded-mobile-menu')){
            apollo.addClass(theMenu, 'expanded-mobile-menu');
            
            apollo.addClass(document.getElementsByClassName('menu-toggle')[0], 'menu-open');
        }
    }


    function _dropdownLinksFocus(e){
        //called when '.dropdown-menu li a' is focused
        var loopNode = e.currentTarget;
        while( loopNode.parentNode.tagName.toLowerCase() !== 'nav' ){
            var loopParent = loopNode.parentNode;

            if( apollo.hasClass(loopParent, 'dropdown-menu') ){
                apollo.addClass(loopParent, 'active-dropdown');
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
        while( loopNode.parentNode.tagName.toLowerCase() !== 'nav' ){
            var loopParent = loopNode.parentNode;

            if( apollo.hasClass(loopParent, 'dropdown-menu') ){
                apollo.removeClass(loopParent, 'active-dropdown');
            }

            if( apollo.hasClass(loopParent, 'dropdown') ){
                apollo.removeClass(loopParent, 'focused');
            }

            loopNode = loopParent;
        }
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