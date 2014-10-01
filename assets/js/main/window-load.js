/*------------------------------------*\
    WINDOW LOAD JAVASCRIPT
\*------------------------------------*/

jQuery_vital(window).load(function(){


    /*------------------------------------*\
        $Bones Gravatars        
    \*------------------------------------*/
    var matchMedia = window.matchMedia || window.msMatchMedia;
    if (matchMedia) {
        if(matchMedia('only screen and (min-width:768px)').matches){
            /* load gravatars */
            jQuery_vital('.comment-author img[data-gravatar]').each(function(){
                jQuery_vital(this).attr('src',jQuery_vital(this).attr('data-gravatar'));
            });
        }
    }else{
        if(document.documentElement.clientWidth >= 768){
            /* load gravatars */
            jQuery_vital('.comment-author img[data-gravatar]').each(function(){
                jQuery_vital(this).attr('src',jQuery_vital(this).attr('data-gravatar'));
            });
        }
    }


});