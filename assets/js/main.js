// as the page loads, call these scripts
jQuery(document).ready(function($) {

    /**
     * 
     * responsive indicator injection - allows accurate js reading of current breakpoint
     *
     * menu1. Mobile Menu - expand/contract
     *
     * menu2. Dropdown Menus - expanding and contracting for touch and mouse
     *
     * menu3. Menu Keyboard Focus
     *
     * Footer Promotion - adding class for 3d in footer
     *
     * Bones Gravatars
     *
     * Placeholder Polyfill
     *
     */





    /*------------------------------------*\
     $Responsive Indicator
    \*------------------------------------*/
    /**
    Used to reliably inform us which of our css breakpoints we're in and to make sure js triggers inline with css - the responsive indicator has it's width changed at each breakpoint in css. This method is used due to cross-browser/device inconsistencies with detecting screen widths in js.
    */
    $('body').prepend('<span class="responsive-indicator"></span>');
    var $responsiveIndicator = $('.responsive-indicator');
    var currentBreakpoint = 0; //the current responsive breakpoint - 0 is nothing so forces the resize function to set things!





    /*------------------------------------*\
        $menu1. Mobile Menu
    \*------------------------------------*/
    /**
    Because we also open these menus on focus putting the actions here on .click() does not work because the focus event (in most browsers) fires after mousedown but before mouseup so the .click() actions would immediately close the dropdowns (as they would have been opened by the focus event firing on mousedown)...
    by putting the logic on mousedown and preventing default we are able to circumvent this...
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
    }).click(function(e){
      if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
          e.preventDefault();
          e.stopImmediatePropagation();
      }
    });





    /*------------------------------------*\
        $menu2. Dropdown Menu
    \*------------------------------------*/
    /**
    Binding both touch and mouse and sorting out logic internally... 
    */
    var currentDropMenu;
    $('.dropdown-toggle').on('touchstart mousedown',function(e){

      if( ($('.menu-toggle').css('display') === 'block') && (e.type ==='mousedown')){ /* at mobile sizes all clicks (both touch and mouse) should expand the nav */
        //we only listen for mousedown rather than both here to avoid ghost clicks...

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

      }else if( ($('.menu-toggle').css('display') !== 'block') && (e.type === 'touchstart') ){ /* we're at sizes without the expanding menu so replicate hover but only for touch */

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
        if($('.menu-toggle').css('display') === 'block'){ //kill standard click events at sizes where the drop menus don't have to expand on click...

          if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
              e.preventDefault();
              e.stopImmediatePropagation();
          }

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




    
    /*------------------------------------*\
        $Footer Promotion
    \*------------------------------------*/
    $('.tando-footer a').hover(function(){
      $('.promotional').addClass('promotional-show');
    },function(){
      $('.promotional').removeClass('promotional-show');
    });





    /*------------------------------------*\
        $Bones Gravatars        
    \*------------------------------------*/
    var matchMedia = window.matchMedia || window.msMatchMedia;
    if (matchMedia) {
      if(matchMedia('only screen and (min-width:768px)').matches){
        /* load gravatars */
        $('.comment-author img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
      }
    }else{
      if(document.documentElement.clientWidth >= 768){
        /* load gravatars */
        $('.comment-author img[data-gravatar]').each(function(){
            $(this).attr('src',$(this).attr('data-gravatar'));
        });
      }
    }
	
}); /* end of as page load scripts */





/*------------------------------------*\
    $Placeholder Polyfill
\*------------------------------------*/
// HTML5 Fallbacks for older browsers
jQuery(function($) {
    // check placeholder browser support
    if (!Modernizr.input.placeholder) {
        // set placeholder values
        $(this).find('[placeholder]').each(function() {
            $(this).val( $(this).attr('placeholder') );
        });
 
        // focus and blur of placeholders
        $('[placeholder]').focus(function() {
            if ($(this).val() === $(this).attr('placeholder')) {
                $(this).val('');
                $(this).removeClass('placeholder');
            }
        }).blur(function() {
            if ($(this).val() === '' || $(this).val() === $(this).attr('placeholder')) {
                $(this).val($(this).attr('placeholder'));
                $(this).addClass('placeholder');
            }
        });
 
        // remove placeholders on submit
        $('[placeholder]').closest('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                if ($(this).val() === $(this).attr('placeholder')) {
                    $(this).val('');
                }
            });
        });
    }
});