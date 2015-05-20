/*------------------------------------*\
    page ready class
\*------------------------------------*/

/**
 * adding a class to the body tag when js has loaded 
 * (we could use a ready event but currently are not)
 */


vital.pageReady = (function(){

    function init(body){
        /**
         * not using a ready event any more because we run in the footer anyway and all of our scripts are 
         * concatenated to run in order..
         */
        apollo.addClass(body, 'page-ready');
    }

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.pageReady