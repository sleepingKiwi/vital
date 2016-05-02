/*------------------------------------*\
    _utility - detect
\*------------------------------------*/

/**
 * Detecting whether various things are available to us!
 */
 
vital.u_detect = (function(){

        /**
         * PRIVATE
         */
    var _transitionend;


        /**
         * PUBLIC
         */
    function transitionend(){
        if(_transitionend === undefined){
            var e = document.createElement('div');
            _transitionend = (e.style['transition'] !== undefined);
            e = null;
        }

        return _transitionend;
    }

    //revealing public methods
    return {
        transitionend : transitionend,
    };

}()); //vital.u_detect