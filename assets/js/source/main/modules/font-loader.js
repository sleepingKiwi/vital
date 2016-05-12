/*------------------------------------*\
    font loader class
\*------------------------------------*/

/**
 * removing/adding a class to the html tag when fonts have loaded
 * -
 * uses techniques from:
 * https://dev.opera.com/articles/better-font-face/
 * https://www.filamentgroup.com/lab/font-events.html
 * https://www.zachleat.com/web/critical-webfonts/
 * -
 * uses replacement for CSS font loading module - https://github.com/zachleat/fontfaceonload
 * -
 * the system we have set up here will load the critical fonts with priority 
 * (to ensure they get loaded before we start downloading more fonts)
 * then it will download less essential fonts. This is to try and get the bulk of the custom fonts
 * loaded quickly and replacing their fallback fonts.
 * You will need to decide what is critical on a site-by-site basis!
 */


vital.fontLoader = (function(){

    /* global FontFaceOnload */

    function init(){
        
        /**
         * THE CHECKS FOR SESSION STORAGE OCCUR IN HEADER.PHP WHERE WE CUT THE MUSTARD
         * REMEMBER TO EDIT THAT FILE TO CACHE FONT LOADS PROPERLY!
         * -
         * First up we check if our sessionstorage(s) exist to tell us that fonts have already been
         * downloaded by this user. 
         *  (https://developer.mozilla.org/en/docs/Web/API/Window/sessionStorage)
         * If they are set we can assume that the user has our custom fonts cached so we don't go 
         * through the process of using fontfaceonload to load them up.
         */

        if( !apollo.hasClass(document.documentElement, 'js--main-fonts') ) {
            FontFaceOnload('montserratregular', {
                success: function() {
                    document.documentElement.className += ' js--main-fonts';
                    sessionStorage.mainfont = true;
                },
                weight: 'normal',
                style: 'normal'
            });
        }//main

        if( !apollo.hasClass(document.documentElement, 'js--header-fonts') ) {
            FontFaceOnload('goudyBookletter1911', {
                success: function() {
                    document.documentElement.className += ' js--header-fonts';
                    sessionStorage.headerfont = true;
                },
                weight: 'normal',
                style: 'normal'
            });
        }//header

            //needs weight bold to match font-face declaration
            //same would be true for style italic
        if( !apollo.hasClass(document.documentElement, 'js--bold-fonts') ) {
            FontFaceOnload('montserratbold', {
                success: function() {
                    document.documentElement.className += ' js--bold-fonts';
                    sessionStorage.boldfont = true;
                },
                weight: 'bold',
                style: 'normal'
            });
        }//bold

    }//init

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.fontLoader