/**
 * NAVIGATION JAVASCRIPT
 */


/**
 * Break the jQuery dependency in this file - look to move to a pure js solution.
 * https://github.com/viljamis/responsive-nav.js looks promising
 */

jQuery_vital(document).ready(function($) {
    /*------------------------------------*\
        $menu1. Mobile Menu
    \*------------------------------------*/
    /**
     * Because we also open these menus on focus putting the actions here on .click() does not work 
     * because the focus event (in most browsers) fires after mousedown but before mouseup 
     * so the .click() actions would immediately close the dropdowns 
     * (as they would have been opened by the focus event firing on mousedown)...
     * by putting the logic on mousedown and preventing default we are able to circumvent this...
     */
    $('.menu-toggle').mousedown(function(e){
        //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
        if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
            e.preventDefault();
            e.stopImmediatePropagation();

            if($('.menu').hasClass('expanded-mobile-menu')){
                $('.menu').removeClass('expanded-mobile-menu');
            }else{
                $('.menu').addClass('expanded-mobile-menu');
            }
        }
    }).click( VitalUtility.clickKiller );





    /*------------------------------------*\
        $menu2. Dropdown Menu
    \*------------------------------------*/
    /**
    Binding both touch and mouse and sorting out logic internally... 
    */
    var currentDropMenu;

    $('.dropdown-toggle').on('touchstart mousedown',function(e){

        /**
         * at mobile sizes all clicks (both touch and mouse) should expand the nav
         * we only listen for mousedown rather than both here to avoid ghost clicks...
         */
        if( ($('.menu-toggle').css('display') === 'block') && (e.type ==='mousedown')){ 

            currentDropMenu = $(this).parent().find('.dropdown-menu');

            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {

                e.stopPropagation();
                e.preventDefault();

                if(currentDropMenu.hasClass('active-dropdown')){
                    currentDropMenu.removeClass('active-dropdown');
                    $(this).removeClass('active-dropdown-link');
                }else{
                currentDropMenu.addClass('active-dropdown');
                $(this).addClass('active-dropdown-link');
                }
            }

        }else if( ($('.menu-toggle').css('display') !== 'block') && (e.type === 'touchstart') ){ 
            /**
             * we're at sizes without the expanding menu so replicate hover but only for touch
             */

            e.stopPropagation();
            e.preventDefault();

            currentDropMenu = $(this).parent().find('.dropdown-menu');

            if(currentDropMenu.hasClass('active-dropdown')){
                currentDropMenu.removeClass('active-dropdown');
                $(this).removeClass('active-dropdown-link');
            }else{
                currentDropMenu.addClass('active-dropdown');
                $(this).addClass('active-dropdown-link');

                $('body').on('touchstart', function(e) {

                $('.active-dropdown-link').removeClass('active-dropdown-link');
                $('.active-dropdown').removeClass('active-dropdown');

                $(this).off( e ); // THIS IS A ONE USE EVENT ON THE BODY TO HIDE OPEN MENUS ON TOUCH DEVICES
            });

            }
        }

    }).click(function(e){
        
        /**
         * kill standard click events at sizes where the drop menus don't have to expand on click...
         */
        if($('.menu-toggle').css('display') === 'block'){
            VitalUtility.clickKiller(e);
        }

    });





    /*------------------------------------*\
        $menu3. Menu Keyboard focus
    \*------------------------------------*/
    //keyboard focusing opens but doesn't close mobile nav...
    $('.main-navigation a').focus(function(){
        if(!$('.menu').hasClass('expanded-mobile-menu')){
            $('.menu').addClass('expanded-mobile-menu');
        }
    }).blur(function(){
    //
    });


    //keyboard focusing expands and closes dropdowns
    $('.dropdown-menu li a').focus(function(){
        $(this).closest('.dropdown-menu').addClass('active-dropdown');
        $(this).closest('.dropdown').addClass('focused');
    }).blur(function(){
        $(this).closest('.dropdown-menu').removeClass('active-dropdown');
        $(this).closest('.dropdown').removeClass('focused');
    });
});