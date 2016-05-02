/*------------------------------------*\
    generic popup functionality
\*------------------------------------*/

/**
 * popups are opened all over the place but they all share the same generic closing mechanic...
 */


vital.popup = (function(){
    
    /**
     * PRIVATE
     */
        //default options for the debug options
    var _defaultOptions = {
            // debug determines whether we should log to console or not.
        debug : false,
    };

    var _initOpts;

    function _popClicked(e){
        if(_initOpts.debug){
            console.log('%c [DEBUG] vital.popup clicked: e.currentTarget = '+e.currentTarget+' | e.target = '+e.target, 'color:#ff9933; font-size:0.9em;');
        }
        if(e.target.nodeName !== 'A'){
            //clicks on links don't close the popup...
            //click event for left clicks only! http://www.jacklmoore.com/notes/click-events
            if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey)) {
                apollo.removeClass(e.currentTarget, 'js--popup--popped');
            }
        }
    }


    /**
     * PUBLIC
     */
    function init(_opts){

        /**
         * optional _opts object can apply the debug option which outputs to console at various stages
         */

            //we first extend a blank object with our defaults which effectively makes a copy 
            //because the extend method would otherwise overwrite the defaults array.
        var opts = vital.u_extend.extend( {}, _defaultOptions );
            //then we extend our new copy with any supplied options
        vital.u_extend.extend( opts, _opts );
            //save the inited options to their own private var
        _initOpts = opts;

        if(_initOpts.debug){
            console.log('%c [DEBUG] vital.popup init', 'color:#ff9933; font-size:0.9em;');
        }

        /**
         * Adding listeners to anything that wants to listen for hovers on child links
         */
        var poppers = document.querySelectorAll('.js--popup');
        var i;
        var l = poppers.length;

        if(_initOpts.debug){
            console.log('%c [DEBUG] vital.popup adding listeners to '+l+' .js--popup', 'color:#ff9933; font-size:0.9em;');
        }

        for( i=0; i<l; i++ ){
            poppers[i].addEventListener('click', _popClicked, false);
        }
    }

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.popup