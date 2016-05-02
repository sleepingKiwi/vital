/*------------------------------------*\
    debounced events
\*------------------------------------*/

/**
 * Requesting animation frames on scroll/resize updates 
 * rather than running these functions a billion times...
 * http://www.html5rocks.com/en/tutorials/speed/animations/ 
 */
    


vital.debouncedEvents = (function(){


    /**
     *
     * $scrollUpdate - functions to run on scroll 
     *      picturefill loading
     *      scroll to top
     *
     * $resizeUpdate - functions to run on resize
     *
     * $pageUpdateTick - called by requestAnimationFrame, calls appropriate event functions
     *
     * $sortByPriority - sorts an array of items on the priority value...
     *
     * $requestAnimationTick - using requestAnimationFrame to debounce event handlers
     *
     * $addFunctionOn
     *
     * $removeFunctionOn
     * 
     */


    /**
     * PRIVATE
     */

    var _scrollFunctionArray = [];
    var _resizeFunctionArray = [];


    /*----------------------------------------*\
        $scrollupdate
    \*----------------------------------------*/
    function _scrollUpdate(){
        
        /**
         * This function loops through any/all functions added to the _scrollFunctionArray in order
         */

        //console.log('doing a scroll update. Here\'s the _scrollFunctionArray: ');
        //console.log(_scrollFunctionArray);

        var i, l;

        l = _scrollFunctionArray.length;
        i = 0;

        //console.log(_scrollFunctionArray);

        for (i; i < l; i++) {
            //console.log('_scrollUpdate '+i+': '+_scrollFunctionArray[i].func.toString());
            //console.log('\n---\n');
            _scrollFunctionArray[i].func( _scrollFunctionArray[i].args );
        }

    }



    /*----------------------------------------*\
        $resizeUpdate
    \*----------------------------------------*/
    function _resizeUpdate(){
        
        /**
         * This function loops through any/all functions added to the _resizeFunctionArray in order
         */

        //console.log('doing a resize update. Here\'s the _resizeFunctionArray: ');
        //console.log(_resizeFunctionArray);

        var i, l;

        l = _resizeFunctionArray.length;
        i = 0;

        for (i; i < l; i++) {
            //console.log('_resizeUpdate '+i+': '+_resizeFunctionArray[i].func.toString());
            _resizeFunctionArray[i].func( _resizeFunctionArray[i].args );
        }

    }



    /*------------------------------------*\
        $pageUpdateTick
    \*------------------------------------*/
    var _animationTicking = false;
    var _animateResize = false;
    var _animateScroll = false;

    //called by requestAnimationTick on pages with deferred images
    function _pageUpdateTick(){

        if(_animateScroll){
            _scrollUpdate();
            _animateScroll = false;
        }

        if(_animateResize){
            _resizeUpdate();
            _animateResize = false;
        }

        _animationTicking = false;

    }//pageUpdateTick        



    /*------------------------------------*\
        $sortByPriority
    \*------------------------------------*/
    function _sortByPriority(a, b){
        
        if (a.priority > b.priority) {
        return 1;
        }
        if (a.priority < b.priority) {
        return -1;
        }
        // a must be equal to b
        return 0;

    }



    /**
     * PUBLIC
     */
    /*------------------------------------*\
     $requestAnimationTick
    \*------------------------------------*/
    function requestAnimationTick(type){
        //console.log(type);
        if(type === 'scroll'){
            _animateScroll = true;
        }else if(type === 'resize'){
            _animateResize = true;
        }

        if(!_animationTicking){
            requestAnimationFrame(_pageUpdateTick);
        }
        
        _animationTicking = true;
    }


    /*------------------------------------*\
        $addFunctionOn
    \*------------------------------------*/
    /**
     * Function to add a function to an array which is looped through on scroll events
     * _priority is optional but defaults to 10 (with lower priorities happening earlier)
     * _args is an optional object of options passed to the function when called
     */
    function addFunctionOn(type, funk, _priority, _args){   

        var funkArray = type === 'scroll' ? _scrollFunctionArray : (type === 'resize' ? _resizeFunctionArray : false);

        if(funkArray !== false){
            if( (_priority < 0) || (typeof _priority !== 'number') ){
                //if priority is < 0, missing, or not a number we set it's priority to 10 which is the default
                _priority = 10;
            }

            funkArray.push( {func: funk, priority: _priority, args: _args} );

            //sort the array we just pushed to by priority
            funkArray.sort(_sortByPriority);
        }

    }



    /*------------------------------------*\
        $removeFunctionOn
    \*------------------------------------*/
    /**
     * Remove a function from an array!
     * returns true if function was removed.
     */
    function removeFunctionOn(type, funk, _priority){
        var funkArray = type === 'scroll' ? _scrollFunctionArray : (type === 'resize' ? _resizeFunctionArray : false);

        var i = funkArray.length - 1;
        for (i; i >= 0; i--) {
            if( funkArray[i].func === funk && funkArray[i].priority === _priority ){
                //we found an exact match for priority and function so let's remove it
                funkArray.splice(i, 1);
                return true;
            }
        }

        return false;
    }




    //revealing public methods
    return {
        requestAnimationTick : requestAnimationTick,
        addFunctionOn : addFunctionOn,
        removeFunctionOn : removeFunctionOn
    };

}()); //vital.debouncedEvents