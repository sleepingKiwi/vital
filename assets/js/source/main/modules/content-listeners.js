/*------------------------------------*\
    content listeners
\*------------------------------------*/

/**
 * a centralised class for managing listeners that might frequently need to be re-applied
 * for example after ajax loads etc.
 * 
 * it's up to the functions registered here to clean up before re-applying themselves (if relevant)
 * this class is just a dumb list that is run through every time it's called
 *
 * functions can be added or removed using the addFunction() and removeFunction() methods
 * optional priority values determine the order that functions are called in (if relevant)
 */


vital.contentListeners = (function(){


    /**
     *
     * $_sortByPriority - sorts an array of items on the priority value...
     *
     * $addFunction
     *
     * $removeFunction
     *
     * $listen - this is the big one! Runs through every method we've added...
     * 
     */


    /**
     * PRIVATE
     */

     var _listenerFunctions = [];


    /*------------------------------------*\
        $_sortByPriority
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
        $addFunction
    \*------------------------------------*/
    /**
     * Function to add a function to an array which is looped through when the listen function is called
     * _priority is optional but defaults to 10 (with lower priorities happening earlier)
     * _args is an optional object of options passed to the function when called
     */
    function addFunction(funk, _priority, _args){   

        if( (_priority < 0) || (typeof _priority !== 'number') ){
            //if priority is < 0, missing, or not a number we set it's priority to 10 which is the default
            _priority = 10;
        }

        _listenerFunctions.push( {func: funk, priority: _priority, args: _args} );

        //sort the array we just pushed to by priority
        _listenerFunctions.sort(_sortByPriority);

    }



    /*------------------------------------*\
        $removeFunction
    \*------------------------------------*/
    /**
     * Remove a function from an array!
     * returns true if function was removed.
     */
    function removeFunction(funk, _priority){

        var i = _listenerFunctions.length - 1;
        for (i; i >= 0; i--) {
            if( _listenerFunctions[i].func === funk && _listenerFunctions[i].priority === _priority ){
                //we found an exact match for priority and function so let's remove it
                _listenerFunctions.splice(i, 1);
                return true;
            }
        }

        return false;
    }



    /*------------------------------------*\
        $listen
    \*------------------------------------*/
    function listen(body){
        /**
         * This function loops through any/all functions added to the _listenerFunctions array
         * the array is already ordered by priority (it's sorted every time a function is added)
         */

        //console.log('reapplying listeners. Here\'s the _listenerFunctions Array: ');
        //console.log(_listenerFunctions);

        var i, l;

        l = _listenerFunctions.length;
        i = 0;

        for (i; i < l; i++) {
            //console.log('_listenerFunctions '+i+': '+_listenerFunctions[i].func.toString());
            _listenerFunctions[i].func( _listenerFunctions[i].args );
        }
    }

    //revealing public methods
    return {
        listen : listen,
        addFunction : addFunction,
        removeFunction : removeFunction,
    };

}()); //vital.contentListeners