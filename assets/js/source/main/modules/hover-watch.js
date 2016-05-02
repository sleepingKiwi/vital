/*------------------------------------*\
    hover watch class
\*------------------------------------*/

/**
 * checking whether any links within a thing are hovered and then adding a class to the parent thing
 */


vital.hoverWatch = (function(){
    
    /**
     * PRIVATE
     */
        //default options for the debug options
    var _defaultOptions = {
            // debug determines whether we should log to console or not.
        debug : false,
    };

    var _initOpts;

    function _hoverOn(e){
        if(_initOpts.debug){
            console.log('%c [DEBUG] vital.hoverWatch hovered ON: e.currentTarget = '+e.currentTarget+' | e.target = '+e.target, 'color:#9933ff; font-size:0.9em;');
        }
        if(e.target.nodeName === 'A'){
            apollo.addClass(e.currentTarget, 'js--hovered');
        }
    }

    function _hoverOff(e){
        if(_initOpts.debug){
            console.log('%c [DEBUG] vital.hoverWatch hovered OFF: e.currentTarget = '+e.currentTarget+' | e.target = '+e.target, 'color:#9933ff; font-size:0.9em;');
        }
        if(e.target.nodeName === 'A'){
            apollo.removeClass(e.currentTarget, 'js--hovered');
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
            console.log('%c [DEBUG] vital.hoverWatch init', 'color:#9933ff; font-size:0.9em;');
        }

        /**
         * Adding listeners to anything that wants to listen for hovers on child links
         */
        var hoverWatchers = document.querySelectorAll('.js--hover-watch');
        var i;
        var l = hoverWatchers.length;

        if(_initOpts.debug){
            console.log('%c [DEBUG] vital.hoverWatch adding listeners to '+l+' .js--hover-watch', 'color:#9933ff; font-size:0.9em;');
        }

        for( i=0; i<l; i++ ){
            hoverWatchers[i].addEventListener('mouseover', _hoverOn, false);
            hoverWatchers[i].addEventListener('mouseout', _hoverOff, false);
        }
    }

    //revealing public methods
    return {
        init : init,
    };

}()); //vital.hoverWatch