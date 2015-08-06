/*------------------------------------*\
    window loaded scripts
\*------------------------------------*/

/**
 * scripts run only after page has fully loaded.
 */

vital.windowLoaded = (function(){


    /**
     * PRIVATE
     */
    /*------------------------------------*\
        $Bones Gravatars        
    \*------------------------------------*/
    function _loadGravatars(){
        /* load gravatars */
        var gravatars = document.querySelectorAll('.comment-author img[data-gravatar]');
        var i, l;
        l = gravatars.length;
        if(l){
            for (i = l - 1; i >= 0; i--) {
                gravatars[i].setAttribute('src', gravatars[i].getAttribute('data-gravatar'));
            }//for
        }//if(l)
    }//_loadGravatars
    function _bonesGravatars(){
        var matchMedia = window.matchMedia || window.msMatchMedia;
        if (matchMedia) {
            if(matchMedia('only screen and (min-width:768px)').matches){
                _loadGravatars();
            }
        }else if( verge.viewportW() >= 768 ){
            _loadGravatars();
        }
    }//_bonesGravatars()





    /**
     * PUBLIC
     */
    function init(){

        window.onload = function(e){ 

            _bonesGravatars();

        };

    }//init()

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.windowLoaded