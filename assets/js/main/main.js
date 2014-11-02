jQuery_vital(document).ready(function($) {

    /**
     * 
     * page ready class
     *
     * extending verge
     *
     * responsive indicator injection - allows accurate js reading of current breakpoint
     *
     * To Top Link
     *
     * first run of content listeners
     *
     * set up scroll event handler if there are images to load
     *
     * Footer Promotion - adding class for 3d in footer
     *
     */


    /*------------------------------------*\
        $Page Ready Class
    \*------------------------------------*/
    if(!$('body').hasClass('page-ready')){
      $('body').addClass('page-ready');
    }





    /*------------------------------------*\
        $extending verge    
    \*------------------------------------*/
    /* global verge */
    $.extend(verge);





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
        $To Top Link
    \*------------------------------------*/
    var $toTop = $('<a href="#page" class="dynamic-to-top" ><span class="vitalicon vitalicon-top"></span></a>');
    $toTop.appendTo('body').click(function () {
        $('html, body').stop().animate({
            scrollTop: 2
        }, 600);
        return false;
    });







    /*------------------------------------*\
        $Content Listeners
    \*------------------------------------*/
    VitalUtility.contentListeners();





    /*------------------------------------*\
        $Lazy loading images on scroll
    \*------------------------------------*/
    if( $('.data-deferred').length > 0 ){

        $(window).scroll(function(){
            VitalUtility.requestAnimationTick('scroll');
        });

        VitalUtility.requestAnimationTick('scroll');

    }




    
    /*------------------------------------*\
        $Footer Promotion
    \*------------------------------------*/
    $('.tando-footer a').hover(function(){
        $('.promotional').addClass('promotional-show');
    },function(){
        $('.promotional').removeClass('promotional-show');
    });


}); /* end of as page load scripts */